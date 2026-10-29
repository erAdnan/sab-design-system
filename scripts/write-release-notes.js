/**
 * Build release notes from commits since the previous v* tag.
 *
 * npm does not host release notes. This writes the same notes to:
 * - CHANGELOG.md (shipped in the npm package)
 * - the Releases section of README.md (rendered on the npm page)
 * - .ci/release-notes.md (body of the GitHub Release)
 *
 * Merged pull requests are used when `gh` is authenticated. Direct pushes
 * are listed from git. Subjects stay as written. This repo does not use
 * conventional commits, so notes are one list rather than guessed Added,
 * Fixed, and Changed groups.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const repo = "SABDigitalBank/sab-design-system";
const dryRun = process.argv.includes("--dry-run");
const versionArg = process.argv.find((arg) => /^\d+\.\d+\.\d+$/.test(arg));
const version =
  versionArg || require(path.join(root, "package.json")).version;

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function previousTag() {
  let tags = [];
  try {
    tags = git(["tag", "--list", "v*", "--sort=-v:refname"])
      .split("\n")
      .map((tag) => tag.trim())
      .filter(Boolean);
  } catch {
    return null;
  }

  const head = git(["rev-parse", "HEAD"]);
  for (const tag of tags) {
    if (!/^v\d+\.\d+\.\d+$/.test(tag)) continue;
    if (tag === `v${version}`) {
      try {
        if (git(["rev-parse", `${tag}^{commit}`]) === head) continue;
      } catch {
        continue;
      }
    }
    return tag;
  }
  return null;
}

function loadMergedPulls() {
  if (!process.env.GH_TOKEN && !process.env.GITHUB_TOKEN) return new Map();
  try {
    const raw = execFileSync(
      "gh",
      [
        "pr",
        "list",
        "--state",
        "merged",
        "--base",
        "main",
        "--limit",
        "100",
        "--json",
        "number,title,url,mergeCommit",
      ],
      { cwd: root, encoding: "utf8" }
    );
    const pulls = JSON.parse(raw);
    const byCommit = new Map();
    for (const pull of pulls) {
      const oid = pull.mergeCommit && pull.mergeCommit.oid;
      if (oid) byCommit.set(oid, pull);
    }
    return byCommit;
  } catch (error) {
    console.warn(
      `Merged pull requests were not listed (${error.message.split("\n")[0]}). Notes use commits.`
    );
    return new Map();
  }
}

function commitsSince(tag) {
  const range = tag ? `${tag}..HEAD` : "HEAD";
  let raw = "";
  try {
    raw = git(["log", range, "--pretty=format:%H%x1f%s%x1e"]);
  } catch (error) {
    throw new Error(`Could not read commits for ${range}: ${error.message}`);
  }
  if (!raw) return [];

  return raw
    .split("\x1e")
    .map((record) => record.trim())
    .filter(Boolean)
    .map((record) => {
      const [hash, subject] = record.split("\x1f");
      return { hash, subject: (subject || "").trim() };
    })
    .filter((commit) => commit.hash && commit.subject);
}

function isReleaseCommit(subject) {
  return /^chore:\s*release\s+v\d/i.test(subject);
}

function isMergeCommit(subject) {
  return /^merge (pull request|branch|remote)/i.test(subject);
}

function bullet(commit, pull) {
  const inline = commit.subject.match(/\(#(\d+)\)\s*$/);
  if (pull) {
    const title = pull.title || commit.subject;
    return `${title} ([#${pull.number}](${pull.url}))`;
  }
  if (inline) {
    const number = inline[1];
    const title = commit.subject.replace(/\s*\(#\d+\)\s*$/, "");
    return `${title} ([#${number}](https://github.com/${repo}/pull/${number}))`;
  }
  const short = commit.hash.slice(0, 7);
  return `${commit.subject} ([${short}](https://github.com/${repo}/commit/${commit.hash}))`;
}

function renderVersion(date, items) {
  const lines = [`## [${version}] - ${date}`, "", "### Changes", ""];
  if (!items.length) {
    lines.push("No changes since the previous release.", "");
  } else {
    for (const item of items) lines.push(`- ${item}`);
    lines.push("");
  }
  return `${lines.join("\n").trimEnd()}\n`;
}

function changelogHeader() {
  return `# Changelog

All notable changes to \`@sab-digital-bank/design-system\` are listed in this file.
This file ships in the npm package. Each version is also published as a GitHub Release.

`;
}

function upsertChangelog(section) {
  const file = path.join(root, "CHANGELOG.md");
  let current = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : changelogHeader();
  if (!current.includes("## [")) {
    current = `${current.trimEnd()}\n\n`;
  }

  const pattern = new RegExp(
    `## \\[${version.replace(/\./g, "\\.")}\\][\\s\\S]*?(?=\\n## \\[|$)`
  );
  if (pattern.test(current)) {
    current = current.replace(pattern, section.trimEnd());
  } else {
    const index = current.search(/\n## \[/);
    const block = `${section.trimEnd()}\n`;
    if (index === -1) current = `${current.trimEnd()}\n\n${block}`;
    else current = `${current.slice(0, index + 1)}${block}\n${current.slice(index + 1)}`;
  }

  if (!current.endsWith("\n")) current += "\n";
  fs.writeFileSync(file, current);
  return current;
}

function syncReadme(changelog) {
  const file = path.join(root, "README.md");
  const start = "<!-- release-notes:start -->";
  const end = "<!-- release-notes:end -->";
  const readme = fs.readFileSync(file, "utf8");
  if (!readme.includes(start) || !readme.includes(end)) {
    throw new Error("README.md is missing release-notes markers.");
  }

  const latest = changelog
    .split(/\n(?=## \[)/)
    .find((part) => part.startsWith("## ["));
  const versions = (latest || "").trim();
  const next = readme.replace(
    new RegExp(`${start}[\\s\\S]*?${end}`),
    `${start}\n${versions}\n${end}`
  );
  fs.writeFileSync(file, next);
}

function main() {
  const tag = previousTag();
  const pulls = loadMergedPulls();
  const seen = new Set();
  const items = [];

  for (const commit of commitsSince(tag)) {
    if (isReleaseCommit(commit.subject)) continue;
    const pull = pulls.get(commit.hash);
    if (isMergeCommit(commit.subject) && !pull) continue;
    const key = pull ? `pr-${pull.number}` : commit.hash;
    if (seen.has(key)) continue;
    seen.add(key);
    items.push(bullet(commit, pull));
  }

  const date = new Date().toISOString().slice(0, 10);
  const section = renderVersion(date, items);
  const since = tag
    ? `Changes since ${tag}.`
    : "First release.";
  const compare = tag
    ? `\nCompare: https://github.com/${repo}/compare/${tag}...v${version}\n`
    : "\n";
  const githubNotes = `## @sab-digital-bank/design-system v${version}\n\n${since}\n\n${section}${compare}`;

  if (dryRun) {
    process.stdout.write(githubNotes);
    return;
  }

  const changelog = upsertChangelog(section);
  syncReadme(changelog);
  const notesDir = path.join(root, ".ci");
  fs.mkdirSync(notesDir, { recursive: true });
  fs.writeFileSync(path.join(notesDir, "release-notes.md"), githubNotes);
  console.log(`Wrote release notes for v${version}${tag ? ` since ${tag}` : ""}.`);
}

main();

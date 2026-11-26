#!/usr/bin/env node
/**
 * Launch an iOS app variant (Storybook or Demo) on any available simulator.
 *
 * Variants:
 *   sb   → scheme SABDS / Debug-SB / com.sabdesignsystem.sb / "SAB DS"
 *   demo → scheme SABDSDemo / Debug / com.sabdesignsystem.demoapp / "SAB DS DemoApp"
 */
const { execFileSync, spawn } = require("child_process");
const fs = require("fs");
const http = require("http");
const os = require("os");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const WORKSPACE = path.join(ROOT, "ios/SabDesignSystem.xcworkspace");
const DERIVED_DATA = path.join(ROOT, "ios/build");
const XCODE_ENV_LOCAL = path.join(ROOT, "ios/.xcode.env.local");

const VARIANTS = {
  sb: {
    scheme: "SABDS",
    configuration: "Debug-SB",
    bundleId: "com.sabdesignsystem.sb",
    displayName: "SAB DS",
    storybook: true,
    metroScript: "start",
  },
  demo: {
    scheme: "SABDSDemo",
    configuration: "Debug",
    bundleId: "com.sabdesignsystem.demoapp",
    displayName: "SAB DS DemoApp",
    storybook: false,
    metroScript: "start",
  },
};

function parseArgs(argv) {
  const out = { variant: "demo" };
  for (let i = 2; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--variant=")) {
      out.variant = arg.slice("--variant=".length);
    } else if (arg === "--variant") {
      out.variant = argv[++i];
    }
  }
  if (!VARIANTS[out.variant]) {
    throw new Error(
      `Unknown variant "${out.variant}". Use --variant=sb or --variant=demo`
    );
  }
  return out;
}

function run(cmd, args, opts = {}) {
  execFileSync(cmd, args, { stdio: "inherit", ...opts });
}

function isYarnNodeShim(nodePath) {
  return /\/T\/yarn--[^/]+\/node$/.test(nodePath);
}

function resolveNodeBinary() {
  const execPath = process.execPath;
  if (!execPath || isYarnNodeShim(execPath)) {
    throw new Error(
      "Node.js was not found on PATH. Install Node 18+ (Homebrew or nvm) and retry."
    );
  }

  try {
    const real = fs.realpathSync(execPath);
    if (real && fs.existsSync(real) && !isYarnNodeShim(real)) return real;
  } catch {
    // Fall through to the executing binary.
  }

  if (!fs.existsSync(execPath)) {
    throw new Error(
      "Node.js was not found on PATH. Install Node 18+ (Homebrew or nvm) and retry."
    );
  }
  return execPath;
}

function developerDir() {
  return execFileSync("xcode-select", ["-p"], { encoding: "utf8" }).trim();
}

function simulatorAppExists() {
  try {
    return fs.existsSync(path.join(developerDir(), "Applications/Simulator.app"));
  } catch {
    return false;
  }
}

function ensureXcodeNodeBinary() {
  const nodePath = resolveNodeBinary();

  let existing = "";
  if (fs.existsSync(XCODE_ENV_LOCAL)) {
    const match = fs
      .readFileSync(XCODE_ENV_LOCAL, "utf8")
      .match(/^\s*export\s+NODE_BINARY=(.+)\s*$/m);
    existing = match ? match[1].trim().replace(/^["']|["']$/g, "") : "";
  }

  // Yarn classic puts a temp `node` shell wrapper first on PATH. Xcode keeps
  // NODE_BINARY after that wrapper is deleted, so never persist it.
  if (!existing || !fs.existsSync(existing) || isYarnNodeShim(existing)) {
    fs.writeFileSync(XCODE_ENV_LOCAL, `export NODE_BINARY=${nodePath}\n`);
    console.log(`Wrote ios/.xcode.env.local → ${nodePath}`);
  }
}

function listSimulators() {
  const out = execFileSync(
    "xcrun",
    ["simctl", "list", "devices", "available"],
    { encoding: "utf8" }
  );
  const devices = [];
  for (const line of out.split("\n")) {
    const match = line.match(
      /^\s+(.+?)\s+\(([0-9A-F-]{36})\)\s+\((Booted|Shutdown)\)/i
    );
    if (!match) continue;
    devices.push({ name: match[1].trim(), udid: match[2], state: match[3] });
  }
  return devices;
}

function pickSimulator() {
  const devices = listSimulators();
  if (!devices.length) {
    throw new Error(
      "No available iOS simulators found. Install a simulator runtime in Xcode → Settings → Platforms."
    );
  }
  const booted = devices.find((d) => d.state === "Booted");
  if (booted) return booted;
  const iphone = devices.find((d) => /iPhone/i.test(d.name));
  return iphone || devices[0];
}

function ensureMetro() {
  return new Promise((resolve) => {
    const req = http.get("http://127.0.0.1:8081/status", (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on("error", () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function startMetroIfNeeded(variant) {
  if (await ensureMetro()) {
    console.log("Metro already running on :8081");
    return;
  }
  console.log("Starting Metro...");
  const yarnCmd = process.platform === "win32" ? "yarn.cmd" : "yarn";
  const logPath = path.join(os.tmpdir(), "sab-metro-ios.log");
  const logFd = fs.openSync(logPath, "w");
  const metro = spawn(yarnCmd, [variant.metroScript], {
    cwd: ROOT,
    env: { ...process.env },
    stdio: ["ignore", logFd, logFd],
    detached: true,
  });
  fs.closeSync(logFd);

  let exited = false;
  metro.on("exit", () => {
    exited = true;
  });
  metro.unref();

  for (let i = 0; i < 30; i++) {
    if (exited) break;
    await new Promise((r) => setTimeout(r, 1000));
    if (await ensureMetro()) return;
  }

  const log = fs.existsSync(logPath)
    ? fs.readFileSync(logPath, "utf8").trim().slice(-2000)
    : "";
  throw new Error(
    `Metro did not become ready on http://127.0.0.1:8081${log ? `\n${log}` : ""}`
  );
}

function envFor() {
  return { ...process.env };
}

function runWithReactNativeCli(simulator, variant) {
  console.log("Simulator.app found — using react-native run-ios");
  run(
    process.platform === "win32" ? "npx.cmd" : "npx",
    [
      "react-native",
      "run-ios",
      "--no-packager",
      "--scheme",
      variant.scheme,
      "--mode",
      variant.configuration,
      "--udid",
      simulator.udid,
    ],
    { cwd: ROOT, env: envFor() }
  );
}

function runWithXcodebuild(simulator, variant) {
  console.log(
    "Simulator.app not found in Xcode developer dir — using xcodebuild + simctl"
  );
  if (simulator.state !== "Booted") {
    console.log(`Booting ${simulator.name}...`);
    try {
      run("xcrun", ["simctl", "boot", simulator.udid]);
    } catch {
      // Already booting is fine.
    }
  }

  const configurationDir = `${variant.configuration}-iphonesimulator`;
  const appPath = path.join(
    DERIVED_DATA,
    "Build/Products",
    configurationDir,
    "SabDesignSystem.app"
  );

  console.log(`Building ${variant.displayName} (${variant.configuration})...`);
  run(
    "xcodebuild",
    [
      "-workspace",
      WORKSPACE,
      "-scheme",
      variant.scheme,
      "-configuration",
      variant.configuration,
      "-destination",
      `id=${simulator.udid}`,
      "-derivedDataPath",
      DERIVED_DATA,
      "-quiet",
      "ONLY_ACTIVE_ARCH=YES",
      "build",
    ],
    { env: envFor() }
  );

  if (!fs.existsSync(appPath)) {
    throw new Error(`Built app not found at ${appPath}`);
  }

  console.log("Installing app on simulator...");
  run("xcrun", ["simctl", "install", simulator.udid, appPath]);
  console.log("Launching app...");
  run("xcrun", ["simctl", "launch", simulator.udid, variant.bundleId]);
}

async function main() {
  if (process.platform !== "darwin") {
    throw new Error("iOS variants are only supported on macOS");
  }

  const { variant: key } = parseArgs(process.argv);
  const variant = VARIANTS[key];

  ensureXcodeNodeBinary();
  await startMetroIfNeeded(variant);

  const simulator = pickSimulator();
  console.log(
    `Using simulator: ${simulator.name} (${simulator.udid}) → ${variant.displayName} [${variant.bundleId}]`
  );

  if (simulatorAppExists()) {
    runWithReactNativeCli(simulator, variant);
  } else {
    runWithXcodebuild(simulator, variant);
  }

  console.log(`${variant.displayName} launch complete.`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});

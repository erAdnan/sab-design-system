#!/usr/bin/env node
/**
 * Optimize Pulse Design System + Foundations Storybook doc rasters.
 *
 * Quality-first (Figma pixel copies for Storybook):
 * - WebP at quality 93 (visually lossless for UI screenshots)
 * - Downscale only when wider than 2× docs maxContent (1440 → 2880)
 * - Never upscale; preserve aspect ratio with lanczos3
 * - Rewrites require() paths + catalog dimensions; deletes source PNGs
 * - Removes known unused ecosystem composites
 *
 * Usage: node scripts/optimize-storybook-docs-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/** Docs render at maxContent 1440; 2× keeps retina sharpness. */
const MAX_WIDTH = 2880;
/** WebP hard limit per side (libwebp). */
const WEBP_MAX_SIDE = 16383;
const WEBP_QUALITY = 93;
const WEBP_EFFORT = 6;

const SCAN_DIRS = [
  path.join(ROOT, "stories/pulse-design-system"),
  path.join(ROOT, "stories/foundations"),
];

/** Not referenced by any story — dead weight in the deploy. */
const UNUSED_RELATIVE = [
  "stories/pulse-design-system/assets/ecosystem/hero-phones.png",
  "stories/pulse-design-system/assets/ecosystem/glance-composite.png",
  "stories/pulse-design-system/assets/ecosystem/foundation-composite.png",
  "stories/pulse-design-system/assets/ecosystem/hero-composite.png",
  "stories/pulse-design-system/assets/ecosystem/hero-float-1.png",
  "stories/pulse-design-system/assets/ecosystem/hero-float-2.png",
  "stories/pulse-design-system/assets/ecosystem/hero-float-3.png",
];

function walkPngs(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkPngs(full, out);
    else if (entry.isFile() && /\.png$/i.test(entry.name)) out.push(full);
  }
  return out;
}

function walkCode(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "assets" || entry.name === "node_modules") continue;
      walkCode(full, out);
    } else if (entry.isFile() && /\.(tsx?|jsx?)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

async function convertPng(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, ".webp");
  const input = sharp(pngPath, { limitInputPixels: false });
  const meta = await input.metadata();
  const srcW = meta.width || 0;
  const srcH = meta.height || 0;
  if (!srcW || !srcH) throw new Error(`No dimensions: ${pngPath}`);

  let pipeline = sharp(pngPath, { limitInputPixels: false });
  let outW = srcW;
  let outH = srcH;

  // Prefer display-width cap; then enforce WebP max side (tall Figma stacks).
  let scale = 1;
  if (srcW > MAX_WIDTH) scale = Math.min(scale, MAX_WIDTH / srcW);
  if (srcW * scale > WEBP_MAX_SIDE) scale = Math.min(scale, WEBP_MAX_SIDE / srcW);
  if (srcH * scale > WEBP_MAX_SIDE) scale = Math.min(scale, WEBP_MAX_SIDE / srcH);

  if (scale < 1) {
    outW = Math.max(1, Math.round(srcW * scale));
    outH = Math.max(1, Math.round(srcH * scale));
    pipeline = pipeline.resize({
      width: outW,
      height: outH,
      fit: "fill",
      kernel: sharp.kernel.lanczos3,
    });
  }

  await pipeline
    .webp({
      quality: WEBP_QUALITY,
      effort: WEBP_EFFORT,
      smartSubsample: true,
    })
    .toFile(webpPath);

  const oldBytes = fs.statSync(pngPath).size;
  const newBytes = fs.statSync(webpPath).size;

  // If WebP somehow grew, keep PNG and remove WebP (quality/size fail-safe).
  if (newBytes >= oldBytes) {
    fs.unlinkSync(webpPath);
    return {
      pngPath,
      keptPng: true,
      outW: srcW,
      outH: srcH,
      oldBytes,
      newBytes: oldBytes,
    };
  }

  fs.unlinkSync(pngPath);
  return {
    pngPath,
    webpPath,
    keptPng: false,
    outW,
    outH,
    oldBytes,
    newBytes,
    resized: srcW !== outW,
  };
}

function rewriteCode(results) {
  /** @type {Map<string, { webp: boolean, w: number, h: number, base: string }>} */
  const byBase = new Map();
  for (const r of results) {
    const base = path.basename(r.pngPath, path.extname(r.pngPath));
    byBase.set(base, {
      webp: !r.keptPng,
      w: r.outW,
      h: r.outH,
      base,
    });
  }

  const codeFiles = SCAN_DIRS.flatMap((d) => walkCode(d));
  let filesTouched = 0;

  for (const file of codeFiles) {
    let text = fs.readFileSync(file, "utf8");
    const original = text;

    // require("…/name.png") → .webp when converted
    text = text.replace(
      /require\((["'])([^"']+?)\.png\1\)/g,
      (match, quote, rel) => {
        const base = path.basename(rel);
        const info = byBase.get(base);
        if (!info || !info.webp) return match;
        return `require(${quote}${rel}.webp${quote})`;
      }
    );

    // img(require("…/name.webp"), W, H) — refresh dimensions after resize
    text = text.replace(
      /require\((["'])([^"']+?)\.(png|webp)\1\),\s*(\d+)\s*,\s*(\d+)/g,
      (match, quote, rel, ext, _w, _h) => {
        const base = path.basename(rel);
        const info = byBase.get(base);
        if (!info) return match;
        const useExt = info.webp ? "webp" : "png";
        return `require(${quote}${rel}.${useExt}${quote}), ${info.w}, ${info.h}`;
      }
    );

    if (text !== original) {
      fs.writeFileSync(file, text);
      filesTouched += 1;
    }
  }
  return filesTouched;
}

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  console.log("Optimizing Storybook doc assets (WebP q%s, max width %d)…", WEBP_QUALITY, MAX_WIDTH);

  let removedUnused = 0;
  let unusedBytes = 0;
  for (const rel of UNUSED_RELATIVE) {
    const full = path.join(ROOT, rel);
    if (fs.existsSync(full)) {
      unusedBytes += fs.statSync(full).size;
      fs.unlinkSync(full);
      removedUnused += 1;
      console.log("  removed unused", rel);
    }
  }

  const pngs = SCAN_DIRS.flatMap((d) => walkPngs(d)).filter(
    (p) => !UNUSED_RELATIVE.some((rel) => p.endsWith(rel.replace(/\//g, path.sep)))
  );

  // Skip already-deleted unused paths
  const targets = pngs.filter((p) => fs.existsSync(p));
  console.log(`Found ${targets.length} PNG file(s) to process.`);

  const results = [];
  let oldTotal = 0;
  let newTotal = 0;
  let converted = 0;
  let kept = 0;
  let resized = 0;

  for (const pngPath of targets) {
    const rel = path.relative(ROOT, pngPath);
    process.stdout.write(`  ${rel} … `);
    try {
      const r = await convertPng(pngPath);
      results.push(r);
      oldTotal += r.oldBytes;
      newTotal += r.newBytes;
      if (r.keptPng) {
        kept += 1;
        console.log(`kept PNG (${formatMb(r.oldBytes)}; WebP not smaller)`);
      } else {
        converted += 1;
        if (r.resized) resized += 1;
        const pct = Math.round((1 - r.newBytes / r.oldBytes) * 100);
        console.log(
          `→ WebP ${r.outW}×${r.outH} ${formatMb(r.newBytes)} (−${pct}%)${r.resized ? " [resized]" : ""}`
        );
      }
    } catch (err) {
      console.log("FAILED");
      console.error(err);
      process.exitCode = 1;
    }
  }

  const filesTouched = rewriteCode(results);
  console.log(`\nRewrote ${filesTouched} code file(s).`);
  console.log(
    `Converted ${converted}, kept PNG ${kept}, resized ${resized}, removed unused ${removedUnused}.`
  );
  console.log(
    `Raster size: ${formatMb(oldTotal)} → ${formatMb(newTotal)} (plus −${formatMb(unusedBytes)} unused).`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

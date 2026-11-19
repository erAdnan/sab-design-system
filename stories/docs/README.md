# Adding Figma docs to Storybook

Pixel-faithful Pulse Design System docs use **exported Figma frames** rendered via `FigmaDocPage`. Interactive component stories stay separate; docs stories use `tags: ["!autodocs"]` so they do not collide with auto-generated Docs.

**Reference implementations**

| Kind | Example |
| --- | --- |
| Single page under Components | `stories/ThemeSelector/docs/` |
| Multi-page L→R canvas | `stories/ProductsCards/docs/`, `stories/Bottomsheet/docs/` |
| Top-level sidebar group | `stories/MobileNativeComponents/docs/` |
| Renderer | `stories/pulse-design-system/rules-and-patterns/FigmaDocPage.tsx` |

---

## 1. Map the Figma canvas

1. Open the Pulse file URL, e.g.  
   `https://www.figma.com/design/<fileKey>/Pulse-Design-System?node-id=755-4645&m=dev`
2. Parse:
   - **fileKey** — path segment after `/design/`
   - **nodeId** — `node-id=755-4645` → `755:4645`
3. Inspect the canvas (Figma MCP `get_metadata` or Dev Mode):
   - List **top-level page frames left → right** — each becomes one Docs story title.
   - Per page, prefer:
     - `docs/headerSection` (title bar)
     - Body frame / `doc.Blocks` / named sections
4. If a body is taller than ~**4 000–10 000 px**, plan **section exports** (MCP `download_assets` often caps the long edge ~4096). Prefer named section nodes over one giant frame.

---

## 2. Export images from Figma

Use Figma MCP (or equivalent export). Download URLs promptly — they expire.

| Layer | Tool | Settings | Typical result |
| --- | --- | --- | --- |
| Header (`docs/headerSection`) | `download_assets` | PNG, **scale 2** | ~2800×331 |
| Body / section (≤ ~4k tall) | `download_assets` | PNG, **scale 1** | ~1200–1400 wide |
| Tall section (capped by MCP) | `get_screenshot` | `maxDimension` = full height (or ≥ long edge) | Full-res PNG URL |

**Tips**

- Export **one section at a time** when the full page fails or returns a tiny capped PNG (e.g. 490×4096).
- Keep source PNGs only long enough to convert; commit **WebP**, not PNG.
- Folder layout:

```text
stories/<Area>/docs/
  catalog.ts
  <Page>.stories.tsx
  assets/
    <slug>-00.webp   # header (optional but preferred)
    <slug>-01.webp   # body / section 1
    <slug>-02.webp   # …
```

Use a stable slug: `theme-selector`, `native-components`, `category-card`, …

---

## 3. Convert / optimize to WebP

### Standard settings (what we use)

| Setting | Value | Why |
| --- | --- | --- |
| Format | **WebP** | Much smaller than PNG for UI screenshots |
| Quality | **93** | Near-lossless for Figma UI copies |
| Max width (optional) | **2880** (2× docs maxContent 1440) | Retina; avoid huge headers |
| Max side | **16383** | libwebp hard limit — taller images must be **sliced** |

### One-off convert (Components / Mobile Native / etc.)

From the repo root (requires `sharp`, already a dependency):

```bash
# Convert a folder of PNGs → WebP q93, delete PNGs, print WxH for catalog.ts
node <<'JS'
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = process.argv[1]; // pass absolute or relative path
const WEBP_QUALITY = 93;
const WEBP_MAX_SIDE = 16383;

(async () => {
  const files = fs.readdirSync(dir).filter((f) => /\.png$/i.test(f)).sort();
  for (const f of files) {
    const png = path.join(dir, f);
    const webp = png.replace(/\.png$/i, ".webp");
    const meta = await sharp(png, { limitInputPixels: false }).metadata();
    let pipeline = sharp(png, { limitInputPixels: false });
    let { width: w, height: h } = meta;

    if (w > WEBP_MAX_SIDE || h > WEBP_MAX_SIDE) {
      throw new Error(
        `${f} is ${w}x${h} — exceeds WebP max side ${WEBP_MAX_SIDE}. Slice vertically first.`
      );
    }

    await pipeline.webp({ quality: WEBP_QUALITY, effort: 6 }).toFile(webp);
    const out = await sharp(webp).metadata();
    console.log(`${path.basename(webp)}  ${out.width}x${out.height}`);
    fs.unlinkSync(png);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
JS
# Usage: save as a file or run with dir as first arg after editing `dir`.
```

Practical one-liner for a single file:

```bash
node -e '
const sharp=require("sharp");
const fs=require("fs");
const png=process.argv[1];
const webp=png.replace(/\.png$/i,".webp");
sharp(png,{limitInputPixels:false}).webp({quality:93,effort:6}).toFile(webp)
  .then(async()=>{const m=await sharp(webp).metadata();console.log(webp,m.width+"x"+m.height);fs.unlinkSync(png);});
' path/to/export.png
```

### Slice a PNG that is too tall for WebP

WebP fails if any side &gt; **16383**. Split into horizontal strips (e.g. 6000 px), then convert each strip:

```bash
node <<'JS'
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const pngPath = "stories/Example/docs/assets/body.png";
const outDir = path.dirname(pngPath);
const maxStrip = 6000; // under WebP limit; readable chunks

(async () => {
  const meta = await sharp(pngPath, { limitInputPixels: false }).metadata();
  const { width: w, height: h } = meta;
  let y = 0;
  let i = 1;
  while (y < h) {
    const height = Math.min(maxStrip, h - y);
    const out = path.join(outDir, `body-${String(i).padStart(2, "0")}.webp`);
    await sharp(pngPath, { limitInputPixels: false })
      .extract({ left: 0, top: y, width: w, height })
      .webp({ quality: 93, effort: 6 })
      .toFile(out);
    const m = await sharp(out).metadata();
    console.log(path.basename(out), `${m.width}x${m.height}`, `from y=${y}`);
    y += height;
    i += 1;
  }
  fs.unlinkSync(pngPath);
})();
JS
```

### Bulk optimize (Pulse Design System + Foundations only)

```bash
yarn optimize:storybook-docs
```

Runs `scripts/optimize-storybook-docs-assets.mjs`:

- Scans `stories/pulse-design-system` and `stories/foundations`
- PNG → WebP q93, optional downscale to max width 2880, enforces WebP max side
- Rewrites `require()` paths and catalog dimensions
- Deletes source PNGs when WebP is smaller

For **Components / Mobile Native Components** docs, prefer the manual convert above (or extend `SCAN_DIRS` in that script if you want the same automation).

### Upscale headers that were exported at 1× (optional)

If a scale-2 header should match older batches (~2800 wide):

```bash
node -e '
const sharp=require("sharp");
sharp(process.argv[1]).resize({width:2800, kernel:sharp.kernel.lanczos3})
  .webp({quality:93}).toFile(process.argv[2]);
' header-1x.png header-00.webp
```

Only upscale when matching an existing convention; never upscale body screenshots for “sharpness.”

---

## 4. Catalog

Create `stories/<Area>/docs/catalog.ts`:

```ts
import { ImageSourcePropType } from "react-native";

export type DocImage = {
  source: ImageSourcePropType;
  aspectRatio: number; // width / height
};

export type DocPage = {
  title: string;
  storyTitle: string;
  images: DocImage[];
};

const img = (source: ImageSourcePropType, w: number, h: number): DocImage => ({
  source,
  aspectRatio: w / h,
});

/** Figma Final Pulse canvas (<nodeId>); header + body/section exports. */
export const EXAMPLE_DOCS_PAGES: DocPage[] = [
  {
    title: "Example page",
    storyTitle: "Components/Example/Docs/Example page",
    images: [
      img(require("./assets/example-00.webp"), 2800, 331),
      img(require("./assets/example-01.webp"), 1400, 6902),
    ],
  },
];
```

Use the **exact WebP pixel size** from `sharp` metadata (or `asset-dims.json` if you keep one). Wrong `w`/`h` skews aspect ratio in `FigmaDocPage`.

---

## 5. Docs stories

One story file per Figma page (L→R order). Template:

```tsx
import React from "react";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { EXAMPLE_DOCS_PAGES } from "./catalog";

const page = EXAMPLE_DOCS_PAGES.find((p) => p.title === "Example page")!;

export default {
  title: "Components/Example/Docs/Example page",
  tags: ["!autodocs"],
  parameters: {
    layout: "fullscreen",
    controls: { disable: true },
    a11y: { disable: true },
  },
};

/** Figma Final Pulse → … canvas (<nodeId>) → Example page. */
export const Overview = {
  name: "Overview",
  render: () => (
    <FigmaDocPage
      title={page.title}
      eyebrow="Components · Example"
      images={page.images}
    />
  ),
};
```

**Title conventions**

| Placement | `title` example |
| --- | --- |
| Under a component | `Components/<Name>/Docs/<Figma page name>` |
| New top-level group | `Mobile Native Components/Docs/<Page>` |

Page name should match the Figma frame/title text when possible (sidebar + `storySort`).

---

## 6. Wire Storybook

### `.storybook/main.js`

Add a stories glob:

```js
"../stories/Example/**/*.stories.@(ts|tsx|js|jsx)",
```

### `.storybook/preview.jsx`

1. Docs page order array (Figma **left → right**):

```js
const exampleDocsPages = ["Example page", "Another page"];
```

2. Matching `storySort` block that ranks `parts(title)[3]` (or `[2]` for top-level groups) with that array.
3. If adding a **new top-level sidebar group**, append it to:

```js
const top = [
  "Pulse Design System",
  "Components",
  "Mobile Native Components",
  "Foundations",
];
```

---

## 7. Verify

1. `yarn storybook` → open the Docs story; images stack full-width under the tint header.
2. Confirm no missing `require()` / broken images.
3. Optional size check before deploy:

```bash
du -sh stories/<Area>/docs/assets
# All story rasters are typically ~100 MB total — fine vs Firebase Hosting 10 GB free storage.
```

4. Build: `yarn build-storybook` — only `require()`’d assets land in `storybook-static/`.

---

## Firebase Hosting notes

| Limit | Typical docs impact |
| --- | --- |
| Free Hosting storage **10 GB** | Full docs set ~100 MB — not a concern |
| Max file size **2 GB** | Largest WebPs are usually &lt; 1 MB |
| Retained releases | Old Hosting releases still count toward storage — prune in Firebase console if needed |

Prefer WebP; avoid committing PNGs. Don’t duplicate the same Figma page under both Rules and Components unless intentional.

---

## Checklist

- [ ] Mapped Figma pages L→R and section node IDs  
- [ ] Exported header @2× and body/sections @1× (or screenshot for tall frames)  
- [ ] Converted to **WebP q93**; sliced if height &gt; 16383  
- [ ] `catalog.ts` with correct pixel `w`/`h`  
- [ ] One `*.stories.tsx` per page with `!autodocs` + `FigmaDocPage`  
- [ ] Glob in `main.js` + order in `preview.jsx`  
- [ ] Storybook preview looks correct; optional `du` / `build-storybook`  

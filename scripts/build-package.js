/**
 * Compile src TypeScript into dist/ before npm publish.
 *
 * The published package still ships src/, stories/, and examples/.
 * Metro in the app compiles that source, including SVG and image imports.
 * dist/ is the compile check: publish stops if Babel cannot compile the library.
 */
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const root = path.join(__dirname, "..");
const srcDir = path.join(root, "src");
const outDir = path.join(root, "dist");

const babelOptions = {
  babelrc: false,
  configFile: false,
  ast: false,
  sourceMaps: false,
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    "@babel/plugin-transform-export-namespace-from",
    "@babel/plugin-transform-class-static-block",
  ],
};

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

fs.rmSync(outDir, { recursive: true, force: true });

let compiled = 0;
for (const file of walk(srcDir)) {
  const ext = path.extname(file);
  if (ext !== ".ts" && ext !== ".tsx") {
    continue;
  }

  const rel = path.relative(srcDir, file);
  let result;
  try {
    result = babel.transformFileSync(file, {
      ...babelOptions,
      filename: file,
    });
  } catch (error) {
    console.error(`Failed to compile ${rel}`);
    throw error;
  }

  if (!result?.code?.trim()) {
    continue;
  }

  const outPath = path.join(outDir, rel.replace(/\.tsx?$/, ".js"));
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, result.code);
  compiled += 1;
}

console.log(`Compiled ${compiled} files to dist/`);

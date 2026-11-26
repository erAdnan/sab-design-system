const path = require("path");

/** Web Storybook. Device Storybook uses `.rnstorybook`. */
module.exports = {
  stories: require("./storyGlobs"),

  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        // Reanimated + gorhom bottom-sheet ship worklets; Babel must transform them for web.
        modulesToTranspile: [
          "@sab-digital-bank/design-system",
          "react-native-svg-charts",
          "react-native-reanimated",
          "react-native-gesture-handler",
          "@gorhom/bottom-sheet",
        ],
        babelPlugins: [
          "@babel/plugin-transform-export-namespace-from",
          // Must be listed last among plugins that touch worklets.
          "react-native-reanimated/plugin",
        ],
        modulesToAlias: {
          "@sab-digital-bank/design-system": path.resolve(__dirname, "../src"),
        },
      },
    },
    "storybook-addon-deep-controls",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  // SAB brand assets + glyph fonts for web (SAR riyal symbol, etc.).
  staticDirs: [
    { from: "./static", to: "/" },
    { from: "../src/assets/fonts", to: "/fonts" },
  ],

  // Bakes package.json version into the static Hosting build (Release bumps it first).
  env: (config) => ({
    ...config,
    STORYBOOK_VERSION: require("./version").version,
  }),

  webpackFinal: async (config) => {
    const root = path.resolve(__dirname, "..");
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.join(root, "node_modules/react"),
      "react-dom": path.join(root, "node_modules/react-dom"),
      "@react-native-community/blur": path.resolve(__dirname, "./mocks/blur.js"),
      // No web build; index.js calls requireNativeComponent, which react-native-web does not provide.
      "react-native-linear-gradient": path.resolve(
        __dirname,
        "./mocks/linearGradient.js"
      ),
      "react-native-restart": path.resolve(__dirname, "./mocks/restart.js"),
      // Prefer the DOM implementation. The package "react-native" field points at native views.
      "react-native-svg$": path.join(
        root,
        "node_modules/react-native-svg/lib/module/ReactNativeSVG.web.js"
      ),
      // RN Web throws; gorhom bottom-sheet v4 still calls findNodeHandle.
      "react-native-web/dist/exports/findNodeHandle": path.resolve(
        __dirname,
        "./mocks/findNodeHandle.js"
      ),
      "react-native-web/dist/exports/findNodeHandle/index.js": path.resolve(
        __dirname,
        "./mocks/findNodeHandle.js"
      ),
    };

    excludeSvgFromAssetRules(config.module.rules);
    // Reanimated worklets break if the plugin is not last, or if babel.config.js
    // is merged after addon plugins (export-namespace / react-native-web).
    ensureReanimatedBabelLast(config.module.rules);
    config.module.rules.unshift({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [
                "module:@react-native/babel-preset",
                { useTransformReactJSXExperimental: true },
              ],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
        {
          loader: require.resolve("@svgr/webpack"),
          options: {
            // Same shape Metro's react-native-svg-transformer emits: a react-native-svg component.
            native: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      inlineStyles: { onlyMatchedOnce: false },
                      removeViewBox: false,
                      removeUnknownsAndDefaults: false,
                      convertColors: false,
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },

  // experimentalDocgenServer / experimentalReview need a live Storybook server.
  // Keep them off for static Firebase Hosting builds.
};

function excludeSvgFromAssetRules(rules) {
  if (!Array.isArray(rules)) return;
  for (const rule of rules) {
    if (!rule || typeof rule !== "object") continue;
    if (rule.test && rule.test.test && rule.test.test(".svg")) {
      rule.exclude = /\.svg$/;
    }
    excludeSvgFromAssetRules(rule.oneOf);
    excludeSvgFromAssetRules(rule.rules);
  }
}

function isReanimatedPlugin(plugin) {
  if (plugin === "react-native-reanimated/plugin") return true;
  if (Array.isArray(plugin) && plugin[0] === "react-native-reanimated/plugin") {
    return true;
  }
  if (typeof plugin === "string" && plugin.includes("react-native-reanimated/plugin")) {
    return true;
  }
  return false;
}

function ensureReanimatedBabelLast(rules) {
  if (!Array.isArray(rules)) return;
  for (const rule of rules) {
    if (!rule || typeof rule !== "object") continue;
    const options = rule.options;
    const isBabelLoader =
      rule.loader === "babel-loader" ||
      (typeof rule.loader === "string" && rule.loader.includes("babel-loader"));
    // Only the @storybook/addon-react-native-web rule (has plugins + custom include).
    if (
      isBabelLoader &&
      options &&
      Array.isArray(options.plugins) &&
      typeof rule.include === "function"
    ) {
      // Don't merge root babel.config.js — its reanimated plugin would run before
      // addon plugins and violate "reanimated must be last".
      options.babelrc = false;
      options.configFile = false;
      const plugins = options.plugins.filter((p) => !isReanimatedPlugin(p));
      plugins.push("react-native-reanimated/plugin");
      options.plugins = plugins;
    }
    ensureReanimatedBabelLast(rule.oneOf);
    ensureReanimatedBabelLast(rule.rules);
  }
}

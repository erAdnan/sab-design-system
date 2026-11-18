const path = require("path");

/** Web Storybook. Device Storybook uses `.rnstorybook`. */
module.exports = {
  stories: [
    "../stories/pulse-design-system/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/*.stories.@(ts|tsx|js|jsx)",
    "../stories/foundations/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Text/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Divider/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Button/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Header/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/List/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Stepper/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/NavigationDots/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/BottomNavigation/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/InputField/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Checkbox/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/RadioButton/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Toggle/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Range/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/Uploader/**/*.stories.@(ts|tsx|js|jsx)",
    "../stories/creditAccountFinance/**/*.stories.@(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: [
          "@sab-digital-bank/design-system",
          "react-native-svg-charts",
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
    };

    excludeSvgFromAssetRules(config.module.rules);
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

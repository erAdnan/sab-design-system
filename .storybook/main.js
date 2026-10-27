const path = require("path");

/** Web Storybook. Device Storybook uses `.rnstorybook`. */
module.exports = {
  stories: [
    "../stories/*.stories.@(ts|tsx|js|jsx)",
    "../stories/foundations/**/*.stories.@(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-webpack5-compiler-babel",
    "@storybook/addon-essentials",
    {
      name: "@storybook/addon-react-native-web",
      options: {
        modulesToTranspile: ["@sab-digital-bank/design-system"],
        modulesToAlias: {
          "@sab-digital-bank/design-system": path.resolve(__dirname, "../src"),
        },
      },
    },
    "storybook-addon-deep-controls",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },

  webpackFinal: async (config) => {
    const root = path.resolve(__dirname, "..");
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.join(root, "node_modules/react"),
      "react-dom": path.join(root, "node_modules/react-dom"),
      "@react-native-community/blur": path.resolve(__dirname, "./mocks/blur.js"),
    };
    return config;
  },
};

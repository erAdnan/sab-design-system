/** @type{import("@storybook/react-webpack5").StorybookConfig} */
module.exports = {
  stories: [
    "../stories/*.stories.@(ts|tsx|js|jsx)",
    "../stories/foundations/**/*.stories.@(ts|tsx|js|jsx)",
    "../src/**/*.stories.@(ts|tsx|js|jsx)",
  ],

  addons: ["@storybook/addon-essentials", "@storybook/addon-react-native-web"],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};

/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  stories: [
    "../stories/*.stories.?(ts|tsx|js|jsx)",
    "../stories/foundations/**/*.stories.?(ts|tsx|js|jsx)",
    "../src/**/*.stories.?(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-react-native-web",
    "storybook-addon-deep-controls",
  ],

  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
};

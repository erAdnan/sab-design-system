/** On-device Storybook. Web uses `.storybook`. */
module.exports = {
  stories: [
    "../stories/*.stories.@(ts|tsx|js|jsx)",
    "../stories/foundations/**/*.stories.@(ts|tsx|js|jsx)",
  ],

  addons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "storybook-addon-deep-controls",
  ],
};

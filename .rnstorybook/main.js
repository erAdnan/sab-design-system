/** On-device Storybook (iOS and Android). Web uses `.storybook`. */
module.exports = {
  // Same sections as web: Pulse Design System, component docs, foundations.
  stories: require("../.storybook/storyGlobs"),

  deviceAddons: [
    "@storybook/addon-ondevice-controls",
    "@storybook/addon-ondevice-actions",
    "storybook-addon-deep-controls",
  ],

  features: {
    experimentalReview: true
  }
};

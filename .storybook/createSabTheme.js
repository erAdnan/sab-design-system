const { create } = require("storybook/theming");
const brand = require("./sabBrand");

/**
 * Shared Pulse Storybook theme (manager chrome + docs).
 * @param {string} brandTitle
 * @param {{ brandImage?: string | null }} [options]
 */
function createSabTheme(brandTitle, options = {}) {
  return create({
    base: "light",

    brandTitle,
    brandUrl: "./",
    brandTarget: "_self",
    // Pulse logo lockup (mark + PULSE DESIGN). Version is injected beside it in manager.js.
    brandImage: options.brandImage ?? "./pulse-brand.png",

    colorPrimary: brand.sabRed,
    colorSecondary: brand.sabRed,

    appBg: brand.sabBgSubtle,
    appContentBg: brand.sabWhite,
    appPreviewBg: brand.sabWhite,
    appBorderColor: brand.sabBorder,
    appBorderRadius: 8,

    fontBase: brand.fontStack,
    fontCode:
      'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace',

    textColor: brand.sabBlack,
    textInverseColor: brand.sabWhite,
    textMutedColor: brand.sabGray,

    barTextColor: brand.sabGray,
    barSelectedColor: brand.sabRed,
    barHoverColor: brand.sabRedBright,
    barBg: brand.sabWhite,

    inputBg: brand.sabWhite,
    inputBorder: brand.sabGrayLight,
    inputTextColor: brand.sabBlack,
    inputBorderRadius: 8,

    buttonBg: brand.sabWhite,
    buttonBorder: brand.sabGrayLight,

    booleanBg: brand.sabBlockBg,
    booleanSelectedBg: brand.sabRed,
  });
}

module.exports = { createSabTheme, brand };

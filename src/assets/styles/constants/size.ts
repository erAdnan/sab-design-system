import {actuatedNormalize} from "../utils/pixelScaling";

const convertToString = (num : number) => String(actuatedNormalize(num));

// SPACINGS
// Figma (Spacing page) -> code token:
//   spacing.3XS 4 -> spacingXXS   | spacing.2XS 8  -> spacingXS  | spacing.XS 12 -> spacing1XS
//   spacing.S 16  -> spacingS     | spacing.M 24   -> spacingM   | spacing.L 32  -> spacingL
//   spacing.XL 40 -> spacing1XL   | spacing.2XL 48 -> spacingXL  | spacing.3XXL 64 -> spacingXXL
//   spacing.4XXL 72 -> spacing4XXL
// spacingXXXS (2), spacingSM (18), spacingML (28), spacingSubMenu (21) are code-only legacy values.
export const spacingXXXS = actuatedNormalize(2);
export const spacingXXS = actuatedNormalize(4);
export const spacingXS = actuatedNormalize(8);
export const spacing1XS = actuatedNormalize(12); // Figma spacing.XS
export const spacingS = actuatedNormalize(16);
export const spacingSM = actuatedNormalize(18);
export const spacingM = actuatedNormalize(24);
export const spacingML = actuatedNormalize(28);
export const spacingL = actuatedNormalize(32);
export const spacing1XL = actuatedNormalize(40); // Figma spacing.XL
export const spacingXL = actuatedNormalize(48); // Figma spacing.2XL
export const spacingXXL = actuatedNormalize(64);
export const spacing4XXL = actuatedNormalize(72);
export const spacingSubMenu = actuatedNormalize(21);

// RADIUS — Figma Border Radius page (69:6599) / Border radius frame
//   radius.XS 4 → radiusXS | radius.S 8 → radiusS | radius.M 12 → radiusM
//   radius.L 16 → radiusL | radius.XL 24 → radiusXL
export const radiusXS = actuatedNormalize(4);
export const radiusS = actuatedNormalize(8);
export const radiusM = actuatedNormalize(12);
export const radiusL = actuatedNormalize(16);
export const radiusXL = actuatedNormalize(24);

// STROKE (border width) — Figma Border Radius page / Border stroke frame
//   stroke.none 0 → strokeNone | stroke.XS 0.5 → strokeXS
//   stroke.S 1 → strokeS | stroke.M 2 → strokeM
export const strokeNone = 0;
export const strokeXS = 0.5;
export const strokeS = actuatedNormalize(1);
export const strokeM = actuatedNormalize(2);

// EFFECTS (backdrop blur) — Figma Effects page (3214:2708)
//   BackgroundBlurLight 4 | GlassBlurMedium 8 | GlassBlurRegular 40 | OverlayBlur 16
export const backgroundBlurLight = 4;
export const glassBlurMedium = 8;
export const glassBlurRegular = 40;
export const overlayBlur = 16;

// GRID — Figma Responsive Grid / Grid frame (4252:10829)
//   sab/mobile → 4 cols, 16 margin, 16 gutter
//   sab/tablet → 8 cols, 26 margin, 16 gutter
//   sab/tablet-large → 12 cols, 32 margin, 24 gutter
export const gridMobileColumns = 4;
export const gridMobileMargin = 16;
export const gridMobileGutter = 16;
export const gridTabletColumns = 8;
export const gridTabletMargin = 26;
export const gridTabletGutter = 16;
export const gridTabletLargeColumns = 12;
export const gridTabletLargeMargin = 32;
export const gridTabletLargeGutter = 24;

// AVATAR
export const avatarHeight = actuatedNormalize(48);
export const avatarRightandLeft = actuatedNormalize(150);

// FONT SIZE
export const fontXXSmall = actuatedNormalize(10);
export const fontXSmall = actuatedNormalize(11);
export const fontSmall = actuatedNormalize(12);
export const fontSmallMedium = actuatedNormalize(13);
export const fontMedium = actuatedNormalize(14);
export const fontMediumLarge = actuatedNormalize(15);
export const fontLarge = actuatedNormalize(17);
export const fontXLarge = actuatedNormalize(20);
export const fontXXLarge = actuatedNormalize(22);
export const fontLG = actuatedNormalize(24);
export const fontXLG = actuatedNormalize(26);
// Figma Typography (24:2) Font Size frame / variables:
//   fontSize-XXLG (variable "fontSize-XXLG 2") = 30 -> fontXXLG2
//   fontSize-3XLG = 34 -> font3XLG
// fontXXLG keeps legacy 34 because existing components depend on it.
export const fontXXLG = actuatedNormalize(34);
export const fontXXLG2 = actuatedNormalize(30);
export const font3XLG = fontXXLG;

// LINE HEIGHT
export const lineHeightXXSmall = actuatedNormalize(14);
export const lineHeightXSmall = actuatedNormalize(15);
export const lineHeightSmall = actuatedNormalize(16);
export const lineHeightSmallMedium = actuatedNormalize(17);
export const lineHeightMedium = actuatedNormalize(18);
export const lineHeightMediumLarge = actuatedNormalize(20);
export const lineHeightLarge = actuatedNormalize(22);
export const lineHeightXLarge = actuatedNormalize(25);
export const lineHeightXXLarge = actuatedNormalize(28);
export const lineHeightXLG = actuatedNormalize(32);
export const lineHeightXXLG = actuatedNormalize(41);

// Icon Sizes
export const iconXS = convertToString(16);
export const iconS = convertToString(24);
export const iconM = convertToString(48);
export const iconL = convertToString(64);
export const iconXL = convertToString(72);

// FONT WEIGHT
export const fontWeightLight = "200";
export const fontWeightRegular = "400";
export const fontWeightMedium = "500";
export const fontWeightBold = "700";
export const fontWeightNormal = "350";

// GLOBAL
export const sizeXL = actuatedNormalize(48);
export const sizeL = actuatedNormalize(44);

export const ragSizeMapping = {
  small: actuatedNormalize(16),
  medium: actuatedNormalize(24),
  large: actuatedNormalize(32),
  extralarge: actuatedNormalize(48)
};

export const badgeSizeMapping = {
  xs: actuatedNormalize(8),
  small: actuatedNormalize(16),
  large: actuatedNormalize(20)
};

export const pictogramSizeMapping = {
  large: actuatedNormalize(64)
};

export const widthXl = actuatedNormalize(48);
export const heightXl = actuatedNormalize(48);

export const widthL = actuatedNormalize(32);
export const heightL = actuatedNormalize(32);

export const widthM = actuatedNormalize(24);
export const heightM = actuatedNormalize(24);

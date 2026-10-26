import {actuatedNormalize} from "../utils/pixelScaling";

const convertToString = (num : number) => String(actuatedNormalize(num));

// SPACINGS
export const spacingXXXS = actuatedNormalize(2);
export const spacingXXS = actuatedNormalize(4);
export const spacingXS = actuatedNormalize(8);
export const spacing1XS = actuatedNormalize(12); // spacing spacing
export const spacingS = actuatedNormalize(16);
export const spacingSM = actuatedNormalize(18);
export const spacingM = actuatedNormalize(24);
export const spacingML = actuatedNormalize(28);
export const spacingL = actuatedNormalize(32);
export const spacingXL = actuatedNormalize(48);
export const spacingXXL = actuatedNormalize(64);
export const spacing4XXL = actuatedNormalize(72);
export const spacingSubMenu = actuatedNormalize(21);

// RADIUS
export const radiusXS = actuatedNormalize(4);
export const radiusS = actuatedNormalize(8);
export const radiusM = actuatedNormalize(12);
export const radiusL = actuatedNormalize(16);
export const radiusXL = actuatedNormalize(24);

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
export const fontXXLG = actuatedNormalize(34);
export const fontXXLG2 = actuatedNormalize(30);

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

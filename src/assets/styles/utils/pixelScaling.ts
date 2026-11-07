import { Dimensions, Platform, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/**
 * Mobile apps scale from a 375×812 design canvas.
 * On web (Storybook / react-native-web) the viewport is often a full desktop
 * window — using that width as the scale base inflates every token and causes
 * horizontal overflow. Keep web at 1:1 design pixels instead.
 */
const scale = Platform.OS === "web" ? 1 : SCREEN_WIDTH / 375;
const scaleVertical = Platform.OS === "web" ? 1 : SCREEN_HEIGHT / 812;

export function actuatedNormalize(size: number) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
}

export function actuatedNormalizeVertical(size: number) {
  const newSize = size * scaleVertical;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
  return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1;
}

export function isTab() {
  return SCREEN_WIDTH > 550;
}

import { Platform } from "react-native";
import { hasNativeSegmentedControlViewManager } from "./SABNativeSegmentedControl";

export {
  getSABNativeSegmentedControl,
  hasNativeSegmentedControlViewManager,
} from "./SABNativeSegmentedControl";
export type {
  SABNativeSegmentedControlProps,
  SABNativeSegmentedControlChangeEvent,
} from "./SABNativeSegmentedControl";

export function isNativeIOSSegmentedControlSupported(): boolean {
  if (Platform.OS !== "ios") {
    return false;
  }

  const iosMajor = parseInt(String(Platform.Version), 10);
  if (!Number.isFinite(iosMajor) || iosMajor < 26) {
    return false;
  }

  return hasNativeSegmentedControlViewManager();
}

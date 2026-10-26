import type { HostComponent, NativeSyntheticEvent, ViewProps } from "react-native";
import { Platform, UIManager, requireNativeComponent } from "react-native";

export const NATIVE_SEGMENTED_CONTROL_VIEW = "SABNativeSegmentedControl";

export type SABNativeSegmentedControlChangeEvent = NativeSyntheticEvent<{
  selectedIndex: number;
}>;

export type SABNativeSegmentedItem = {
  title: string;
  hasIcon?: boolean;
  disabled?: boolean;
};

export type SABNativeSegmentedControlProps = ViewProps & {
  items: SABNativeSegmentedItem[];
  selectedIndex?: number;
  colorScheme?: "light" | "dark" | "system";
  onChange?: (event: SABNativeSegmentedControlChangeEvent) => void;
};

let nativeComponent: HostComponent<SABNativeSegmentedControlProps> | null =
  null;

export function hasNativeSegmentedControlViewManager(): boolean {
  if (Platform.OS !== "ios") {
    return false;
  }

  try {
    return (
      UIManager.getViewManagerConfig(NATIVE_SEGMENTED_CONTROL_VIEW) != null
    );
  } catch {
    return false;
  }
}

export function getSABNativeSegmentedControl(): HostComponent<SABNativeSegmentedControlProps> | null {
  if (Platform.OS !== "ios") {
    return null;
  }

  if (nativeComponent) {
    return nativeComponent;
  }

  if (!hasNativeSegmentedControlViewManager()) {
    return null;
  }

  nativeComponent = requireNativeComponent<SABNativeSegmentedControlProps>(
    NATIVE_SEGMENTED_CONTROL_VIEW
  );
  return nativeComponent;
}

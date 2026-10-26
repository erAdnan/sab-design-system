import { NativeModules, Platform } from "react-native";

export {
  SABLiquidGlassView,
  SABLiquidGlassContainerView,
} from "./SABLiquidGlassNativeComponents";
export type {
  SABLiquidGlassViewProps,
  SABLiquidGlassContainerViewProps,
} from "./SABLiquidGlassNativeComponents";

type SABLiquidGlassModuleConstants = {
  isLiquidGlassSupported?: boolean | number;
};

function readNativeLiquidGlassSupported(): boolean | null {
  const mod = NativeModules.SABLiquidGlassModule as
    | (SABLiquidGlassModuleConstants & {
        getConstants?: () => SABLiquidGlassModuleConstants;
      })
    | undefined;

  if (!mod) {
    return null;
  }

  const value =
    mod.isLiquidGlassSupported ?? mod.getConstants?.()?.isLiquidGlassSupported;

  if (value === true || value === 1) {
    return true;
  }

  if (value === false || value === 0) {
    return false;
  }

  return null;
}

function isIOS26OrAbove(): boolean {
  if (Platform.OS !== "ios") {
    return false;
  }

  const iosMajor = parseInt(String(Platform.Version), 10);
  return Number.isFinite(iosMajor) && iosMajor >= 26;
}

/**
 * Runtime liquid-glass support check. Must NOT be evaluated at module import
 * time — NativeModules is not ready until the bridge / runtime has started.
 */
export function isSABLiquidGlassSupported(): boolean {
  if (!isIOS26OrAbove()) {
    return false;
  }

  const nativeSupported = readNativeLiquidGlassSupported();

  // Prefer native runtime check when the bridge module is linked.
  if (nativeSupported === true) {
    return true;
  }

  if (nativeSupported === false) {
    return false;
  }

  // Module not yet available (New Arch interop timing) — still attempt glass on iOS 26+.
  return true;
}

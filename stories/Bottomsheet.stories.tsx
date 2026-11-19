import * as allStories from "./Bottomsheet.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { fn } from "storybook/test";
import {
  SabBottomsheet,
  type BottomSheetRef,
} from "../src/components/bottomsheet/SabBottomsheet";
import { useTheme } from "../src/context/theme/themeContext";
import {
  MOBILE_CONTENT_WIDTH,
  MOBILE_FRAME_WIDTH,
  mobileFrameDecorators,
} from "../.storybook/mobileContentFrame";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import {
  fontLarge,
  fontMedium,
  pictogramSizeMapping,
  radiusM,
  spacingM,
  spacingS,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";
import { Button } from "../src/components/button/Button";
import { ButtonGroup } from "../src/components/button/ButtonGroup";
import SuccessPictogram from "../src/components/icons/pictogram/Success";
import WarningPictogram from "../src/components/icons/pictogram/Warning";
import ErrorPictogram from "../src/components/icons/pictogram/Error";

/** iPhone-class viewport height for the Storybook phone frame. */
const MOBILE_FRAME_HEIGHT = actuatedNormalize(812);
const PICTOGRAM_SIZE = pictogramSizeMapping.large;

/**
 * Storybook-only: clamp the modal portal to mobile width without touching SabBottomsheet.
 * RN-web often resolves the portal against the window; this centers a 375-wide host.
 */
const MobileWidthPortalContainer = ({
  children,
}: {
  children?: React.ReactNode;
}) => (
  <View style={styles.portalClamp} pointerEvents="box-none">
    <View style={styles.portalPhone} pointerEvents="box-none">
      {children}
    </View>
  </View>
);

// Inject clamp via gorhom defaultProps so SabBottomsheet stays unchanged.
const bottomSheetModalAny = BottomSheetModal as typeof BottomSheetModal & {
  defaultProps?: Record<string, unknown>;
};
bottomSheetModalAny.defaultProps = {
  ...(bottomSheetModalAny.defaultProps ?? {}),
  containerComponent: MobileWidthPortalContainer,
};

export default {
  title: "Components/Bottomsheet",
  component: SabBottomsheet,
  decorators: mobileFrameDecorators,
  tags: ["!autodocs"],
  args: {
    enablePanDownToClose: true,
    closeOnBackdropPress: true,
    dynamicHeight: true,
    scrollable: false,
    maxHeightRatio: 0.85,
    onClose: fn().mockName("onClose"),
  },
  argTypes: {
    enablePanDownToClose: { control: "boolean" },
    closeOnBackdropPress: { control: "boolean" },
    dynamicHeight: { control: "boolean" },
    scrollable: { control: "boolean" },
    maxHeightRatio: { control: { type: "range", min: 0.4, max: 0.95, step: 0.05 } },
  },
};

type StatusKind = "success" | "warning" | "error";

type DemoProps = {
  enablePanDownToClose?: boolean;
  closeOnBackdropPress?: boolean;
  dynamicHeight?: boolean;
  scrollable?: boolean;
  maxHeightRatio?: number;
  snapPoints?: (string | number)[];
  onClose?: () => void;
  status?: StatusKind;
  title?: string;
  subtitle?: string;
  actionLabel?: string;
  openLabel?: string;
};

const STATUS_ICON: Record<
  StatusKind,
  React.FC<{ width?: number; height?: number }>
> = {
  success: SuccessPictogram,
  warning: WarningPictogram,
  error: ErrorPictogram,
};

const BottomsheetDemo = ({
  enablePanDownToClose = true,
  closeOnBackdropPress = true,
  dynamicHeight = true,
  scrollable = false,
  maxHeightRatio = 0.85,
  snapPoints,
  onClose,
  status = "success",
  title = "Title",
  subtitle = "Subtitle content should be provided here",
  actionLabel = "Action",
  openLabel = "Open bottomsheet",
}: DemoProps) => {
  const sheetRef = useRef<BottomSheetRef>(null);
  const { theme } = useTheme();
  const StatusIcon = STATUS_ICON[status];

  return (
    <GestureHandlerRootView style={styles.phone}>
      <BottomSheetModalProvider>
        <View style={[styles.screen, { backgroundColor: theme.stylesblockbg }]}>
          <Button
            variant="fill"
            color="primary"
            size="large"
            buttonText={{ children: openLabel }}
            onButtonPress={() => sheetRef.current?.open()}
            overrideStyles={styles.openButton}
          />

          <SabBottomsheet
            ref={sheetRef}
            enablePanDownToClose={enablePanDownToClose}
            closeOnBackdropPress={closeOnBackdropPress}
            dynamicHeight={dynamicHeight}
            scrollable={scrollable}
            maxHeightRatio={maxHeightRatio}
            snapPoints={snapPoints}
            onClose={onClose}
            testID="bottomsheet"
          >
            {/* Figma status bottomsheet: icon → title → subtitle → full-width (mobile) action */}
            <View style={styles.sheetBody}>
              <StatusIcon width={PICTOGRAM_SIZE} height={PICTOGRAM_SIZE} />
              <View style={styles.copy}>
                <Text
                  bold
                  size={fontLarge}
                  variant="primarytextcolor"
                  overrideStyles={styles.centeredText}
                >
                  {title}
                </Text>
                <Text
                  size={fontMedium}
                  variant="primarytextcolor2"
                  overrideStyles={styles.centeredText}
                >
                  {subtitle}
                </Text>
              </View>
              <View style={styles.actions}>
                <ButtonGroup
                  type="stacked"
                  overrideStyles={styles.actionGroup}
                  primaryButton={{
                    variant: "fill",
                    color: "primary",
                    size: "large",
                    buttonText: { children: actionLabel },
                    onButtonPress: () => sheetRef.current?.close(),
                    // Explicit px — RN-web often resolves width:"100%" against the window.
                    overrideStyles: styles.actionButton,
                  }}
                />
              </View>
            </View>
          </SabBottomsheet>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

/** Figma Bottomsheet — Success */
export const Success = {
  args: {
    status: "success" as StatusKind,
  },
  render: (args: DemoProps) => <BottomsheetDemo {...args} status="success" />,
};

/** Figma Bottomsheet — Warning */
export const Warning = {
  args: {
    status: "warning" as StatusKind,
  },
  render: (args: DemoProps) => <BottomsheetDemo {...args} status="warning" />,
};

/** Figma Bottomsheet — Error */
export const Error = {
  args: {
    status: "error" as StatusKind,
  },
  render: (args: DemoProps) => <BottomsheetDemo {...args} status="error" />,
};

/** Fixed snap point (non-dynamic) */
export const FixedSnapPoint = {
  name: "Fixed snap point",
  args: {
    dynamicHeight: false,
    snapPoints: ["50%"],
    status: "success" as StatusKind,
    openLabel: "Open 50% sheet",
  },
  render: (args: DemoProps) => (
    <BottomsheetDemo {...args} status={args.status ?? "success"} />
  ),
};

/** Scrollable body with tall content */
export const Scrollable = {
  args: {
    scrollable: true,
    dynamicHeight: false,
    maxHeightRatio: 0.7,
    status: "warning" as StatusKind,
    openLabel: "Open scrollable sheet",
    subtitle:
      "Subtitle content should be provided here. Extra lines below exercise scroll behaviour inside the sheet.",
  },
  render: (args: DemoProps) => (
    <BottomsheetDemo
      {...args}
      status={args.status ?? "warning"}
      subtitle={
        args.subtitle ??
        Array.from({ length: 12 }, (_, i) => `Content block ${i + 1}.`).join(
          " "
        )
      }
    />
  ),
};

export const AllVariants = createAllVariantsStory(
  allStories,
  ["Success", "Warning", "Error"],
  {
    maxWidth: MOBILE_FRAME_WIDTH,
    exclude: ["FixedSnapPoint", "Scrollable"],
    gap: actuatedNormalize(32),
  }
);

const styles = StyleSheet.create({
  phone: {
    width: MOBILE_FRAME_WIDTH,
    height: MOBILE_FRAME_HEIGHT,
    maxWidth: "100%",
    position: "relative",
    overflow: "hidden",
  },
  screen: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: spacingM,
  },
  openButton: {
    width: MOBILE_CONTENT_WIDTH,
    maxWidth: "100%",
    borderRadius: radiusM,
  },
  portalClamp: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  portalPhone: {
    width: MOBILE_FRAME_WIDTH,
    maxWidth: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
  sheetBody: {
    width: MOBILE_CONTENT_WIDTH,
    maxWidth: "100%",
    alignSelf: "center",
    alignItems: "center",
    gap: spacingM,
    paddingTop: spacingXS,
    paddingBottom: spacingS,
  },
  copy: {
    width: "100%",
    alignItems: "center",
    gap: spacingXS,
  },
  centeredText: {
    textAlign: "center",
    width: "100%",
  },
  actions: {
    width: MOBILE_CONTENT_WIDTH,
    maxWidth: "100%",
    alignSelf: "center",
    marginTop: spacingXS,
  },
  actionGroup: {
    width: MOBILE_CONTENT_WIDTH,
    maxWidth: "100%",
  },
  actionButton: {
    width: MOBILE_CONTENT_WIDTH,
    maxWidth: "100%",
  },
});

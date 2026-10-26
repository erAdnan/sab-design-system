import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import {
  fontSmall,
  fontSmallMedium,
  lineHeightSmall,
  lineHeightSmallMedium,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import CancelFilled from "../../assets/svgs/light/filled/cancel.svg";
import OutlineRefresh from "../../assets/svgs/light/arrows/outline_refresh.svg";

const ICON_SIZE = actuatedNormalize(24);

export interface ErrorStateIndicatorProps {
  /** Error message shown next to the cancel icon */
  message?: string;
  /** Label for the retry action */
  actionLabel?: string;
  /** Called when the retry action is pressed */
  onTryAgain?: () => void;
  /** When false, hides the retry action. Default is true */
  showAction?: boolean;
  /** Optional styles to override the container */
  overrideStyles?: any;
  /** Boolean for showing the skeleton */
  loading?: boolean;
}

/**
 * Inline error banner with a retry action.
 * @property message - Error message shown next to the cancel icon
 * @property actionLabel - Label for the retry action
 * @property onTryAgain - Called when the retry action is pressed
 * @property showAction - When false, hides the retry action. Default is true
 * @property overrideStyles - Optional styles to override the container
 * @property loading - Boolean for showing the skeleton
 */
export const ErrorStateIndicator: FC<ErrorStateIndicatorProps> = ({
  message = "Couldn't load.",
  actionLabel = "Try Again",
  onTryAgain,
  showAction = true,
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: theme.stylesblockbg },
          overrideStyles,
        ]}
      >
        <SkeletonBox shape="circle" size="small" />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.skeletonMessage}
        />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={styles.skeletonAction}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.ragcolor3tint },
        overrideStyles,
      ]}
    >
      <View style={styles.messageRow}>
        <CancelFilled width={ICON_SIZE} height={ICON_SIZE} />
        <Text
          size={fontSmall}
          variant="primarytextcolor"
          overrideStyles={styles.message}
        >
          {message}
        </Text>
      </View>

      {showAction && (
        <Button
          variant="link"
          size="small"
          linkIconLeft
          leftIcon={
            <OutlineRefresh
              width={ICON_SIZE}
              height={ICON_SIZE}
              fill={theme.primarycolor3static}
            />
          }
          buttonText={{
            children: actionLabel,
            variant: "primarycolor3static",
            size: fontSmallMedium,
            overrideStyles: styles.actionText,
          }}
          onButtonPress={() => onTryAgain?.()}
          overrideStyles={styles.actionButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: actuatedNormalize(48),
    flexDirection: "row",
    alignItems: "center",
    gap: spacingS,
    paddingHorizontal: spacingS,
    paddingVertical: spacing1XS,
    borderRadius: radiusS,
  },
  messageRow: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  message: {
    flexShrink: 1,
    lineHeight: lineHeightSmall,
  },
  actionButton: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: 0,
    height: ICON_SIZE,
    gap: spacingXXS,
  },
  actionText: {
    lineHeight: lineHeightSmallMedium,
  },
  skeletonMessage: {
    flex: 1,
  },
  skeletonAction: {
    width: actuatedNormalize(80),
  },
});

export default ErrorStateIndicator;

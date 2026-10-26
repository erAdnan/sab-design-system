import React, { FC, ReactElement } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontSmallMedium,
  fontMediumLarge,
  lineHeightSmallMedium,
  spacingXS,
  spacingS,
} from "../../assets/styles/constants/size";

export interface TransferBeneficiaryProps {
  initials: string;
  name: string;
  statusIcon?: ReactElement;
  onPress?: () => void;
  loading?: boolean;
  overrideStyles?: ViewStyle;
  accessibilityLabel?: string;
}

/**
 * Transfer-specific beneficiary chip (avatar + bank badge + name).
 * Sized to Figma: 80 min-width column, 48 circle, 24 status icon.
 */
export const TransferBeneficiary: FC<TransferBeneficiaryProps> = ({
  initials,
  name,
  statusIcon,
  onPress,
  loading = false,
  overrideStyles,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      minWidth: actuatedNormalize(80),
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXS,
    },
    avatarWrapper: {
      position: "relative",
      width: actuatedNormalize(48),
      height: actuatedNormalize(48),
    },
    circle: {
      display: "flex",
      width: actuatedNormalize(48),
      height: actuatedNormalize(48),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: actuatedNormalize(100),
      borderWidth: 1,
      borderColor: theme.primarygray,
      backgroundColor: theme.primarywhite,
    },
    statusIcon: {
      position: "absolute",
      right: actuatedNormalize(-7),
      bottom: actuatedNormalize(-7),
      display: "flex",
      width: actuatedNormalize(24),
      height: actuatedNormalize(24),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: actuatedNormalize(100),
      backgroundColor: theme.primarywhite,
      overflow: "hidden",
    },
    name: {
      textAlign: "center",
      lineHeight: lineHeightSmallMedium,
      maxWidth: actuatedNormalize(80),
    },
  });

  if (loading) {
    return (
      <View style={[styles.container, overrideStyles]}>
        <SkeletonBox shape="circle" size="medium" />
        <SkeletonBox
          shape="line"
          size="small"
          overrideStyles={{ width: actuatedNormalize(56) }}
        />
      </View>
    );
  }

  const content = (
    <View style={{ gap: spacingS }}>
      <View style={styles.avatarWrapper}>
        <View style={styles.circle}>
          <Text
            size={fontMediumLarge}
            variant="primarycolor3"
            numberOfLines={1}
          >
            {initials.slice(0, 2).toUpperCase()}
          </Text>
        </View>
        {statusIcon ? <View style={styles.statusIcon}>{statusIcon}</View> : null}
      </View>
      <Text
        size={fontSmallMedium}
        variant="primarytextcolor"
        numberOfLines={1}
        overrideStyles={styles.name}
      >
        {name}
      </Text>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[styles.container, overrideStyles]}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel ?? name}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return <View style={[styles.container, overrideStyles]}>{content}</View>;
};

export default TransferBeneficiary;

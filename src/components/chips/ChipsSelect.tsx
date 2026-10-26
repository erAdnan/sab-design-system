import React, { FC, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Badge, BadgeProps } from "../badge/Badge";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import {
  fontMedium,
  lineHeightMedium,
  radiusS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface ChipsSelectProps extends AutomationProps {
  onSelect?: (selected: boolean) => void;
  showBadge?: boolean;
  badgeProps?: BadgeProps;
  label: string;
  loading?: boolean;
  isSelected?: boolean;
}

/**
 * @property onSelect - Optional callback for handling select/unselect of the chips. Called with true when selected, and false when not selected
 * @property showBadge -Boolean to show/hide badge
 * @property badgeProps - Configure badge type, size and number
 * @property label - Text to show inside chips
 * @property loading - Boolean to show/hide loading state
 * @property isSelected - Optional boolean for controlled selection (for external state management)
 */

export const ChipsSelect: FC<ChipsSelectProps> = ({
  onSelect,
  showBadge,
  badgeProps,
  label,
  loading = false,
  isSelected: isSelectedProp,
  testID,
  accessibilityLabel,
}) => {
  const [internalSelected, setInternalSelected] = useState(false);

  const { theme } = useTheme();

  // Use external state if provided, otherwise fallback to internal
  const isSelected = isSelectedProp ?? internalSelected;


  const handleSelect = () => {
    const newValue = !isSelected;
    onSelect?.(newValue);
    if (isSelectedProp === undefined) {
      setInternalSelected(newValue);
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: actuatedNormalize(7),
      paddingHorizontal: actuatedNormalize(16),
      backgroundColor: isSelected ? theme.primarycolor : theme.stylesblockbg,
      borderRadius: radiusS,
      alignSelf: "flex-start",
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
  });
  return loading ? (
    <View>
      <SkeletonBox shape="square" size="medium" overrideStyles={{ width: actuatedNormalize(120) }} />
    </View>
  ) : (
    <TouchableOpacity
      onPress={handleSelect}
      style={styles.container}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      <Text
        size={fontMedium}
        variant={isSelected ? "primarytextcolor4" : "primarytextcolor"}
        overrideStyles={{lineHeight:lineHeightMedium}}
      >
        {label}
      </Text>
      {showBadge && badgeProps && <Badge {...badgeProps} />}
    </TouchableOpacity>
  );
};

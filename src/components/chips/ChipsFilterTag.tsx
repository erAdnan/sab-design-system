import React, { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  lineHeightMedium,
  radiusS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { NewCurrency } from "../text/NewCurrency";
import AddBare from "../icons/functionals/AddBare";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface ChipsFilterTagProps extends AutomationProps {
  onPress?: () => void;
  label: string;
  rightIcon?: boolean;
  leftIcon?: boolean;
  leftIconComponent?: ReactNode;
  rightIconComponent?: ReactNode;
  loading?: boolean;
}

/**
 * @property label - Text to show inside chips
 * @property loading - Loading state of the chips
 * @property leftIcon - Toggle to show left icon in Storybook
 * @property rightIcon - Toggle to show right icon in Storybook
 * @property leftIconComponent - Custom left icon component
 * @property rightIconComponent - Custom right icon component
 */

export const ChipsFilterTag: FC<ChipsFilterTagProps> = ({
  onPress,
  label,
  rightIcon,
  leftIcon,
  leftIconComponent,
  rightIconComponent,
  loading = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: actuatedNormalize(7),
      paddingHorizontal: actuatedNormalize(8),
      backgroundColor: theme.ragneutraltint,
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
      <SkeletonBox
        shape="square"
        size="medium"
        overrideStyles={{ width: actuatedNormalize(140) }}
      />
    </View>
  ) : (
    <View
      style={styles.container}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      {leftIcon &&
        (leftIconComponent || <AddBare fill={theme.primarycolorstatic} />)}
      <NewCurrency
        textstyle={{ lineHeight: lineHeightMedium }}
        text={label}
        size={fontMedium}
        variant="primarycolorstatic"
      />
      {rightIcon &&
        (rightIconComponent || <AddBare fill={theme.primarycolorstatic} />)}
    </View>
  );
};

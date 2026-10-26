import {FC, ReactElement} from "react";
import {I18nManager, Platform, StyleSheet} from "react-native";
import {Button} from "../button/Button";
import {
  fontMedium,
  fontWeightRegular,
  lineHeightMedium,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import {actuatedNormalize} from "../../assets/styles/utils/pixelScaling";
import {AutomationProps} from "../automationProps";

/** Figma 6309:51740 — icon and text-only tabs share this height. */
const TAB_HEIGHT = actuatedNormalize(36);

export interface BaseTabProps extends AutomationProps {
  label: string;
  onButtonPress?: () => void;
  setActive?: (id: number) => void;
  id: number;
  isActive?: boolean;
}

export interface TabProps extends BaseTabProps {
  subItems?: BaseTabProps[];
  icon?: ReactElement;
}

/**
 * Pill tab. Height stays 36px whether or not an icon is passed
 * (Button would otherwise size icons to 24px and grow the row).
 */
export const Tab: FC<TabProps> = ({
  label,
  icon,
  onButtonPress = () => {},
  setActive,
  id,
  isActive = false,
  testID,
  accessibilityLabel,
}) => {
  const handlePress = () => {
    if (isActive) {
      return;
    }
    setActive?.(id);
    onButtonPress();
  };

  return (
    <Button
      variant={isActive ? "fill" : "tab"}
      color="secondary"
      icon={icon}
      buttonText={{
        children: label,
        size: fontMedium,
        bold: false,
        overrideStyles: [
          styles.label,
          Platform.OS === "android" && styles.androidLabel,
          I18nManager.isRTL && styles.rtlLabel,
        ],
      }}
      onButtonPress={handlePress}
      overrideStyles={styles.pill}
      testID={testID}
      accessibilityLabel={accessibilityLabel ?? label}
    />
  );
};

const styles = StyleSheet.create({
  pill: {
    minWidth: "auto",
    width: "auto",
    height: TAB_HEIGHT,
    paddingVertical: 0,
    paddingHorizontal: spacingS,
    gap: spacingXXS,
    flexWrap: "nowrap",
    overflow: "hidden",
  },
  label: {
    fontWeight: fontWeightRegular,
    fontFamily: fonts.HSBC,
    lineHeight: lineHeightMedium,
  },
  androidLabel: {
    includeFontPadding: false,
  },
  rtlLabel: {
    paddingBottom: actuatedNormalize(3),
  },
});

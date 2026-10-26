import { FC, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { sizeXL } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { QuickActionButton, QuickActionButtonProps } from "./QuickActionButton";
import { AutomationProps, getAutomationProps } from "../automationProps";

const ICON_TO_ICON_GAP = actuatedNormalize(22);
const DEFAULT_VERTICAL_TEXT_WIDTH = actuatedNormalize(65);
interface QuickActionButtonPatternProps extends AutomationProps {
  type: 1 | 2 | 3 | 4;
  quickActionButton1: QuickActionButtonProps;
  quickActionButton2?: QuickActionButtonProps;
  quickActionButton3?: QuickActionButtonProps;
  quickActionButton4?: QuickActionButtonProps;
  loading?: boolean;
}

/**
 * Quick Action Button Component
 * @property type - Determines the layout of the button (Accepts 1, 2, 3, 4)
 * @property quickActionButton1 - The first quick action button. Accepts type, text, icon, onButtonPress, badgeProps
 * @property quickActionButton2 - (Optional) The second quick action button. Accepts type, text, icon, onButtonPress, badgeProps
 * @property quickActionButton3 - (Optional) The third quick action button. Accepts type, text, icon, onButtonPress, badgeProps
 * @property quickActionButton4 - (Optional) The fourth quick action button. Accepts type, text, icon, onButtonPress, badgeProps
 * @property loading - boolean for showing the skeleton
 */
export const QuickActionButtonPattern: FC<QuickActionButtonPatternProps> = ({
  type,
  quickActionButton1,
  quickActionButton2,
  quickActionButton3,
  quickActionButton4,
  loading = false,
  testID,
  accessibilityLabel,
}) => {
  const items = useMemo((): QuickActionButtonProps[] => {
    const list: QuickActionButtonProps[] = [quickActionButton1];
    if (type > 1 && quickActionButton2) {
      list.push({ ...quickActionButton2, type: "vertical" });
    }
    if (type > 2 && quickActionButton3) {
      list.push({ ...quickActionButton3, type: "vertical" });
    }
    if (type > 3 && quickActionButton4) {
      list.push({ ...quickActionButton4, type: "vertical" });
    }
    return list;
  }, [
    type,
    quickActionButton1,
    quickActionButton2,
    quickActionButton3,
    quickActionButton4,
  ]);

  const columnWidth = useMemo(() => {
    return Math.max(
      sizeXL,
      ...items.map((b) => b.verticalTextWidth ?? DEFAULT_VERTICAL_TEXT_WIDTH),
    );
  }, [items]);

  const spacingBetweenColumns = useMemo(
    () => ICON_TO_ICON_GAP + sizeXL - columnWidth,
    [columnWidth],
  );

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
      alignSelf: "stretch",
    },
    column: {
      width: columnWidth,
      alignItems: "center",
      flexShrink: 0,
    },
  });

  return (
    <View
      style={styles.container}
      {...getAutomationProps(testID, accessibilityLabel, "quick-actions")}
    >
      {items.map((props, index) => (
        <View
          key={index}
          style={[
            styles.column,
            index > 0 ? { marginLeft: spacingBetweenColumns } : undefined,
          ]}
        >
          <QuickActionButton
            {...props}
            verticalTextWidth={columnWidth}
            loading={loading}
            testID={props.testID ?? (testID ? `${testID}-${index + 1}` : undefined)}
            accessibilityLabel={
              props.accessibilityLabel ??
              (accessibilityLabel ? `${accessibilityLabel}-${index + 1}` : props.text)
            }
          />
        </View>
      ))}
    </View>
  );
};

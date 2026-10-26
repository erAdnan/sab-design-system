import { FC, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import Remove from "../icons/functionals/Remove";
import AddCircle from "../icons/functionals/AddCircle";
import { spacingXS, spacingXXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import AddBare from "../icons/functionals/AddBare";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";

export interface QuickActionButtonProps extends AutomationProps {
  value: number;
  onButtonPress: (number: number) => void;
  overrideStyles?: any;
  onMinusPress?: () => void;
  onAddPress?: () => void;
  maxLimit?: number;
  withBorder?: boolean;
}

/**
 * QuantityButtonGroup component
 * @property {number} value - initial value, optional
 * @property {(number) => void} onButtonPress - on button press function, optional
 * @property {any} overrideStyles - override styles, optional
 * @property {() => void} onMinusPress - callback triggered when the minus button is pressed, optional
 * @property {() => void} onAddPress - callback triggered when the add button is pressed, optional
 * @property {number} maxLimit - maximum limit for add, optional
 */
export const QuantityButtonGroup: FC<QuickActionButtonProps> = ({
  value = 0,
  onButtonPress,
  overrideStyles,
  onMinusPress,
  onAddPress,
  maxLimit = 10,
  withBorder=false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const [quantity, setQuantity] = useState(value);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const handleButtonPress = (value: number) => {
    const newValue = value <= 0 ? 0 : value;

    setQuantity(newValue);
    setInitialLoad(false);
    onButtonPress(newValue);
  };

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    btnGeneral: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: spacingXS,
    },
  });

  return (
    <View
      style={[styles.container, overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel, "quantity")}
    >
      <TouchableOpacity
        onPress={() =>
          onMinusPress ? onMinusPress() : handleButtonPress(quantity - 1)
        }
        style={styles.btnGeneral}
        disabled={quantity === 1}
        {...getNestedAutomationProps(
          { testID, accessibilityLabel },
          "minus",
          "minus"
        )}
      >
        <View
          style={[
            withBorder
              ? {
                backgroundColor: theme.inverttransparent,
                borderRadius: actuatedNormalize(50),
                }
              : {
                  backgroundColor: theme.inverttransparent,
                  borderRadius: actuatedNormalize(50),
                },
          ]}
        >
          <Remove fill={theme.primarycolor3}/>
        </View>
      </TouchableOpacity>
      <Text
        bold
        variant={initialLoad ? "primarycolor2_100" : "primarytextcolor"}
        overrideStyles={{ width: actuatedNormalize(30), textAlign: "center" }}
      >
        {quantity.toString()}
      </Text>
      <TouchableOpacity
        onPress={() =>
          onAddPress ? onAddPress() : handleButtonPress(quantity + 1)
        }
        style={styles.btnGeneral}
        disabled={quantity === maxLimit}
        {...getNestedAutomationProps(
          { testID, accessibilityLabel },
          "plus",
          "plus"
        )}
      >
        <View
          style={[
            withBorder
              ? {
                backgroundColor: theme.inverttransparent,
                  borderRadius: actuatedNormalize(50),
                  borderColor: theme.primarycolor3,
                  borderWidth: 1,
                }
              : {
                  backgroundColor: theme.inverttransparent,
                  borderRadius: actuatedNormalize(50),
                },
          ]}
        >
           <AddBare fill={theme.primarycolor3} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

import { FC, useCallback, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import Remove from "../icons/functionals/Remove";
import AddCircle from "../icons/functionals/AddCircle";
import { radiusS, radiusXS, spacingXS, spacingXXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import AddBare from "../icons/functionals/AddBare";
import { darkTheme } from "../../assets/styles/theme/dark";

export interface ButtonGroupReviewQuantityAddonProps {
    value?: number;
    onButtonPress: (number: number) => void;
    overrideStyles?: any;
    onAdd?: () => void;
    onMinus?: () => void;
    mainColor?: string;
    bgColor?: string;
    textColor?: string;

}

/**
 * QuantityButtonGroup component
 * @property {number} value - initial value, optional
 * @property {(number) => void} onButtonPress - on button press function, optional
 * @property {any} overrideStyles - override styles, optional
 */
export const ButtonGroupReviewQuantityAddon: FC<ButtonGroupReviewQuantityAddonProps> = ({
    value = 0,
    onButtonPress,
    overrideStyles,
    onAdd,
    onMinus,
    mainColor,
  bgColor,
    textColor
}) => {
    const { theme } = useTheme();

    const [internalQuantity, setInternalQuantity] = useState(value || 0);

  const isControlled = typeof value === "number";
  const quantity = isControlled ? value! : internalQuantity;

  // --- reusable safe updater
  const updateQuantity = useCallback(
    (newValue: number) => {
      const safeValue = Math.max(0, newValue);

      if (!isControlled) {
        setInternalQuantity(safeValue);
      }

      onButtonPress?.(safeValue);
    },
    [isControlled, onButtonPress]
  );

  // --- handlers memoized
  const handleAdd = useCallback(() => {
    if (onAdd) return onAdd(); // controlled
    updateQuantity(quantity + 1);
  }, [quantity, updateQuantity, onAdd]);

  const handleMinus = useCallback(() => {
    if (onMinus) return onMinus(); // controlled
    updateQuantity(quantity - 1);
  }, [quantity, updateQuantity, onMinus]);

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: spacingXS
        },
        btnGeneral: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: actuatedNormalize(24),
            width: actuatedNormalize(24),
            borderRadius: actuatedNormalize(48),
            borderColor: mainColor || theme.primarycolor4static,
            borderWidth: 1    
      },
      valueWrapper: {
          height: actuatedNormalize(40),
          width: actuatedNormalize(40),
          borderRadius: radiusXS,
          backgroundColor: bgColor || darkTheme.primarycolor2,
          display: "flex",
          justifyContent: "center",
           alignItems: "center",
        }
    });


    return (
        <View style={[styles.container, overrideStyles]}>
            <TouchableOpacity
              onPress={handleMinus}
            style={{
              ...styles.btnGeneral,
              backgroundColor: quantity ? 'transparent' : (bgColor || darkTheme.primarycolor2),
              borderWidth: quantity ? 1 : 0
            }}
               disabled={quantity <= 0}
            >
              <Remove fill={mainColor || theme.primarycolor4static}/>    
        </TouchableOpacity>
        <View style={styles.valueWrapper}>
          <Text bold variant={textColor || "primarycolor4static"} overrideStyles={{ width: actuatedNormalize(30), textAlign: "center" }}>{quantity.toString()}</Text>
        </View>    
       <TouchableOpacity
          onPress={handleAdd}
          style={styles.btnGeneral}
        >
          <AddBare fill={mainColor || theme.primarycolor4static}/>
        </TouchableOpacity>
      </View>
    );
};
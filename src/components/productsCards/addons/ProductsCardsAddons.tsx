import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, ReactElement, useMemo } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import Share from "../../icons/functionals/Share";
import {
  fontMedium,
  lineHeightMedium,
  spacingS,
  spacingXS,
  spacingXXXS,
} from "../../../assets/styles/constants/size";
import { Rag, RagIconType, RagProps } from "../../rag/Rag";
import { SarFont } from "../../sarFont/SarFont";
import { Text } from "../../text/Text";
import { QuantityButtonGroup } from "../../button/QuantityButtonGroup";
import Delete from "../../icons/functionals/Delete";

export interface ProductsCardsAddonProps {
  type: "share" | "amount" | "delete" | "quantity" | "confirmation-status" | "empty";
  onButtonPress: (val: number | undefined) => void;
  onButtonPressDelete?: (val: number) => void;
  id?: number;
  component?: ReactElement;
  amount?: number;
  quantity?: number;
  overrideStyles?: any;
  ragProps?: RagProps;
  onMinusPress?: () => void;
  onAddPress?: () => void;
  maxLimit?: number;
}

/**
 * ProductsCardsAddons component
 * @property {"share" | "amount" | "delete" | "quantity" | "confirmation-status" | "empty"} type - type of the addon
 * @property {(number) => void} onButtonPress - on button press function, optional
 * @property {(number) => void} onButtonPressDelete - on button press delete function, optional
 * @property {number} id - id, optional
 * @property {number} amount - amount, optional
 * @property {number} quantity - quantity, optional
 * @property {any} overrideStyles - override styles, optional
 */
export const ProductsCardsAddons: FC<ProductsCardsAddonProps> = ({
  type,
  onButtonPress,
  onButtonPressDelete = () => {},
  id = 0,
  amount = 0,
  quantity = 0,
  overrideStyles,
  ragProps,
  onMinusPress,
  onAddPress,
  maxLimit,
}) => {
  const { theme, isDarkTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginRight: spacingS,
    },
    amountContainer: {
      display: "flex",
      flexDirection: I18nManager.isRTL? "row-reverse":"row",
      gap: spacingXXXS,
      alignItems:"center",
    },
    deleteQuantityContainer: {
      marginRight: 0,
    },
    deleteContainer: {
      alignSelf: "flex-end",
      marginRight: spacingXS,
    },
  });

  const getComponent = useMemo(() => {
    switch (type) {
      case "share":
        return (
          <View style={[styles.container, overrideStyles]}>
            <TouchableOpacity onPress={() => onButtonPress(undefined)}>
              <Share fill={theme.primarycolor3} />
            </TouchableOpacity>
          </View>
        );
      case "amount":
        return (
          <View
            style={[styles.container, styles.amountContainer, overrideStyles]}
          >
            <SarFont size={fontMedium} lineHeight={lineHeightMedium} />
            <Text bold size={fontMedium} overrideStyles={{lineHeight:lineHeightMedium }}>
              {amount.toString()}
            </Text>
          </View>
        );
      case "quantity":
        return (
          <View style={[styles.container, overrideStyles]}>
            <QuantityButtonGroup
              value={quantity}
              onButtonPress={onButtonPress}
              onAddPress={onAddPress}
              onMinusPress={onMinusPress}
              maxLimit={maxLimit}
            />
          </View>
        );
      case "delete":
        return (
          <View
            style={[
              styles.container,
              styles.deleteQuantityContainer,
              overrideStyles,
            ]}
          >
            <View style={styles.deleteContainer}>
              <TouchableOpacity onPress={() => onButtonPressDelete(id)}>
                <Delete fill={theme.primarycolor3} />
              </TouchableOpacity>
            </View>
          </View>
        );
      case "confirmation-status":
        return (
          <View style={[styles.container, overrideStyles]}>
            <Rag type={RagIconType.success}  {...ragProps} />
          </View>
        );
      case "empty":
        return <></>;
    }
  }, [type, isDarkTheme, overrideStyles]);

  return getComponent;
};

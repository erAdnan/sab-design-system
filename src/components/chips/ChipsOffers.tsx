import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontSmall,
  radiusXS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import LoyaltyOffers from "../icons/banking/LoyaltyOffers";

export interface ChipsOffersProps {
  type?: "right" | "left" | "centered" | "new";
  label: string;
  newChip?: boolean
  loading?: boolean;
  overrideStyles?: any;
  overrideLabelStyles?: any;
  iconColor?: string;
}

/**
 * @property type - Changes the chips border radius
 * @property label - Text to be displayed inside chips
 * @property loading - Loading state of the chips
 */

export const ChipsOffers: FC<ChipsOffersProps> = ({
  type = "centered",
  label = "Label",
  loading = false,
  overrideStyles,
  overrideLabelStyles,
  iconColor
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXXS,
      alignSelf: "flex-start",
      paddingTop: actuatedNormalize(2),
      paddingBottom: actuatedNormalize(2),
      backgroundColor: theme.stylesblockbg
    },
    defaultPadding: {
      paddingLeft: spacingXXS,
      paddingRight: spacingXXS,
    },
    centered: {
      borderRadius: radiusXS,
    },
    new: {
      borderRadius: actuatedNormalize(100),
      backgroundColor: theme.primarycolor3static,
      paddingHorizontal: spacingXS,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    left: {
      borderTopLeftRadius: radiusXS,
      borderBottomLeftRadius: radiusXS,
    },
    right: {
      borderTopRightRadius: radiusXS,
      borderBottomRightRadius: radiusXS,
    },
  });

  return loading ? (
    <SkeletonBox
      shape="line"
      size="small"
      overrideStyles={{ width: actuatedNormalize(type === 'new' ? 48 : 72), height: actuatedNormalize(24) }}
    />
  ) : (
    <View
      style={[
        styles.container,
        type !== "new" && styles.defaultPadding, 
        styles[type],
        overrideStyles,
      ]}
      >
        {type !== "new" && <LoyaltyOffers fill={iconColor || theme.primarycolor3} />}
      <Text
          variant="primarytextcolor"
          size={fontSmall}
          overrideStyles={overrideLabelStyles}
      >
        {label}
      </Text>
    </View>
  );
};
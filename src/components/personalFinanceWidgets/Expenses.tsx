import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontXXLG,
  lineHeightXXLG,
  radiusS,
  spacingS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import ImageThumbnail from "../imageThumbnail/ImageThumbnail";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import Ellipse from "../icons/functionals/Ellipse";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface ExpensesWidgetProps {
  label: string;
  description: string;
  amount: string;
  loading?: boolean;
}

/**
 * @property label: Text for the left side above amount
 * @property description: Text for the right side above amount
 * @property amount: Text for the amount (e.g. "20,000.00")
 */

export const Expenses: FC<ExpensesWidgetProps> = ({
  label,
  description,
  amount,
  loading = false,
}) => {
  const frame = useFluidWidth();
  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    image: {
      borderRadius: radiusS,
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: actuatedNormalize(10),
      alignItems: "center",
      justifyContent: "center",
    },
    labelContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingS,
    },
    amountWrapper: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
    },
  });
  return (
    <ImageThumbnail
      url={require("../../assets/images/expenses_pattern.png")}
      height={actuatedNormalize(143)}
      width={frame.span}
      overrideStyles={styles.container}
      overrideImageStyles={styles.image}
      isAbsolutePath
    >
      <View style={styles.content}>
        {loading ? (
          <SkeletonBox shape="line" size="small" />
        ) : (
          <View style={styles.labelContainer}>
            <Text variant="primarycolorstatic" size={fontMedium}>
              {label}
            </Text>
            <Ellipse />
            <Text variant="primarycolorstatic" size={fontMedium}>
              {description}
            </Text>
          </View>
        )}
        {loading ? (
          <SkeletonBox shape="line" size="extralarge" />
        ) : (
          <View style={styles.amountWrapper}>
            <SarFont
              variant="primarycolorstatic"
              size={fontXXLG}
              lineHeight={lineHeightXXLG}
            />
            <Text bold size={fontXXLG} variant="primarycolorstatic">
              {amount}
            </Text>
          </View>
        )}
      </View>
    </ImageThumbnail>
  );
};

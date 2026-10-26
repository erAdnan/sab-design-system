import { StyleSheet, View } from "react-native";
import React, { FC } from "react";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { SkeletonBox } from "../skeleton/SkeletonBox";

export interface ProductsCardsSummarySkeletonProps {
  primaryActionButton: boolean;
  secondaryActionButton: boolean;
  listLength: number;
}

export const ProductsCardsSummarySkeleton: FC<
  ProductsCardsSummarySkeletonProps
> = ({
  primaryActionButton = false,
  secondaryActionButton = false,
  listLength = 0,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      paddingVertical: actuatedNormalize(12),
      width: "100%",
    },
    mainWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    labelWrapper: {
      marginHorizontal: spacingS,
      gap: spacingS,
      width: "70%",
      alignItems: "flex-start",
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      marginTop: spacingS,
      marginHorizontal: spacingS,
      gap: spacingXS,
    },
    actionsContainerButtonWrapper: {
      width: "50%",
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.mainWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 5 }}>
          <SkeletonBox
            shape="square"
            size="large"
            overrideStyles={{ marginLeft: spacingS }}
          />
          <View style={styles.labelWrapper}>
            <SkeletonBox shape="line" size="small" />
            <SkeletonBox shape="line" size="medium" />
          </View>
        </View>
      </View>

      {listLength > 0 && (
        <View
          style={{ gap: spacingS, marginLeft: spacingS, marginTop: spacingS }}
        >
          <SkeletonBox shape="line" size="medium" />
          <SkeletonBox shape="line" size="medium" />
          <SkeletonBox shape="line" size="medium" />
        </View>
      )}
      {primaryActionButton && (
        <View style={styles.actionsContainer}>
          {primaryActionButton && (
            <View
              style={
                secondaryActionButton
                  ? styles.actionsContainerButtonWrapper
                  : { width: "100%" }
              }
            >
              <SkeletonBox
                shape="line"
                size="large"
                overrideStyles={{
                  width: "100%",
                }}
              />
            </View>
          )}
          {secondaryActionButton && (
            <View style={styles.actionsContainerButtonWrapper}>
              <SkeletonBox
                shape="line"
                size="large"
                overrideStyles={{ width: "100%" }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

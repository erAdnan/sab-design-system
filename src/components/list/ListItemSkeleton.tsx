import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";

import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";

export interface ListItemSkeletonProps {
  addOn?: boolean;
  label?: boolean;
  body?: boolean;
  value?: boolean;
  title?: boolean;
  subTitle?: boolean;
  content?: boolean;
  status?: boolean;
  showBackground: boolean;
  overrideStyles: any;
  badge?: boolean;
  action?: boolean;
  badgeSecondLine?: boolean;
  badgeThirdLine?: boolean;
  addOnSize?: "small" | "medium" | "large";
}

/* Pass all props from the component */

export const ListItemSkeleton: FC<ListItemSkeletonProps> = ({
  addOn,
  label,
  body,
  value,
  title,
  subTitle,
  content,
  status,
  showBackground = false,
  overrideStyles,
  badge,
  action,
  badgeSecondLine,
  badgeThirdLine,
  addOnSize = "medium",
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        showBackground
          ? {
              ...styles.default,
              ...styles.withBackground,
              backgroundColor: showBackground
                ? theme.stylesblockbg
                : "transparent",
            }
          : styles.default,
        overrideStyles,
      ]}
    >
      <View style={[styles.content, { flex: 2.5 }]}>
        {addOn && <SkeletonBox shape="circle" size={addOnSize} />}
        <View style={styles.bodyContent}>
          {label && !value && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{ width: actuatedNormalize(120) }}
            />
          )}
          {label && value && (
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <SkeletonBox
                shape="line"
                size="small"
                overrideStyles={{ width: actuatedNormalize(120) }}
              />
              <SkeletonBox
                shape="line"
                size="small"
                overrideStyles={{ width: actuatedNormalize(120) }}
              />
            </View>
          )}
          {title && (
            <SkeletonBox
              shape="line"
              size="medium"
              overrideStyles={{ width: actuatedNormalize(120) }}
            />
          )}

          {subTitle && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(80),
                marginTop: spacingXS,
              }}
            />
          )}
          {body && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(80),
                marginTop: spacingXS,
              }}
            />
          )}
          {content && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(80),
                marginTop: spacingXS,
              }}
            />
          )}
          {status && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{
                width: actuatedNormalize(80),
                marginTop: spacingXS,
              }}
            />
          )}
        </View>
      </View>

      <View
        style={[
          styles.content,
          {
            flex: 1,
            justifyContent: "flex-end",
          },
        ]}
      >
        <View
          style={{ display: "flex", flexDirection: "column", gap: spacingXS }}
        >
          {badge && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{ width: actuatedNormalize(48) }}
            />
          )}
          {badgeSecondLine && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{ width: actuatedNormalize(48) }}
            />
          )}
          {badgeThirdLine && (
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={{ width: actuatedNormalize(48) }}
            />
          )}
        </View>

        {action && <SkeletonBox shape="circle" size="small" />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  default: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacingS,
  },
  withBackground: {
    borderRadius: radiusS,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    gap: spacingXS,
    alignItems: "center",
  },
  bodyContent: {
    alignItems: "flex-start",
  },
});

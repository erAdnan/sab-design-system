import React, { FC, useMemo } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmallMedium,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import BlockPattern from "../patterns/BlockPattern";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import Icon from "../icon/Icon";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface BlockGenericProps {
  type: "solid" | "pattern";
  name: string;
  extraContent?: string;
  iconName?: string;
  iconType?:
  | "banking"
  | "functionals"
  | "users"
  | "notifications"
  | "arrows"
  | "other"
  | "social"
  | "filled"
  | "sab360";
  onIconPress?: () => void;
  overrideStyles?: any;
  loading?: boolean;
}

/**
 * @property type - Sets the background to be solid or with pattern
 * @property name - Text to be displayed on the first line (main text)
 * @property extraContent - Text to be displayed on the second line (smaller text)
 * @property iconName - Icon name to be displayed on the left side of the text
 * @property iconType - Icon type to be displayed on the left side of the text, default is "banking"
 * @property onIconPress - Option callback for chevron icon press event
 * @property overrideStyles - Override styles for the component
 * @property loading - boolean for showing the skeleton
 **/

export const Generic: FC<BlockGenericProps> = ({
  type = "solid",
  name,
  extraContent = "",
  onIconPress,
  iconName = "my_accounts",
  iconType = "banking",
  overrideStyles,
  loading = false,
}) => {
  const { theme } = useTheme();

  const isSolid = useMemo(() => type === "solid", [type]);
  const textColor = useMemo(
    () => (isSolid ? "primarytextcolor" : "primarycolor4static"),
    [isSolid]
  );

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: 167.5,
      height: 110,
      borderRadius: radiusS,
      padding: spacingS,
    },
    details: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    textContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      width: extraContent ? "auto" : "80%",
    },
    backgroundPattern: {
      position: "absolute",
      top: 0,
      left: 0,
    },
  });

  return loading ? (
    <View
      style={{
        width: actuatedNormalize(167),
        height: actuatedNormalize(110),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      }}>
      <SkeletonBox shape="circle" size="small" />
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center", }}>
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "80%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "80%" }} />
      </View>
    </View>
  ) : (
    <TouchableOpacity onPress={() => onIconPress && onIconPress()}>
      <View
        style={[
          {
            ...styles.container,
            backgroundColor: isSolid
              ? theme.stylesblockbg
              : theme.complimentaryprimarycolor3_2,
          },
          overrideStyles,
        ]}
      >
        {!isSolid && <BlockPattern style={styles.backgroundPattern} />}
        <Icon name={iconName} type={iconType} isWhite={!isSolid} />
        <View style={styles.details}>
          <View style={styles.textContent}>
            <Text size={fontMediumLarge} variant={textColor}>
              {name}
            </Text>
            {extraContent && (
              <Text size={fontSmallMedium} variant={textColor}>
                {extraContent}
              </Text>
            )}
          </View>
          <ChevronRight fill={theme[textColor]} transform={[
                {
                  rotate: I18nManager.isRTL ? '180deg' : '0deg',
                },
              ]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

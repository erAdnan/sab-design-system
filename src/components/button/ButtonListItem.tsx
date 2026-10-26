import React, { FC, ReactElement } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextTitle, TextTitleProps } from "../text/TextTitle";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontSmallMedium,
  fontWeightMedium,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { Rag, RagIconType } from "../rag/Rag";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import fonts from "../../assets/styles/constants/fonts";
import { AutomationProps, getAutomationProps } from "../automationProps";

interface ButtonListItemProps extends AutomationProps {
  headline: TextTitleProps;
  content?: string;
  extraContent?: string;
  showIcon?: boolean;
  icon?: ReactElement;
  actionType: "chevron" | "status" | "icon";
  actionIcon?: ReactElement;
  actionStatus?: "success" | "warning" | "error" | "info";
  onButtonPress?: () => void;
  loading?: boolean;
  iconWrapper?:any;
  overrideStyles?: any;
  showChevron?: boolean;
}

/**
 * @property headline - Text to be displayed as headline. Pass text title props to configure badge and tooltip
 * @property content - Text to be displayed under the headline
 * @property extraContent - Optional secondary line under content, same font and color as content, with 4pt gap
 * @property showIcon - Boolean to show/hide icon on the left side of the text
 * @property icon - Icon element to be displayed when showIcon is true
 * @property actionType - Determines the action element to be displayed on the right side. Possible values are "chevron", "status", or "icon". Default is "chevron".
 * @property actionIcon - Allows you to pass a custom React element to be displayed on the right side  when {actionType = "icon"}.
 * @property actionStatus - Determines the status to be used when actionType is "status". Default is "success".
 * @property onButtonPress - Optional callback for the component press
 * @property loading - boolean for showing the skeleton
 * @property iconWrapper - Use this prop to change the icon's background color and make it circular by passing styles from outside the component.
 * @property overrideStyles - Use this prop to set or override the background color of the container.
 */

export const ButtonListItem: FC<ButtonListItemProps> = ({
  headline,
  content,
  extraContent,
  showIcon = false,
  icon,
  actionType = "chevron",
  actionStatus = "success",
  onButtonPress,
  loading = false,
  actionIcon,
  iconWrapper,
  overrideStyles,
  showChevron=true,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const isRtl = I18nManager.isRTL;

  const dynamicIcon = icon
    ? React.cloneElement(icon, {
        fill: theme.primarycolor3,
      })
    : null;

    const dynamicActionIcon =
    actionIcon &&
    React.cloneElement(actionIcon, {
      width: actuatedNormalize(24),
      height: actuatedNormalize(24),
      // fill: theme.primarytextcolor,
    });

  const styles = StyleSheet.create({
    container: {
      borderRadius: radiusS,
      padding: spacingS,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: theme.stylesblockbg,
    },
    leftContent: {
      flexDirection:  "row",
      alignItems: "center",
      flex: 1, // Ensures it takes available space and prevents overflow
    },
    iconWrapper: {
      marginRight: spacingXS, // Adjust spacing between icon and text
    },
    iconWrapperRtl: {
      marginLeft: spacingXS, // Adjust spacing between icon and text
    },
    textWrapper: {
      flexDirection: "column",
      gap: spacingXXS,
      flexShrink: 1, // Prevents text from overflowing
     flex:1,
    },
    rightContent: {
      alignItems: "center",
      justifyContent: "center",
      marginLeft: spacingS, // Ensures spacing from text to chevron
    },
    rightContentRtl: {
      alignItems: "center",
      justifyContent: "center",
    },
  });

  return (
    <TouchableOpacity
      style={[styles.container,overrideStyles]}
      onPress={() => onButtonPress && onButtonPress()}
      {...getAutomationProps(
        testID,
        accessibilityLabel,
        headline?.text ?? content ?? extraContent
      )}
    >
      {/* Left Side (Icon + Text) */}
      <View style={styles.leftContent}>
        {showIcon && dynamicIcon && (
          <View style={[styles.iconWrapper,iconWrapper]}>
            {loading ? (
              <SkeletonBox size="small" shape="square" />
            ) : (
              dynamicIcon
            )}
          </View>
        )}
        <View style={styles.textWrapper}>
          <TextTitle
            {...headline}
            loading={loading}
            loadingStateStyles={{ width: "100%" }}
            overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0,...(headline?.overrideStyles || {}), width: "100%",textAlign: "left",fontFamily: fonts.HSBC_Medium, paddingBottom: isRtl ? actuatedNormalize(3) : 0}}
          />
          {content && content.trim().length > 0 && (
            <Text
              size={fontSmallMedium}
              variant="primarytextcolor2"
              loading={loading}
              overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0, width: "100%",textAlign: "left",...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3),writingDirection: "ltr" })}}
            >
              {content}
            </Text>
          )}
          {extraContent && extraContent.trim().length > 0 && (
            <Text
              size={fontSmallMedium}
              variant="primarytextcolor2"
              loading={loading}
              overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0, width: "100%",textAlign: "left",...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3),writingDirection: "ltr" })}}
            >
              {extraContent}
            </Text>
          )}
        </View>
      </View>

      
      {showChevron && <View style={isRtl ? styles.rightContentRtl : styles.rightContent}>
        {loading ? (
          <SkeletonBox size="small" shape="circle" />
        ) : actionType === "chevron" ? (
          isRtl ? (
            <ChevronLeft fill={theme.primarytextcolor} />
          ) : (
            <ChevronRight fill={theme.primarytextcolor} />
          )
        ) : actionType === "status" ? (
          <Rag type={RagIconType[actionStatus]} />
        ) : (
          dynamicActionIcon
        )}
      </View>}
    </TouchableOpacity>
  );
};

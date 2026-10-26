import { FC, ReactElement, useMemo } from "react";
import { I18nManager, TouchableOpacity, View } from "react-native";
import { Title } from "./Title";
import {
  fontLarge,
  fontMediumLarge,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import React from "react";
import { Button, ButtonProps } from "../button/Button";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";
import { Badge, BadgeProps, BadgeSize, BadgeType } from "../badge/Badge";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";

export interface TextTitleProps {
  text: string;
  size?: number;
  subtitle?: string;
  subtitleSize?: number;
  showIcon?: boolean;
  icon?: ReactElement;
  onIconPress?: () => void;
  showLinkButton?: boolean;
  linkButtonText?: string;
  linkButtonTextVariant?: string;
  onLinkButtonPress?: () => void;
  showLinkButtonIcon?: boolean;
  showBadge?: boolean;
  badgeProps?: BadgeProps;
  showTooltip?: boolean;
  tooltipProps?: TooltipProps;
  linkButtonProps?: ButtonProps;
  loading?: boolean;
}

/**
 * Text.title component
 * @property text - Text to use as headline (title)
 * @property size - Font size of the headline
 * @property subtitle - Text to use as subtitle
 * @property subtitleSize - Font size of the subtitle
 * @property showIcon - Boolean to show/hide icon next to headline
 * @property icon - Icon element to display when showIcon is true
 * @property onIconPress - Optional callback for handling icon press
 * @property showLinkButton - Boolean to show/hide link button
 * @property linkButtonText - Text to use for link button when showLinkButton is true
 * @property onLinkButtonPress - Optional callback for handling link button press
 * @property showLinkButtonIcon - Boolean to show/hide chevron right icon next to link button
 * @property showBadge - Boolean to show/hide badge
 * @property badgeProps - Props to pass to the badge component
 * @property showTooltip - Boolean to show/hide tooltip
 * @property tooltipProps - Props to pass to the tooltip component
 * @property linkButtonProps - Props to use button component with type link 
 */

export const TextTitleActions: FC<TextTitleProps> = ({
  text,
  subtitle,
  subtitleSize = fontMediumLarge,
  size = fontLarge,
  showIcon,
  icon,
  onIconPress,
  showLinkButton,
  linkButtonText,
  linkButtonTextVariant = "primarytextcolor",
  onLinkButtonPress,
  showLinkButtonIcon = false,
  showBadge = false,
  badgeProps,
  showTooltip = false,
  tooltipProps,
  loading = false,
  linkButtonProps,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const dynamicIcon = useMemo(() => {
    return icon
      ? React.cloneElement(icon, {
          fill: theme.primarycolor3,
        })
      : null;
  }, [theme, icon]);
console.log("+++++++++++++++++++++++++++", isRtl)
  return (
    <View>
      <Title
        size={size}
        overrideStyles={{ paddingVertical: 0,paddingHorizontal : 0 }}
        loading={loading}
        loadingNumOfLines={1}
        iconRight={
          showIcon ? (
            <TouchableOpacity onPress={() => onIconPress && onIconPress()}>
              {dynamicIcon}
            </TouchableOpacity>
          ) : showBadge ? (
            <View style={{ marginBottom: spacingXXS }}>
              {
                <Badge
                  type={badgeProps?.type || BadgeType.primary}
                  size={BadgeSize.large}
                  {...badgeProps}
                />
              }
            </View>
          ) : showTooltip ? (
            <View>
              <TooltipComponent
                text={tooltipProps?.text || ""}
                {...tooltipProps}
              />
            </View>
          ) : (
            <></>
          )
        }
        action={
          showLinkButton && linkButtonText ? (
            <Button
              variant="link"
              size="small"
              linkIconRight={showLinkButtonIcon && !isRtl}
              linkIconLeft={showLinkButtonIcon && isRtl}
              overrideStyles={{ paddingVertical: 0 ,paddingHorizontal : 0}}
              buttonText={{
                children: linkButtonText,
                variant: linkButtonTextVariant,
              }}
              onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
              {...linkButtonProps}
            />
          ) : (
            <></>
          )
        }
        subtitle={subtitle}
        subtitleSize={subtitleSize}
      >
        {text}
      </Title>
    </View>
  );
};

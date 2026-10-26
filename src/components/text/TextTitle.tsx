import { FC, useMemo } from "react";
import { I18nManager, View } from "react-native";
import { Title } from "./Title";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Badge } from "../badge/Badge";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import { fontMediumLarge, spacingXS } from "../../assets/styles/constants/size";
import { LanguageCodes } from "../../localization/languages";
import i18n from "i18next";

export interface TextTitleProps {
  text: string;
  badge?: boolean;
  tooltip?: boolean;
  tooltipText?: string;
  tooltipProps?: TooltipProps;
  badgeNotificationType?:
    | "primary"
    | "success"
    | "warning"
    | "neutral"
    | "reverse";
  badgeNotificationSize?: "xs" | "small" | "large";
  badgeNotificationNumber?: number;
  overrideStyles?: any;
  loading?: any;
  textWidth?: number;
  loadingStateStyles?: any;
  loadingNumOfLines?: number;
  iconColor?: string;
}

/**
 * Text.title component
 * @property text - text to display
 * @property badge - boolean to display a badge (true) or not (false)
 * @property tooltip - boolean to display a tooltip (true) or not (false)
 * @property tooltipText - text to display in the tooltip
 * @property tooltipProps - Full tooltip props including showBottomsheet, onInfoIconPress, and children
 * @property badgeNotificationType - type of the badge notification, can be primary, success, warning, neutral or reverse
 * @property badgeNotificationSize - size of the badge notification, can be xs, small or large
 * @property badgeNotificationNumber - number to display in the badge notification
 * @property iconColor - change the tooltip icon color
 */
export const TextTitle: FC<TextTitleProps> = ({
  text,
  badge = false,
  tooltip = false,
  tooltipText,
  tooltipProps,
  badgeNotificationNumber,
  badgeNotificationSize = "small",
  badgeNotificationType = "primary",
  overrideStyles,
  loading = false,
  textWidth,
  loadingStateStyles,
  loadingNumOfLines,
  iconColor,
}) => {
  const isRtl = I18nManager.isRTL;
  const marginBottom = useMemo(() => {
    if (badge) {
      switch (badgeNotificationSize) {
        case "xs":
          return actuatedNormalize(10);
        default:
          return actuatedNormalize(5);
      }
    }
  }, [badge, badgeNotificationSize]);

  return (
    <View
      style={{
        flexDirection: isRtl ? "row-reverse" : "row",
        alignItems: "center",
        ...(tooltip && {gap:spacingXS})
      }}
    >
      <Title
        size={fontMediumLarge}
        overrideStyles={overrideStyles}
        loading={loading}
        textWidth={textWidth}
        loadingStateStyles={loadingStateStyles}
        loadingNumOfLines={loadingNumOfLines}
        iconRight={
          badge ? (
            <Badge
              //@ts-ignore
              size={badgeNotificationSize}
              //@ts-ignore
              type={badgeNotificationType || "primary"}
              number={badgeNotificationNumber}
              containerStyle={{ marginBottom: marginBottom }}
            />
          ) : undefined
        }
      >
        {text}
      </Title>

      {tooltip && !loading && (tooltipText || tooltipProps) && (
        <TooltipComponent
          text={tooltipText}
          iconColor={iconColor}
          {...tooltipProps}
        />
      )}
    </View>
  );
};

import { FC, ReactNode } from "react";
import { useTheme } from "../../context/theme/themeContext";
import {
  View,
  StyleSheet,
  I18nManager,
  TouchableOpacity,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Info from "../icons/status/Info";
import InfoFrame from "../icons/status/InfoFrame";
import { globalStyles } from "../../assets/styles/globalStyles";
import {
  fontMedium,
  fontWeightRegular,
  radiusS,
  radiusXS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { NewCurrency } from "../text/NewCurrency";
import SabTooltip from "../sabtooltip/SabTooltip";

export interface TooltipProps {
  text?: string;
  width?: number;
  tooltipStyle?: any;
  iconStyle?: any;
  iconColor?: string;
  centerIcon?: boolean;
  iconPosition?: IconPosition;
  loading?: boolean;
  variant?: string;
  /** When true, the info icon does not open a tooltip — use it to open a bottomsheet instead. */
  showBottomsheet?: boolean;
  /** Fired whenever the info icon is pressed (tooltip or bottomsheet). */
  onInfoIconPress?: () => void;
  /** Bottomsheet (or other) content rendered next to the info icon when `showBottomsheet` is true. */
  children?: ReactNode;
}

export enum IconPosition {
  left = "left",
  right = "right",
}

/**
 * Tooltip Component
 * @property text - The text to display in the tooltip
 * @property witdh - The width of the tooltip
 * @property tooltipStyle - The style of the tooltip (css object - e.g. { position: 'absolute', right: 10, height: 'auto' })
 * @property centerIcon - Whether to center the icon in the tooltip (true or false)
 * @property iconColor - The color of the icon that opens the tooltip
 * @property iconPosition - The position of the icon in the tooltip (left or right)
 * @property iconStyle - Styles for adjusting appearance of icon that opens tooltip
 * @property loading - Loading state of the tooltip
 * @property variant - optional props for the text
 * @property showBottomsheet - When true, info icon press skips the tooltip so a bottomsheet can be shown
 * @property onInfoIconPress - Callback when the info icon is pressed
 * @property children - Content (typically a bottomsheet) rendered when showBottomsheet is true
 */
export const TooltipComponent: FC<TooltipProps> = ({
  text = "",
  width = actuatedNormalize(242),
  tooltipStyle = {},
  iconStyle = {},
  centerIcon = false,
  iconPosition = IconPosition.left,
  iconColor,
  loading = false,
  variant = "primarycolorstatic",
  showBottomsheet = false,
  onInfoIconPress,
  children,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const infoIcon = (
    <InfoFrame
      color={iconColor || theme.primarycolor2_100}
      width={iconStyle.width}
      height={iconStyle.height}
      style={iconStyle}
    />
  );

  if (showBottomsheet) {
    return (
      <View style={{ ...tooltipStyle }}>
        <TouchableOpacity
          onPress={onInfoIconPress}
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {infoIcon}
        </TouchableOpacity>
        {children}
      </View>
    );
  }

  return (
    <View style={{ ...tooltipStyle }}>
      <SabTooltip
        actionType="press"
        width={isNaN(width) ? actuatedNormalize(242) : width}
        height="auto"
        backgroundColor={theme.tintstaticneutral}
        pointerColor={theme.tintstaticneutral}
        withPointer={true}
        withOverlay={true}
        overlayColor={theme.primarycolor2_40}
        containerStyle={[
          styles.tooltipContainer,
          { shadowColor: theme.primarycolorstatic },
        ]}
        pointerStyle={{ borderBottomColor: theme.tintstaticneutral }}
        onOpen={onInfoIconPress}
        popover={
          loading ? (
            <View
              style={{
                display: "flex",
                flexDirection:
                  iconPosition === IconPosition.left ? "row" : "row-reverse",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: spacingS,
                borderRadius: radiusS,
              }}
            >
              <SkeletonBox shape="circle" size="small" />
              <View
                style={{
                  flexDirection: "column",
                  gap: spacingXS,
                  justifyContent: "center",
                  width: "80%",
                }}
              >
                <SkeletonBox
                  shape="line"
                  size="small"
                  overrideStyles={{ width: "80%" }}
                />
                <SkeletonBox
                  shape="line"
                  size="small"
                  overrideStyles={{ width: "80%" }}
                />
              </View>
            </View>
          ) : (
            <View style={styles.popoverContent}>
              {(!iconPosition || iconPosition === IconPosition.left) && (
                <View style={centerIcon ? styles.middleIcon : null}>
                  <Info />
                </View>
              )}
              <View style={{ flex: 1 }}>
                <NewCurrency
                  text={text}
                  variant={variant}
                  currencyTextStyle={[
                    styles.tooltipText,
                    { color: theme.primarycolorstatic },
                    isRtl ? globalStyles.textRight : globalStyles.textLeft,
                  ]}
                  textstyle={[
                    globalStyles.textLeft,
                    {
                      paddingTop: actuatedNormalize(2),
                      fontWeight: fontWeightRegular,
                    },
                  ]}
                  size={fontMedium}
                />
              </View>

              {iconPosition && iconPosition === IconPosition.right && (
                <View style={centerIcon ? styles.middleIcon : null}>
                  <Info />
                </View>
              )}
            </View>
          )
        }
      >
        {infoIcon}
      </SabTooltip>
    </View>
  );
};

const styles = StyleSheet.create({
  tooltipContainer: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: radiusXS,
    elevation: 5,
    borderRadius: radiusS,
  },
  popoverContent: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: actuatedNormalize(8),
  },
  tooltipText: {
    fontSize: actuatedNormalize(12),
    flexShrink: 1,
  },
  middleIcon: {
    alignSelf: "center",
  },
});

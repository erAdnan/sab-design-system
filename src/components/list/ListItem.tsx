import React, { FC, ReactElement, useMemo, useState } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextProps } from "../text/Text";
import { Title, TitleProps } from "../text/Title";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { Checkbox } from "../checkbox/Checkbox";
import { Button } from "../button/Button";
import { useTheme } from "../../context/theme/themeContext";
import { Toggle } from "../toggle/Toggle";
import { Divider } from "../divider/Divider";
import Tick from "../icons/functionals/Tick";
import DocumentEdit from "../icons/functionals/DocumentEdit";
import Delete from "../icons/functionals/Delete";
import { RadioButton } from "../radio/Radio";
import Copy from "../icons/functionals/Copy";
import { Badge, BadgeSize, BadgeType } from "../badge/Badge";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontSmallMedium,
  fontWeightBold,
  fontXSmall,
  lineHeightLarge,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightXSmall,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Balance } from "../balance/Balance";
import { ListItemSkeleton } from "./ListItemSkeleton";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { CurrencyText } from "../text/CurrencyText";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import Close from "../icons/functionals/Close";
import { Rag, RagIconType } from "../rag/Rag";
import { NewCurrency, NewCurrencyProps } from "../text/NewCurrency";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import fonts from "../../assets/styles/constants/fonts";
import { AutomationProps, getAutomationProps } from "../automationProps";

export interface ListItemProps extends AutomationProps {
  label?: TextProps;
  addOn?: ReactElement;
  bodyText?: TextProps;
  valueText?: TextProps;
  subvalueText?: TextProps;
  title?: TitleProps;
  subTitle?: TextProps;
  contentText?: string;
  statusText?: string;
  statusTextState?: "success" | "error" | "warning" | "neutral";
  actionType?: ListItemActionType;
  actionIconColor?: string;
  actionIcon?: ReactElement;
  badgeType?: ListItemBadgeType;
  linkIconRight?: boolean;
  linkIconLeft?: boolean;
  linkButtonText?: string;
  badgeText?: string;
  badgeTextLeft?: string;
  badgeNumber?: string;
  badgeNumberFontSize?: number;
  badgeTextProps?: TextProps;
  badgeSize?: BadgeSize;
  balanceFirstValue?: number;
  balanceSecondValue?: number | string | null;
  balanceStatusState?: "success" | "info" | "warning" | "error" | "neutral";
  balanceStatusLabel?: string;
  subLabel?: string;
  balanceCurrency?: "sar" | string;
  balanceSecondCurrency?: "sar" | string;
  balanceLabel?: string;
  vatValue?: string;
  chipsInfoProps?: ChipsInfoProps;
  showBackground?: boolean;
  showDivider: boolean;
  actionDisabled?: boolean;
  handleAction?: () => void;
  handleBadge?: () => void;
  handleRadioAction?: (value: string | number | boolean) => void;
  value?: string | number | boolean;
  onItemPress?: () => void;
  overrideStyles?: any;
  addOnStyle?: any;
  bodyContentStyle?: any;
  actionBadgeStyle?: any;
  addonBodyWrapperStyle?: any;
  loading?: boolean;
  addOnLoaderSize?: "small" | "medium" | "large";
  chevronUp?: boolean;
  isOpen?: boolean;
  isChecked?: boolean;
  showCheckmark?: boolean;
  balanceTextWrapper?: any;
  isSarCheck?: boolean;
  badgeValueCurrency?: NewCurrencyProps;
  tooltipProps?: TooltipProps;
  titleTooltipProps?: TooltipProps;
  /** Optional info icon next to the stacked label (e.g. Start Date). */
  labelTooltipProps?: TooltipProps;
  mediumFont?: boolean;
}

/**
 * @property label - Optional props to customize the label text. This can be used to style the label text or configure font size, weight, color, etc.
 * @property addOn - Optional React element (such as info icon, checkmark, bullet point) to be displayed on the left side of the main content.
 * @property bodyText - Optional props to configure the body text displayed when extra content is needed.
 * @property valueText - Optional props to customize the text for a value used with label for stacked list item.
 * @property subvalueText - Optional props to customize the text for a value used with label for stacked list item(Second  value).
 * @property title - Optional props to customize the main title (headline) text of the component.
 * @property subTitle - Optional props use after titile  use sub title (sub title) text of the component.
 * @property contentText - Optional props to customize the main body content text(as rollout text inside list body text ) text of the component.
 * @property statusText - Optional props to customize the main body status text (status) text of the component.
 * @property statusTextState - Optional props to customize the main body status text state (status) text of the component.
 * @property actionType - Optional - defines the type of action for the item (see ListItemActionType Enum). This affects the style and interaction behavior of the action.
 * @property actionIcon - Optional. Use this prop when actionType is "icon", and pass the desired icon through this prop.
 * @property actionIconColor - Optional - if you want change icon color when ListItemActionType is chevron, edit,delete.
 * @property badgeText - Optional text displayed inside the badge.
 * @property badgeType - Optional type for styling the badge displayed in the component (linkButton, text, chips, badge...).
 * @property linkButtonText - Optional type the linkbutton text for displayed in the component
 * @property linkIconRight - Optional props for link text right icon , if badgeType is link
 * @property linkIconLeft - Optional props for link text left icon,  if badgeType is link
 * @property badgeSize - Optional size for the badge displayed in the component (xs, small, large).
 * @property balanceFirstValue - Value to be displayed on the first line of balance badge
 * @property balanceSecondValue - Value to be displayed on the second line of balance badge
 * @property balanceStatusState - Changes the icon of status when balance with status is used as badge
 * @property balanceStatusLabel - Text of the status when balance with status is used as badge
 * @property subLabel - Text is the string which is optional which we passing in the transaction cancellation for request date
 * @property balanceLabel - Optional text for the label above the balanceFirstValue
 * @property balanceCurrency - Currency to be displayed in the balance badge
 * @property balanceSecondCurrency - Currency to be displayed in the balance badge for second value text
 * @property vatValue -  Optional props text for the Vat + Free for specific varaints
 * @property chipsInfoProps - Optional props for ChipInfo component
 * @property showBackground - Boolean to add or remove background color
 * @property showDivider - Determines if a divider line will be shown between this component and others. Used for visual separation in lists or groups.
 * @property actionDisabled - Determines if the action (e.g., button, click event) is disabled. If `true`, the action is inactive and unclickable.
 * @property handleAction - Optional callback function triggered when the action (e.g., button click) occurs.
 * @property handleBadge - Optional callback function triggered when the badge element is interacted with.
 * @property value - The main value that the component represents. It can be a string, number, or boolean (e.g., "Username", 123, true).
 * @property onItemPress - Optional callback triggered when the list item is pressed. Used for navigation or triggering additional behavior.
 * @property overrideStyles - Optional styles to override the default styles of the component.
 * @property addonBodyWrapperStyle - Optional styles to override the default styles of the component for some specific case.
 * @property addOnStyle - Optional styles to override the default styles of the component.
 * @property bodyContentStyle - Optional styles to override the default styles of the component.
 * @property actionBadgeStyle - Optional styles to override the default styles of the component.
 * @property chevronUp - only for Accordion case then we use ListItem Inside Accordion Component use this props
 * @property isOpen - handle  to show down and up for this
 * @property addonBodyWrapperStyle: Overrides the styles of addon
 * @property loading: Renders the skeleton version of the list item
 * @property addOnLoaderSize: "small" | "medium" | "large" - Changes size of loader when its used as addon
 * @property isChecked use this props to handle check uncheck the checkbox.
 * @property showCheckmark Used with `ListItemActionType.checkmark` , `true`: shows the default tick icon  ,  `false`: shows the close icon
 * @property balanceTextWrapper  use only when balance and amount aligment issue in the arabic case use this optional 
 * @property isSarCheck – Set this to true when you pass both of the following props: badgeType="text" & badgeText={${"SAR"} ${12560}} (when the value contains SAR) 
 * @property badgeValueCurrency – Use this prop to access NewCurrencyProps in order to change the text style, font, size, etc., specifically for badgeText.This should be used only when we have the label & badgeText variation in Review screens.
 * @property tooltipProps - Tooltip used with actionType "info"
 * @property titleTooltipProps - Optional info tooltip shown to the right of the title
 * @property labelTooltipProps - Optional info tooltip / bottomsheet trigger next to the stacked label

 */

export enum ListItemActionType {
  chevron = "chevron",
  checkbox = "checkbox",
  radio = "radio",
  edit = "edit",
  delete = "delete",
  checkmark = "checkmark",
  toggle = "toggle",
  copy = "copy",
  loading = "loading",
  icon = "icon",
  info = "info",
}

export enum ListItemBadgeType {
  linkButton = "linkButton",
  text = "text",
  chipsInfo = "chipsInfo",
  balance = "balance",
  balanceWithStatus = "balanceWithStatus",
  badgeWarning = "badgeWarning",
  badgeSuccess = "badgeSuccess",
  badgeNeutral = "badgeNeutral",
  badgeReverse = "badgeReverse",
  badgePrimary = "badgePrimary",
  numberWithText = "numberWithText"
}

export const ListItem: FC<ListItemProps> = ({
  addOn,
  label,
  bodyText,
  valueText,
  subvalueText,
  title,
  subTitle,
  contentText,
  statusText,
  statusTextState,
  actionType,
  actionIconColor,
  actionIcon,
  badgeType,
  linkIconRight,
  linkIconLeft,
  linkButtonText,
  badgeText,
  badgeTextLeft,
  badgeNumber,
  badgeNumberFontSize,
  badgeTextProps,
  badgeSize = BadgeSize.large,
  balanceFirstValue,
  balanceSecondValue,
  balanceStatusState,
  balanceStatusLabel,
  subLabel,
  balanceLabel,
  balanceCurrency,
  balanceSecondCurrency,
  vatValue = "",
  showBackground = false,
  actionDisabled = false,
  showDivider = true,
  chipsInfoProps,
  handleAction,
  handleBadge = () => { },
  handleRadioAction,
  onItemPress,
  value = "",
  overrideStyles,
  addOnStyle,
  bodyContentStyle,
  actionBadgeStyle,
  addonBodyWrapperStyle,
  loading = false,
  addOnLoaderSize = "medium",
  chevronUp,
  isOpen,
  isChecked,
  showCheckmark = false,
  balanceTextWrapper,
  isSarCheck,
  badgeValueCurrency,
  tooltipProps,
  titleTooltipProps,
  labelTooltipProps,
  testID,
  accessibilityLabel,
  mediumFont = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const isLinkButton = useMemo(
    () => badgeType === ListItemBadgeType.linkButton,
    [badgeType]
  );

  const shouldRenderActionOrBadge = badgeType || actionType;

  const styles = StyleSheet.create({
    default: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: spacingXS,
      paddingHorizontal: spacingS,
      paddingVertical: spacing1XS,
      width: "100%",
    },
    bodyText: { flexDirection: "column", alignItems: "flex-start" },
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
    titleTooltip: {
      marginBottom: actuatedNormalize(2),
    },
    labelTooltip: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXXS,
    },
  });

  const getBadge = () => {
    switch (badgeType) {
      case ListItemBadgeType.linkButton:
        return (
          <Button
            variant="link"
            linkIconRight={linkIconRight}
            linkIconLeft={linkIconLeft}
            buttonText={{ children: linkButtonText ?? "Link Button" }}
            onButtonPress={handleBadge}
          />
        );
      case ListItemBadgeType.text:
        return (
          isSarCheck ?
            <NewCurrency
              size={fontMedium}
              text={badgeText || ""}
              variant="primarytextcolor2"
              {...badgeValueCurrency}
            /> :
            <Text
              size={fontMedium}
              variant="primarytextcolor2"
              {...badgeTextProps}
            >
              {badgeText || ""}
            </Text>
        );
      case ListItemBadgeType.badgeWarning:
        return (
          <Badge
            type={BadgeType.warning}
            size={badgeSize}
            number={badgeText ? parseInt(badgeText) : undefined}
          />
        );
      case ListItemBadgeType.badgeSuccess:
        return (
          <Badge
            type={BadgeType.success}
            size={badgeSize}
            number={badgeText ? parseInt(badgeText) : undefined}
          />
        );
      case ListItemBadgeType.badgeNeutral:
        return (
          <Badge
            type={BadgeType.neutral}
            size={badgeSize}
            number={badgeText ? parseInt(badgeText) : undefined}
          />
        );
      case ListItemBadgeType.badgeReverse:
        return (
          <Badge
            type={BadgeType.reverse}
            size={badgeSize}
            number={badgeText ? parseInt(badgeText) : undefined}
          />
        );
      case ListItemBadgeType.badgePrimary:
        return (
          <Badge
            type={BadgeType.primary}
            size={badgeSize}
            number={badgeText ? parseInt(badgeText) : undefined}
          />
        );
      case ListItemBadgeType.chipsInfo:
        return <ChipsInfo {...chipsInfoProps} />;
      case ListItemBadgeType.balance:
        return (
          <Balance
            firstValue={balanceFirstValue || 0}
            secondValue={balanceSecondValue || null}
            currency={balanceCurrency}
            secondCurrency={balanceSecondCurrency}
            label={balanceLabel}
            vatValue={vatValue}
            balanceWrapper={{ paddingTop: 0 }}
            titleLineHeight={lineHeightMediumLarge}
            balanceTextWrapper={balanceTextWrapper}
            mediumFont={mediumFont}
          />
        );
      case ListItemBadgeType.balanceWithStatus:
        return (
          <Balance
            firstValue={balanceFirstValue || 0}
            secondValue={
              balanceSecondValue
                ? balanceSecondValue
                : balanceSecondValue === 0
                  ? 0
                  : null
            }
            statusProps={{
              state: balanceStatusState,
              label: balanceStatusLabel,
              ...chipsInfoProps,
            }}
            showStatus
            currency={balanceCurrency}
            secondCurrency={balanceSecondCurrency}
            subLabel={subLabel}
            vatValue={vatValue}
            balanceWrapper={{ paddingTop: 0 }}
            titleLineHeight={lineHeightMediumLarge}
            balanceTextWrapper={balanceTextWrapper}
          />
        );
      case ListItemBadgeType.numberWithText:
        return (
          <View style={{ display: 'flex', flexDirection: 'row', gap: spacingXXS, alignItems: 'center' }}>
            {badgeTextLeft && <Text
              size={fontXSmall}
              overrideStyles={{ lineHeight: lineHeightXSmall }}
            >
              {badgeTextLeft}
            </Text>}
            {badgeNumber && <Text
              bold
              overrideStyles={{ lineHeight: lineHeightLarge }}
              size={badgeNumberFontSize || fontLarge}
            >{badgeNumber}</Text>}
            {badgeText && <Text
              size={fontXSmall}
              overrideStyles={{ lineHeight: lineHeightXSmall }}
            >
              {badgeText}
            </Text>}
          </View>

        );
    }
  };
  const commonHitSlop = {
    top: actuatedNormalize(10),
    bottom: actuatedNormalize(10),
    left: actuatedNormalize(10),
    right: actuatedNormalize(10),
  };

  const dynamicIcon = actionIcon
    ? React.cloneElement(actionIcon as React.ReactElement<any>, {
        fill:
          actionIconColor ??
          (actionIcon as React.ReactElement<{ fill?: string }>).props
            ?.fill ??
          theme.ragneutral,
      })
    : null;

  const getAction = () => {
    switch (actionType) {
      case ListItemActionType.chevron:
        return (
          <TouchableOpacity onPress={handleAction || onItemPress} hitSlop={commonHitSlop}>
            {chevronUp ? (
              <ChevronDown
                fill={actionIconColor ?? theme.primarytextcolor}
                transform={[
                  {
                    rotate: isOpen ? "180deg" : "0deg",
                  },
                ]}
              />
            ) : (
              <ChevronRight
                fill={actionIconColor ?? theme.primarytextcolor}
                transform={[
                  {
                    rotate: isRtl ? "180deg" : "0deg",
                  },
                ]}
              />
            )}
          </TouchableOpacity>
        );
      case ListItemActionType.checkbox:
        return (
          <Checkbox
            disabled={actionDisabled}
            handleCheck={handleAction}
            isChecked={isChecked}
          />
        );
      case ListItemActionType.radio:
        return <RadioButton value={value} handleCheck={handleRadioAction} checked={isChecked} />;
      case ListItemActionType.edit:
        return (
          <TouchableOpacity onPress={handleAction} hitSlop={commonHitSlop}>
            <DocumentEdit fill={actionIconColor ?? theme.primarycolor3} />
          </TouchableOpacity>
        );
      case ListItemActionType.delete:
        return (
          <TouchableOpacity onPress={handleAction} hitSlop={commonHitSlop}>
            <Delete fill={actionIconColor ?? theme.primarycolor3} />
          </TouchableOpacity>
        );
      case ListItemActionType.checkmark:
        return (
          <TouchableOpacity onPress={handleAction} hitSlop={commonHitSlop}>
            {
              showCheckmark ? <Tick fill={actionIconColor ?? theme.secondarycolor10} /> : <Close fill={actionIconColor ?? theme.primarycolor3} />
            }

          </TouchableOpacity>
        );
      case ListItemActionType.toggle:
        return <Toggle
          isEnabled={!!isChecked}
          handleToggle={handleAction}
          disabled={actionDisabled}
        />;
      case ListItemActionType.copy:
        return (
          <TouchableOpacity onPress={handleAction} hitSlop={commonHitSlop}>
            <Copy fill={actionIconColor ?? theme.primarycolor3} />
          </TouchableOpacity>
        );
      case ListItemActionType.loading:
        return (
          <Rag type={RagIconType.spinner} />
        );
      case ListItemActionType.icon:
        return (
          <TouchableOpacity onPress={handleAction} hitSlop={commonHitSlop}>
            {dynamicIcon}
          </TouchableOpacity>
        );
      case ListItemActionType.info:
        return (
          <View style={{ display: "flex", alignItems: "center" }}>
            {tooltipProps && (
              <TooltipComponent
                iconStyle={{
                  width: actuatedNormalize(24),
                  height: actuatedNormalize(24),
                }}
                {...tooltipProps}
              />
            )}
          </View>
        );
    }
  };

  const statusVariant = useMemo(() => {
    switch (statusTextState) {
      case "success":
        return "ragcolor6";
      case "error":
        return "ragcolor3";
      case "warning":
        return "ragcolor15";
      case "neutral":
        return "ragneutral";
      default:
        return "primarytextcolor_2"; // Default fallback color
    }
  }, [statusTextState, theme]);

  const Wrapper: React.ElementType = onItemPress ? TouchableOpacity : View;

  return (
    <View>
      {loading ? (
        <ListItemSkeleton
          label={Boolean(label)}
          value={Boolean(value)}
          title={Boolean(title)}
          subTitle={Boolean(subTitle || title?.subtitle)}
          body={Boolean(bodyText)}
          status={Boolean(statusText)}
          content={Boolean(contentText)}
          showBackground={showBackground}
          overrideStyles={overrideStyles}
          addOn={Boolean(addOn)}
          badge={Boolean(getBadge())}
          action={Boolean(getAction())}
          badgeSecondLine={Boolean(balanceSecondValue)}
          badgeThirdLine={Boolean(balanceStatusLabel)}
          addOnSize={addOnLoaderSize}
        />
      ) : (
        <Wrapper
          onPress={onItemPress}
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
          {...getAutomationProps(
            testID,
            accessibilityLabel,
            title?.children?.toString?.() ?? label?.children?.toString?.()
          )}
        >
          <View
            style={[
              styles.content,
              { flex: shouldRenderActionOrBadge ? 1 : 2.5 },
              addonBodyWrapperStyle,
            ]}
          >
            {addOn &&
              <View style={addOnStyle}>{addOn}</View>
            }
            <View style={[styles.bodyContent, bodyContentStyle]}>
              {label && !valueText && <Text {...label} />}
              {label && valueText && (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: spacingXXS,
                  }}
                >
                  <View style={styles.labelTooltip}>
                    <Text
                      size={fontMedium}
                      variant="primarytextcolor2"
                      {...label}
                    />
                    {labelTooltipProps ? (
                      <TooltipComponent
                        iconStyle={{
                          width: actuatedNormalize(16),
                          height: actuatedNormalize(16),
                        }}
                        {...labelTooltipProps}
                      />
                    ) : null}
                  </View>
                  {
                    isSarCheck ? <NewCurrency size={fontMediumLarge} text={valueText.children as string} variant={valueText.variant as string} textstyle={{ fontFamily: fonts.HSBC_Bold, textAlign: "left" }} /> :
                      <Text
                        {...valueText}
                        bold
                        size={fontMediumLarge}
                      />
                  }

                  {subvalueText && <Text
                    {...subvalueText}
                    bold
                    size={fontMediumLarge}
                    variant="primarytextcolor2"
                  />}

                </View>
              )}
              {title && (
                <Title
                  {...title}
                  mediumFont={mediumFont}
                  size={title.size ?? fontLarge}
                  subtitleSize={fontMediumLarge}
                  numberOfLines={title.numberOfLines ?? 2}
                  iconRight={
                    (titleTooltipProps ? (
                      <View style={styles.titleTooltip}>
                        <TooltipComponent
                          iconStyle={{
                            width: actuatedNormalize(16),
                            height: actuatedNormalize(16),
                          }}
                          {...titleTooltipProps}
                        />
                      </View>
                    ) : undefined)
                  }
                  overrideStyles={{
                    paddingVertical: 0,
                    paddingHorizontal: 0,
                    gap: 0,
                    textAlign: "left",
                    // textAlign: isRtl ? "right" : "left", hide for  here in the Title.tsx file add writingDirection 
                    width: isLinkButton ? "90%" : "auto",
                    ...title.overrideStyles,
                  }}
                />
              )}

              {subTitle && <Text {...subTitle} />}
              {bodyText && (
                <View style={styles.bodyText}>
                  <NewCurrency
                    text={bodyText.children as string}
                    size={fontMedium}
                    variant="primarytextcolor2"
                    numberOfLines={bodyText.numberOfLines ?? 2}
                    textstyle={{ textAlign: "left" }}
                  />
                </View>
              )}
              {contentText && (
                <View style={styles.bodyText}>
                  <Text
                    {...bodyText}
                    size={fontMedium}
                    variant="primarytextcolor2"
                  >
                    {contentText}
                  </Text>
                </View>
              )}
              {statusText && (
                <View style={styles.bodyText}>
                  <Text
                    variant={statusVariant ?? "primarycolor3"}
                    size={fontSmallMedium}
                  >
                    {statusText}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {shouldRenderActionOrBadge && (
            <View
              style={[
                styles.content,
                {
                  flex: 1,
                  justifyContent: "flex-end",
                  marginRight: isLinkButton ? spacingS : 0,
                },
                actionBadgeStyle,
              ]}
            >
              {badgeType && <View>{getBadge()}</View>}
              {actionType && <View>{getAction()}</View>}
            </View>
          )}
        </Wrapper>
      )}
      {showDivider && !showBackground && <Divider />}
    </View>
  );
};

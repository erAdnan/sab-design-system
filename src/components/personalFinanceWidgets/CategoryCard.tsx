import React, { FC, ReactElement, useMemo } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { I18nManager, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  fontXSmall,
  lineHeightMedium,
  lineHeightMediumLarge,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { ListItem, ListItemProps } from "../list/ListItem";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import CategoryCardSkeleton from "./CategoryCardSkeleton";
import { t } from "i18next";
import CheckCircle from "../icons/filled/CheckCircle";
import Warning from "../icons/status/Warning";
import InfoFrame from "../icons/status/InfoFrame";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface CategoryCardWidgetProps {
  listItemProps?: ListItemProps;
  progressIndicatorPercentage: number;
  addonBackgroundColor: string;
  addonIcon?: ReactElement;
  progressIndicatorColor: string;
  small?: boolean;
  headline?: string;
  amount?: string;
  amountLabel?: string;
  progressLabel?: string;
  completed?: boolean;
  savedAmount?: string;
  savedAmountLabel?: string;
  spentAmount?: string;
  spentAmountLabel?: string;
  remainingAmount?: string;
  remainingAmountLabel?: string;
  currency?: "sar" | string;
  status?: "onTrack" | "beCareful" | "overspent";
  statusText?: string;
  errorMessage?: string;
  loading?: boolean;
}

/**
 * @property lisItemProps - Props to configure list item when horizontal card is used
 * @property progressIndicatorPercentage - Percentage of progress indicator to be filled
 * @property addonBackgroundColor - sets a BG color for icon - choose color according to the color of the icon
 * @property addonIcon - SVG icon to be displayed as addon
 * @property progressIndicatorColor - Color of the filled portion of progress indicator - choose same color as the addon icon color
 * @property small - Boolean for using vertical card
 * @property headline - Headline text for vertical card
 * @property amount - Amount for vertical card
 * @property amountLabel - Text under the amount for vertical card
 * @property progressLabel - Text under the progress indicator for vertical card
 * @property completed - Boolean for horizontal card, default is true (true - total saved amount is displayed, false - spent and remaining amounts are displayed)
 * @property savedAmount - Text that represents saved amount for horizontal card when completed is true
 * @property savedAmountLabel - Text to be used as saved amount label (e.g. "Total saved amount")
 * @property spentAmount - Text that represents spent amount for horizontal card when completed is false
 * @property spentAmountLabel - Text to be used as spent amount label (e.g. "Spent")
 * @property remainingAmount - Text that represents remaining amount for horizontal card when completed is false
 * @property remainingAmountLabel - Text to be used as remaining amount label (e.g. "Remaining")
 * @property currency - Change currency sybmol, default is SAR symbol
 * @property status: Option for status displayed under daily allowance section
 * @property statusText: Label for status
 * @property errorMessage: Optional string for error that will be displayed at the bottom
 */

export const CategoryCard: FC<CategoryCardWidgetProps> = ({
  listItemProps,
  progressIndicatorPercentage,
  addonBackgroundColor,
  addonIcon,
  progressIndicatorColor,
  small = false,
  headline,
  amount,
  amountLabel,
  progressLabel,
  completed = true,
  savedAmount,
  savedAmountLabel,
  spentAmount,
  spentAmountLabel,
  remainingAmount,
  remainingAmountLabel,
  currency = "sar",
  status,
  statusText,
  errorMessage,
  loading = false,
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const isRtl = I18nManager.isRTL;

  const styles = StyleSheet.create({
    container: {
      padding: spacingS,
      backgroundColor: theme.stylesblockbg,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      borderRadius: radiusS,
    },
    containerHorizontal: {
      gap: spacingXS,
      width: "100%",
    },
    containerVertical: {
      gap: spacingS,
      ...frame.of(164),
    },
    itemAddon: {
      display: "flex",
      width: actuatedNormalize(48),
      height: actuatedNormalize(48),
      borderRadius: actuatedNormalize(24),
      backgroundColor: addonBackgroundColor || theme.inverttransparent,
      alignItems: "center",
      justifyContent: "center",
    },
    listItemWrapper: {
      paddingVertical: 0,
      paddingHorizontal: 0,
    },
    amountWrapper: {
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      gap: spacingXXS,
      alignSelf: "flex-start",
      alignItems: "center"
    },
    inlineTextWrapper: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXXS,
      alignItems: "center",
    },
    contentVertical: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: spacingXXS,
    },
    progressContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      alignSelf: "stretch",
      width: "100%",
      gap: spacingXS,
    },
    progressDescriptionContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%"
    },
    errorMessageContainer: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
      marginTop: spacingS,
      paddingRight: spacingS
    }
  });

  const isSar = useMemo(() => {
    return currency === "sar";
  }, [currency]);

  const getStatus = () => {
    switch (status) {
      case "onTrack":
        return (
          <View style={styles.inlineTextWrapper}>
            <CheckCircle
              width={actuatedNormalize(18)}
              height={actuatedNormalize(18)}
              fill={theme.secondarycolor10}
            />
            <Text size={fontSmall} variant="secondarycolor10">
              {statusText || t("budgetCardStatus.onTrack")}
            </Text>
          </View>
        );
      case "beCareful":
        return (
          <View style={styles.inlineTextWrapper}>
            <Warning fill={theme.ragneutral} />
            <Text size={fontSmallMedium} variant="ragneutral">
              {statusText || t("budgetCardStatus.beCareful")}
            </Text>
          </View>
        );
      case "overspent":
        return (
          <View style={styles.inlineTextWrapper}>
            <Warning fill={theme.primarycolor3static} />
            <Text size={fontSmallMedium} variant="primarycolor3static">
              {statusText || t("budgetCardStatus.overspent")}
            </Text>
          </View>
        );
    }
  };


  const progressDescription = useMemo(() => {
    if (small && progressLabel) {
      return <Text size={fontXSmall}>{progressLabel}</Text>;
    }
    if (completed && savedAmountLabel && savedAmount) {
      return (
        <View style={styles?.progressDescriptionContainer}>
          <Text size={fontSmall} variant="primarytextcolor2">
            {savedAmountLabel}
          </Text>
          <View style={styles?.amountWrapper}>
            {isSar && (
              <SarFont size={fontMedium} lineHeight={lineHeightMedium} />
            )}
            <Text size={fontMedium} bold>
              {savedAmount}
            </Text>
          </View>
        </View>
      );
    }
    if (
      !completed &&
      spentAmount &&
      spentAmountLabel &&
      remainingAmount &&
      remainingAmountLabel
    ) {
      return (
        <View style={styles?.progressDescriptionContainer}>
          <View style={styles?.contentVertical}>
            <Text size={fontSmall} variant="primarytextcolor2">
              {spentAmountLabel}
            </Text>
            <View style={styles?.amountWrapper}>
              {isSar && (
                <SarFont size={fontMedium} lineHeight={lineHeightMedium} />
              )}
              <Text size={fontMedium}>{spentAmount}</Text>
            </View>
          </View>
          <View style={[styles?.contentVertical,{ alignItems: "flex-end",}]}>
            <Text size={fontSmall} variant="primarytextcolor2">
              {remainingAmountLabel}
            </Text>
            <View style={styles?.amountWrapper}>
              {isSar && (
                <SarFont size={fontMedium} lineHeight={lineHeightMedium} />
              )}
              <Text size={fontMedium} bold>
                {remainingAmount}
              </Text>
            </View>
          </View>
        </View>
      );
    }
  }, [
    small,
    completed,
    progressLabel,
    savedAmount,
    savedAmountLabel,
    spentAmount,
    spentAmountLabel,
    remainingAmount,
    remainingAmountLabel,
    styles,
    isSar,
  ]);

  return loading ? (
    <CategoryCardSkeleton isSmall={small} />
  ) : (
    <View
      style={[
        styles.container,
        small ? styles.containerVertical : styles.containerHorizontal,
      ]}
    >
      {small && <View style={styles.itemAddon}>{addonIcon}</View>}
      {small ? (
        <View style={styles.contentVertical}>
          <Text bold size={fontMediumLarge}>
            {headline || ""}
          </Text>
          <View style={styles.amountWrapper}>
            {isSar && (
              <SarFont
                size={fontMediumLarge}
                lineHeight={lineHeightMediumLarge}
              />
            )}
            <Text size={fontMediumLarge}>{amount || "0.00"}</Text>
          </View>
          <Text size={fontXSmall}>{amountLabel || ""}</Text>
        </View>
      ) : (
        listItemProps && (
          <ListItem
            addOn={addonIcon ? <View style={styles.itemAddon}>{addonIcon}</View> : undefined}
            overrideStyles={styles.listItemWrapper}
            {...listItemProps}
            showDivider={false}
          />
        )
      )}
      <View style={styles.progressContainer}>
        <ProgressIndicator
          progress={progressIndicatorPercentage}
          containerColor={theme.inverttransparent}
          progressColor={progressIndicatorColor}
        />
        {progressDescription}
        </View>
        {status && statusText && (<View style={{ marginTop: spacingS }}>
          {getStatus()}
        </View>)}
        {errorMessage && <View style={styles.errorMessageContainer}>
          <InfoFrame fill={theme.primarycolor3static} />
          <Text variant="primarycolor3static" size={fontSmall} overrideStyles={{ textAlign: "left" }}>{errorMessage}</Text>
        </View>}
    </View>
  );
};

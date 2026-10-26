import fonts from "../../../../assets/styles/constants/fonts";

/**
 * Format currency for display - converts SAR to use SAR_Font
 */
export const formatCurrencyForDisplay = (
  currency: string
): { text: string; fontFamily: string } => {
  const upperCurrency = currency.toUpperCase();
  if (upperCurrency === "SAR") {
    return {
      text: currency,
      fontFamily: fonts.SAR_Font,
    };
  }
  return {
    text: currency,
    fontFamily: fonts.HSBC,
  };
};

/**
 * Format date for tooltip: "Jan 16" format
 */
export const formatTooltipDate = (
  dateString: string,
  t: (key: string) => string
): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "";
    }
    const monthNames = [
      t("months.jan"),
      t("months.feb"),
      t("months.mar"),
      t("months.apr"),
      t("months.may"),
      t("months.jun"),
      t("months.jul"),
      t("months.aug"),
      t("months.sep"),
      t("months.oct"),
      t("months.nov"),
      t("months.dec"),
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    return `${month} ${day}`;
  } catch (error) {
    return "";
  }
};

const formatAmountNumber = (amount: number): string =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export type TooltipAmountParts = {
  /** Prefix before currency code, e.g. "+" for credits */
  prefix: string;
  currencyLabel: string;
  amountLabel: string;
};

/**
 * Split currency + number so SAR_Font is only applied to the currency code.
 * Applying SAR_Font to digits causes ligature/overlap glitches.
 */
export const formatTooltipAmountParts = (
  currency: string,
  amount: number,
  options?: { prefix?: string }
): TooltipAmountParts => ({
  prefix: options?.prefix ?? "",
  currencyLabel: currency,
  amountLabel: formatAmountNumber(amount),
});

/**
 * Format category credit amount for tooltip: "+SAR 32.00"
 */
export const formatTooltipCreditAmount = (
  currency: string,
  creditAmount: number
): string => {
  const { prefix, currencyLabel, amountLabel } = formatTooltipAmountParts(
    currency,
    creditAmount,
    { prefix: "+" }
  );
  return `${prefix}${currencyLabel} ${amountLabel}`;
};

/**
 * Format spending amount for tooltip: "SAR 0.00"
 */
export const formatTooltipAmount = (
  currency: string,
  amount: number
): string => {
  const { currencyLabel, amountLabel } = formatTooltipAmountParts(
    currency,
    amount
  );
  return `${currencyLabel} ${amountLabel}`;
};

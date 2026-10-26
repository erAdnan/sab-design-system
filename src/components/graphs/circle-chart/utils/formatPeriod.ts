import i18next from "i18next";
import { TimeFrame } from "../types/types";

export const formatPeriodLabel = (timeFrame: TimeFrame): string => {
  switch (timeFrame) {
    case "thisMonth":
      return i18next.t("timeFrame.thisMonth");
    case "lastMonth":
      return i18next.t("timeFrame.lastMonth");
    case "3Months":
      return i18next.t("timeFrame.3Months");
    case "6Months":
      return i18next.t("timeFrame.6Months");
    case "12Months":
      return i18next.t("timeFrame.12Months");
    case "currentYear":
      return i18next.t("timeFrame.currentYear");
    case "lastYear":
      return i18next.t("timeFrame.lastYear");
    default:
      return i18next.t("timeFrame.thisMonth");
  }
};

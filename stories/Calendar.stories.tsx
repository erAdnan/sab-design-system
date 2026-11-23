import * as allStories from "./Calendar.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { fn } from "storybook/test";
import { Calendar } from "../src/components/calendar/Calendar";
import { mobileFrameDecorators } from "../.storybook/mobileContentFrame";

/** Stable Figma reference month (Aug 2025 — Pulse Calendar docs examples). */
const VIEW_MONTH = new Date(2025, 7, 1);
const SELECTED_DATE = new Date(2025, 7, 12);

export default {
  decorators: mobileFrameDecorators,
  title: "Components/Data Display/Calendar",
  component: Calendar,
  tags: ["!autodocs"],
  argTypes: {
    selectedDate: { control: false },
    defaultViewMonth: { control: false },
    defaultPickerMode: {
      control: "radio",
      options: [null, "month", "year"],
    },
  },
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: null,
    defaultPickerMode: null,
    onDateSelect: fn().mockName("onDateSelect"),
    testID: "calendar",
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Weeks, Language=English */
export const GregorianWeeks = {
  name: "Gregorian · Weeks",
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: null,
    defaultPickerMode: null,
  },
};

/** Figma Calendar — Gregorian Weeks with a selected day */
export const GregorianWeeksSelected = {
  name: "Gregorian · Weeks · Selected",
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: null,
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Months, Language=English */
export const GregorianMonths = {
  name: "Gregorian · Months",
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: "month",
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Years, Language=English */
export const GregorianYears = {
  name: "Gregorian · Years",
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: "year",
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Weeks, Language=Arabic */
export const GregorianWeeksArabic = {
  name: "Gregorian · Weeks · Arabic",
  globals: { locale: "ar" },
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: null,
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Months, Language=Arabic */
export const GregorianMonthsArabic = {
  name: "Gregorian · Months · Arabic",
  globals: { locale: "ar" },
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: "month",
  },
};

/** Figma Calendar — Type=Gregorian, Unit=Years, Language=Arabic */
export const GregorianYearsArabic = {
  name: "Gregorian · Years · Arabic",
  globals: { locale: "ar" },
  args: {
    defaultViewMonth: VIEW_MONTH,
    selectedDate: SELECTED_DATE,
    defaultPickerMode: "year",
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
  "GregorianWeeks",
  "GregorianWeeksSelected",
  "GregorianMonths",
  "GregorianYears",
  "GregorianWeeksArabic",
  "GregorianMonthsArabic",
  "GregorianYearsArabic",
]);

import React, { FC, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import {
  fontMedium,
  fontMediumLarge,
  radiusS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  CALENDAR_MONTH_INDEXES,
  MONTH_SHORT_KEYS,
} from "./calendarUtils";
import { AutomationProps, getAutomationProps } from "../automationProps";

const GRID_COLUMNS = 4;
const CELL_WIDTH = actuatedNormalize(80);
const CELL_HEIGHT = actuatedNormalize(44);
const SELECTED_CHIP_WIDTH = actuatedNormalize(72);
const SELECTED_CHIP_HEIGHT = actuatedNormalize(36);
const YEAR_PAGE_SIZE = 12;

export type CalendarPickerMode = "month" | "year";

export interface CalendarMonthYearViewProps extends AutomationProps {
  mode: CalendarPickerMode;
  /** Year used for the active month highlight / year page anchor. */
  pickerYear: number;
  /** First year shown in the year grid page. */
  yearPageStart: number;
  /** Month index (0–11) highlighted when mode is month. */
  activeMonth: number | null;
  onMonthSelect: (month: number) => void;
  onYearSelect: (year: number) => void;
}

/**
 * Month or year selection grid — 4-column layout matching Figma Calendar picker.
 */
export const CalendarMonthYearView: FC<CalendarMonthYearViewProps> = ({
  mode,
  pickerYear,
  yearPageStart,
  activeMonth,
  onMonthSelect,
  onYearSelect,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const monthRows = useMemo(() => {
    const rows: (typeof CALENDAR_MONTH_INDEXES[number])[][] = [];
    for (let i = 0; i < CALENDAR_MONTH_INDEXES.length; i += GRID_COLUMNS) {
      rows.push(CALENDAR_MONTH_INDEXES.slice(i, i + GRID_COLUMNS));
    }
    return rows;
  }, []);

  const yearRows = useMemo(() => {
    const years = Array.from(
      { length: YEAR_PAGE_SIZE },
      (_, index) => yearPageStart + index
    );
    const rows: number[][] = [];
    for (let i = 0; i < years.length; i += GRID_COLUMNS) {
      rows.push(years.slice(i, i + GRID_COLUMNS));
    }
    return rows;
  }, [yearPageStart]);

  return (
    <View
      style={styles.root}
      {...getAutomationProps(testID, accessibilityLabel, "calendar-month-year")}
    >
      {mode === "month"
        ? monthRows.map((row, rowIndex) => (
            <View key={`month-row-${rowIndex}`} style={styles.row}>
              {row.map((monthIndex) => {
                const isActive =
                  activeMonth !== null && monthIndex === activeMonth;
                const shortKey = MONTH_SHORT_KEYS[monthIndex];

                return (
                  <Pressable
                    key={shortKey}
                    style={styles.cell}
                    onPress={() => onMonthSelect(monthIndex)}
                    {...getAutomationProps(
                      testID ? `${testID}-month-${shortKey}` : undefined,
                      accessibilityLabel
                        ? `${accessibilityLabel}-month-${shortKey}`
                        : undefined,
                      shortKey
                    )}
                  >
                    {isActive ? (
                      <View
                        style={[
                          styles.selectedChip,
                          { backgroundColor: theme.primarycolor3static },
                        ]}
                      />
                    ) : null}
                    <Text
                      size={fontMediumLarge}
                      variant={
                        isActive ? "primarycolor4static" : "primarycolor"
                      }
                    >
                      {t(`months.${shortKey}`)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))
        : yearRows.map((row, rowIndex) => (
            <View key={`year-row-${rowIndex}`} style={styles.row}>
              {row.map((year) => {
                const isActive = year === pickerYear;

                return (
                  <Pressable
                    key={year}
                    style={styles.cell}
                    onPress={() => onYearSelect(year)}
                    {...getAutomationProps(
                      testID ? `${testID}-year-${year}` : undefined,
                      accessibilityLabel
                        ? `${accessibilityLabel}-year-${year}`
                        : undefined,
                      String(year)
                    )}
                  >
                    {isActive ? (
                      <View
                        style={[
                          styles.selectedChip,
                          { backgroundColor: theme.primarycolor3static },
                        ]}
                      />
                    ) : null}
                    <Text
                      size={fontMedium}
                      variant={
                        isActive ? "primarycolor4static" : "primarycolor"
                      }
                    >
                      {String(year)}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}
    </View>
  );
};

export const YEAR_PICKER_PAGE_SIZE = YEAR_PAGE_SIZE;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  cell: {
    width: CELL_WIDTH,
    height: CELL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedChip: {
    position: "absolute",
    width: SELECTED_CHIP_WIDTH,
    height: SELECTED_CHIP_HEIGHT,
    borderRadius: radiusS,
  },
});

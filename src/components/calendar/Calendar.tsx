import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import {
  I18nManager,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import {
  fontLarge,
  fontMedium,
  fontMediumLarge,
  fontXLarge,
  lineHeightMedium,
  lineHeightXXLarge,
  radiusS,
  spacingM,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  CalendarMonthYearView,
  YEAR_PICKER_PAGE_SIZE,
  type CalendarPickerMode,
} from "./CalendarMonthYearView";
import {
  addMonths,
  addYears,
  buildCalendarRows,
  CALENDAR_WEEKDAY_KEYS,
  getMonthLabel,
  isSameCalendarDay,
  setCalendarMonthYear,
  startOfMonth,
  type CalendarCell,
} from "./calendarUtils";
import { AutomationProps, getAutomationProps } from "../automationProps";

/** Figma `_Calendar cell item`: 48×44 */
const CALENDAR_CELL_WIDTH = actuatedNormalize(48);
const CALENDAR_CELL_HEIGHT = actuatedNormalize(44);
/** Figma weekday label width */
const WEEKDAY_CELL_WIDTH = actuatedNormalize(40);
const ICON_SIZE = actuatedNormalize(24);

export interface CalendarProps extends AutomationProps {
  /** Currently selected date (highlights the matching day). */
  selectedDate?: Date | null;
  /** Month shown when there is no selected date. Defaults to the current month. */
  defaultViewMonth?: Date;
  /** Called when the user taps a day in the current month. */
  onDateSelect: (date: Date) => void;
  /**
   * Optional override for the month/year pill press.
   * When omitted, the built-in month/year picker is toggled.
   */
  onMonthPillPress?: () => void;
  overrideStyles?: StyleProp<ViewStyle>;
}

/**
 * Month grid calendar with weekday headers, month navigation, and day selection.
 * Matches Figma Calendar (Gregorian / Weeks) — Post-Launch Fixes.
 */
export const Calendar: FC<CalendarProps> = ({
  selectedDate = null,
  defaultViewMonth,
  onDateSelect,
  onMonthPillPress,
  overrideStyles,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [viewMonth, setViewMonth] = useState(() => {
    if (selectedDate) return startOfMonth(selectedDate);
    if (defaultViewMonth) return startOfMonth(defaultViewMonth);
    return startOfMonth(new Date());
  });
  const [pickerMode, setPickerMode] = useState<CalendarPickerMode | null>(null);
  const [yearPageStart, setYearPageStart] = useState(() => {
    const year = (selectedDate ?? defaultViewMonth ?? new Date()).getFullYear();
    return year - 2;
  });

  useEffect(() => {
    if (selectedDate) {
      setViewMonth(startOfMonth(selectedDate));
    } else if (defaultViewMonth) {
      setViewMonth(startOfMonth(defaultViewMonth));
    }
  }, [selectedDate, defaultViewMonth]);

  const calendarRows = useMemo(
    () => buildCalendarRows(viewMonth),
    [viewMonth]
  );

  const onPrev = useCallback(() => {
    if (pickerMode === "year") {
      setYearPageStart((start) => start - YEAR_PICKER_PAGE_SIZE);
      return;
    }
    if (pickerMode === "month") {
      setViewMonth((current) => addYears(current, -1));
      return;
    }
    setViewMonth((current) => addMonths(current, -1));
  }, [pickerMode]);

  const onNext = useCallback(() => {
    if (pickerMode === "year") {
      setYearPageStart((start) => start + YEAR_PICKER_PAGE_SIZE);
      return;
    }
    if (pickerMode === "month") {
      setViewMonth((current) => addYears(current, 1));
      return;
    }
    setViewMonth((current) => addMonths(current, 1));
  }, [pickerMode]);

  const onDayPress = useCallback(
    (cell: CalendarCell) => {
      if (!cell.inCurrentMonth) return;
      onDateSelect(cell.date);
    },
    [onDateSelect]
  );

  const openPickerMode = useCallback(
    (mode: CalendarPickerMode) => {
      if (onMonthPillPress) {
        onMonthPillPress();
        return;
      }
      setPickerMode((current) => {
        if (current === mode) return null;
        return mode;
      });
      if (mode === "year") {
        setYearPageStart(viewMonth.getFullYear() - 2);
      }
    },
    [onMonthPillPress, viewMonth]
  );

  const onPickerMonthSelect = useCallback((month: number) => {
    setViewMonth((current) =>
      setCalendarMonthYear(current.getFullYear(), month)
    );
    setPickerMode(null);
  }, []);

  const onPickerYearSelect = useCallback((year: number) => {
    setViewMonth((current) => setCalendarMonthYear(year, current.getMonth()));
    setPickerMode(null);
  }, []);

  const monthPillActive = pickerMode === "month";
  const yearPillActive = pickerMode === "year";
  const isRtl = I18nManager.isRTL;
  // RTL row flips button sides; swap chevron glyphs so they stay outward-facing
  // on both iOS and Android (Android ignores header `direction: "ltr"`).
  const PrevChevron = isRtl ? ChevronRight : ChevronLeft;
  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <View
      style={[styles.root, overrideStyles]}
      {...getAutomationProps(testID, accessibilityLabel, "calendar")}
    >
      <View style={styles.header}>
        <Pressable
          onPress={onPrev}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          {...getAutomationProps(
            testID ? `${testID}-prev` : undefined,
            accessibilityLabel ? `${accessibilityLabel}-prev` : undefined,
            "prev"
          )}
        >
          <PrevChevron
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={theme.primarycolor}
          />
        </Pressable>

        <View style={styles.pillsRow}>
          <Pressable
            style={[
              styles.monthPill,
              {
                backgroundColor: monthPillActive
                  ? theme.primarycolorstatic
                  : theme.stylesblockbg,
              },
            ]}
            onPress={() => openPickerMode("month")}
            {...getAutomationProps(
              testID ? `${testID}-month-pill` : undefined,
              accessibilityLabel
                ? `${accessibilityLabel}-month-pill`
                : undefined,
              "month-pill"
            )}
          >
            <Text
              size={fontMedium}
              variant={monthPillActive ? "primarycolor4static" : "primarycolor"}
              overrideStyles={styles.pillText}
            >
              {getMonthLabel(viewMonth, t)}
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.yearPill,
              {
                backgroundColor: yearPillActive
                  ? theme.primarycolorstatic
                  : theme.stylesblockbg,
              },
            ]}
            onPress={() => openPickerMode("year")}
            {...getAutomationProps(
              testID ? `${testID}-year-pill` : undefined,
              accessibilityLabel
                ? `${accessibilityLabel}-year-pill`
                : undefined,
              "year-pill"
            )}
          >
            <Text
              size={fontMedium}
              variant={yearPillActive ? "primarycolor4static" : "primarycolor"}
              overrideStyles={styles.pillText}
            >
              {String(viewMonth.getFullYear())}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={onNext}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          {...getAutomationProps(
            testID ? `${testID}-next` : undefined,
            accessibilityLabel ? `${accessibilityLabel}-next` : undefined,
            "next"
          )}
        >
          <NextChevron
            width={ICON_SIZE}
            height={ICON_SIZE}
            fill={theme.primarycolor}
          />
        </Pressable>
      </View>

      {pickerMode ? (
        <CalendarMonthYearView
          mode={pickerMode}
          pickerYear={viewMonth.getFullYear()}
          yearPageStart={yearPageStart}
          activeMonth={viewMonth.getMonth()}
          onMonthSelect={onPickerMonthSelect}
          onYearSelect={onPickerYearSelect}
          testID={testID ? `${testID}-picker` : undefined}
          accessibilityLabel={
            accessibilityLabel ? `${accessibilityLabel}-picker` : undefined
          }
        />
      ) : (
        <View style={styles.calendarBody}>
          <View style={styles.weekdayRow}>
            {CALENDAR_WEEKDAY_KEYS.map((key) => (
              <View key={key} style={styles.weekdayCell}>
                <Text
                  size={fontMedium}
                  variant="primarytextcolor2"
                  overrideStyles={styles.weekdayText}
                >
                  {t(`calendar.weekdays.${key}`)}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.grid}>
            {calendarRows.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={styles.row}>
                {row.map((cell) => {
                  const isSelected =
                    selectedDate !== null &&
                    cell.inCurrentMonth &&
                    isSameCalendarDay(cell.date, selectedDate);
                  const dayLabel = String(cell.date.getDate());
                  const dayKey = `${cell.date.getFullYear()}-${cell.date.getMonth()}-${cell.date.getDate()}-${cell.inCurrentMonth}`;

                  return (
                    <Pressable
                      key={dayKey}
                      style={styles.dayCell}
                      onPress={() => onDayPress(cell)}
                      disabled={!cell.inCurrentMonth}
                      {...getAutomationProps(
                        testID ? `${testID}-day-${dayKey}` : undefined,
                        accessibilityLabel
                          ? `${accessibilityLabel}-day-${dayKey}`
                          : undefined,
                        dayLabel
                      )}
                    >
                      <Text
                        size={isSelected ? fontLarge : fontMediumLarge}
                        bold={isSelected}
                        variant={
                          isSelected
                            ? "primarycolor3static"
                            : cell.inCurrentMonth
                              ? "primarycolor"
                              : "primarycolor2_100"
                        }
                        overrideStyles={
                          isSelected ? styles.daySelectedText : styles.dayText
                        }
                      >
                        {dayLabel}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    width: "100%",
    alignItems: "center",
    gap: spacingM,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  pillsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  monthPill: {
    minWidth: actuatedNormalize(52),
    width: actuatedNormalize(118),
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRadius: radiusS,
    alignItems: "center",
    justifyContent: "center",
  },
  yearPill: {
    minWidth: actuatedNormalize(52),
    width: actuatedNormalize(98),
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRadius: radiusS,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    lineHeight: lineHeightMedium,
    textAlign: "center",
  },
  calendarBody: {
    alignItems: "center",
    gap: spacingXXS,
  },
  weekdayRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  weekdayCell: {
    width: WEEKDAY_CELL_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: {
    lineHeight: lineHeightMedium,
    textAlign: "center",
  },
  grid: {
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  dayCell: {
    width: CALENDAR_CELL_WIDTH,
    height: CALENDAR_CELL_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  dayText: {
    lineHeight: fontXLarge,
    textAlign: "center",
  },
  daySelectedText: {
    lineHeight: lineHeightXXLarge,
    textAlign: "center",
  },
});

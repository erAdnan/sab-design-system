import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import {
  spacingXXS,
  spacingXS,
  spacing1XS,
  spacingS,
  spacingM,
  spacingL,
  spacing1XL,
  spacingXL,
  spacingXXL,
  spacing4XXL,
  radiusXS,
  radiusS,
  radiusM,
  radiusL,
  radiusXL,
  fontSmall,
  fontMediumLarge,
  fontXLarge,
  fontXXLG2,
  fontWeightMedium,
  lineHeightSmall,
  lineHeightMediumLarge,
  lineHeightXLarge,
  lineHeightXXLG,
} from "../../src/assets/styles/constants/size";
import fonts from "../../src/assets/styles/constants/fonts";

import { tx } from "../../src/localization/tx";
export default {
  title: "Foundations/Spacing",
};

// Figma: "Spacing" page (69:6522). Doc-chrome colors mirror the Figma documentation frames.
const BORDER = "rgba(0,0,0,0.1)";
const TINT_RED = "#F9F2F3";
const PRIMARY_RED = "#DB0011";
const TABLE_MAX_WIDTH = 1208;

const spaces = [
  {
    name: "spacing.3XS",
    code: "spacingXXS",
    px: 4,
    value: spacingXXS,
    description:
      "The 4px spacing value is an additional unit in our design system, used for fine-tuning the spacing between smaller elements and the construction of the components.",
  },
  {
    name: "spacing.2XS",
    code: "spacingXS",
    px: 8,
    value: spacingXS,
    description:
      "The 8px spacing value is a fundamental unit in our design system, ensuring consistent and harmonious spacing across all user interfaces. This value is used as a base increment for margins, padding, and gaps between elements, creating a balanced and visually pleasing layout.",
  },
  {
    name: "spacing.XS",
    code: "spacing1XS",
    px: 12,
    value: spacing1XS,
    tint: true,
    description:
      "The 12px spacing value is used for spacing between elements like text, buttons, cards, or input fields. For example, 12px padding inside a button or margin between a label and an input field. This is an exception to the 8px multiple spacing rule, but it’s needed in this design system to ensure visual hierarchy or aligns elements better without breaking harmony.",
  },
  {
    name: "spacing.S",
    code: "spacingS",
    px: 16,
    value: spacingS,
    description:
      "The 16px spacing value is a crucial unit in our design system, offering a medium-level increment for layout spacing. This value is often used for margins, padding, and gaps between larger elements, ensuring a balanced and organized visual hierarchy.",
  },
  {
    name: "spacing.M",
    code: "spacingM",
    px: 24,
    value: spacingM,
    description:
      "The 24px spacing value is used primarily for creating substantial gaps and padding between major elements. This larger spacing value is ideal for defining clear separations, enhancing visual hierarchy, and improving overall readability.",
  },
  {
    name: "spacing.L",
    code: "spacingL",
    px: 32,
    value: spacingL,
    description:
      "The 32px is utilized for creating substantial gaps and padding around large elements and sections. This larger spacing increment helps to establish clear separations such us safe areas and enhance the visual hierarchy, making the design more readable and navigable.",
  },
  {
    name: "spacing.XL",
    code: "spacing1XL",
    px: 40,
    value: spacing1XL,
    description:
      "The 40px spacing value is an infrequent but important unit within our design system, reserved for exceptional cases requiring significant separation between elements. While not commonly used, this larger spacing increment is ideal for creating distinct visual breaks and emphasizing major sections or components.",
  },
  {
    name: "spacing.2XL",
    code: "spacingXL",
    px: 48,
    value: spacingXL,
    description:
      "The 48px spacing value is a seldom-used but significant unit in our design system. While it hasn't been applied yet, it's essential to include it in our range for potential future applications.",
  },
  {
    name: "spacing.3XXL",
    code: "spacingXXL",
    px: 64,
    value: spacingXXL,
    description:
      "The 64px spacing value is a seldom-used but significant unit in our design system. While it hasn't been applied yet, it's essential to include it in our range for potential future applications.",
  },
  {
    name: "spacing.4XXL",
    code: "spacing4XXL",
    px: 72,
    value: spacing4XXL,
    description:
      "The 72px spacing value is a seldom-used but significant unit in our design system. While it hasn't been applied yet, it's essential to include it in our range for potential future applications.",
  },
];

// Code-only radius tokens (not documented on the Figma Spacing page).
const radii = [
  { name: "radiusXS", px: 4, value: radiusXS },
  { name: "radiusS", px: 8, value: radiusS },
  { name: "radiusM", px: 12, value: radiusM },
  { name: "radiusL", px: 16, value: radiusL },
  { name: "radiusXL", px: 24, value: radiusXL },
];

const HEADER_COLS = ["Token", "Value", "Example", "Description"];

export const Tokens = () => (
  <ScrollView style={styles.scroll} contentContainerStyle={styles.wrap}>
    <View style={styles.page}>
      <Text style={styles.pageTitle}>{tx("The 8 pixel multiple spacing rule")}</Text>
      <Text style={styles.subtitle}>{tx("Design Principle")}</Text>
      <Text style={styles.paragraph}>
        {tx(
          "The principle of spacing in multiples of 8 pixels emphasises the importance of maintaining a consistent spacing of at least 8 pixels between adjacent elements throughout the interface. This spacing can be applied between buttons, text blocks, images, and other interactive or visual components. The concept of spacing in multiples of 8 pixels offers flexibility to adjust the spacing according to specific design needs. Designers can combine multiples of 8 pixels to achieve different spacing values (e.g. 16px, 24px, 32px), while maintaining consistency with the overall modular system."
        )}
      </Text>
      <Text style={styles.boldParagraph}>{tx("Values outside of the norm")}</Text>
      <Text style={[styles.paragraph, styles.redText]}>
        {tx(
          "There are always exceptions to the rule, but deviating from the spacing scales should be avoided whenever possible."
        )}
      </Text>

      <View style={styles.table}>
        <View style={styles.row}>
          {HEADER_COLS.map((col, index) => (
            <View
              key={col}
              style={[
                styles.cell,
                index === HEADER_COLS.length - 1 ? styles.cellFlex : styles.cellFixed,
              ]}
            >
              <Text style={styles.headerText}>{tx(col)}</Text>
            </View>
          ))}
        </View>
        {spaces.map((item) => (
          <View key={item.name} style={[styles.row, item.tint && styles.rowTint]}>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.name}</Text>
              <Text style={styles.cellSubText}>{item.code}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{`${item.px}px`}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <View
                style={[
                  styles.swatch,
                  { width: item.value, height: item.value },
                ]}
              >
                {item.px >= 32 ? (
                  <Text style={styles.swatchLabel}>{item.px}</Text>
                ) : null}
              </View>
            </View>
            <View style={[styles.cell, styles.cellFlex]}>
              <Text style={styles.cellText}>{tx(item.description)}</Text>
            </View>
          </View>
        ))}
      </View>

      <Text style={[styles.pageTitle, styles.radiusTitle]}>{tx("Radius")}</Text>
      <View style={styles.table}>
        {radii.map((item) => (
          <View key={item.name} style={styles.row}>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.name}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{`${item.px}px`}</Text>
            </View>
            <View style={[styles.cell, styles.cellFlex]}>
              <View
                style={[styles.radiusPreview, { borderRadius: item.value }]}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: { width: "100%" },
  wrap: { alignItems: "center", padding: spacingL },
  page: { width: "100%", maxWidth: TABLE_MAX_WIDTH },
  pageTitle: {
    fontFamily: fonts.Regular,
    fontWeight: "700",
    fontSize: fontXXLG2,
    lineHeight: lineHeightXXLG,
  },
  radiusTitle: { marginTop: spacingL },
  subtitle: {
    fontFamily: fonts.HSBC_Medium,
    fontWeight: fontWeightMedium,
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
    marginTop: spacingXS,
    marginBottom: spacingM,
  },
  paragraph: {
    fontFamily: fonts.Regular,
    fontSize: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
    marginBottom: spacingS,
  },
  boldParagraph: {
    fontFamily: fonts.Regular,
    fontWeight: "700",
    fontSize: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
  },
  redText: { color: "#730014" },
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: spacingS,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  rowTint: { backgroundColor: TINT_RED },
  cell: {
    justifyContent: "center",
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  cellFixed: { flex: 1, maxWidth: 200, minWidth: 0 },
  cellFlex: { flex: 3, minWidth: 0, borderRightWidth: 0 },
  headerText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  cellText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  cellSubText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    opacity: 0.6,
  },
  swatch: {
    backgroundColor: PRIMARY_RED,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  swatchLabel: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: 10,
    lineHeight: 14,
    color: "#FFFFFF",
  },
  radiusPreview: {
    width: 48,
    height: 48,
    backgroundColor: PRIMARY_RED,
  },
});

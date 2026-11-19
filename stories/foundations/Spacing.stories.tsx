import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
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
import { canvasTier } from "../../src/assets/styles/utils/responsive";
import { tx } from "../../src/localization/tx";
import { foundationsDocsCanvas } from "../../.storybook/foundationsDocs";

/**
 * Figma: Spacing page (69:6522), frame “Spacing” (69:6524).
 * Columns: Token | Value | Example | Description
 */

const BORDER = "rgba(0,0,0,0.1)";
const TINT_RED = "#F9F2F3";
const PRIMARY_RED = "#DB0011";
const COMPLIMENTARY_RED3 = "#730014";
const TABLE_MAX_WIDTH = 1208;
const COL_TOKEN = 200;
const COL_VALUE = 200;
const COL_EXAMPLE = 199;
const COL_DESC = 609;
const TABLE_MIN = COL_TOKEN + COL_VALUE + COL_EXAMPLE + COL_DESC;

type SpaceToken = {
  name: string;
  code: string;
  px: number;
  value: number;
  /** Optional override for example box size (Figma quirks). */
  examplePx?: number;
  tint?: boolean;
  description: string;
  /** Trailing phrase styled in complimentary red (spacing.XS exception). */
  exceptionNote?: string;
};

const spaces: SpaceToken[] = [
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
    examplePx: 12,
    tint: true,
    description:
      "The 12px spacing value is used for spacing between elements like text, buttons, cards, or input fields. For example, 12px padding inside a button or margin between a label and an input field.",
    exceptionNote:
      "This is an exception to the 8px multiple spacing rule, but it’s needed in this design system to ensure visual hierarchy or aligns elements better without breaking harmony.",
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
    // Figma example box is 38px with label “40”
    examplePx: 38,
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
    // Figma example box is 84px with label “72”
    examplePx: 84,
    description:
      "The 72px spacing value is a seldom-used but significant unit in our design system. While it hasn't been applied yet, it's essential to include it in our range for potential future applications.",
  },
];

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return { pad: isMobile ? spacingS : spacingL };
};

const SpacingExample = ({ item }: { item: SpaceToken }) => {
  const size = item.examplePx ?? item.px;
  const showLabel = item.px >= 32;
  return (
    <View
      style={[
        styles.swatch,
        {
          width: size,
          height: size,
        },
      ]}
    >
      {showLabel ? (
        <Text style={styles.swatchLabel}>{item.px}</Text>
      ) : null}
    </View>
  );
};

export default {
  title: "Foundations/Spacing",
  parameters: {
    layout: "fullscreen",
    docs: {
      ...foundationsDocsCanvas,
      description: {
        component:
          "SAB Pulse spacing foundations from Figma (node 69:6522): the 8px multiple spacing rule and spacing.3XS → spacing.4XXL tokens.",
      },
    },
  },
};

/** Figma frame “Spacing” (69:6524). */
export const Spacing = {
  name: "Spacing",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Spacing”: 8px multiple design principle, exception callout for spacing.XS (12px), and the full token table with Value, Example, and Description.",
      },
    },
  },
  render: () => {
    const { pad } = useDocPad();
    return (
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.wrap, { padding: pad }]}
      >
        <View style={styles.page}>
          <Text style={styles.pageTitle}>{tx("Spacing")}</Text>

          <Text style={styles.sectionTitle}>
            {tx("The 8 pixel multiple spacing rule")}
          </Text>
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

          <ScrollView horizontal showsHorizontalScrollIndicator>
            <View style={[styles.table, { minWidth: TABLE_MIN }]}>
              <View style={[styles.row, styles.headerRow]}>
                <View style={[styles.cell, { width: COL_TOKEN }]}>
                  <Text style={styles.headerText}>{tx("Token")}</Text>
                </View>
                <View style={[styles.cell, { width: COL_VALUE }]}>
                  <Text style={styles.headerText}>{tx("Value")}</Text>
                </View>
                <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                  <Text style={styles.headerText}>{tx("Example")}</Text>
                </View>
                <View style={[styles.cell, styles.cellLast, { width: COL_DESC }]}>
                  <Text style={styles.headerText}>{tx("Description")}</Text>
                </View>
              </View>

              {spaces.map((item) => (
                <View
                  key={item.name}
                  style={[styles.row, item.tint && styles.rowTint]}
                >
                  <View style={[styles.cell, { width: COL_TOKEN }]}>
                    <Text style={styles.cellText}>{item.name}</Text>
                    <Text style={styles.cellSubText}>{item.code}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_VALUE }]}>
                    <Text style={styles.cellText}>{`${item.px}px`}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                    <SpacingExample item={item} />
                  </View>
                  <View
                    style={[styles.cell, styles.cellLast, { width: COL_DESC }]}
                  >
                    <Text style={styles.cellText}>
                      {tx(item.description)}
                      {item.exceptionNote ? " " : ""}
                      {item.exceptionNote ? (
                        <Text style={styles.exceptionText}>
                          {tx(item.exceptionNote)}
                        </Text>
                      ) : null}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    );
  },
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#FFFFFF", width: "100%" },
  wrap: { alignItems: "center", width: "100%" },
  page: { width: "100%", maxWidth: TABLE_MAX_WIDTH },
  pageTitle: {
    fontFamily: fonts.HSBC_Bold,
    fontWeight: "700",
    fontSize: fontXXLG2,
    lineHeight: lineHeightXXLG,
    marginBottom: spacingS,
  },
  sectionTitle: {
    fontFamily: fonts.HSBC_Bold,
    fontWeight: "700",
    fontSize: fontXXLG2,
    lineHeight: lineHeightXXLG,
  },
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
    fontFamily: fonts.HSBC_Bold,
    fontWeight: "700",
    fontSize: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
  },
  redText: { color: COMPLIMENTARY_RED3 },
  exceptionText: {
    color: COMPLIMENTARY_RED3,
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: spacingS,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerRow: { backgroundColor: "#FFFFFF" },
  rowTint: { backgroundColor: TINT_RED },
  cell: {
    justifyContent: "center",
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  cellLast: { borderRightWidth: 0 },
  headerText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    fontWeight: "500",
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
    opacity: 0.55,
    marginTop: 2,
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
    fontWeight: "500",
  },
});

import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  spacingXS,
  spacingS,
  spacingM,
  spacingL,
  radiusXS,
  radiusS,
  radiusM,
  radiusL,
  radiusXL,
  strokeNone,
  strokeXS,
  strokeS,
  strokeM,
  fontSmall,
  fontMedium,
  fontMediumLarge,
  fontXLarge,
  fontXXLG2,
  fontWeightMedium,
  lineHeightSmall,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightXLarge,
  lineHeightXXLG,
} from "../../src/assets/styles/constants/size";
import fonts from "../../src/assets/styles/constants/fonts";
import { canvasTier } from "../../src/assets/styles/utils/responsive";
import { tx } from "../../src/localization/tx";

/**
 * Figma: Border Radius page (69:6599)
 * Frames: “Border radius” (69:6600), “Border stroke” (1346:3437)
 */

const BORDER = "rgba(0,0,0,0.1)";
const PRIMARY_RED = "#DB0011";
const COMPLIMENTARY_RED3 = "#730014";
const COMPLIMENTARY_RED2 = "#BA1110";
const STROKE_RED_TINT = "#E5B2B5";
const TABLE_MAX = 1208;
const COL_TOKEN = 200;
const COL_VALUE = 200;
const COL_EXAMPLE = 199;
const COL_DESC = 494;
const TABLE_MIN = COL_TOKEN + COL_VALUE + COL_EXAMPLE + COL_DESC;

const radii = [
  {
    name: "radius.XS",
    code: "radiusXS",
    px: 4,
    value: radiusXS,
    description:
      "The 4px round corner value is a subtle design option in our system, providing a gentle, rounded edge for UI elements. While it is not currently in use, having this option available offers flexibility for future designs.",
  },
  {
    name: "radius.S",
    code: "radiusS",
    px: 8,
    value: radiusS,
    description:
      "The 8px round corner value is a fundamental value in our design system, used to apply a soft, rounded edge to UI components. This value is applicable for all elements and containers with a curvature",
  },
  {
    name: "radius.M",
    code: "radiusM",
    px: 12,
    value: radiusM,
    description:
      "The 12px round corner value is a notable option within our design system, though it is not currently in use. While not yet applied, having the 24px option available ensures flexibility for future designs, allowing for a distinctive and cohesive appearance when needed.",
  },
  {
    name: "radius.L",
    code: "radiusL",
    px: 16,
    value: radiusL,
    description:
      "The 16px round corner value is a prominent design feature within our system, used to apply a substantial, rounded edge to UI components. This value is applicable for bottom sheets",
  },
  {
    name: "radius.XL",
    code: "radiusXL",
    px: 24,
    value: radiusXL,
    description:
      "The 16px round corner value is a notable option within our design system, though it is not currently in use. While not yet applied, having the 24px option available ensures flexibility for future designs, allowing for a distinctive and cohesive appearance when needed.",
  },
];

const strokes = [
  {
    name: "stroke.none",
    code: "strokeNone",
    pxLabel: "0px",
    value: strokeNone,
    description: "No border stroke.",
  },
  {
    name: "stroke.XS",
    code: "strokeXS",
    pxLabel: "0.5px",
    value: strokeXS,
    description: "Hairline stroke for subtle outlines.",
  },
  {
    name: "stroke.S",
    code: "strokeS",
    pxLabel: "1px",
    value: strokeS,
    description: "Default stroke width for borders and dividers.",
  },
  {
    name: "stroke.M",
    code: "strokeM",
    pxLabel: "2px",
    value: strokeM,
    description: "Emphasized stroke for stronger borders and focus states.",
  },
];

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return { pad: isMobile ? spacingS : spacingL, isMobile };
};

const PageChrome = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { pad } = useDocPad();
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.wrap, { padding: pad }]}
    >
      <View style={styles.page}>
        <Text style={styles.pageTitle}>{tx(title)}</Text>
        {children}
      </View>
    </ScrollView>
  );
};

const TokenTableHeader = () => (
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
);

const NestedCornersDiagram = () => (
  <View style={styles.diagramPanel}>
    <View style={styles.diagramRow}>
      <View style={styles.doColumn}>
        <View style={styles.formulaPill}>
          <Text style={styles.formulaText}>outer r= inner r + padding</Text>
        </View>
        <View style={styles.nestedOuter}>
          <View style={styles.nestedInner} />
          <Text style={[styles.measureLabel, styles.measureBlue, styles.padLabel]}>
            6px
          </Text>
          <Text style={[styles.measureLabel, styles.measureRed, styles.gapLabel]}>
            10px
          </Text>
        </View>
        <Text style={[styles.measureLabel, styles.measureOuter]}>16px</Text>
      </View>

      <View style={styles.dontCard}>
        <Text style={styles.dontTitle}>{tx("Don´t")}</Text>
        <Text style={styles.dontBody}>
          {tx("Use the same corner radius for both parent and child element")}
        </Text>
        <View style={styles.dontNestedOuter}>
          <View style={styles.dontNestedInner} />
          <Text style={[styles.dontMeasure, styles.dontOuterLabel]}>16px</Text>
          <Text style={[styles.dontMeasure, styles.dontInnerLabel]}>16px</Text>
        </View>
      </View>
    </View>
  </View>
);

export default {
  title: "Foundations/Border Radius",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SAB Pulse border radius and stroke foundations from Figma (node 69:6599): radius.XS→XL tokens, nested corner principle, and stroke.none→M widths.",
      },
    },
  },
};

/** Figma frame “Border radius” (69:6600). */
export const BorderRadius = {
  name: "Border Radius",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Border radius”: radius.XS 4px → radius.S 8px → radius.M 12px → radius.L 16px → radius.XL 24px, with example swatches and usage notes.",
      },
    },
  },
  render: () => (
    <PageChrome title="Border radius">
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={[styles.table, { minWidth: TABLE_MIN }]}>
          <TokenTableHeader />
          {radii.map((item) => (
            <View key={item.name} style={styles.row}>
              <View style={[styles.cell, { width: COL_TOKEN }]}>
                <Text style={styles.cellText}>{item.name}</Text>
                <Text style={styles.cellSubText}>{item.code}</Text>
              </View>
              <View style={[styles.cell, { width: COL_VALUE }]}>
                <Text style={styles.cellText}>{`${item.px}px`}</Text>
              </View>
              <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                <View
                  style={[
                    styles.radiusBox,
                    { borderRadius: item.value },
                  ]}
                />
              </View>
              <View style={[styles.cell, styles.cellLast, { width: COL_DESC }]}>
                <Text style={styles.cellText}>{tx(item.description)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </PageChrome>
  ),
};

/** Figma frame “Border stroke” (1346:3437). */
export const BorderStroke = {
  name: "Border Stroke",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Border stroke”: nested rounded-corners principle (outer r = inner r + padding), Don’t example, and stroke.none / XS / S / M widths.",
      },
    },
  },
  render: () => (
    <PageChrome title="Border stroke">
      <Text style={styles.sectionTitle}>{tx("Nested rounded corners")}</Text>
      <Text style={styles.principleKicker}>{tx("Design Principle")}</Text>
      <Text style={styles.paragraph}>
        {tx(
          "The border radius of the outer element should be equal to the sum of the border radius of the inner element and the distance between the two elements. This can be mathematically expressed as:"
        )}
      </Text>

      <NestedCornersDiagram />

      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View style={[styles.table, { minWidth: TABLE_MIN, marginTop: spacingM }]}>
          <TokenTableHeader />
          {strokes.map((item) => (
            <View key={item.name} style={styles.row}>
              <View style={[styles.cell, { width: COL_TOKEN }]}>
                <Text style={styles.cellText}>{item.name}</Text>
                <Text style={styles.cellSubText}>{item.code}</Text>
              </View>
              <View style={[styles.cell, { width: COL_VALUE }]}>
                <Text style={styles.cellText}>{item.pxLabel}</Text>
              </View>
              <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                <View
                  style={[
                    styles.strokeBox,
                    {
                      borderWidth: item.value,
                      borderColor:
                        item.value === 0 ? "transparent" : STROKE_RED_TINT,
                    },
                  ]}
                />
              </View>
              <View style={[styles.cell, styles.cellLast, { width: COL_DESC }]}>
                <Text style={styles.cellText}>{tx(item.description)}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </PageChrome>
  ),
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#FFFFFF" },
  wrap: { alignItems: "center", width: "100%" },
  page: { width: "100%", maxWidth: TABLE_MAX, gap: spacingS },
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
    marginTop: spacingXS,
  },
  principleKicker: {
    fontFamily: fonts.HSBC_Medium,
    fontWeight: fontWeightMedium,
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
  },
  paragraph: {
    fontFamily: fonts.Regular,
    fontSize: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
    marginBottom: spacingS,
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    alignSelf: "flex-start",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerRow: { minHeight: 50, backgroundColor: "#FFFFFF" },
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
  radiusBox: {
    width: 80,
    height: 40,
    backgroundColor: PRIMARY_RED,
  },
  strokeBox: {
    width: 80,
    height: 40,
    borderRadius: radiusXS,
    backgroundColor: "#FFFFFF",
  },
  diagramPanel: {
    backgroundColor: "#F5F5F5",
    borderRadius: radiusS,
    paddingVertical: spacingL,
    paddingHorizontal: spacingM,
    width: "100%",
  },
  diagramRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: spacingL,
  },
  doColumn: {
    alignItems: "center",
    gap: spacingS,
    maxWidth: 382,
  },
  formulaPill: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#DDDBDB",
    borderRadius: 35,
    paddingHorizontal: spacingM,
    paddingVertical: 14,
  },
  formulaText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
    fontWeight: "500",
    textAlign: "center",
  },
  nestedOuter: {
    width: 200,
    height: 200,
    borderRadius: 56,
    borderWidth: 2,
    borderColor: "#DFDFDF",
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  nestedInner: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
    borderWidth: 2,
    borderColor: "#DFDFDF",
  },
  measureLabel: {
    fontFamily: fonts.Regular,
    fontSize: fontMedium,
    lineHeight: lineHeightMedium,
    position: "absolute",
  },
  measureBlue: { color: "#002673" },
  measureRed: { color: COMPLIMENTARY_RED3 },
  measureOuter: {
    color: COMPLIMENTARY_RED2,
    position: "relative",
    marginTop: 4,
  },
  padLabel: { top: 28, right: 28 },
  gapLabel: { top: 8, right: 8 },
  dontCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: STROKE_RED_TINT,
    borderRadius: radiusL,
    paddingHorizontal: spacingS,
    paddingVertical: spacingL,
    width: 320,
    minHeight: 360,
    alignItems: "center",
    gap: spacingM,
  },
  dontTitle: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
    color: COMPLIMENTARY_RED3,
    fontWeight: "500",
    alignSelf: "flex-start",
    marginLeft: spacingS,
  },
  dontBody: {
    fontFamily: fonts.Regular,
    fontSize: fontMedium,
    lineHeight: lineHeightMedium,
    color: COMPLIMENTARY_RED3,
    alignSelf: "flex-start",
    marginLeft: spacingS,
    maxWidth: 232,
  },
  dontNestedOuter: {
    width: 160,
    height: 148,
    borderRadius: radiusL,
    borderWidth: 2,
    borderColor: "#DFDFDF",
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: spacingM,
  },
  dontNestedInner: {
    width: "100%",
    height: "100%",
    borderRadius: radiusL,
    borderWidth: 2,
    borderColor: "#DFDFDF",
  },
  dontMeasure: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    position: "absolute",
  },
  dontOuterLabel: {
    color: COMPLIMENTARY_RED3,
    top: -22,
    alignSelf: "center",
  },
  dontInnerLabel: {
    color: COMPLIMENTARY_RED2,
    top: 18,
    alignSelf: "center",
  },
});

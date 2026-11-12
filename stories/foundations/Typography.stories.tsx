import React from "react";
import { ScrollView, View, Text, StyleSheet, TextStyle } from "react-native";
import {
  spacingXS,
  spacingS,
  spacingM,
  spacingL,
  fontXXSmall,
  fontXSmall,
  fontSmall,
  fontSmallMedium,
  fontMedium,
  fontMediumLarge,
  fontLarge,
  fontXLarge,
  fontXXLarge,
  fontXLG,
  fontXXLG2,
  font3XLG,
  lineHeightXXSmall,
  lineHeightXSmall,
  lineHeightSmall,
  lineHeightSmallMedium,
  lineHeightMedium,
  lineHeightMediumLarge,
  lineHeightLarge,
  lineHeightXLarge,
  lineHeightXXLarge,
  lineHeightXLG,
  lineHeightXXLG,
  fontWeightLight,
  fontWeightRegular,
  fontWeightMedium,
  fontWeightBold,
} from "../../src/assets/styles/constants/size";
import fonts from "../../src/assets/styles/constants/fonts";

import { tx } from "../../src/localization/tx";
export default {
  title: "Foundations/Typography",
};

// Figma: "Typography" page (24:2) — SAB English type scale.
// Doc-chrome colors mirror the Figma documentation frames (not product tokens).
const BORDER = "rgba(0,0,0,0.1)";
const TINT_RED = "#F9F2F3";
const TABLE_MAX_WIDTH = 1208;

type WeightKey = "light" | "regular" | "medium" | "bold";

const weights: { token: WeightKey; value: string; description: string }[] = [
  {
    token: "light",
    value: fontWeightLight,
    description:
      "200 (Light): Extremely light, almost hairline. Best used at larger sizes for subtlety. Not currently used in the journeys, kept for future applications.",
  },
  {
    token: "regular",
    value: fontWeightRegular,
    description:
      "400 (Regular/Normal): Standard weight for body text. Default weight for most text, ensuring readability.",
  },
  {
    token: "medium",
    value: fontWeightMedium,
    description: "500 (Medium): Slightly emphasised text, e.g. headlines and labels.",
  },
  {
    token: "bold",
    value: fontWeightBold,
    description:
      "700 (Bold): Strong and attention-grabbing. Often used for primary headings, buttons, and important labels.",
  },
];

const weightStyle = (weight: WeightKey): TextStyle => {
  switch (weight) {
    case "light":
      return { fontFamily: fonts.Light, fontWeight: "200" };
    case "medium":
      return { fontFamily: fonts.HSBC_Medium, fontWeight: "500" };
    case "bold":
      // Native bold families often ignore fontWeight; mirror fonts.withTrueBoldWeight.
      return { fontFamily: fonts.Regular, fontWeight: "700" };
    default:
      return { fontFamily: fonts.Regular, fontWeight: "400" };
  }
};

const fontSizes = [
  { token: "fontSize-XXSmall", value: fontXXSmall, lineHeight: lineHeightXXSmall, description: "FontSize-DoubleExtraSmall" },
  { token: "fontSize-XSmall", value: fontXSmall, lineHeight: lineHeightXSmall, description: "FontSize-ExtraSmall" },
  { token: "fontSize-Small", value: fontSmall, lineHeight: lineHeightSmall, description: "FontSize-Small" },
  { token: "fontSize-SmallMedium", value: fontSmallMedium, lineHeight: lineHeightSmallMedium, description: "FontSize-SmallMedium" },
  { token: "fontSize-Medium", value: fontMedium, lineHeight: lineHeightMedium, description: "FontSize-Medium" },
  { token: "fontSize-MediumLarge", value: fontMediumLarge, lineHeight: lineHeightMediumLarge, description: "FontSize-MediumLarge" },
  { token: "fontSize-Large", value: fontLarge, lineHeight: lineHeightLarge, description: "FontSize-Large" },
  { token: "fontSize-XLarge", value: fontXLarge, lineHeight: lineHeightXLarge, description: "FontSize-ExtraLarge" },
  { token: "fontSize-XXLarge", value: fontXXLarge, lineHeight: lineHeightXXLarge, description: "FontSize-DoubleExtraLarge" },
  { token: "fontSize-XLG", value: fontXLG, lineHeight: lineHeightXLG, description: "FontSize-XExtraLarge" },
  // Figma fontSize-XXLG = 30 (code: fontXXLG2); fontSize-3XLG = 34 (code: font3XLG)
  { token: "fontSize-XXLG", value: fontXXLG2, lineHeight: lineHeightXXLG, description: "FontSize-DoubleXExtraLarge" },
  { token: "fontSize-3XLG", value: font3XLG, lineHeight: lineHeightXXLG, description: "FontSize-TripleXExtraLarge" },
];

const lineHeights = [
  { token: "lineHeight-XXSmall", value: lineHeightXXSmall },
  { token: "lineHeight-XSmall", value: lineHeightXSmall },
  { token: "lineHeight-Small", value: lineHeightSmall },
  { token: "lineHeight-SmallMedium", value: lineHeightSmallMedium },
  { token: "lineHeight-Medium", value: lineHeightMedium },
  { token: "lineHeight-MediumLarge", value: lineHeightMediumLarge },
  { token: "lineHeight-Large", value: lineHeightLarge },
  { token: "lineHeight-XLarge", value: lineHeightXLarge },
  { token: "lineHeight-XXLarge", value: lineHeightXXLarge },
  { token: "lineHeightXLG", value: lineHeightXLG },
  { token: "lineHeight-XXLG", value: lineHeightXXLG },
];

// Text styles: SAB English/{Regular|Medium|Bold}/{Style}
const textStyles = [
  { name: "Caption 2", size: fontXXSmall, lineHeight: lineHeightXXSmall, sizeToken: "fontSize-XXSmall", lineToken: "lineHeight-XXSmall" },
  { name: "Caption 1", size: fontXSmall, lineHeight: lineHeightXSmall, sizeToken: "fontSize-XSmall", lineToken: "lineHeight-XSmall" },
  { name: "Footnote", size: fontSmall, lineHeight: lineHeightSmall, sizeToken: "fontSize-Small", lineToken: "lineHeight-Small" },
  { name: "Subhead", size: fontSmallMedium, lineHeight: lineHeightSmallMedium, sizeToken: "fontSize-SmallMedium", lineToken: "lineHeight-SmallMedium" },
  { name: "Callout", size: fontMedium, lineHeight: lineHeightMedium, sizeToken: "fontSize-Medium", lineToken: "lineHeight-Medium" },
  { name: "Body", size: fontMediumLarge, lineHeight: lineHeightMediumLarge, sizeToken: "fontSize-MediumLarge", lineToken: "lineHeight-MediumLarge" },
  { name: "Headline", size: fontLarge, lineHeight: lineHeightLarge, sizeToken: "fontSize-Large", lineToken: "lineHeight-Large" },
  { name: "Title 3", size: fontXLarge, lineHeight: lineHeightXLarge, sizeToken: "fontSize-XLarge", lineToken: "lineHeight-XLarge" },
  { name: "Title 2", size: fontXXLarge, lineHeight: lineHeightXXLarge, sizeToken: "fontSize-XXLarge", lineToken: "lineHeight-XXLarge" },
  { name: "Title 1", size: fontXLG, lineHeight: lineHeightXLG, sizeToken: "fontSize-XLG", lineToken: "lineHeightXLG" },
  { name: "LargeTitle", size: fontXXLG2, lineHeight: lineHeightXXLG, sizeToken: "fontSize-XXLG", lineToken: "lineHeight-XXLG" },
  { name: "ExtraLargeTitle", size: font3XLG, lineHeight: lineHeightXXLG, sizeToken: "fontSize-3XLG", lineToken: "lineHeight-XXLG" },
];

const styleWeights: { key: WeightKey; label: string }[] = [
  { key: "regular", label: "Regular" },
  { key: "medium", label: "Medium" },
  { key: "bold", label: "Bold" },
];

const Header = ({ cols }: { cols: string[] }) => (
  <View style={[styles.row, styles.headerRow]}>
    {cols.map((col, index) => (
      <View key={col} style={[styles.cell, cellWidth(index, cols.length)]}>
        <Text style={styles.headerText}>{tx(col)}</Text>
      </View>
    ))}
  </View>
);

const cellWidth = (index: number, count: number) =>
  index === count - 1 ? styles.cellFlex : styles.cellFixed;

const Section = ({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{tx(title)}</Text>
    {intro ? <Text style={styles.paragraph}>{tx(intro)}</Text> : null}
    <View style={styles.table}>{children}</View>
  </View>
);

export const Scale = () => (
  <ScrollView
    style={styles.scroll}
    contentContainerStyle={styles.wrap}
  >
    <View style={styles.page}>
      <Text style={styles.pageTitle}>{tx("Typography")}</Text>
      <Text style={styles.paragraph}>
        {tx("Font family: Univers Next for HSBC (native system fonts in the app).")}
      </Text>

      <Section
        title="Font Weight"
        intro="Font size and level of boldness (font weight) work together to establish hierarchy and readability."
      >
        <Header cols={["Token", "Value", "Example", "Description"]} />
        {weights.map((item, index) => (
          <View
            key={item.token}
            style={[styles.row, index % 2 === 1 && styles.rowTint]}
          >
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.token}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.value}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text
                style={[
                  weightStyle(item.token),
                  { fontSize: fontMedium, lineHeight: lineHeightMedium },
                ]}
              >
                {tx("Label")}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellFlex]}>
              <Text style={styles.cellText}>{tx(item.description)}</Text>
            </View>
          </View>
        ))}
      </Section>

      <Section title="Font Size">
        <Header cols={["Token", "Value", "Example", "Description"]} />
        {fontSizes.map((item, index) => (
          <View
            key={item.token}
            style={[styles.row, index % 2 === 1 && styles.rowTint]}
          >
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.token}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.value}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text
                style={{
                  fontFamily: fonts.Regular,
                  fontSize: item.value,
                  lineHeight: item.lineHeight,
                }}
              >
                {tx("Label")}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellFlex]}>
              <Text style={styles.cellText}>{item.description}</Text>
            </View>
          </View>
        ))}
      </Section>

      <Section title="Line Height">
        <Header cols={["Token", "Value", "Example", "Description"]} />
        {lineHeights.map((item, index) => (
          <View
            key={item.token}
            style={[styles.row, index % 2 === 1 && styles.rowTint]}
          >
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.token}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.value}</Text>
            </View>
            <View style={[styles.cell, styles.cellFixed]}>
              <Text style={styles.cellText}>{item.value}</Text>
            </View>
            <View style={[styles.cell, styles.cellFlex]}>
              <Text style={styles.cellText}>{item.token}</Text>
            </View>
          </View>
        ))}
      </Section>

      <Section
        title="English Typography Scale"
        intro="Token names combine three nested values: font weight, font size and line height."
      >
        <Header cols={["Token", "Nested Token (Weight)", "Nested Token (Size)", "Example"]} />
        {textStyles.map((style) =>
          styleWeights.map((weight, weightIndex) => (
            <View
              key={`${style.name}-${weight.key}`}
              style={[styles.row, weightIndex === 1 && styles.rowTint]}
            >
              <View style={[styles.cell, styles.cellFixed]}>
                <Text style={styles.cellText}>{style.name}</Text>
              </View>
              <View style={[styles.cell, styles.cellFixed]}>
                <Text style={styles.cellText}>{weight.label}</Text>
              </View>
              <View style={[styles.cell, styles.cellFixed]}>
                <Text style={styles.cellText}>{style.sizeToken}</Text>
                <Text style={styles.cellSubText}>{style.lineToken}</Text>
              </View>
              <View style={[styles.cell, styles.cellFlex]}>
                <Text
                  style={[
                    weightStyle(weight.key),
                    { fontSize: style.size, lineHeight: style.lineHeight },
                  ]}
                >
                  {tx("Label")}
                </Text>
              </View>
            </View>
          ))
        )}
      </Section>
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
    marginBottom: spacingXS,
  },
  section: { marginTop: spacingL },
  sectionTitle: {
    fontFamily: fonts.Regular,
    fontWeight: "700",
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
    marginBottom: spacingXS,
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
    marginTop: spacingXS,
    marginBottom: spacingM,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  rowTint: { backgroundColor: TINT_RED },
  headerRow: { backgroundColor: "#FFFFFF" },
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
});

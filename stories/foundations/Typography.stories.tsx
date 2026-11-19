import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextStyle,
  useWindowDimensions,
} from "react-native";
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
} from "../../src/assets/styles/constants/size";
import fonts from "../../src/assets/styles/constants/fonts";
import { canvasTier } from "../../src/assets/styles/utils/responsive";

import { tx } from "../../src/localization/tx";
import { FigmaDocPage } from "../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { PLATFORM_AGNOSTIC_IMAGES } from "./typography/catalog";
import { foundationsDocsCanvas } from "../../.storybook/foundationsDocs";

/**
 * Figma: Typography page (24:2)
 * Frames (L→R): Typography · Platform agnostic · Font Weight · Font Size ·
 * Line height · Typography-English · Typography-Arabic · Saudi Riyal Symbol SAR
 */
export default {
  title: "Foundations/Typography",
  parameters: {
    docs: {
      ...foundationsDocsCanvas,
      description: {
        component:
          "SAB Pulse typography foundations from Figma (node 24:2): platform-agnostic system fonts, font weight, size, line height, English and Arabic text styles, and the Saudi Riyal (SAR) symbol scale.",
      },
    },
  },
};

const BORDER = "rgba(0,0,0,0.1)";
const TINT_RED = "#F9F2F3";
const TABLE_MAX_WIDTH = 1208;
const PILL_BG = "#F2F3F4";

type WeightKey = "light" | "regular" | "medium" | "bold";

const weights: { token: WeightKey; value: string; description: string }[] = [
  {
    token: "light",
    value: "200",
    description:
      "200 (Light): Extremely light, almost hairline. Best used at larger sizes for subtlety. This value is not currently used in the journeys, but it will remain in place for future applications.",
  },
  {
    token: "regular",
    value: "400",
    description:
      "400 (Regular/Normal): Standard weight for body text. Default weight for most text, ensuring readability.",
  },
  {
    token: "medium",
    value: "500",
    description:
      "500 (Medium/Normal): Standard weight for body text. Default weight for most text, ensuring readability.",
  },
  {
    token: "bold",
    value: "700",
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
      return { fontFamily: fonts.Regular, fontWeight: "700" };
    default:
      return { fontFamily: fonts.Regular, fontWeight: "400" };
  }
};

/** Figma Font Size frame — Value column is design px; `size` is the code token for examples. */
const fontSizes = [
  { token: "fontSize-XXSmall", designPx: 10, size: fontXXSmall, lineHeight: lineHeightXXSmall, description: "FontSize-DoubleExtraSmall" },
  { token: "fontSize-XSmall", designPx: 11, size: fontXSmall, lineHeight: lineHeightXSmall, description: "FontSize-ExtraSmall" },
  { token: "fontSize-Small", designPx: 12, size: fontSmall, lineHeight: lineHeightSmall, description: "FontSize-Small" },
  { token: "fontSize-SmallMedium", designPx: 13, size: fontSmallMedium, lineHeight: lineHeightSmallMedium, description: "FontSize-SmallMedium" },
  { token: "fontSize-Medium", designPx: 14, size: fontMedium, lineHeight: lineHeightMedium, description: "FontSize-Medium" },
  { token: "fontSize-MediumLarge", designPx: 15, size: fontMediumLarge, lineHeight: lineHeightMediumLarge, description: "FontSize-MediumLarge" },
  { token: "fontSize-Large", designPx: 17, size: fontLarge, lineHeight: lineHeightLarge, description: "FontSize-Large" },
  { token: "fontSize-XLarge", designPx: 20, size: fontXLarge, lineHeight: lineHeightXLarge, description: "FontSize-ExtraLarge" },
  { token: "fontSize-XXLarge", designPx: 22, size: fontXXLarge, lineHeight: lineHeightXXLarge, description: "FontSize-DoubleExtraLarge" },
  { token: "fontSize-XLG", designPx: 26, size: fontXLG, lineHeight: lineHeightXLG, description: "FontSize-XExtraLarge" },
  // Figma variable name is "fontSize-XXLG 2"; docs table token is fontSize-XXLG = 30
  { token: "fontSize-XXLG", designPx: 30, size: fontXXLG2, lineHeight: lineHeightXXLG, description: "FontSize-DoubleXExtraLarge" },
  { token: "fontSize-3XLG", designPx: 34, size: font3XLG, lineHeight: lineHeightXXLG, description: "FontSize-TripleXExtraLarge" },
];

/** Figma Line height frame — Value is design px. */
const lineHeights = [
  { token: "lineHeight-XXSmall", designPx: 14, value: lineHeightXXSmall, description: "FontSize-DoubleExtraSmall" },
  { token: "lineHeight-XSmall", designPx: 15, value: lineHeightXSmall, description: "FontSize-ExtraSmall" },
  { token: "lineHeight-Small", designPx: 16, value: lineHeightSmall, description: "FontSize-Small" },
  { token: "lineHeight-SmallMedium", designPx: 17, value: lineHeightSmallMedium, description: "FontSize-SmallMedium" },
  { token: "lineHeight-Medium", designPx: 18, value: lineHeightMedium, description: "FontSize-Medium" },
  { token: "lineHeight-MediumLarge", designPx: 20, value: lineHeightMediumLarge, description: "FontSize-Medium" },
  { token: "lineHeight-Large", designPx: 22, value: lineHeightLarge, description: "FontSize-MediumLarge" },
  { token: "lineHeight-XLarge", designPx: 25, value: lineHeightXLarge, description: "FontSize-Large" },
  { token: "lineHeight-XXLarge", designPx: 28, value: lineHeightXXLarge, description: "FontSize-ExtraLarge" },
  { token: "lineHeightXLG", designPx: 32, value: lineHeightXLG, description: "FontSize-DoubleExtraLarge" },
  { token: "lineHeight-XXLG", designPx: 41, value: lineHeightXXLG, description: "FontSize-DoubleXExtraLarge" },
];

type TextStyleRow = {
  name: string;
  size: number;
  lineHeight: number;
  sizeToken: string;
  lineToken: string;
  /** Per-weight usage notes from Figma (regular / medium / bold). */
  usage: { regular: string; medium: string; bold: string };
};

const FUTURE =
  "This text style does not have a specific use defined yet, but it’s essential to include it in the library for future applications.";

const englishStyles: TextStyleRow[] = [
  {
    name: "Caption 2",
    size: fontXXSmall,
    lineHeight: lineHeightXXSmall,
    sizeToken: "fontSize-XXSmall",
    lineToken: "lineHeight-XXSmall",
    usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
  },
  {
    name: "Caption 1",
    size: fontXSmall,
    lineHeight: lineHeightXSmall,
    sizeToken: "fontSize-XSmall",
    lineToken: "lineHeight-XSmall",
    usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
  },
  {
    name: "Footnote",
    size: fontSmall,
    lineHeight: lineHeightSmall,
    sizeToken: "fontSize-Small",
    lineToken: "lineHeight-Small",
    usage: {
      regular: "Used for all support text and quick access buttons for Level 2",
      medium: "Used for all support text and quick access buttons for Level 2",
      bold: FUTURE,
    },
  },
  {
    name: "Subhead",
    size: fontSmallMedium,
    lineHeight: lineHeightSmallMedium,
    sizeToken: "fontSize-SmallMedium",
    lineToken: "lineHeight-SmallMedium",
    usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
  },
  {
    name: "Callout",
    size: fontMedium,
    lineHeight: lineHeightMedium,
    sizeToken: "fontSize-Medium",
    lineToken: "lineHeight-Medium",
    usage: {
      regular: "Used for all support text and quick access buttons for Level 1",
      medium: "Used for all support text and quick access buttons for Level 1",
      bold: FUTURE,
    },
  },
  {
    name: "Body",
    size: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
    sizeToken: "fontSize-MediumLarge",
    lineToken: "lineHeight-MediumLarge",
    usage: {
      regular: "Body text and entry text used across all journeys and screens",
      medium: "Body text and entry text used across all journeys and screens",
      bold: "Used fot main button text",
    },
  },
  {
    name: "Headline",
    size: fontLarge,
    lineHeight: lineHeightLarge,
    sizeToken: "fontSize-Large",
    lineToken: "lineHeight-Large",
    usage: {
      regular: FUTURE,
      medium: FUTURE,
      bold: "Secondary Title for Screen Level of navigation Level 2",
    },
  },
  {
    name: "Title 3",
    size: fontXLarge,
    lineHeight: lineHeightXLarge,
    sizeToken: "fontSize-XLarge",
    lineToken: "lineHeight-XLarge",
    usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
  },
  {
    // Figma English/Arabic/SAR docs label Title 2 as fontSize-XLarge / lineHeight-XLarge,
    // while the example glyph is 22 (fontSize-XXLarge). Match the doc labels; keep px = 22.
    name: "Title 2",
    size: fontXXLarge,
    lineHeight: lineHeightXXLarge,
    sizeToken: "fontSize-XLarge",
    lineToken: "lineHeight-XLarge",
    usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
  },
  {
    name: "Title 1",
    size: fontXLG,
    lineHeight: lineHeightXLG,
    sizeToken: "fontSize-XLG",
    lineToken: "lineHeightXLG",
    usage: {
      regular: FUTURE,
      medium: FUTURE,
      bold: "Primary Title for Screen Level of navigation Level 1",
    },
  },
  {
    // Figma variable: fontSize-XXLG 2 = 30; docs token: fontSize-XXLG
    name: "LargeTitle",
    size: fontXXLG2,
    lineHeight: lineHeightXXLG,
    sizeToken: "fontSize-XXLG",
    lineToken: "lineHeight-XXLG",
    usage: {
      regular: FUTURE,
      medium: "Text style to be used in accounts balance among other uses",
      bold: "Text style to be used in accounts balance among other uses",
    },
  },
  {
    // English docs token: fontSize-2XXLG; Font Size frame variable is fontSize-3XLG = 34
    name: "ExtraLargeTitle",
    size: font3XLG,
    lineHeight: lineHeightXXLG,
    sizeToken: "fontSize-2XXLG",
    lineToken: "lineHeight-XXLG",
    usage: {
      regular: "Text style to be used in accounts balance among other uses",
      medium: FUTURE,
      bold: FUTURE,
    },
  },
];

/**
 * Arabic scale (Typography-Arabic). Ends at LargeTitle (no ExtraLargeTitle).
 * Docs label LargeTitle as fontSize-XXLG; example glyph is 34 (same as English ExtraLargeTitle).
 */
const arabicStyles: TextStyleRow[] = englishStyles
  .filter((s) => s.name !== "ExtraLargeTitle")
  .map((s) => {
    if (s.name === "LargeTitle") {
      return {
        ...s,
        size: font3XLG,
        sizeToken: "fontSize-XXLG",
        lineToken: "lineHeight-XXLG",
        usage: { regular: FUTURE, medium: FUTURE, bold: FUTURE },
      };
    }
    return { ...s, usage: { ...s.usage } };
  });

const styleWeights: { key: Exclude<WeightKey, "light">; label: string }[] = [
  { key: "regular", label: "Regular" },
  { key: "medium", label: "Medium" },
  { key: "bold", label: "Bold" },
];

type SarRow = {
  name: string;
  size: number;
  lineHeight: number;
  sizeToken: string;
  lineToken: string;
  gap: 0 | 2;
  description: string;
};

/** Fixed cols before Description — Description width hugs its text. */
const SAR_TABLE_FIXED_COLS = 130 + 120 + 150 + 160 + 220 + 280;

const sarStyles: SarRow[] = [
  {
    name: "Caption 2",
    size: fontXXSmall,
    lineHeight: lineHeightXXSmall,
    sizeToken: "fontSize-XXSmall",
    lineToken: "lineHeight-XXSmall",
    gap: 0,
    description: "The symbol is applied to any Regular or Bold English or Arabic Caption2 style.",
  },
  {
    name: "Caption 1",
    size: fontXSmall,
    lineHeight: lineHeightXSmall,
    sizeToken: "fontSize-XSmall",
    lineToken: "lineHeight-XSmall",
    gap: 0,
    description: "The symbol is applied to any Regular or Bold English or Arabic Caption1 style.",
  },
  {
    name: "Footnote",
    size: fontSmall,
    lineHeight: lineHeightSmall,
    sizeToken: "fontSize-Small",
    lineToken: "lineHeight-Small",
    gap: 0,
    description: "The symbol is applied to any Regular or Bold English or Arabic Footnote style.",
  },
  {
    name: "Subhead",
    size: fontSmallMedium,
    lineHeight: lineHeightSmallMedium,
    sizeToken: "fontSize-SmallMedium",
    lineToken: "lineHeight-SmallMedium",
    gap: 0,
    description: "The symbol is applied to any Regular or Bold English or Arabic Subhead style.",
  },
  {
    name: "Callout",
    size: fontMedium,
    lineHeight: lineHeightMedium,
    sizeToken: "fontSize-Medium",
    lineToken: "lineHeight-Medium",
    gap: 0,
    description: "The symbol is applied to any Regular or Bold English or Arabic Callout style.",
  },
  {
    name: "Body",
    size: fontMediumLarge,
    lineHeight: lineHeightMediumLarge,
    sizeToken: "fontSize-MediumLarge",
    lineToken: "lineHeight-MediumLarge",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic Body style.",
  },
  {
    name: "Headline",
    size: fontLarge,
    lineHeight: lineHeightLarge,
    sizeToken: "fontSize-Large",
    lineToken: "lineHeight-Large",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic Headline style.",
  },
  {
    name: "Title 3",
    size: fontXLarge,
    lineHeight: lineHeightXLarge,
    sizeToken: "fontSize-XLarge",
    lineToken: "lineHeight-XLarge",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic Title3 style.",
  },
  {
    // SAR docs label Title 2 as fontSize-XLarge; example amount is 22
    name: "Title 2",
    size: fontXXLarge,
    lineHeight: lineHeightXXLarge,
    sizeToken: "fontSize-XLarge",
    lineToken: "lineHeight-XLarge",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic Title2 style.",
  },
  {
    name: "Title 1",
    size: fontXLG,
    lineHeight: lineHeightXLG,
    sizeToken: "fontSize-XLG",
    lineToken: "lineHeightXLG",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic Title1 style.",
  },
  {
    name: "LargeTitle",
    size: fontXXLG2,
    lineHeight: lineHeightXXLG,
    sizeToken: "fontSize-XXLG",
    lineToken: "lineHeight-XXLG",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic LargeTitle style.",
  },
  {
    // SAR docs label ExtraLargeTitle as fontSize-XXLG; example amount is 34
    name: "ExtraLargeTitle",
    size: font3XLG,
    lineHeight: lineHeightXXLG,
    sizeToken: "fontSize-XXLG",
    lineToken: "lineHeight-XXLG",
    gap: 2,
    description: "The symbol is applied to any Regular or Bold English or Arabic LargeTitle style.",
  },
];

const AR_EXAMPLE = "تسمية";
const EN_EXAMPLE = "Label";
const SAR_AMOUNT = "12,234.00";

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return {
    isMobile,
    pad: isMobile ? spacingS : spacingL,
    maxWidth: TABLE_MAX_WIDTH,
  };
};

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

const HScrollTable = ({
  children,
  minWidth = 720,
  force = false,
  hug,
}: {
  children: React.ReactNode;
  minWidth?: number;
  /** Always scroll horizontally (needed for wide SAR / docs panels). */
  force?: boolean;
  /** Size scroll content to children (no stretched trailing column). */
  hug?: boolean;
}) => {
  const { isMobile } = useDocPad();
  if (!force && !isMobile) return <>{children}</>;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <View
        style={[
          { minWidth },
          hug && {
            alignSelf: "flex-start",
            // RN-web: shrink wrap so Description isn't padded with empty width
            width: "fit-content" as unknown as number,
          },
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

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
    {children}
  </View>
);

const Table = ({
  children,
  minWidth,
  forceScroll,
  hug,
}: {
  children: React.ReactNode;
  minWidth?: number;
  forceScroll?: boolean;
  /** Shrink table border to content width (no empty trailing column). */
  hug?: boolean;
}) => (
  <View style={[styles.table, hug && styles.tableHug]}>
    <HScrollTable minWidth={minWidth} force={forceScroll} hug={hug}>
      {children}
    </HScrollTable>
  </View>
);

const FontPill = ({ label }: { label: string }) => (
  <View style={styles.pill}>
    <Text style={styles.pillText}>{label}</Text>
  </View>
);

const PageChrome = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const { pad, maxWidth } = useDocPad();
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={[styles.wrap, { padding: pad }]}>
      <View style={[styles.page, { maxWidth }]}>
        <Text style={styles.pageTitle}>{tx(title)}</Text>
        {children}
      </View>
    </ScrollView>
  );
};

const tokenPath = (
  locale: "English" | "Arabic",
  weight: string,
  sizeToken: string,
  lineToken: string
) => `${locale}/${weight}/${sizeToken}/${lineToken}`;

/** Figma intro copy (line break preserved). */
const EN_INTRO =
  "Below is a list of all token names associated with the English Typo Scale.\nThese token names are constructed using three nested values, which together define the typography properties for weight, size, and line height.";
const AR_INTRO =
  "Below is a list of all token names associated with the Arabic Typo Scale.\nThese token names are constructed using three nested values, which together define the typography properties for weight, size, and line height.";
const SAR_INTRO =
  "Below is a list of all token names associated with the SAR Typo Scale.\nThese token names are constructed using three nested values, which together define the typography properties for weight, size, and line height.";

/** Figma frame “Typography · Platform agnostic” (22374:812) — first frame under 24:2. */
export const PlatformAgnostic = {
  name: "Platform agnostic",
  parameters: {
    controls: { disable: true },
    a11y: { disable: true },
    docs: {
      description: {
        story:
          "Figma “Typography · Platform agnostic” (22374:812): one semantic typography system; SF Pro is the design reference, native system fonts at runtime (iOS / Android).",
      },
    },
  },
  render: () => (
    <FigmaDocPage
      title="Platform agnostic"
      eyebrow="Foundations"
      images={PLATFORM_AGNOSTIC_IMAGES}
    />
  ),
};

export const FontWeight = {
  name: "Font Weight",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Font Weight” (7048:20745): light 200, regular 400, medium 500, bold 700. Design Principle + token table (white rows).",
      },
    },
  },
  render: () => (
    <PageChrome title="Font Weight">
      <FontWeightTable />
    </PageChrome>
  ),
};

export const FontSize = {
  name: "Font Size",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Font Size” (7048:20788): XXSmall 10 → 3XLG 34. Design Principle + token table (white rows).",
      },
    },
  },
  render: () => (
    <PageChrome title="Font Size">
      <FontSizeTable />
    </PageChrome>
  ),
};

export const LineHeight = {
  name: "Line Height",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Line height” (7048:20903): XXSmall 14 → XXLG 41. Design Principle + token table (white rows).",
      },
    },
  },
  render: () => (
    <PageChrome title="Line Height">
      <LineHeightTable />
    </PageChrome>
  ),
};

export const English = {
  name: "English",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Typography-English” (7048:21029): Caption 2 → ExtraLargeTitle × Regular / Medium / Bold. Font pill matches Figma (Font TFF | Univers Next for HSBC).",
      },
    },
  },
  render: () => (
    <PageChrome title="Typography">
      <Section
        title="English Typography Scale"
        intro={EN_INTRO}
      >
        <FontPill label="Font TFF | Univers Next for HSBC" />
        <Table>
          <Header
            cols={[
              "Token",
              "Nested Token (Font Weight)",
              "Nested Token (Font Size)",
              "Nested Token (Line Height)",
              "Example",
              "Description",
            ]}
          />
          {englishStyles.map((style) =>
            styleWeights.map((weight) => (
              <View key={`${style.name}-${weight.key}`} style={styles.row}>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.name}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{weight.label}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.sizeToken}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.lineToken}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text
                    style={[
                      weightStyle(weight.key),
                      { fontSize: style.size, lineHeight: style.lineHeight },
                    ]}
                  >
                    {tx(EN_EXAMPLE)}
                  </Text>
                </View>
                <View style={[styles.cell, styles.cellFlex]}>
                  <Text style={styles.cellText}>
                    {tx(
                      `${tokenPath("English", weight.label, style.sizeToken, style.lineToken)} ${style.usage[weight.key]}`
                    )}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Table>
      </Section>
    </PageChrome>
  ),
};

export const Arabic = {
  name: "Arabic",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Typography-Arabic” (1402:4636): Caption 2 → LargeTitle × Regular / Medium / Bold. Font pill matches Figma (Font TFF | Univers arabica for HSBC).",
      },
    },
  },
  render: () => (
    <PageChrome title="Typography">
      <Section title="Arabic Typography Scale" intro={AR_INTRO}>
        <FontPill label="Font TFF | Univers arabica for HSBC" />
        <Table>
          <Header
            cols={[
              "Token",
              "Nested Token (Font Weight)",
              "Nested Token (Font Size)",
              "Nested Token (Line Height)",
              "Example",
              "Description",
            ]}
          />
          {arabicStyles.map((style) =>
            styleWeights.map((weight) => (
              <View key={`${style.name}-${weight.key}`} style={styles.row}>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.name}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{weight.label}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.sizeToken}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text style={styles.cellText}>{style.lineToken}</Text>
                </View>
                <View style={[styles.cell, styles.cellFixed]}>
                  <Text
                    style={[
                      weightStyle(weight.key),
                      {
                        fontSize: style.size,
                        lineHeight: style.lineHeight,
                        writingDirection: "rtl",
                        textAlign: "left",
                      },
                    ]}
                  >
                    {AR_EXAMPLE}
                  </Text>
                </View>
                <View style={[styles.cell, styles.cellFlex]}>
                  <Text style={styles.cellText}>
                    {`${tokenPath("Arabic", weight.label, style.sizeToken, style.lineToken)} ${style.usage[weight.key]}`}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Table>
      </Section>
    </PageChrome>
  ),
};

export const SaudiRiyalSymbol = {
  name: "Saudi Riyal Symbol",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Saudi Riyal Symbol SAR” (5553:5012): Regular/Bold × Caption 2 → ExtraLargeTitle. Font TFF | Saudi Riyal March12. No gap Caption→Callout; 2px Body→ExtraLargeTitle.",
      },
    },
  },
  render: () => (
    <PageChrome title="Typography SAR">
      <Section title="Saudi Riyal Symbol SAR" intro={SAR_INTRO}>
        <FontPill label="Font TFF | Saudi Riyal March12" />
        <View style={styles.gapRules}>
          <Text style={styles.gapRuleHeading}>{tx("Spacing Rule")}</Text>
          <View style={styles.gapRuleRow}>
            <Text style={styles.gapRuleLabel}>{tx("NO GAP SPACING")}</Text>
            <Text style={styles.gapRuleValues}>
              Caption 2 · Caption 1 · Footnote · Subhead · Callout
            </Text>
          </View>
          <View style={styles.gapRuleRow}>
            <Text style={styles.gapRuleLabel}>{tx("2px SPACING")}</Text>
            <Text style={styles.gapRuleValues}>
              Body · Headline · Title 3 · Title 2 · Title 1 · Large Title · ExtraLargeTitle
            </Text>
          </View>
        </View>
        <Table minWidth={SAR_TABLE_FIXED_COLS} forceScroll hug>
          <View style={[styles.row, styles.headerRow, styles.sarRowHug]}>
            <View style={[styles.cell, styles.sarColToken]}>
              <Text style={styles.headerText}>{tx("Token")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColWeight]}>
              <Text style={styles.headerText}>{tx("Nested Token (Font Weight)")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColSize]}>
              <Text style={styles.headerText}>{tx("Nested Token (Font Size)")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColLine]}>
              <Text style={styles.headerText}>{tx("Nested Token (Line Height)")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColExample]}>
              <Text style={styles.headerText}>{tx("Example")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColLarge]}>
              <Text style={styles.headerText}>{tx("Large Example")}</Text>
            </View>
            <View style={[styles.cell, styles.sarColDesc]}>
              <Text style={[styles.headerText, styles.sarDescText]} numberOfLines={1}>
                {tx("Description")}
              </Text>
            </View>
          </View>
          {sarStyles.map((style) =>
            (["regular", "bold"] as const).map((weightKey) => (
              <View
                key={`${style.name}-${weightKey}`}
                style={[styles.row, styles.sarRowHug]}
              >
                <View style={[styles.cell, styles.sarColToken]}>
                  <Text style={styles.cellText}>{style.name}</Text>
                </View>
                <View style={[styles.cell, styles.sarColWeight]}>
                  <Text style={styles.cellText}>
                    {weightKey === "regular" ? "Regular" : "Bold"}
                  </Text>
                </View>
                <View style={[styles.cell, styles.sarColSize]}>
                  <Text style={styles.cellText}>{style.sizeToken}</Text>
                </View>
                <View style={[styles.cell, styles.sarColLine]}>
                  <Text style={styles.cellText}>{style.lineToken}</Text>
                </View>
                <View style={[styles.cell, styles.sarColExample]}>
                  <SarAmount
                    size={style.size}
                    lineHeight={style.lineHeight}
                    gap={style.gap}
                    weight={weightKey}
                  />
                </View>
                <View style={[styles.cell, styles.sarColLarge]}>
                  <SarAmount
                    size={Math.max(style.size * 1.35, fontXLarge)}
                    lineHeight={Math.max(style.lineHeight * 1.25, lineHeightXLarge)}
                    gap={style.gap}
                    weight={weightKey}
                  />
                </View>
                <View style={[styles.cell, styles.sarColDesc]}>
                  <Text style={[styles.cellText, styles.sarDescText]} numberOfLines={1}>
                    {tx(style.description)}
                  </Text>
                </View>
              </View>
            ))
          )}
        </Table>
      </Section>
    </PageChrome>
  ),
};

/** Inline SAR glyph + amount — no wrapping View so columns don't overflow into each other. */
const SarAmount = ({
  size,
  lineHeight,
  gap,
  weight,
}: {
  size: number;
  lineHeight: number;
  gap: 0 | 2;
  weight: "regular" | "bold";
}) => (
  <View style={[styles.sarRow, { columnGap: gap }]}>
    <Text
      style={{
        fontFamily: fonts.SAR_Font,
        fontSize: size,
        lineHeight,
      }}
    >
      sar
    </Text>
    <Text
      style={[
        weightStyle(weight),
        {
          fontSize: size,
          lineHeight,
          flexShrink: 0,
        },
      ]}
      numberOfLines={1}
    >
      {SAR_AMOUNT}
    </Text>
  </View>
);

const PRINCIPLE =
  "Font size and level of boldness (font weight) work together to establish hierarchy and readability in design. Here’s how they generally interact:";

const FontWeightTable = () => (
  <Section title="Font Weight Levels">
    <Text style={styles.principleKicker}>{tx("Design Principle")}</Text>
    <Text style={styles.paragraph}>{tx(PRINCIPLE)}</Text>
    <Table>
      <Header cols={["Token", "Value", "Example", "Description"]} />
      {weights.map((item) => (
        <View key={item.token} style={styles.row}>
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
                { fontSize: fontSmall, lineHeight: lineHeightSmall },
              ]}
            >
              {tx(EN_EXAMPLE)}
            </Text>
          </View>
          <View style={[styles.cell, styles.cellFlex]}>
            <Text style={styles.cellText}>{tx(item.description)}</Text>
          </View>
        </View>
      ))}
    </Table>
  </Section>
);

const FontSizeTable = () => (
  <Section title="Font Size">
    <Text style={styles.principleKicker}>{tx("Design Principle")}</Text>
    <Text style={styles.paragraph}>{tx(PRINCIPLE)}</Text>
    <Table>
      <Header cols={["Token", "Value", "Example", "Description"]} />
      {fontSizes.map((item) => (
        <View key={item.token} style={styles.row}>
          <View style={[styles.cell, styles.cellFixed]}>
            <Text style={styles.cellText}>{item.token}</Text>
          </View>
          <View style={[styles.cell, styles.cellFixed]}>
            <Text style={styles.cellText}>{String(item.designPx)}</Text>
          </View>
          <View style={[styles.cell, styles.cellFixed]}>
            <Text
              style={{
                fontFamily: fonts.Regular,
                fontSize: item.size,
                lineHeight: item.lineHeight,
              }}
            >
              {tx(EN_EXAMPLE)}
            </Text>
          </View>
          <View style={[styles.cell, styles.cellFlex]}>
            <Text style={styles.cellText}>{item.description}</Text>
          </View>
        </View>
      ))}
    </Table>
  </Section>
);

const LineHeightTable = () => (
  <Section title="Line Height">
    <Text style={styles.principleKicker}>{tx("Design Principle")}</Text>
    <Text style={styles.paragraph}>{tx(PRINCIPLE)}</Text>
    <Table>
      <Header cols={["Token", "Value", "Example", "Description"]} />
      {lineHeights.map((item) => (
        <View key={item.token} style={styles.row}>
          <View style={[styles.cell, styles.cellFixed]}>
            <Text style={styles.cellText}>{item.token}</Text>
          </View>
          <View style={[styles.cell, styles.cellFixed]}>
            <Text style={styles.cellText}>{String(item.designPx)}</Text>
          </View>
          <View style={[styles.cell, styles.cellFixed]}>
            <View style={[styles.lhExample, { height: item.designPx }]}>
              <Text style={styles.lhExampleText}>{String(item.designPx)}</Text>
            </View>
          </View>
          <View style={[styles.cell, styles.cellFlex]}>
            <Text style={styles.cellText}>{item.description}</Text>
          </View>
        </View>
      ))}
    </Table>
  </Section>
);

const styles = StyleSheet.create({
  scroll: { width: "100%" },
  wrap: { alignItems: "center" },
  page: { width: "100%" },
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
  pill: {
    alignSelf: "flex-start",
    backgroundColor: PILL_BG,
    borderRadius: 8,
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    marginBottom: spacingS,
  },
  pillText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  gapRules: { gap: spacingXS, marginBottom: spacingS },
  gapRuleRow: { gap: 4 },
  gapRuleLabel: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    fontWeight: "500",
  },
  gapRuleValues: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    opacity: 0.75,
  },
  table: {
    borderWidth: 1,
    borderColor: BORDER,
    marginTop: spacingXS,
    marginBottom: spacingM,
  },
  tableHug: {
    alignSelf: "flex-start",
    maxWidth: "100%",
    width: "fit-content" as unknown as number,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: "#FFFFFF",
  },
  headerRow: { backgroundColor: "#FFFFFF" },
  gapRuleHeading: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontLarge,
    lineHeight: lineHeightLarge,
    fontWeight: "500",
    marginBottom: spacingXS,
  },
  cell: {
    justifyContent: "center",
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRightWidth: 1,
    borderRightColor: BORDER,
  },
  cellFixed: { flex: 1, maxWidth: 180, minWidth: 100 },
  cellFlex: { flex: 3, minWidth: 160, borderRightWidth: 0 },
  // SAR table columns — fixed widths so Example / Large Example never overlap Description
  sarRowHug: {
    alignSelf: "flex-start",
    width: "fit-content" as unknown as number,
  },
  sarColToken: { width: 130, flexGrow: 0, flexShrink: 0 },
  sarColWeight: { width: 120, flexGrow: 0, flexShrink: 0 },
  sarColSize: { width: 150, flexGrow: 0, flexShrink: 0 },
  sarColLine: { width: 160, flexGrow: 0, flexShrink: 0 },
  sarColExample: {
    width: 220,
    flexGrow: 0,
    flexShrink: 0,
    overflow: "hidden",
  },
  sarColLarge: {
    width: 280,
    flexGrow: 0,
    flexShrink: 0,
    overflow: "hidden",
  },
  // Description: column width = text width only
  sarColDesc: {
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: "auto",
    width: "auto",
    alignItems: "flex-start",
    borderRightWidth: 0,
  },
  sarDescText: {
    flexGrow: 0,
    flexShrink: 0,
    width: "auto",
    // RN-web: prevent Text from stretching to fill a wide cell
    alignSelf: "flex-start",
  },
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
  sarRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "nowrap",
    flexShrink: 0,
    maxWidth: "100%",
  },
  principleKicker: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontLarge,
    lineHeight: lineHeightLarge,
    fontWeight: "500",
    marginBottom: spacingXS,
  },
  lhExample: {
    backgroundColor: TINT_RED,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5B2B5",
    paddingHorizontal: 4,
    minWidth: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  lhExampleText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: 8,
    lineHeight: 11,
    color: "#DB0011",
    fontWeight: "500",
  },
});

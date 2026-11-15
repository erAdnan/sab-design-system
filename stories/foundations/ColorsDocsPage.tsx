import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import fonts from "../../src/assets/styles/constants/fonts";
import {
  fontSmall,
  fontMedium,
  fontXLarge,
  lineHeightSmall,
  lineHeightMedium,
  lineHeightXLarge,
  spacingXS,
  spacingS,
  spacingM,
  spacingL,
} from "../../src/assets/styles/constants/size";
import { canvasTier } from "../../src/assets/styles/utils/responsive";
import { tx } from "../../src/localization/tx";
import {
  colorDocSections,
  type ColorDocRow,
  type ColorDocSection,
} from "./colorsCatalog";

/** Figma Colors docs tables — Docs tab only (Palette canvas uses swatch cards). */

const BORDER = "#E5E6E5";
const HEADER_BG = "#F2F3F4";
const PAGE_BG = "#FFFFFF";
const TINT_RED = "#F9F2F3";
const RED = "#DB0011";
const TABLE_MIN = 300 + 300 + 300 + 300 + 520;

const COL = {
  token: 300,
  light: 300,
  dark: 300,
  code: 300,
  desc: 520,
} as const;

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return { pad: isMobile ? spacingS : spacingL };
};

function parseOpacity(pct?: string): number | undefined {
  if (!pct) return undefined;
  const n = parseFloat(pct.replace("%", ""));
  return Number.isFinite(n) ? n / 100 : undefined;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const h = hex.trim().replace("#", "");
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/i.test(h)) return null;
  const full =
    h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function resolveFill(color: string, opacityPct?: string): string {
  if (!color) return "transparent";
  if (/^rgba?\(/i.test(color)) return color;
  const alpha = parseOpacity(opacityPct);
  if (alpha === undefined) return color;
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

function isLightFill(value: string) {
  const hex = value.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 > 186;
  }
  const m = hex.match(
    /rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?/i
  );
  if (m) {
    const a = m[4] !== undefined ? parseFloat(m[4]) : 1;
    if (Number.isFinite(a) && a < 0.35) return true;
    const r = parseFloat(m[1]);
    const g = parseFloat(m[2]);
    const b = parseFloat(m[3]);
    return (r * 299 + g * 587 + b * 114) / 1000 > 186;
  }
  return false;
}

const ColorValue = ({
  color,
  opacity,
}: {
  color: string;
  opacity?: string;
}) => {
  if (!color) return <Text style={styles.cellText}>—</Text>;
  const fill = resolveFill(color, opacity);
  const border = isLightFill(fill);
  return (
    <View style={styles.valueRow}>
      <View
        style={[
          styles.swatch,
          {
            backgroundColor: fill,
            borderWidth: border ? 1 : 0,
            borderColor: BORDER,
          },
        ]}
      />
      <Text style={styles.cellText} numberOfLines={1}>
        {color}
        {opacity ? `  ${opacity}` : ""}
      </Text>
    </View>
  );
};

const TokenCell = ({ row }: { row: ColorDocRow }) => {
  const fill = resolveFill(row.light, row.lightOpacity);
  const border = isLightFill(fill);
  return (
    <View style={styles.valueRow}>
      <View
        style={[
          styles.swatch,
          {
            backgroundColor: fill,
            borderWidth: border ? 1 : 0,
            borderColor: BORDER,
          },
        ]}
      />
      <Text style={styles.tokenText} numberOfLines={2}>
        {row.token}
      </Text>
    </View>
  );
};

const ColorTable = ({ section }: { section: ColorDocSection }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{tx(section.title)}</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <View style={{ minWidth: TABLE_MIN }}>
        <View style={[styles.row, styles.headerRow]}>
          <View style={[styles.cell, { width: COL.token }]}>
            <Text style={styles.headerText}>{tx("Token")}</Text>
          </View>
          <View style={[styles.cell, { width: COL.light }]}>
            <Text style={styles.headerText}>{tx("Light Mode")}</Text>
          </View>
          <View style={[styles.cell, { width: COL.dark }]}>
            <Text style={styles.headerText}>{tx("Dark mode")}</Text>
          </View>
          <View style={[styles.cell, { width: COL.code }]}>
            <Text style={styles.headerText}>{tx("Code.name / Dev")}</Text>
          </View>
          <View style={[styles.cell, styles.cellLast, { width: COL.desc }]}>
            <Text style={styles.headerText}>{tx("Description")}</Text>
          </View>
        </View>
        {section.rows.map((row, index) => (
          <View
            key={`${section.id}-${row.token}-${row.code}-${index}`}
            style={[styles.row, index % 2 === 1 && styles.rowTint]}
          >
            <View style={[styles.cell, { width: COL.token }]}>
              <TokenCell row={row} />
            </View>
            <View style={[styles.cell, { width: COL.light }]}>
              <ColorValue color={row.light} opacity={row.lightOpacity} />
            </View>
            <View style={[styles.cell, { width: COL.dark }]}>
              <ColorValue color={row.dark} opacity={row.darkOpacity} />
            </View>
            <View style={[styles.cell, { width: COL.code }]}>
              <Text style={styles.codeText} numberOfLines={2}>
                {row.code}
              </Text>
            </View>
            <View style={[styles.cell, styles.cellLast, { width: COL.desc }]}>
              <Text style={styles.descText}>{row.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  </View>
);

export const ColorsDocsPage = () => {
  const { pad } = useDocPad();
  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.wrap, { padding: pad }]}
    >
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>{tx("Colors")}</Text>
        <Text style={styles.heroEyebrow}>{tx("Foundations")}</Text>
      </View>
      <Text style={styles.intro}>
        {tx(
          "Below is the Pulse colour scale from Figma (Colors ✅). Each token lists Light Mode, Dark mode, the Code.name / Dev key used in theme files, and usage guidance."
        )}
      </Text>
      {colorDocSections.map((section) => (
        <ColorTable key={section.id} section={section} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: PAGE_BG },
  wrap: {
    width: "100%",
    maxWidth: 1400,
    alignSelf: "center",
    paddingBottom: spacingL,
    gap: spacingM,
  },
  hero: {
    backgroundColor: TINT_RED,
    borderRadius: 12,
    paddingHorizontal: spacingM,
    paddingVertical: spacingL,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: spacingS,
  },
  heroTitle: {
    fontFamily: fonts.HSBC_Bold,
    fontSize: 40,
    lineHeight: 48,
    color: RED,
    fontWeight: "700",
  },
  heroEyebrow: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontMedium,
    lineHeight: lineHeightMedium,
    color: RED,
    fontWeight: "500",
  },
  intro: {
    fontFamily: fonts.Regular,
    fontSize: fontMedium,
    lineHeight: lineHeightMedium,
    color: "#626469",
    maxWidth: 900,
  },
  section: {
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: spacingS,
    overflow: "hidden",
  },
  sectionHeader: {
    backgroundColor: HEADER_BG,
    paddingHorizontal: spacingS,
    paddingVertical: spacingS,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    minHeight: 80,
    justifyContent: "center",
  },
  sectionTitle: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontXLarge,
    lineHeight: lineHeightXLarge,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  headerRow: { backgroundColor: PAGE_BG },
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
    flexShrink: 1,
  },
  tokenText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    fontWeight: "500",
    flexShrink: 1,
  },
  codeText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  descText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 4,
    flexShrink: 0,
  },
});

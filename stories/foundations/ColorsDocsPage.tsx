import React, { FC, ReactNode, useEffect, useRef } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import fonts from "../../src/assets/styles/constants/fonts";
import {
  fontSmall,
  fontXLarge,
  lineHeightSmall,
  lineHeightXLarge,
  spacingXS,
  spacingS,
  spacingL,
} from "../../src/assets/styles/constants/size";
import { canvasTier } from "../../src/assets/styles/utils/responsive";
import { tx } from "../../src/localization/tx";
import {
  colorDocSections,
  type ColorDocRow,
  type ColorDocSection,
} from "./colorsCatalog";

/** Figma Colours tables (4110:3851) — Palette2. */

const BORDER = "#E5E6E5";
const HEADER_BG = "#F2F3F4";
const PAGE_BG = "#FFFFFF";
const RED = "#DB0011";
const TABLE_WIDTH = 300 + 300 + 300 + 300 + 520;

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

const OpacityPill = ({ opacity }: { opacity?: string }) => {
  if (!opacity) return null;
  return (
    <View style={styles.opacityPill}>
      <Text style={styles.opacityPillText}>{opacity}</Text>
    </View>
  );
};

const NewBadge = () => (
  <View style={styles.newBadge}>
    <Text style={styles.newBadgeText}>{tx("New")}</Text>
  </View>
);

const Swatch = ({ fill }: { fill: string }) => {
  const border = isLightFill(fill);
  return (
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
  );
};

const ColorValue = ({
  color,
  opacity,
}: {
  color: string;
  opacity?: string;
}) => {
  if (!color) return <Text style={styles.cellText}>—</Text>;
  const fill = resolveFill(color, opacity);
  return (
    <View style={styles.valueRow}>
      <Swatch fill={fill} />
      <Text style={styles.cellText} numberOfLines={1}>
        {color}
      </Text>
      <OpacityPill opacity={opacity} />
    </View>
  );
};

const TokenCell = ({ row }: { row: ColorDocRow }) => {
  const fill = resolveFill(row.light, row.lightOpacity);
  const onDark = !isLightFill(fill);
  return (
    <View style={[styles.tokenCell, { backgroundColor: fill }]}>
      <Text
        style={[styles.tokenText, onDark && styles.tokenTextOnDark]}
        numberOfLines={2}
      >
        {row.token}
      </Text>
      {row.isNew ? <NewBadge /> : null}
    </View>
  );
};

/**
 * Horizontal table scroller.
 * On web: plain div with overflow-x — RN-web vertical ScrollView expands to
 * child width and clips the Token column unless the page is capped at 100vw.
 */
const TableScroll: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (Platform.OS !== "web") return;
    const el = ref.current;
    if (el) el.scrollLeft = 0;
  }, []);

  if (Platform.OS === "web") {
    return (
      <div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "scroll",
          overflowY: "hidden",
          WebkitOverflowScrolling: "touch",
          overscrollBehaviorX: "contain",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled
      showsHorizontalScrollIndicator
      style={styles.tableScrollNative}
      contentContainerStyle={styles.tableScrollContent}
    >
      {children}
    </ScrollView>
  );
};

const ColorTable = ({ section }: { section: ColorDocSection }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{tx(section.title)}</Text>
    </View>
    <TableScroll>
      <View style={styles.tableInner}>
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
            style={[
              styles.row,
              index === section.rows.length - 1 && styles.rowLast,
            ]}
          >
            <View style={[styles.cell, styles.tokenCellWrap, { width: COL.token }]}>
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
    </TableScroll>
  </View>
);

export const ColorsDocsPage = () => {
  const { pad } = useDocPad();

  // Web: avoid RN ScrollView width expansion — use document flow + overflow.
  if (Platform.OS === "web") {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          height: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: PAGE_BG,
          boxSizing: "border-box",
          padding: pad,
        }}
      >
        {colorDocSections.map((section) => (
          <ColorTable key={section.id} section={section} />
        ))}
      </div>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.wrap, { padding: pad }]}
    >
      {colorDocSections.map((section) => (
        <ColorTable key={section.id} section={section} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, width: "100%", backgroundColor: PAGE_BG },
  wrap: {
    width: "100%",
    maxWidth: "100%",
    alignSelf: "stretch",
    paddingBottom: spacingL,
  },
  section: {
    width: "100%",
    maxWidth: "100%",
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: -1,
    backgroundColor: PAGE_BG,
    alignSelf: "stretch",
  },
  tableInner: {
    width: TABLE_WIDTH,
    minWidth: TABLE_WIDTH,
  },
  tableScrollNative: {
    width: "100%",
    flexGrow: 0,
  },
  tableScrollContent: {
    flexGrow: 0,
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
    color: "#000000",
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    width: TABLE_WIDTH,
    minHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
    backgroundColor: PAGE_BG,
  },
  rowLast: {
    borderBottomWidth: 1,
  },
  headerRow: { backgroundColor: PAGE_BG },
  cell: {
    justifyContent: "center",
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
    borderRightWidth: 1,
    borderRightColor: BORDER,
    flexShrink: 0,
  },
  /** Token column: fill edge-to-edge (no inner padding) — color is the cell bg. */
  tokenCellWrap: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  tokenCell: {
    flex: 1,
    alignSelf: "stretch",
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    paddingHorizontal: spacingS,
    paddingVertical: spacingXS,
  },
  cellLast: { borderRightWidth: 0 },
  headerText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    fontWeight: "500",
    color: "#000000",
  },
  cellText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    color: "#000000",
    flexShrink: 1,
  },
  tokenText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    color: "#000000",
    flexShrink: 1,
  },
  tokenTextOnDark: {
    color: "#FFFFFF",
  },
  codeText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    color: "#000000",
  },
  descText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    color: "#000000",
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexShrink: 1,
    flexWrap: "nowrap",
  },
  swatch: {
    width: 30,
    height: 30,
    borderRadius: 4,
    flexShrink: 0,
  },
  opacityPill: {
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: PAGE_BG,
    flexShrink: 0,
  },
  opacityPillText: {
    fontFamily: fonts.Regular,
    fontSize: fontSmall,
    lineHeight: lineHeightSmall,
    color: "#000000",
  },
  newBadge: {
    backgroundColor: RED,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    flexShrink: 0,
  },
  newBadgeText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: 10,
    lineHeight: 14,
    color: PAGE_BG,
    fontWeight: "500",
  },
});

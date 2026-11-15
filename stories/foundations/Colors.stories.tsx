import React, { useEffect, useMemo, useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from "react-native";
import { lightTheme } from "../../src/assets/styles/theme/light";
import { darkTheme } from "../../src/assets/styles/theme/dark";
import { useTheme } from "../../src/context/theme/themeContext";
import { ColorsDocsPage } from "./ColorsDocsPage";

import { tx } from "../../src/localization/tx";
type ThemeMap = Record<string, string>;

type ColorToken = {
  key: string;
  label: string;
  value: string;
  cssVar: string;
};

type ColorGroup = {
  id: string;
  title: string;
  tokens: ColorToken[];
};

const GROUP_RULES: {
  id: string;
  title: string;
  test: (key: string) => boolean;
}[] = [
  {
    id: "primary",
    title: "primary",
    test: (k) =>
      /^(primarybackground|primarycolor(?!2_|text)|primaryinvert|inverttransparent|whiteinvert|primarycolornav|primarybg|primarytxt|primaryinput|primarygray|primarywhite|primaryred)/i.test(
        k
      ),
  },
  {
    id: "gray",
    title: "gray",
    test: (k) => /^(primClr|primarycolor2_|extrasverylightgray)/i.test(k),
  },
  {
    id: "complimentary",
    title: "complimentary",
    test: (k) => /^complimentary/i.test(k),
  },
  {
    id: "text",
    title: "text",
    test: (k) => /^primarytext/i.test(k),
  },
  {
    id: "styles",
    title: "styles",
    test: (k) =>
      /^(styles|secondaryButton|progressIndicatorCircular)/i.test(k),
  },
  {
    id: "secondary",
    title: "secondary",
    test: (k) => /^secondarycolor/i.test(k),
  },
  {
    id: "extras",
    title: "extras",
    test: (k) => /^(extras|extrablue)/i.test(k),
  },
  {
    id: "rag",
    title: "rag",
    test: (k) => /^(rag|iconrag)/i.test(k),
  },
  {
    id: "stroke",
    title: "stroke",
    test: (k) =>
      /^(stroke|character|amountcolorsab|ambertint|neutraltint|purpletint|greentint|orangetint|redtint|goldentint)/i.test(
        k
      ),
  },
  {
    id: "tint",
    title: "tint",
    test: (k) => /^tint/i.test(k),
  },
  {
    id: "overlay",
    title: "overlay",
    test: (k) => /^overlay$/i.test(k),
  },
  {
    id: "segments",
    title: "segments",
    test: (k) => /^(premier|private|mass)/i.test(k),
  },
  {
    id: "info",
    title: "info",
    test: (k) =>
      /^(info|Paginator|blackWhiteNew|progress$|IconBg|Divider|Gift)/i.test(k),
  },
  {
    id: "pfm-networth",
    title: "pfm networth",
    test: (k) => /^PFM/.test(k),
  },
  {
    id: "financial-challenges",
    title: "financial challenges",
    test: (k) => /^FC/.test(k),
  },
  {
    id: "gradients",
    title: "gradients",
    test: (k) => /^primarylinear/i.test(k),
  },
  { id: "pfm-beauty", title: "pfm beauty", test: (k) => /^pfmBeauty/.test(k) },
  {
    id: "pfm-education",
    title: "pfm education",
    test: (k) => /^pfmEducation/.test(k),
  },
  {
    id: "pfm-excluded",
    title: "pfm excluded",
    test: (k) => /^pfmExcluded/.test(k),
  },
  { id: "pfm-family", title: "pfm family", test: (k) => /^pfmFamily/.test(k) },
  { id: "pfm-food", title: "pfm food", test: (k) => /^pfmFood/.test(k) },
  { id: "pfm-health", title: "pfm health", test: (k) => /^pfmHealth/.test(k) },
  { id: "pfm-home", title: "pfm home", test: (k) => /^pfmHome/.test(k) },
  { id: "pfm-income", title: "pfm income", test: (k) => /^pfmIncome/.test(k) },
  {
    id: "pfm-insurance",
    title: "pfm insurance",
    test: (k) => /^pfmInsurance/.test(k),
  },
  {
    id: "pfm-investment",
    title: "pfm investment",
    test: (k) => /^pfmInvestment/.test(k),
  },
  {
    id: "pfm-leisure",
    title: "pfm leisure",
    test: (k) => /^pfmLeisure/.test(k),
  },
  { id: "pfm-loans", title: "pfm loans", test: (k) => /^pfmLoans/.test(k) },
  {
    id: "pfm-shopping",
    title: "pfm shopping",
    test: (k) => /^pfmShopping/.test(k),
  },
  {
    id: "pfm-transport",
    title: "pfm transport",
    test: (k) => /^pfmTransport/.test(k),
  },
  {
    id: "pfm-transfer",
    title: "pfm transfer",
    test: (k) => /^pfmTransfer/.test(k),
  },
  {
    id: "pfm-uncategorised",
    title: "pfm uncategorised",
    test: (k) => /^pfmUncategorised/.test(k),
  },
  {
    id: "pfm-vacation",
    title: "pfm vacation",
    test: (k) => /^pfmVacation/.test(k),
  },
];

/** Friendly labels that mirror the reference palette naming where possible. */
const LABEL_ALIASES: Record<string, string> = {
  primarybackground: "background",
  primarycolor: "black",
  primarycolorstatic: "black-static",
  primarycolor2: "gray",
  primarycolor2static: "gray-static",
  primarycolor3: "red",
  primarycolor3static: "red-static",
  primarycolor3tonal: "red-tonal",
  primarycolor4: "white",
  primarycolor4static: "white-static",
  primaryinvert: "white-invert",
  whiteinvert: "white-invert",
  primarygray: "gray",
  primarywhite: "white",
  primarywhitestatic: "white-static",
  primarygrayinvert: "gray-invert",
  primaryredtonal: "red-tonal",
  primarytextcolor: "primary",
  primarytextcolor2: "secondary",
  primarytextcolor_2: "tertiary",
  primarytextcolor4: "inverse",
  primarytextcolor3: "link",
  primarytextcolordisabled: "disabled",
  extrasbottomnav: "bottom-nav-bg",
  stylesbackgroundendprocess: "bg-end-process",
  strokeorangetint: "orange-tint",
};

function toKebab(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase();
}

function shortLabel(key: string, groupId: string) {
  if (LABEL_ALIASES[key]) return LABEL_ALIASES[key];

  let label = toKebab(key);
  const stripPrefixes = [
    `${groupId}-`,
    "primary-color-",
    "primary-text-color-",
    "primary-textcolor-",
    "primary-",
    "complimentary-primary-color-3-",
    "complimentary-",
    "styles-",
    "secondary-color-",
    "secondary-button-accent-",
    "progress-indicator-circular-",
    "extras-",
    "icon-rag-",
    "rag-",
    "stroke-",
    "tint-static-",
    "tint-",
    "pfm-",
    "fc-",
  ];

  for (const prefix of stripPrefixes) {
    if (label.startsWith(prefix)) {
      label = label.slice(prefix.length);
      break;
    }
  }

  return label || key;
}

function toCssVar(groupId: string, label: string) {
  return `--sab-color-${groupId}-${label}`;
}

function buildGroups(theme: ThemeMap): ColorGroup[] {
  const used = new Set<string>();
  const groups: ColorGroup[] = [];

  for (const rule of GROUP_RULES) {
    const tokens: ColorToken[] = [];
    for (const [key, value] of Object.entries(theme)) {
      if (used.has(key) || typeof value !== "string") continue;
      if (!rule.test(key)) continue;
      used.add(key);
      const label = shortLabel(key, rule.id);
      tokens.push({
        key,
        label,
        value,
        cssVar: toCssVar(rule.id, label),
      });
    }
    if (tokens.length) {
      groups.push({ id: rule.id, title: rule.title, tokens });
    }
  }

  const leftover: ColorToken[] = [];
  for (const [key, value] of Object.entries(theme)) {
    if (used.has(key) || typeof value !== "string") continue;
    const label = shortLabel(key, "other");
    leftover.push({
      key,
      label,
      value,
      cssVar: toCssVar("other", label),
    });
  }
  if (leftover.length) {
    groups.push({ id: "other", title: "other", tokens: leftover });
  }

  return groups;
}

function isLightColor(value: string) {
  const hex = value.trim();
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex)) {
    const full =
      hex.length === 4
        ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`
        : hex;
    const r = parseInt(full.slice(1, 3), 16);
    const g = parseInt(full.slice(3, 5), 16);
    const b = parseInt(full.slice(5, 7), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 186;
  }
  if (/rgba?\(/i.test(hex)) {
    const parts = hex
      .replace(/rgba?\(|\)/g, "")
      .split(",")
      .map((p) => p.trim());
    const a = parts[3] !== undefined ? parseFloat(parts[3]) : 1;
    if (Number.isFinite(a) && a < 0.35) return true;
  }
  return false;
}

function columnsForWidth(width: number) {
  if (width >= 1280) return 8;
  if (width >= 1024) return 6;
  if (width >= 768) return 5;
  if (width >= 560) return 4;
  if (width >= 400) return 3;
  return 2;
}

const GAP = 16;
const PAGE_PAD = 24;
const MIN_CARD = 104;

const ColorPalette = () => {
  const { isDarkTheme } = useTheme();
  const mode = isDarkTheme ? "dark" : "light";
  const theme = (isDarkTheme ? darkTheme : lightTheme) as ThemeMap;
  const sourcePath = isDarkTheme
    ? "src/assets/styles/theme/dark.ts"
    : "src/assets/styles/theme/light.ts";

  const groups = useMemo(() => buildGroups(theme), [theme]);
  const total = groups.reduce((sum, group) => sum + group.tokens.length, 0);

  // Prefer the story container width (onLayout). Window width on desktop
  // Storybook is the browser chrome, not the preview pane.
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", () => {
      // Force a re-measure on orientation / pane resize via next layout pass.
      setViewportWidth((w) => w);
    });
    return () => subscription?.remove();
  }, []);

  const onLayout = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.width;
    if (next > 0 && Math.abs(next - viewportWidth) > 1) {
      setViewportWidth(next);
    }
  };

  const measuredWidth =
    viewportWidth > 0 ? viewportWidth : Math.min(Dimensions.get("window").width, 900);
  const contentWidth = Math.max(measuredWidth - PAGE_PAD * 2, MIN_CARD);
  const columns = columnsForWidth(contentWidth);
  const cardWidth = Math.max(
    MIN_CARD,
    (contentWidth - GAP * (columns - 1)) / columns
  );

  const pageBg = isDarkTheme ? "#121212" : "#FFFFFF";
  const titleColor = isDarkTheme ? "#F5F5F5" : "#111111";
  const mutedColor = isDarkTheme ? "rgba(255,255,255,0.65)" : "#626469";
  const monoColor = isDarkTheme ? "rgba(255,255,255,0.42)" : "#98A2B3";
  const chipBg = isDarkTheme ? "rgba(255,255,255,0.08)" : "#F2F3F4";
  const cardBorder = isDarkTheme ? "rgba(255,255,255,0.14)" : "#E5E6E5";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: pageBg }}
      contentContainerStyle={styles.page}
      onLayout={onLayout}
    >
      <Text style={[styles.title, { color: titleColor }]}>{tx("SAB Color tokens")}</Text>
      <Text style={[styles.meta, { color: mutedColor }]}>
        Active theme:{" "}
        <Text style={[styles.metaStrong, { color: titleColor }]}>{mode}</Text>
        {" · "}
        {total} colors across {groups.length} groups. Use the Dark theme toggle
        above. Source:{" "}
        <Text style={styles.metaCode}>{sourcePath}</Text>
      </Text>

      {groups.map((group) => (
        <View key={group.id} style={styles.group}>
          <View style={styles.groupHeader}>
            <Text style={[styles.groupTitle, { color: titleColor }]}>
              {group.title}
            </Text>
            <View style={[styles.countChip, { backgroundColor: chipBg }]}>
              <Text style={[styles.countText, { color: mutedColor }]}>
                {group.tokens.length} token
                {group.tokens.length === 1 ? "" : "s"}
              </Text>
            </View>
          </View>

          <View style={[styles.grid, { marginHorizontal: -GAP / 2 }]}>
            {group.tokens.map((token) => {
              const needsBorder = isLightColor(token.value);
              return (
                <View
                  key={token.key}
                  style={[
                    styles.card,
                    {
                      width: cardWidth,
                      marginHorizontal: GAP / 2,
                      marginBottom: GAP,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.swatch,
                      {
                        backgroundColor: token.value,
                        borderColor: needsBorder ? cardBorder : "transparent",
                        borderWidth: needsBorder ? 1 : 0,
                      },
                    ]}
                  />
                  <Text
                    style={[styles.tokenName, { color: titleColor }]}
                    numberOfLines={2}
                  >
                    {token.label}
                  </Text>
                  <Text
                    style={[styles.tokenValue, { color: mutedColor }]}
                    numberOfLines={1}
                  >
                    {token.value}
                  </Text>
                  <Text
                    style={[styles.tokenVar, { color: monoColor }]}
                    numberOfLines={2}
                  >
                    {token.cssVar}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default {
  title: "Foundations/Colors",
  parameters: {
    layout: "fullscreen",
    docs: {
      // Keep Figma table layout on the Docs tab; Palette canvas uses swatch cards.
      page: () => <ColorsDocsPage />,
    },
  },
};

export const Palette = {
  name: "Palette",
  render: () => <ColorPalette />,
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: PAGE_PAD,
    paddingTop: 8,
    paddingBottom: 48,
    width: "100%",
    maxWidth: 1400,
    alignSelf: "center",
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "700",
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 720,
  },
  metaStrong: {
    fontWeight: "700",
  },
  metaCode: {
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "ui-monospace, SFMono-Regular, Menlo, monospace",
    }),
    fontSize: 13,
  },
  group: {
    marginBottom: 28,
    width: "100%",
  },
  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 12,
  },
  groupTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    textTransform: "lowercase",
  },
  countChip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  countText: {
    fontSize: 12,
    fontWeight: "600",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  card: {
    minWidth: MIN_CARD,
  },
  swatch: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 112,
    borderRadius: 12,
    marginBottom: 10,
  },
  tokenName: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  tokenValue: {
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 2,
  },
  tokenVar: {
    fontSize: 11,
    lineHeight: 15,
    fontFamily: Platform.select({
      ios: "Menlo",
      android: "monospace",
      default: "ui-monospace, SFMono-Regular, Menlo, monospace",
    }),
  },
});

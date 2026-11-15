import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  spacingXS,
  spacingS,
  spacingL,
  radiusXS,
  fontSmall,
  fontXXLG2,
  lineHeightSmall,
  lineHeightXXLG,
  gridMobileColumns,
  gridMobileMargin,
  gridMobileGutter,
  gridTabletColumns,
  gridTabletMargin,
  gridTabletGutter,
  gridTabletLargeColumns,
  gridTabletLargeMargin,
  gridTabletLargeGutter,
} from "../../../src/assets/styles/constants/size";
import fonts from "../../../src/assets/styles/constants/fonts";
import { canvasTier } from "../../../src/assets/styles/utils/responsive";
import { tx } from "../../../src/localization/tx";
import { FigmaDocPage } from "../../pulse-design-system/rules-and-patterns/FigmaDocPage";
import { RESPONSIVE_GRID_PAGES } from "./catalog";

/**
 * Figma: Responsive Grid page (69:6658)
 * Frames: Grid (4252:10829), Mobile, Tablet, Responsive Device Grid,
 *         Samsung Fold behaviour, Design-Dev Workspace
 */

const BORDER = "rgba(0,0,0,0.1)";
const GRID_COL = "rgba(255, 0, 92, 0.12)";
const TABLE_MAX = 1208;
const COL_TOKEN = 200;
const COL_VALUE = 200;
const COL_EXAMPLE = 199;
const COL_DESC = 494;
const TABLE_MIN = COL_TOKEN + COL_VALUE + COL_EXAMPLE + COL_DESC;

type GridToken = {
  name: string;
  code: string;
  columns: number;
  margin: number;
  gutter: number;
  description: string;
};

const grids: GridToken[] = [
  {
    name: "sab/mobile",
    code: "gridMobileColumns",
    columns: gridMobileColumns,
    margin: gridMobileMargin,
    gutter: gridMobileGutter,
    description:
      "Screen construction will follow the SAB mobile grid, with a 16px margin and a 16px gutter.",
  },
  {
    name: "sab/tablet",
    code: "gridTabletColumns",
    columns: gridTabletColumns,
    margin: gridTabletMargin,
    gutter: gridTabletGutter,
    description:
      "Screen construction will follow the SAB mobile grid, with a 26px margin and a 16px gutter.",
  },
  {
    name: "sab/tablet-large",
    code: "gridTabletLargeColumns",
    columns: gridTabletLargeColumns,
    margin: gridTabletLargeMargin,
    gutter: gridTabletLargeGutter,
    description:
      "Screen construction will follow the SAB mobile grid, with a 32px margin and a 24px gutter.",
  },
];

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return { pad: isMobile ? spacingS : spacingL };
};

/** Mini column strip matching Figma example box (80×40, radius XS). */
const GridExample = ({ columns }: { columns: number }) => {
  const gaps = Math.max(columns - 1, 0);
  return (
    <View style={styles.exampleFrame}>
      {Array.from({ length: columns }).map((_, i) => (
        <View
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          style={[styles.exampleCol, i < gaps && { marginRight: 1 }]}
        />
      ))}
    </View>
  );
};

const pageByStory = (storyName: string) =>
  RESPONSIVE_GRID_PAGES.find((p) => p.storyName === storyName)!;

export default {
  title: "Foundations/Responsive Grid",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "SAB Pulse responsive grid foundations from Figma (node 69:6658): layout tokens sab/mobile, sab/tablet, sab/tablet-large, plus device reference frames.",
      },
    },
  },
};

/** Figma frame “Grid” (4252:10829). */
export const Grid = {
  name: "Grid",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Grid”: sab/mobile (4 cols, 16/16), sab/tablet (8 cols, 26/16), sab/tablet-large (12 cols, 32/24).",
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
          <Text style={styles.pageTitle}>{tx("Grid")}</Text>

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
                <View
                  style={[styles.cell, styles.cellLast, { width: COL_DESC }]}
                >
                  <Text style={styles.headerText}>{tx("Description")}</Text>
                </View>
              </View>

              {grids.map((item) => (
                <View key={item.name} style={styles.row}>
                  <View style={[styles.cell, { width: COL_TOKEN }]}>
                    <Text style={styles.cellText}>{item.name}</Text>
                    <Text style={styles.cellSubText}>{item.code}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_VALUE }]}>
                    <Text style={styles.cellText}>{`${item.columns} columns`}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                    <GridExample columns={item.columns} />
                  </View>
                  <View
                    style={[styles.cell, styles.cellLast, { width: COL_DESC }]}
                  >
                    <Text style={styles.cellText}>{tx(item.description)}</Text>
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

const makeDocStory = (storyName: string) => {
  const page = pageByStory(storyName);
  return {
    name: page.storyName,
    tags: ["!autodocs"],
    parameters: {
      controls: { disable: true },
      a11y: { disable: true },
      docs: {
        description: {
          story: `Figma Responsive Grid — “${page.title}” (pixel-faithful export).`,
        },
      },
    },
    render: () => (
      <FigmaDocPage
        title={page.title}
        eyebrow="Foundations"
        images={page.images}
      />
    ),
  };
};

/** Figma section “Mobile” (19182:108533). */
export const Mobile = makeDocStory("Mobile");

/** Figma section “Tablet” (19182:108534). */
export const Tablet = makeDocStory("Tablet");

/** Figma frame “Responsive Device Grid” (22011:80583). */
export const ResponsiveDeviceGrid = makeDocStory("Responsive Device Grid");

/** Figma section “Samsung Fold behaviour” (19263:5106). */
export const SamsungFoldBehaviour = makeDocStory("Samsung Fold behaviour");

/** Figma section “Desing-Dev Workspace- Responsive Screen Level” (19191:262). */
export const DesignDevWorkspace = makeDocStory("Design-Dev Workspace");

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: "#FFFFFF" },
  wrap: { alignItems: "center", width: "100%" },
  page: { width: "100%", maxWidth: TABLE_MAX },
  pageTitle: {
    fontFamily: fonts.HSBC_Bold,
    fontWeight: "700",
    fontSize: fontXXLG2,
    lineHeight: lineHeightXXLG,
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
  exampleFrame: {
    width: 80,
    height: 40,
    borderRadius: radiusXS,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  exampleCol: {
    flex: 1,
    height: "100%",
    backgroundColor: GRID_COL,
    borderRadius: 1,
  },
});

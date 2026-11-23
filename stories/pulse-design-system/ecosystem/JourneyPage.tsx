import React, { FC } from "react";
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import fonts from "../../../src/assets/styles/constants/fonts";
import { usePulseDocLayout } from "../_shared/usePulseDocLayout";
import {
  JOURNEY_BRANCHES,
  JOURNEY_ROOT,
  type JourneyBranch,
  type JourneyPageLink,
} from "./journeyCatalog";

const C = {
  red: "#DB0011",
  redPressed: "#E96670",
  redTint: "#F9F2F3",
  redStroke: "#E5B2B5",
  spine: "#BA2737",
  canvas: "#E5E5E5",
  fileBg: "#EFEEEC",
  fileBorder: "#DDDCDA",
  ink: "#242426",
  white: "#FFFFFF",
};

const COL_W = 280;
const PAGE_W = 256;
const GAP = 16;

const openHref = (href?: string) => {
  if (!href) return;
  void Linking.openURL(href);
};

const DocHeader: FC = () => {
  const layout = usePulseDocLayout();
  return (
    <View
      style={[
        styles.docHeader,
        {
          maxWidth: layout.maxContent,
          paddingHorizontal: layout.pagePadX,
          paddingVertical: layout.pagePadY,
          flexDirection: layout.isMobile ? "column" : "row",
          alignItems: layout.isMobile ? "flex-start" : "flex-end",
          borderTopLeftRadius: layout.isMobile ? 0 : 12,
          borderTopRightRadius: layout.isMobile ? 0 : 12,
        },
      ]}
    >
      <Text
        style={[
          styles.docTitle,
          {
            fontSize: layout.headerTitleSize,
            lineHeight: layout.headerTitleLine,
          },
        ]}
      >
        Journey
      </Text>
      <Text
        style={[
          styles.docEyebrow,
          {
            fontSize: layout.headerEyebrowSize,
            lineHeight: layout.headerEyebrowSize + 5,
          },
        ]}
      >
        Pulse Design System
      </Text>
    </View>
  );
};

const RootBar: FC = () => (
  <View style={styles.rootBar}>
    <Text style={styles.rootTitle}>{JOURNEY_ROOT.title}</Text>
    <View style={styles.statusChip}>
      <Text style={styles.statusText}>{JOURNEY_ROOT.status}</Text>
    </View>
  </View>
);

const PageCard: FC<{ page: JourneyPageLink }> = ({ page }) => (
  <Pressable
    onPress={() => openHref(page.href)}
    style={({ pressed }) => [styles.pageCard, pressed && styles.pressed]}
    accessibilityRole="link"
    accessibilityLabel={page.label}
  >
    <Text style={styles.pageText}>➤ {page.label}</Text>
  </Pressable>
);

const BranchColumn: FC<{ branch: JourneyBranch; isFirst: boolean }> = ({
  branch,
  isFirst,
}) => (
  <View style={[styles.column, isFirst && styles.columnFirst]}>
    <View style={styles.branchDrop}>
      <View style={styles.branchStem} />
      <View style={styles.branchDot} />
    </View>
    <Pressable
      onPress={() => openHref(branch.href)}
      style={({ pressed }) => [styles.fileCard, pressed && styles.pressed]}
      accessibilityRole="link"
      accessibilityLabel={branch.title}
    >
      <Text style={styles.fileText}>{branch.title}</Text>
    </Pressable>
    {branch.pages.length > 0 ? (
      <View style={styles.pagesBlock}>
        <View style={styles.pageRail}>
          <View style={styles.pageRailH} />
          <View
            style={[
              styles.pageRailV,
              { height: Math.max(branch.pages.length * 52 - 26, 24) },
            ]}
          />
        </View>
        <View style={styles.pagesList}>
          {branch.pages.map((page) => (
            <PageCard key={`${branch.title}-${page.label}`} page={page} />
          ))}
        </View>
      </View>
    ) : null}
  </View>
);

/** Sharp coded recreation of Figma SAB Source Inventory (22159:49773). */
export const JourneyPage: FC = () => {
  const layout = usePulseDocLayout();

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      horizontal={false}
    >
      <DocHeader />
      <View
        style={[
          styles.canvas,
          {
            paddingHorizontal: layout.isMobile ? 12 : 24,
            paddingVertical: layout.isMobile ? 16 : 24,
          },
        ]}
      >
        <RootBar />
        <View style={styles.treeWrap}>
          <View style={styles.rootDrop}>
            <View style={styles.rootStem} />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            style={styles.treeScroll}
            contentContainerStyle={styles.treeRow}
          >
            <View style={styles.spine} />
            {JOURNEY_BRANCHES.map((branch, index) => (
              <BranchColumn
                key={branch.title}
                branch={branch}
                isFirst={index === 0}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: { flex: 1, width: "100%", backgroundColor: C.white },
  content: {
    alignItems: "stretch",
    paddingBottom: 48,
    width: "100%",
    minWidth: 0,
  },
  docHeader: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: C.redTint,
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    minWidth: 0,
  },
  docTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
    flexShrink: 1,
    minWidth: 0,
  },
  docEyebrow: {
    fontFamily: fonts.HSBC_Medium,
    color: C.redPressed,
    fontWeight: "500",
    flexShrink: 1,
  },
  canvas: {
    width: "100%",
    backgroundColor: C.canvas,
    gap: 0,
  },
  rootBar: {
    alignSelf: "stretch",
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.spine,
    borderLeftWidth: 4,
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 12,
  },
  rootTitle: {
    fontFamily: fonts.Regular,
    fontSize: 20,
    lineHeight: 26,
    color: C.ink,
    flexShrink: 1,
  },
  statusChip: {
    backgroundColor: C.redTint,
    borderWidth: 1,
    borderColor: C.redStroke,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontFamily: fonts.Regular,
    fontSize: 13,
    lineHeight: 18,
    color: C.red,
  },
  treeWrap: {
    marginTop: 0,
    paddingTop: 0,
  },
  rootDrop: {
    alignItems: "flex-start",
    paddingLeft: COL_W / 2 - 1,
    height: 28,
  },
  rootStem: {
    width: 2,
    flex: 1,
    backgroundColor: C.spine,
  },
  treeScroll: {
    width: "100%",
  },
  treeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: GAP,
    paddingBottom: 32,
    paddingRight: 24,
    position: "relative",
  },
  spine: {
    position: "absolute",
    left: COL_W / 2,
    right: COL_W / 2,
    top: 0,
    height: 2,
    backgroundColor: C.spine,
  },
  column: {
    width: COL_W,
    alignItems: "stretch",
  },
  columnFirst: {},
  branchDrop: {
    height: 24,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  branchStem: {
    width: 2,
    height: 20,
    backgroundColor: C.spine,
  },
  branchDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: C.spine,
    marginTop: -5,
  },
  fileCard: {
    backgroundColor: C.fileBg,
    borderWidth: 1,
    borderColor: C.fileBorder,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 14,
    minHeight: 56,
    justifyContent: "center",
  },
  fileText: {
    fontFamily: fonts.HSBC_Medium,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: C.ink,
    textDecorationLine: "underline",
  },
  pagesBlock: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  pageRail: {
    width: 18,
    marginTop: 0,
    position: "relative",
  },
  pageRailH: {
    position: "absolute",
    left: 8,
    top: 0,
    width: 10,
    height: 2,
    backgroundColor: C.spine,
  },
  pageRailV: {
    position: "absolute",
    left: 8,
    top: 0,
    width: 2,
    backgroundColor: C.spine,
  },
  pagesList: {
    flex: 1,
    gap: 8,
    paddingTop: 8,
  },
  pageCard: {
    backgroundColor: C.white,
    borderWidth: 1,
    borderColor: C.fileBorder,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: PAGE_W,
    minHeight: 44,
    justifyContent: "center",
  },
  pageText: {
    fontFamily: fonts.Regular,
    fontSize: 13,
    lineHeight: 18,
    color: C.ink,
    textDecorationLine: "underline",
  },
  pressed: {
    opacity: 0.75,
  },
});

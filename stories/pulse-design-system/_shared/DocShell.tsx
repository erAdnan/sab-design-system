import React, { FC, ReactNode } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { docTokens as t } from "./docTokens";
import { usePulseDocLayout } from "./usePulseDocLayout";

const pulseBrand = require("../assets/pulse-brand.png");

type DocShellProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  children: ReactNode;
};

/** Shared chrome for Pulse Design System documentation pages in Storybook. */
export const DocShell: FC<DocShellProps> = ({
  title,
  subtitle,
  eyebrow = "Pulse Design System",
  children,
}) => {
  const layout = usePulseDocLayout();
  const maxW = Math.min(1100, layout.maxContent);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.content}
      accessibilityRole="scrollbar"
    >
      <View
        style={[
          styles.header,
          {
            maxWidth: maxW,
            paddingHorizontal: layout.pagePadX,
            paddingTop: layout.pagePadY,
            paddingBottom: layout.sectionGap,
          },
        ]}
      >
        <View style={styles.brandRow}>
          <Image
            source={pulseBrand}
            style={[
              styles.brand,
              layout.isMobile && { width: 110, height: 27 },
            ]}
            accessibilityLabel="Pulse Design"
          />
          <Text
            style={[
              styles.eyebrow,
              {
                fontSize: layout.headerEyebrowSize,
                lineHeight: layout.headerEyebrowSize + 6,
              },
            ]}
          >
            {eyebrow}
          </Text>
        </View>
        <Text
          style={[
            styles.title,
            {
              fontSize: layout.isMobile ? 28 : layout.isTablet ? 32 : 36,
              lineHeight: layout.isMobile ? 34 : layout.isTablet ? 40 : 44,
            },
          ]}
          accessibilityRole="header"
        >
          {title}
        </Text>
        {subtitle ? (
          <Text
            style={[
              styles.subtitle,
              {
                fontSize: layout.bodySize,
                lineHeight: layout.bodyLine,
              },
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View
        style={[
          styles.body,
          {
            maxWidth: maxW,
            paddingHorizontal: layout.pagePadX,
            gap: layout.isMobile ? 28 : 40,
          },
        ]}
      >
        {children}
      </View>
    </ScrollView>
  );
};

export const DocSection: FC<{
  title: string;
  intro?: string;
  children?: ReactNode;
}> = ({ title, intro, children }) => {
  const layout = usePulseDocLayout();
  return (
    <View style={styles.section}>
      <Text
        style={[
          styles.sectionTitle,
          {
            fontSize: layout.isMobile ? 20 : 24,
            lineHeight: layout.isMobile ? 26 : 32,
          },
        ]}
        accessibilityRole="header"
      >
        {title}
      </Text>
      {intro ? (
        <Text
          style={[
            styles.sectionIntro,
            {
              fontSize: layout.isMobile ? 14 : 16,
              lineHeight: layout.isMobile ? 20 : 24,
            },
          ]}
        >
          {intro}
        </Text>
      ) : null}
      {children}
    </View>
  );
};

export const DocCard: FC<{
  title: string;
  body: string;
  accent?: "default" | "blue" | "green" | "red";
}> = ({ title, body, accent = "default" }) => {
  const layout = usePulseDocLayout();
  return (
    <View
      style={[
        styles.card,
        accent === "blue" && styles.cardBlue,
        accent === "green" && styles.cardGreen,
        accent === "red" && styles.cardRed,
        {
          padding: layout.cardPad,
          minWidth: layout.isMobile ? "100%" : 240,
          flexBasis: layout.isMobile ? "100%" : 280,
        },
      ]}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardBody}>{body}</Text>
    </View>
  );
};

export const DocCardGrid: FC<{ children: ReactNode }> = ({ children }) => {
  const layout = usePulseDocLayout();
  return <View style={[styles.grid, { gap: layout.sectionGap }]}>{children}</View>;
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    width: "100%",
    backgroundColor: t.white,
  },
  content: {
    paddingBottom: 64,
    alignItems: "stretch",
    width: "100%",
    minWidth: 0,
  },
  header: {
    width: "100%",
    alignSelf: "center",
    borderTopWidth: 4,
    borderTopColor: t.redDeep,
    gap: 12,
    minWidth: 0,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flexWrap: "wrap",
  },
  brand: {
    width: 140,
    height: 34,
    resizeMode: "contain",
  },
  eyebrow: {
    color: t.gray,
    fontWeight: "500",
  },
  title: {
    fontWeight: "700",
    color: t.black,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: t.graySoft,
    maxWidth: 720,
  },
  body: {
    width: "100%",
    alignSelf: "center",
    minWidth: 0,
  },
  section: {
    gap: 16,
    width: "100%",
  },
  sectionTitle: {
    fontWeight: "700",
    color: t.navy,
  },
  sectionIntro: {
    color: t.graySoft,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    flexGrow: 1,
    backgroundColor: t.block,
    borderRadius: t.radius,
    gap: 12,
    maxWidth: "100%",
  },
  cardBlue: { backgroundColor: t.blueTint },
  cardGreen: { backgroundColor: t.greenTint },
  cardRed: { backgroundColor: t.redTonal },
  cardTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: t.black,
  },
  cardBody: {
    fontSize: 14,
    lineHeight: 22,
    color: t.graySoft,
  },
});

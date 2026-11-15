import React, { FC, ReactNode } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import fonts from "../../../src/assets/styles/constants/fonts";
import { usePulseDocLayout } from "../_shared/usePulseDocLayout";

const pulseMark = require("../assets/ecosystem/pulse-mark.png");
const heroPhones = require("../assets/ecosystem/hero-phones-visual.png");
const macbookBase = require("../assets/ecosystem/macbook-base.png");
const macbookOverlay = require("../assets/ecosystem/macbook-overlay.png");
const macbookScreen = require("../assets/ecosystem/macbook-screen.png");

// SVGR (native) — Figma logo assets
import SabLogoSplash from "../assets/ecosystem/sab-logo-splash.svg";
import PulseMarkWhite from "../assets/ecosystem/pulse-mark-white.svg";

const C = {
  red: "#DB0011",
  redPressed: "#E96670",
  redDeep: "#A00000",
  redTint: "#F9F2F3",
  redTonal: "#FBE5E7",
  black: "#000000",
  gray: "#767676",
  block: "#F2F3F4",
  white: "#FFFFFF",
};

/** Figma-faithful Pulse Design Ecosystem introduction page (node 22036:2975). */
export const EcosystemPage: FC = () => {
  const layout = usePulseDocLayout();
  const contentMax = Math.min(layout.maxContent, 1400);
  const markW = layout.isMobile ? 200 : layout.isTablet ? 260 : 306;
  const markH = Math.round(markW * (73 / 306));
  const logoW = layout.isMobile ? 88 : 120;
  const logoH = Math.round(logoW * (38 / 120));
  const macW = Math.min(544, Math.max(240, layout.width - layout.pagePadX * 2 - 32));
  const macH = Math.round(macW * (330 / 544));
  const macScreenL = Math.round(macW * (55 / 544));
  const macScreenT = Math.round(macW * (11 / 544));
  const macScreenW = Math.round(macW * (434 / 544));
  const macScreenH = Math.round(macW * (282 / 544));

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View
        style={[
          styles.header,
          {
            maxWidth: contentMax,
            paddingHorizontal: layout.pagePadX,
            paddingVertical: layout.pagePadY,
            flexDirection: layout.isMobile ? "column" : "row",
            alignItems: layout.isMobile ? "flex-start" : "center",
            borderTopLeftRadius: layout.isMobile ? 0 : 12,
            borderTopRightRadius: layout.isMobile ? 0 : 12,
            gap: layout.isMobile ? 12 : 16,
          },
        ]}
      >
        <Text
          style={[
            styles.headerTitle,
            {
              fontSize: layout.headerTitleSize,
              lineHeight: layout.headerTitleLine,
            },
          ]}
        >
          Pulse Design System
        </Text>
        <View style={[styles.headerBrand, layout.isMobile && { alignItems: "flex-start" }]}>
          <SabLogoSplash width={logoW} height={logoH} />
          <Text
            style={[
              styles.headerBrandLabel,
              {
                fontSize: layout.headerEyebrowSize,
                lineHeight: layout.headerEyebrowSize + 5,
              },
            ]}
          >
            Pulse Design System
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.page,
          {
            maxWidth: contentMax,
            paddingHorizontal: layout.pagePadX,
            gap: layout.sectionGap,
          },
        ]}
      >
        <SectionHeading layout={layout}>Description</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          Pulse is SAB’s centralised design and development framework: a shared foundation for
          creating a unified digital banking experience. It brings Design, Business and Technology
          together around reusable components, patterns, guidelines and design tokens.
        </BodyText>

        <View
          style={[
            styles.heroCard,
            {
              padding: layout.cardPad,
              borderRadius: layout.radius,
              flexDirection: layout.isMobile ? "column" : "row",
            },
          ]}
        >
          <View
            style={[
              styles.heroCopy,
              {
                maxWidth: layout.isMobile ? "100%" : 520,
                flexBasis: layout.isMobile ? "auto" : 320,
                gap: layout.isMobile ? 12 : 20,
              },
            ]}
          >
            <Image
              source={pulseMark}
              style={{ width: markW, maxWidth: "100%", height: markH, resizeMode: "contain" }}
              accessibilityLabel="Pulse Design"
            />
            <Text
              style={[
                styles.kicker,
                {
                  fontSize: layout.isMobile ? 13 : 15,
                  lineHeight: layout.isMobile ? 18 : 20,
                },
              ]}
            >
              DESIGN SYSTEM & STRATEGIC FOUNDATION
            </Text>
            <Text
              style={[
                styles.heroTitle,
                {
                  fontSize: layout.displaySize,
                  lineHeight: layout.displayLine,
                },
              ]}
            >
              The heartbeat of SAB’s digital experience.
            </Text>
            <BodyText layout={layout}>
              Pulse Design System. The engine behind a unified digital banking experience.
            </BodyText>
          </View>
          <Image
            source={heroPhones}
            style={[
              styles.heroPhones,
              {
                flexBasis: layout.isMobile ? "auto" : 360,
                width: layout.isMobile ? "100%" : 560,
              },
            ]}
            accessibilityLabel="Pulse mobile experience"
          />
        </View>

        <SectionHeading layout={layout}>What is Pulse Design System?</SectionHeading>
        <CardGrid layout={layout}>
          <InfoCard
            layout={layout}
            title="One connected framework"
            body="A centralised design and development framework connecting Design, Business and Technology."
          />
          <InfoCard
            layout={layout}
            title="A single source of truth"
            body="A single source of truth for components, patterns, guidelines and design tokens."
          />
          <InfoCard
            layout={layout}
            title="One coherent experience"
            body="Consistent experiences across the SAB Mobile ecosystem."
          />
          <InfoCard
            layout={layout}
            title="Reusable by design"
            body="Faster delivery through reusable, production-ready building blocks."
          />
        </CardGrid>

        <SectionHeading layout={layout}>The idea behind the brand</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          Just as the pulse powers the heart, and the heart fuels the entire body, Pulse Design sits
          at the very core of how we build, connect, and innovate.
        </BodyText>
        <View style={[styles.twoCol, { gap: layout.sectionGap }]}>
          <View
            style={[
              styles.identityCard,
              {
                padding: layout.cardPad,
                borderRadius: layout.radius,
                minWidth: layout.isMobile ? "100%" : 260,
                flexBasis: layout.isMobile ? "100%" : 360,
                gap: layout.sectionGap,
              },
            ]}
          >
            <Image
              source={pulseMark}
              style={{
                width: layout.isMobile ? 120 : 160,
                height: layout.isMobile ? 29 : 38,
                resizeMode: "contain",
              }}
            />
            <View
              style={[
                styles.invertedMark,
                {
                  width: layout.isMobile ? "100%" : 442,
                  maxWidth: "100%",
                  height: layout.isMobile ? 80 : 106,
                },
              ]}
            >
              <PulseMarkWhite
                width={layout.isMobile ? 120 : 160}
                height={layout.isMobile ? 29 : 38}
              />
            </View>
            <Text
              style={[
                styles.identityTitle,
                {
                  fontSize: layout.cardTitleSize,
                  lineHeight: layout.cardTitleLine,
                },
              ]}
            >
              Pulse Design
            </Text>
            <BodyText layout={layout}>The heartbeat of SAB’s digital experience.</BodyText>
          </View>
          <InfoCard
            layout={layout}
            title="One rhythm. Shared progress."
            body="It unifies designers and developers under one rhythm, driving consistency, clarity, and speed across every product we create."
            body2="With Pulse, we’re not just designing screens — we’re crafting seamless, human-centered experiences with every beat."
            fill
          />
        </View>

        <SectionHeading layout={layout}>Versioning</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          All Versions will be shown in the DS Logo
        </BodyText>
        <View
          style={[
            styles.twoCol,
            styles.versionRow,
            { gap: layout.sectionGap },
          ]}
        >
          <View
            style={[
              styles.versionLogoWrap,
              {
                padding: layout.cardPad,
                minWidth: layout.isMobile ? "100%" : 260,
                flexBasis: layout.isMobile ? "100%" : 360,
              },
            ]}
          >
            <Image
              source={pulseMark}
              style={{ width: markW, maxWidth: "100%", height: markH, resizeMode: "contain" }}
            />
            <Text
              style={[
                styles.versionBadge,
                {
                  fontSize: layout.cardTitleSize,
                  lineHeight: layout.cardTitleLine,
                },
              ]}
            >
              V.2
            </Text>
          </View>
          <InfoCard layout={layout} title="Versions" body="As of today we’re in version 2.1" fill />
        </View>

        <SectionHeading layout={layout}>Our shared rhythm</SectionHeading>
        <CardGrid layout={layout} columns={3}>
          <InfoCard
            layout={layout}
            title="Consistency"
            body="A shared language of components, patterns and tokens keeps experiences coherent across the SAB Mobile ecosystem."
          />
          <InfoCard
            layout={layout}
            title="Clarity"
            body="Common guidance helps teams make decisions with the same understanding of the experience they are creating."
          />
          <InfoCard
            layout={layout}
            title="Speed"
            body="Reusable, production-ready building blocks help teams spend less time rebuilding and more time solving meaningful problems."
          />
        </CardGrid>
        <View
          style={[
            styles.humanCard,
            {
              padding: layout.cardPad,
              borderRadius: layout.radius,
              gap: layout.sectionGap,
            },
          ]}
        >
          <Text
            style={[
              styles.humanTitle,
              {
                fontSize: layout.displaySize,
                lineHeight: layout.displayLine,
              },
            ]}
          >
            Human-centered, with every beat.
          </Text>
          <BodyText layout={layout}>
            The system supports the work. Seamless experiences for people remain the purpose.
          </BodyText>
        </View>

        <SectionHeading layout={layout}>One shared foundation</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          From the smallest design decision to the complete experience, Pulse connects the building
          blocks teams use every day.
        </BodyText>
        <CardGrid layout={layout}>
          <InfoCard
            layout={layout}
            title="01 · Foundations"
            body="Color, typography and spacing establish a consistent visual language."
          />
          <InfoCard
            layout={layout}
            title="02 · Design tokens"
            body="Shared names make foundational decisions reusable across the system."
          />
          <InfoCard
            layout={layout}
            title="03 · Components"
            body="Reusable UI building blocks provide a consistent starting point for product work."
          />
          <InfoCard
            layout={layout}
            title="04 · Patterns & guidelines"
            body="Common patterns and guidance help teams combine components into coherent experiences."
          />
        </CardGrid>
        <View
          style={[
            styles.foundationBand,
            {
              padding: layout.cardPad,
              borderRadius: layout.radius,
              flexDirection: layout.isMobile ? "column" : "row",
              gap: layout.sectionGap,
            },
          ]}
        >
          <View style={{ width: macW, maxWidth: "100%", height: macH, position: "relative", overflow: "hidden" }}>
            <Image source={macbookBase} style={{ width: macW, height: macH, resizeMode: "contain" }} />
            <Image
              source={macbookOverlay}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: macW,
                height: macH,
                resizeMode: "contain",
              }}
            />
            <Image
              source={macbookScreen}
              style={{
                position: "absolute",
                left: macScreenL,
                top: macScreenT,
                width: macScreenW,
                height: macScreenH,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={[styles.foundationCopy, { minWidth: layout.isMobile ? "100%" : 260, gap: layout.sectionGap }]}>
            <Text
              style={[
                styles.cardTitle,
                {
                  fontSize: layout.cardTitleSize,
                  lineHeight: layout.cardTitleLine,
                },
              ]}
            >
              One connected ecosystem
            </Text>
            <BodyText layout={layout}>
              A single source of truth for components, patterns, guidelines and design tokens.
            </BodyText>
            <Text
              style={[
                styles.redCaption,
                {
                  fontSize: layout.isMobile ? 13 : 15,
                  lineHeight: layout.isMobile ? 18 : 20,
                },
              ]}
            >
              From screens to scalable digital experiences.
            </Text>
          </View>
        </View>

        <SectionHeading layout={layout}>Built for collaboration</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          Pulse connects Design, Business and Technology around one shared foundation. Use it to align
          on the experience, not only the appearance of a screen.
        </BodyText>
        <CardGrid layout={layout} columns={3}>
          <InfoCard
            layout={layout}
            title="Design"
            body="Use shared foundations and reusable patterns to create coherent, human-centered experiences."
          />
          <InfoCard
            layout={layout}
            title="Business"
            body="Use a common language to connect experience decisions with customer needs and product priorities."
          />
          <InfoCard
            layout={layout}
            title="Technology"
            body="Build from reusable, production-ready elements so design intent and implementation stay connected."
          />
        </CardGrid>

        <SectionHeading layout={layout}>Pulse at a glance</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          A reusable ecosystem, with a focus on consistency and faster delivery.
        </BodyText>
        <Text
          style={[
            styles.subLabel,
            {
              fontSize: layout.cardTitleSize,
              lineHeight: layout.cardTitleLine,
            },
          ]}
        >
          Shared assets
        </Text>
        <CardGrid layout={layout} columns={3}>
          <StatCard layout={layout} value="300+" label="Design templates" />
          <StatCard layout={layout} value="1600+" label="Design screens" />
          <StatCard layout={layout} value="500+" label="Unique UI elements" />
        </CardGrid>
        <Text
          style={[
            styles.subLabel,
            {
              marginTop: layout.sectionGap,
              fontSize: layout.cardTitleSize,
              lineHeight: layout.cardTitleLine,
            },
          ]}
        >
          Team impact
        </Text>
        <CardGrid layout={layout} columns={3}>
          <StatCard layout={layout} value="3X" label="Designers" detail="More efficient" accent />
          <StatCard layout={layout} value="5X" label="Developers" detail="Quicker rollout" accent />
          <StatCard layout={layout} value="40%" label="Time to market" detail="Faster" accent />
        </CardGrid>
        <Text
          style={[
            styles.footnote,
            {
              fontSize: layout.isMobile ? 13 : 15,
              lineHeight: layout.isMobile ? 18 : 20,
            },
          ]}
        >
          Figures shown in the supplied Pulse brand overview.
        </Text>

        <SectionHeading layout={layout}>Start with Pulse</SectionHeading>
        <BodyText layout={layout} style={styles.sectionIntro}>
          Use Pulse as the starting point for your next experience. Follow the shared language first,
          then build on it thoughtfully.
        </BodyText>
        <View style={{ gap: layout.sectionGap }}>
          <Step
            layout={layout}
            n="01 · Explore the foundations"
            body="Understand the colors, typography, spacing and tokens that connect the system."
          />
          <Step
            layout={layout}
            n="02 · Choose a building block"
            body="Start with an existing component and read its description, types, guidelines and behavior."
          />
          <Step
            layout={layout}
            n="03 · Build with patterns"
            body="Combine reusable components into a coherent journey. Keep the experience clear and human-centered."
          />
          <Step
            layout={layout}
            n="04 · Share what you learn"
            body="Bring gaps and improvement opportunities back to the shared system, so the next team can benefit too."
          />
        </View>

        <View
          style={[
            styles.closing,
            {
              padding: layout.isMobile ? layout.cardPad : 48,
              borderRadius: layout.radius,
              flexDirection: layout.isMobile ? "column" : "row",
              gap: layout.sectionGap,
            },
          ]}
        >
          <View style={[styles.closingCopy, { minWidth: layout.isMobile ? "100%" : 260, gap: layout.sectionGap }]}>
            <Text
              style={[
                styles.closingTitle,
                {
                  fontSize: layout.sectionTitleSize,
                  lineHeight: layout.sectionTitleLine,
                },
              ]}
            >
              From screens to scalable digital experiences.
            </Text>
            <BodyText layout={layout}>
              Pulse Design System · The heartbeat of SAB’s digital experience.
            </BodyText>
          </View>
          <Image
            source={pulseMark}
            style={{ width: markW, maxWidth: "100%", height: markH, resizeMode: "contain" }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

type LayoutProps = { layout: ReturnType<typeof usePulseDocLayout> };

const SectionHeading: FC<{ children: ReactNode } & LayoutProps> = ({ children, layout }) => (
  <Text
    style={[
      styles.sectionHeading,
      {
        fontSize: layout.sectionTitleSize,
        lineHeight: layout.sectionTitleLine,
        paddingTop: layout.sectionGap,
      },
    ]}
  >
    {children}
  </Text>
);

const BodyText: FC<{ children: ReactNode; style?: object } & LayoutProps> = ({
  children,
  style,
  layout,
}) => (
  <Text
    style={[
      styles.body,
      {
        fontSize: layout.bodySize,
        lineHeight: layout.bodyLine,
      },
      style,
    ]}
  >
    {children}
  </Text>
);

const CardGrid: FC<{ children: ReactNode; columns?: 2 | 3 } & LayoutProps> = ({
  children,
  layout,
}) => (
  <View style={[styles.grid, { gap: layout.sectionGap }]}>{children}</View>
);

const InfoCard: FC<{
  title: string;
  body: string;
  body2?: string;
  fill?: boolean;
} & LayoutProps> = ({ title, body, body2, fill, layout }) => (
  <View
    style={[
      styles.card,
      fill && styles.cardFill,
      {
        padding: layout.cardPad,
        borderRadius: layout.radius,
        gap: layout.sectionGap,
        minWidth: layout.isMobile ? "100%" : layout.cardMinWidth,
        flexBasis: layout.isMobile ? "100%" : "30%",
      },
    ]}
  >
    <Text
      style={[
        styles.cardTitle,
        {
          fontSize: layout.cardTitleSize,
          lineHeight: layout.cardTitleLine,
        },
      ]}
    >
      {title}
    </Text>
    <BodyText layout={layout}>{body}</BodyText>
    {body2 ? <BodyText layout={layout}>{body2}</BodyText> : null}
  </View>
);

const StatCard: FC<{
  value: string;
  label: string;
  detail?: string;
  accent?: boolean;
} & LayoutProps> = ({ value, label, detail, accent, layout }) => (
  <View
    style={[
      styles.card,
      accent && styles.statAccent,
      {
        padding: layout.cardPad,
        borderRadius: layout.radius,
        gap: layout.isMobile ? 12 : 24,
        minWidth: layout.isMobile ? "100%" : layout.cardMinWidth,
        flexBasis: layout.isMobile ? "100%" : "30%",
      },
    ]}
  >
    <Text
      style={[
        styles.statValue,
        accent && styles.statValueOnAccent,
        {
          fontSize: layout.displaySize,
          lineHeight: layout.displayLine,
        },
      ]}
    >
      {value}
    </Text>
    <Text
      style={[
        styles.statLabel,
        accent && styles.statLabelOnAccent,
        {
          fontSize: layout.cardTitleSize,
          lineHeight: layout.cardTitleLine,
        },
      ]}
    >
      {label}
    </Text>
    {detail ? (
      <Text
        style={[
          styles.statDetail,
          accent && styles.statDetailOnAccent,
          {
            fontSize: layout.bodySize,
            lineHeight: layout.bodyLine,
          },
        ]}
      >
        {detail}
      </Text>
    ) : null}
  </View>
);

const Step: FC<{ n: string; body: string } & LayoutProps> = ({ n, body, layout }) => (
  <View
    style={[
      styles.stepRow,
      {
        flexDirection: layout.isMobile ? "column" : "row",
        gap: layout.isMobile ? 8 : 24,
      },
    ]}
  >
    <Text
      style={[
        styles.stepTitle,
        {
          fontSize: layout.cardTitleSize,
          lineHeight: layout.cardTitleLine,
          width: layout.isMobile ? "100%" : 320,
        },
      ]}
    >
      {n}
    </Text>
    <BodyText layout={layout} style={styles.stepBody}>
      {body}
    </BodyText>
  </View>
);

const styles = StyleSheet.create({
  scroll: { flex: 1, width: "100%", backgroundColor: C.white },
  content: { paddingBottom: 64, alignItems: "stretch", width: "100%", minWidth: 0 },
  header: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: C.redTint,
    justifyContent: "space-between",
    flexWrap: "wrap",
    minWidth: 0,
  },
  headerTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
    flexShrink: 1,
    minWidth: 0,
  },
  headerBrand: { alignItems: "flex-end", gap: 8 },
  headerBrandLabel: {
    fontFamily: fonts.HSBC_Medium,
    color: C.redPressed,
    fontWeight: "500",
  },
  page: {
    width: "100%",
    alignSelf: "center",
    paddingTop: 24,
    minWidth: 0,
  },
  sectionHeading: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  sectionIntro: { marginTop: -8 },
  body: {
    fontFamily: fonts.HSBC,
    color: C.gray,
  },
  heroCard: {
    backgroundColor: C.block,
    alignItems: "center",
    flexWrap: "wrap",
  },
  heroCopy: { flexGrow: 1, flexShrink: 1, minWidth: 0 },
  kicker: {
    fontFamily: fonts.HSBC,
    color: C.gray,
  },
  heroTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  heroPhones: {
    flexGrow: 1,
    flexShrink: 1,
    maxWidth: "100%",
    aspectRatio: 560 / 620,
    height: undefined,
    resizeMode: "contain",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  card: {
    backgroundColor: C.block,
    flexGrow: 1,
    maxWidth: "100%",
    minWidth: 0,
  },
  cardFill: { flex: 1 },
  cardTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  twoCol: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  identityCard: {
    backgroundColor: C.white,
    alignItems: "center",
    flexGrow: 1,
  },
  invertedMark: {
    backgroundColor: C.redDeep,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  identityTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
    alignSelf: "stretch",
  },
  versionRow: { alignItems: "center" },
  versionLogoWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    flexGrow: 1,
    justifyContent: "center",
  },
  versionBadge: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
    marginBottom: 4,
  },
  humanCard: {
    backgroundColor: C.block,
  },
  humanTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  foundationBand: {
    backgroundColor: C.block,
    alignItems: "center",
  },
  foundationCopy: {
    flex: 1,
  },
  redCaption: {
    fontFamily: fonts.HSBC,
    color: C.red,
  },
  subLabel: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  statValue: {
    fontFamily: fonts.HSBC_Bold,
    color: C.red,
    fontWeight: "700",
  },
  statLabel: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
  statDetail: {
    fontFamily: fonts.HSBC,
    color: C.gray,
  },
  statAccent: { backgroundColor: C.red },
  statValueOnAccent: { color: C.white },
  statLabelOnAccent: { color: C.white },
  statDetailOnAccent: { color: C.white },
  footnote: {
    fontFamily: fonts.HSBC,
    color: C.gray,
  },
  stepRow: {
    alignItems: "flex-start",
  },
  stepTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
    maxWidth: "100%",
  },
  stepBody: { flex: 1, minWidth: 0 },
  closing: {
    backgroundColor: C.redTonal,
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: 16,
    marginBottom: 24,
  },
  closingCopy: { flex: 1 },
  closingTitle: {
    fontFamily: fonts.HSBC_Bold,
    color: C.black,
    fontWeight: "700",
  },
});

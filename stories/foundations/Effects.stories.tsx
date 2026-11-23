import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import {
  spacingXS,
  spacingS,
  spacingL,
  radiusXS,
  backgroundBlurLight,
  glassBlurMedium,
  glassBlurRegular,
  overlayBlur,
  fontSmall,
  fontXXLG2,
  lineHeightSmall,
  lineHeightXXLG,
} from "../../src/assets/styles/constants/size";
import fonts from "../../src/assets/styles/constants/fonts";
import { canvasTier } from "../../src/assets/styles/utils/responsive";
import { tx } from "../../src/localization/tx";
import { foundationsDocsCanvas } from "../../.storybook/foundationsDocs";

/**
 * Figma: Effects page (3214:2708), frame “Effects” (3214:2739).
 * Backdrop blur tokens: BackgroundBlurLight → OverlayBlur
 */

const BORDER = "rgba(0,0,0,0.1)";
const TABLE_MAX = 1208;
const COL_TOKEN = 200;
const COL_VALUE = 200;
const COL_EXAMPLE = 199;
const COL_DESC = 494;
const TABLE_MIN = COL_TOKEN + COL_VALUE + COL_EXAMPLE + COL_DESC;

type EffectToken = {
  name: string;
  code: string;
  px: number;
  blur: number;
  description: string;
};

const effects: EffectToken[] = [
  {
    name: "BackgroundBlurLight",
    code: "backgroundBlurLight",
    px: 4,
    blur: backgroundBlurLight,
    description: "",
  },
  {
    name: "GlassBlurMedium",
    code: "glassBlurMedium",
    px: 8,
    blur: glassBlurMedium,
    description: "On Scroll header",
  },
  {
    name: "GlassBlurRegular",
    code: "glassBlurRegular",
    px: 40,
    blur: glassBlurRegular,
    description: "Dropdown background on menu",
  },
  {
    name: "OverlayBlur",
    code: "overlayBlur",
    px: 16,
    blur: overlayBlur,
    description: "",
  },
];

const useDocPad = () => {
  const { width } = useWindowDimensions();
  const tier = canvasTier(width);
  const isMobile = tier === "smallMobile" || tier === "largeMobile";
  return { pad: isMobile ? spacingS : spacingL };
};

/** Frosted sample over a striped backdrop so blur strength is visible. */
const BlurExample = ({ blur }: { blur: number }) => {
  const useNativeBlur = Platform.OS === "ios" || Platform.OS === "android";

  return (
    <View style={styles.exampleFrame}>
      <View style={styles.exampleBackdrop} pointerEvents="none">
        <View style={[styles.stripe, { backgroundColor: "#DB0011" }]} />
        <View style={[styles.stripe, { backgroundColor: "#730014" }]} />
        <View style={[styles.stripe, { backgroundColor: "#D7D8D6" }]} />
        <View style={[styles.stripe, { backgroundColor: "#305A85" }]} />
      </View>
      <View style={styles.blurCard}>
        {useNativeBlur ? (
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={blur}
            reducedTransparencyFallbackColor="rgba(255,255,255,0.8)"
          />
        ) : (
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.blurWeb,
              // RN-web: CSS backdrop-filter (Figma glass samples)
              { backdropFilter: `blur(${blur}px)` } as Record<string, string>,
            ]}
          />
        )}
      </View>
    </View>
  );
};

export default {
  title: "Foundations/Effects",
  parameters: {
    layout: "fullscreen",
    docs: {
      ...foundationsDocsCanvas,
      description: {
        component:
          "SAB Pulse effects foundations from Figma (node 3214:2708): backdrop blur tokens BackgroundBlurLight, GlassBlurMedium, GlassBlurRegular, and OverlayBlur.",
      },
    },
  },
};

/** Figma frame “Effects” (3214:2739). */
export const Effects = {
  name: "Effects",
  parameters: {
    docs: {
      description: {
        story:
          "Figma “Effects”: BackgroundBlurLight 4px, GlassBlurMedium 8px (on-scroll header), GlassBlurRegular 40px (dropdown menu), OverlayBlur 16px.",
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
          <Text style={styles.pageTitle}>{tx("Effects")}</Text>

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
                <View style={[styles.cell, styles.cellLast, { width: COL_DESC }]}>
                  <Text style={styles.headerText}>{tx("Description")}</Text>
                </View>
              </View>

              {effects.map((item) => (
                <View key={item.name} style={styles.row}>
                  <View style={[styles.cell, { width: COL_TOKEN }]}>
                    <Text style={styles.cellText}>{item.name}</Text>
                    <Text style={styles.cellSubText}>{item.code}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_VALUE }]}>
                    <Text style={styles.cellText}>{`${item.px}px`}</Text>
                  </View>
                  <View style={[styles.cell, { width: COL_EXAMPLE }]}>
                    <BlurExample blur={item.blur} />
                  </View>
                  <View
                    style={[styles.cell, styles.cellLast, { width: COL_DESC }]}
                  >
                    <Text style={styles.cellText}>
                      {item.description ? tx(item.description) : ""}
                    </Text>
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
    position: "relative",
  },
  exampleBackdrop: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  stripe: { flex: 1 },
  blurCard: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radiusXS,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  blurWeb: {
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});

import React, { FC } from "react";
import {
  I18nManager,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text as RNText,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontXSmall,
  lineHeightMedium,
  lineHeightXSmall,
  spacingXXS,
  spacingXS,
  spacingS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { NewCurrency } from "../text/NewCurrency";
import fonts from "../../assets/styles/constants/fonts";

export type VoucherCardType = "default" | "receipt";

export interface VoucherCardProps {
  /** Figma Type=Default | Type=Reciept */
  type?: VoucherCardType;
  title?: string;
  /** Amount / gift label, e.g. "50 Gift Card". Prefix with "SAR " for riyal glyph. */
  subtitle?: string;
  /** Default type: "Valid till …" date value */
  validTill?: string;
  /** Default type: voucher code */
  code?: string;
  /** Default type: PIN */
  pin?: string;
  /** Receipt type: short expiry label, e.g. "Exp. 18/07/25" */
  expiry?: string;
  /** QR image source (remote uri object or require()) */
  qrSource?: ImageSourcePropType;
  showSar?: boolean;
  containerStyle?: ViewStyle;
}

const CARD_W = actuatedNormalize(285);
const CARD_H = actuatedNormalize(176);
const FRONT_H = actuatedNormalize(148);
const FRONT_W = actuatedNormalize(271);
const RADIUS = actuatedNormalize(7);
const QR_SIZE = actuatedNormalize(60);

const DEFAULT_QR = require("./assets/voucher/qr-code.png");
const PATTERN = require("./assets/voucher/receipt-pattern.png");

/**
 * Voucher Card — Figma Products card → Voucher Card (16159:31271)
 * Types: Default (details + QR) | Receipt (centered summary + QR)
 */
export const VoucherCard: FC<VoucherCardProps> = ({
  type = "default",
  title = "Noon Gift Cards - KSA Store",
  subtitle = "SAR 50 Gift Card",
  validTill = "December 27, 2025",
  code = "MKHSJJJJ",
  pin = "309872",
  expiry = "Exp. 18/07/25",
  qrSource = DEFAULT_QR,
  showSar = true,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const isReceipt = type === "receipt";

  const subtitleText = showSar
    ? subtitle.startsWith("SAR")
      ? subtitle
      : `SAR ${subtitle}`
    : subtitle.replace(/^SAR\s*/i, "");

  return (
    <View style={[styles.root, containerStyle]}>
      {/* Stacked red back card (Figma rotate ≈ 6°) */}
      <View
        style={[
          styles.backCard,
          {
            backgroundColor: theme.primarycolor3static,
            transform: [{ rotate: "6deg" }],
          },
        ]}
        pointerEvents="none"
      />

      <View
        style={[
          styles.frontCard,
          {
            backgroundColor: theme.stylesblockbg ?? "#F2F3F4",
            height: FRONT_H,
            top: isReceipt ? actuatedNormalize(28) : actuatedNormalize(28),
          },
        ]}
      >
        <Image
          source={PATTERN}
          style={styles.pattern}
          resizeMode="cover"
        />

        {isReceipt ? (
          <View style={styles.receiptContent}>
            <Text
              bold
              size={fontMedium}
              variant="primarycolorstatic"
              numberOfLines={2}
              overrideStyles={[styles.receiptTitle, fonts.withTrueBoldWeight({})]}
            >
              {title}
            </Text>
            <View style={[styles.receiptMetaRow, isRTL && styles.receiptMetaRowRtl]}>
              <NewCurrency
                text={subtitleText}
                size={fontMedium}
                variant="primarycolorstatic"
                textstyle={{ lineHeight: lineHeightMedium }}
              />
              <View
                style={[
                  styles.dot,
                  { backgroundColor: theme.primarycolorstatic ?? "#000" },
                ]}
              />
              <Text
                size={fontMedium}
                variant="primarycolorstatic"
                overrideStyles={{ lineHeight: lineHeightMedium }}
              >
                {expiry}
              </Text>
            </View>
            <Image source={qrSource} style={styles.qr} resizeMode="cover" />
          </View>
        ) : (
          <View style={[styles.defaultContent, isRTL && styles.defaultContentRtl]}>
            <View style={styles.titleBlock}>
              <Text
                bold
                size={fontMedium}
                variant="primarycolorstatic"
                numberOfLines={2}
                overrideStyles={[
                  { lineHeight: lineHeightMedium, textAlign: isRTL ? "right" : "left" },
                  fonts.withTrueBoldWeight({}),
                ]}
              >
                {title}
              </Text>
              <NewCurrency
                text={subtitleText}
                size={fontMedium}
                variant="primarycolorstatic"
                textstyle={{
                  lineHeight: lineHeightMedium,
                  textAlign: isRTL ? "right" : "left",
                }}
              />
            </View>

            <View style={[styles.infoRow, isRTL && styles.infoRowRtl]}>
              <Image source={qrSource} style={styles.qr} resizeMode="cover" />
              <View style={styles.infoTextCol}>
                <RNText
                  style={fonts.withTrueBoldWeight([
                    styles.metaLine,
                    { color: theme.primarytextcolor2 },
                  ])}
                >
                  {"Valid till "}
                  <RNText
                    style={fonts.withTrueBoldWeight([
                      styles.metaLineBold,
                      { color: theme.primarytextcolor2 },
                    ])}
                  >
                    {validTill}
                  </RNText>
                </RNText>
                <RNText
                  style={fonts.withTrueBoldWeight([
                    styles.metaLine,
                    { color: theme.primarytextcolor2 },
                  ])}
                >
                  <RNText
                    style={fonts.withTrueBoldWeight([
                      styles.metaLineBold,
                      { color: theme.primarytextcolor2 },
                    ])}
                  >
                    {"Code: "}
                  </RNText>
                  {code}
                </RNText>
                <RNText
                  style={fonts.withTrueBoldWeight([
                    styles.metaLine,
                    { color: theme.primarytextcolor2 },
                  ])}
                >
                  <RNText
                    style={fonts.withTrueBoldWeight([
                      styles.metaLineBold,
                      { color: theme.primarytextcolor2 },
                    ])}
                  >
                    {"Pin: "}
                  </RNText>
                  {pin}
                </RNText>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const cardShadow = {
  shadowColor: "#777777",
  shadowOffset: { width: 0, height: actuatedNormalize(3.5) },
  shadowOpacity: 0.25,
  shadowRadius: actuatedNormalize(7),
  elevation: 4,
};

const styles = StyleSheet.create({
  root: {
    width: CARD_W,
    height: CARD_H,
    position: "relative",
  },
  backCard: {
    position: "absolute",
    width: FRONT_W,
    height: FRONT_H,
    borderRadius: RADIUS,
    left: actuatedNormalize(8),
    top: actuatedNormalize(8),
    ...cardShadow,
  },
  frontCard: {
    position: "absolute",
    left: 0,
    width: FRONT_W,
    borderRadius: RADIUS,
    overflow: "hidden",
    ...cardShadow,
  },
  pattern: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
    width: actuatedNormalize(299),
    height: actuatedNormalize(209),
    top: actuatedNormalize(-23),
    left: 0,
  },
  defaultContent: {
    flex: 1,
    paddingHorizontal: spacingS,
    paddingTop: actuatedNormalize(13),
    paddingBottom: spacingXS,
    gap: actuatedNormalize(21),
  },
  defaultContentRtl: {
    alignItems: "flex-end",
  },
  titleBlock: {
    gap: spacingXXS,
    maxWidth: actuatedNormalize(198),
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingS,
  },
  infoRowRtl: {
    flexDirection: "row-reverse",
  },
  infoTextCol: {
    flex: 1,
    gap: spacingXXS,
    justifyContent: "center",
  },
  receiptContent: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: spacingS,
    paddingTop: actuatedNormalize(15),
    gap: spacingXS,
  },
  receiptTitle: {
    lineHeight: lineHeightMedium,
    textAlign: "center",
    width: "100%",
  },
  receiptMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
  },
  receiptMetaRowRtl: {
    flexDirection: "row-reverse",
  },
  dot: {
    width: actuatedNormalize(4),
    height: actuatedNormalize(4),
    borderRadius: actuatedNormalize(2),
  },
  qr: {
    width: QR_SIZE,
    height: QR_SIZE,
  },
  metaLine: {
    fontSize: fontXSmall,
    lineHeight: lineHeightXSmall,
    fontFamily: fonts.HSBC,
  },
  metaLineBold: {
    fontSize: fontXSmall,
    lineHeight: lineHeightXSmall,
    fontFamily: fonts.HSBC_Bold,
  },
});

export default VoucherCard;

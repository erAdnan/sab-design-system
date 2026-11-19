import React, { FC } from "react";
import {
  I18nManager,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  lineHeightMedium,
  lineHeightSmall,
  lineHeightMediumLarge,
  spacingXXS,
  spacingXS,
  spacingS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { Text } from "../text/Text";
import { NewCurrency } from "../text/NewCurrency";
import Copy from "../icons/functionals/Copy";
import { VoucherCard } from "./VoucherCard";

export type VoucherReceiptType = "card" | "gifting";

export interface VoucherReceiptDetail {
  label: string;
  value: string;
  /** When true, shows copy action (Card type defaults: code/pin/ref) */
  copyable?: boolean;
  /** Render value with SAR glyph via NewCurrency */
  showSar?: boolean;
}

export interface VoucherReceiptProps {
  /** Figma Type=Card | Type=Gifting */
  type?: VoucherReceiptType;
  /** Card type — embedded voucher card title */
  title?: string;
  /** Card type — e.g. "50 Gift Card" */
  subtitle?: string;
  /** Card type — e.g. "Exp. 18/07/25" */
  expiry?: string;
  qrSource?: ImageSourcePropType;
  showSar?: boolean;
  /** Card type detail rows (defaults to Redeem Code / PIN / Reference / Purchase Date) */
  details?: VoucherReceiptDetail[];
  /** Gifting type */
  message?: string;
  illustrationSource?: ImageSourcePropType;
  to?: string;
  amount?: string;
  date?: string;
  from?: string;
  onCopy?: (value: string, label: string) => void;
  containerStyle?: ViewStyle;
}

const WIDTH = actuatedNormalize(310);
const CARD_H = actuatedNormalize(502);
const GIFTING_H = actuatedNormalize(548);
const RADIUS = actuatedNormalize(16);

const DEFAULT_ILLUSTRATION = require("./assets/voucher/gifting-illustration.png");

const DEFAULT_CARD_DETAILS: VoucherReceiptDetail[] = [
  { label: "Redeem Code", value: "TPLOIUMG", copyable: true },
  { label: "PIN", value: "1234", copyable: true },
  { label: "Reference Number", value: "1234", copyable: true },
  { label: "Purchase Date", value: "dd/mm/yy" },
];

const CARD_TICKET_PATH =
  "M310 199C293.984 199 281 211.984 281 228C281 244.016 293.984 257 310 257V502H0V257C16.0163 257 29 244.016 29 228C29 211.984 16.0163 199 0 199V0H310V199Z";
const GIFTING_TICKET_PATH =
  "M310 241.557C293.984 241.557 281 254.54 281 270.557V271.216C281 286.982 293.582 299.809 309.252 300.206L310 300.216V548.002H0V300.216C16.0161 300.216 28.9997 287.232 29 271.216V270.557C29 254.79 16.4186 241.962 0.748047 241.565L0 241.557V0H310V241.557Z";

const TicketBackground: FC<{
  width: number;
  height: number;
  variant: VoucherReceiptType;
}> = ({ width, height, variant }) => {
  const isGifting = variant === "gifting";

  return (
    <Svg
      width={width}
      height={height}
      viewBox={isGifting ? "0 0 310 548.002" : "0 0 310 502"}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      <Defs>
        <LinearGradient
          id="voucherReceiptFill"
          x1="155"
          y1={isGifting ? "40.2895" : "0"}
          x2="155"
          y2={isGifting ? "548.002" : "502"}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset="0.45" stopColor="#FBFBFB" />
          <Stop offset="0.45" stopColor="#F2F3F4" />
        </LinearGradient>
      </Defs>
      <Path
        d={isGifting ? GIFTING_TICKET_PATH : CARD_TICKET_PATH}
        fill="url(#voucherReceiptFill)"
      />
    </Svg>
  );
};

const DetailRow: FC<{
  item: VoucherReceiptDetail;
  showDivider: boolean;
  isRTL: boolean;
  dividerColor: string;
  copyColor: string;
  onCopy?: (value: string, label: string) => void;
}> = ({ item, showDivider, isRTL, dividerColor, copyColor, onCopy }) => {
  const align = isRTL ? "right" : "left";

  return (
    <View style={styles.detailBlock}>
      <View style={[styles.detailRow, isRTL && styles.detailRowRtl]}>
        <View style={[styles.detailBody, isRTL && styles.detailBodyRtl]}>
          <Text
            size={isRTL ? fontSmall : fontMedium}
            variant="primarytextcolor2"
            overrideStyles={{
              lineHeight: isRTL ? lineHeightSmall : lineHeightMedium,
              textAlign: align,
              width: "100%",
            }}
          >
            {item.label}
          </Text>
          {item.showSar ? (
            <NewCurrency
              text={
                item.value.startsWith("SAR") || item.value.startsWith("sar")
                  ? item.value
                  : `SAR ${item.value}`
              }
              size={isRTL ? fontMedium : fontMediumLarge}
              variant="primarycolorstatic"
              textstyle={{
                lineHeight: isRTL ? lineHeightMedium : lineHeightMediumLarge,
                textAlign: align,
                fontFamily: isRTL ? fonts.HSBC_Bold : fonts.HSBC_Medium,
              }}
            />
          ) : (
            <Text
              medium={!isRTL}
              bold={isRTL}
              size={isRTL ? fontMedium : fontMediumLarge}
              variant="primarycolorstatic"
              overrideStyles={{
                lineHeight: isRTL ? lineHeightMedium : lineHeightMediumLarge,
                textAlign: align,
                width: "100%",
              }}
            >
              {item.value}
            </Text>
          )}
        </View>
        {item.copyable ? (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={`Copy ${item.label}`}
            onPress={() => onCopy?.(item.value, item.label)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.copyBtn}
          >
            <Copy
              width={actuatedNormalize(24)}
              height={actuatedNormalize(24)}
              fill={copyColor}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {showDivider ? (
        <View style={[styles.divider, { backgroundColor: dividerColor }]} />
      ) : null}
    </View>
  );
};

/**
 * Voucher Receipt — Figma Products card → Voucher receipt (16168:37547)
 * Types: Card (voucher + redeem details) | Gifting (illustration + message)
 */
export const VoucherReceipt: FC<VoucherReceiptProps> = ({
  type = "card",
  title = "Noon Gift Cards - KSA Store",
  subtitle = "50 Gift Card",
  expiry = "Exp. 18/07/25",
  qrSource,
  showSar = true,
  details,
  message = "Happy Birthday! 🎂 Hope your day’s filled with love, laughter, and cake. Wishing you health, happiness, and all the best life has to offer. Have an amazing year ahead!",
  illustrationSource = DEFAULT_ILLUSTRATION,
  to = "Receiver Name",
  amount = "50",
  date = "dd/mm/yy",
  from = "Sender Name",
  onCopy,
  containerStyle,
}) => {
  const { theme } = useTheme();
  const isRTL = I18nManager.isRTL;
  const isGifting = type === "gifting";
  const height = isGifting ? GIFTING_H : CARD_H;

  const cardDetails = details ?? DEFAULT_CARD_DETAILS;
  const giftingDetails: VoucherReceiptDetail[] = [
    { label: "To", value: to },
    { label: "Amount", value: amount, showSar: true },
    { label: "Date", value: date },
    { label: "From", value: from },
  ];
  const rows = isGifting ? giftingDetails : cardDetails;
  const dividerColor = theme.primarygray ?? "#D7D8D6";
  const copyColor = theme.primarycolor3static ?? "#DB0011";

  return (
    <View
      style={[
        styles.root,
        { width: WIDTH, height, borderRadius: RADIUS },
        containerStyle,
      ]}
    >
      <TicketBackground
        width={WIDTH}
        height={height}
        variant={isGifting ? "gifting" : "card"}
      />

      {isGifting ? (
        <View style={styles.giftingHeader}>
          <Image
            source={illustrationSource}
            style={styles.illustration}
            resizeMode="contain"
          />
          <View style={styles.messageWrap}>
            <Text
              size={fontSmall}
              variant="primarycolorstatic"
              overrideStyles={styles.message}
            >
              {message}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.cardHeader}>
          <VoucherCard
            type="receipt"
            title={title}
            subtitle={subtitle}
            expiry={expiry}
            qrSource={qrSource}
            showSar={showSar}
          />
        </View>
      )}

      <View
        style={[
          styles.detailsContainer,
          isGifting ? styles.detailsGifting : styles.detailsCard,
        ]}
      >
        {rows.map((item, index) => (
          <DetailRow
            key={`${item.label}-${index}`}
            item={item}
            showDivider={index < rows.length - 1}
            isRTL={isRTL}
            dividerColor={dividerColor}
            copyColor={copyColor}
            onCopy={onCopy}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "relative",
    overflow: "hidden",
  },
  cardHeader: {
    paddingTop: actuatedNormalize(18),
    paddingHorizontal: actuatedNormalize(12.5),
    alignItems: "center",
  },
  giftingHeader: {
    alignItems: "center",
    gap: spacingXS,
    width: "100%",
  },
  illustration: {
    width: actuatedNormalize(298),
    height: actuatedNormalize(178),
  },
  messageWrap: {
    paddingHorizontal: spacingS,
    width: "100%",
  },
  message: {
    lineHeight: lineHeightSmall,
    textAlign: "center",
  },
  detailsContainer: {
    position: "absolute",
    left: actuatedNormalize(8),
    right: actuatedNormalize(8),
    paddingHorizontal: spacingS,
    gap: spacingXS,
  },
  detailsCard: {
    top: actuatedNormalize(276),
  },
  detailsGifting: {
    top: actuatedNormalize(321),
  },
  detailBlock: {
    width: "100%",
    gap: spacingXS,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
    width: "100%",
  },
  detailRowRtl: {
    flexDirection: "row-reverse",
  },
  detailBody: {
    flex: 1,
    gap: spacingXXS,
    alignItems: "flex-start",
  },
  detailBodyRtl: {
    alignItems: "flex-end",
  },
  copyBtn: {
    width: actuatedNormalize(24),
    height: actuatedNormalize(24),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
  },
});

export default VoucherReceipt;

import React, { FC, useState } from "react";
import {
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import StarFilled from "../icons/filled/Star";
import StarOutline from "../icons/outline/Star";

const IOS_BLUE = "#007AFF";
const DIVIDER = "#BDBDBF";

export interface IOSRateAlertProps {
  title?: string;
  message?: string;
  cancelLabel?: string;
  submitLabel?: string;
  /** Initial selected rating 0–5 */
  rating?: number;
  onRatingChange?: (rating: number) => void;
  onCancel?: () => void;
  onSubmit?: (rating: number) => void;
  containerStyle?: ViewStyle;
}

/**
 * iOS App Store style rate alert — Figma iOS.review.native (1173:11542)
 */
export const IOSRateAlert: FC<IOSRateAlertProps> = ({
  title = "Enjoying SAB Mobile App?",
  message = "Tap a star to rate it on the App Store.",
  cancelLabel = "Not now",
  submitLabel = "Submit",
  rating: ratingProp = 4,
  onRatingChange,
  onCancel,
  onSubmit,
  containerStyle,
}) => {
  const [rating, setRating] = useState(ratingProp);
  const starSize = actuatedNormalize(20);

  const selectRating = (value: number) => {
    setRating(value);
    onRatingChange?.(value);
  };

  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.content}>
        <RNText style={styles.title}>{title}</RNText>
        <RNText style={styles.message}>{message}</RNText>
      </View>

      <View style={styles.divider} />

      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((value) => {
          const filled = value <= rating;
          const Star = filled ? StarFilled : StarOutline;
          return (
            <TouchableOpacity
              key={value}
              accessibilityRole="button"
              accessibilityLabel={`Rate ${value} stars`}
              onPress={() => selectRating(value)}
              hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            >
              <Star
                width={starSize}
                height={starSize}
                fill={IOS_BLUE}
                stroke={IOS_BLUE}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.divider} />

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onCancel}
          accessibilityRole="button"
          accessibilityLabel={cancelLabel}
        >
          <RNText style={styles.cancelText}>{cancelLabel}</RNText>
        </TouchableOpacity>
        <View style={styles.vDivider} />
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => onSubmit?.(rating)}
          accessibilityRole="button"
          accessibilityLabel={submitLabel}
        >
          <RNText style={styles.submitText}>{submitLabel}</RNText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: actuatedNormalize(269),
    borderRadius: actuatedNormalize(14),
    backgroundColor: "rgba(242, 242, 242, 0.92)",
    overflow: "hidden",
    alignItems: "center",
  },
  content: {
    width: "100%",
    paddingTop: actuatedNormalize(20),
    paddingBottom: actuatedNormalize(20),
    paddingHorizontal: actuatedNormalize(16),
    gap: actuatedNormalize(8),
    alignItems: "center",
  },
  title: {
    width: "100%",
    fontSize: actuatedNormalize(20),
    lineHeight: actuatedNormalize(22),
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.41,
  },
  message: {
    width: "100%",
    fontSize: actuatedNormalize(15),
    lineHeight: actuatedNormalize(20),
    fontWeight: "400",
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    width: "100%",
    backgroundColor: DIVIDER,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: actuatedNormalize(12),
    paddingVertical: actuatedNormalize(12),
    width: "100%",
  },
  actions: {
    flexDirection: "row",
    width: "100%",
    minHeight: actuatedNormalize(44),
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: actuatedNormalize(11),
  },
  vDivider: {
    width: StyleSheet.hairlineWidth,
    backgroundColor: DIVIDER,
  },
  cancelText: {
    fontSize: actuatedNormalize(17),
    lineHeight: actuatedNormalize(22),
    fontWeight: "400",
    color: IOS_BLUE,
    letterSpacing: -0.41,
  },
  submitText: {
    fontSize: actuatedNormalize(17),
    lineHeight: actuatedNormalize(22),
    fontWeight: "600",
    color: IOS_BLUE,
    letterSpacing: -0.41,
  },
});

export default IOSRateAlert;

import React, { FC } from "react";
import {
  StyleSheet,
  Text as RNText,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Backspace from "../icons/functionals/Backspace";
import { HomeIndicator } from "./HomeIndicator";

const KEYS: { digit: string; letters?: string }[] = [
  { digit: "1" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
];

export interface IOSNumbersKeyboardProps {
  onKeyPress?: (key: string) => void;
  onDelete?: () => void;
  onSymbols?: () => void;
  showHomeIndicator?: boolean;
  containerStyle?: ViewStyle;
}

/**
 * iOS phone numbers keyboard — Figma iOs.keyboard Type=Numbers (1173:12979)
 */
export const IOSNumbersKeyboard: FC<IOSNumbersKeyboardProps> = ({
  onKeyPress,
  onDelete,
  onSymbols,
  showHomeIndicator = true,
  containerStyle,
}) => {
  return (
    <View style={[styles.board, containerStyle]}>
      <View style={styles.grid}>
        {KEYS.map((key) => (
          <TouchableOpacity
            key={key.digit}
            style={styles.key}
            onPress={() => onKeyPress?.(key.digit)}
            accessibilityRole="button"
            accessibilityLabel={key.digit}
            activeOpacity={0.7}
          >
            <RNText style={styles.digit}>{key.digit}</RNText>
            {key.letters ? (
              <RNText style={styles.letters}>{key.letters}</RNText>
            ) : (
              <View style={styles.lettersSpacer} />
            )}
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.sideKey}
          onPress={onSymbols}
          accessibilityRole="button"
          accessibilityLabel="Symbols"
          activeOpacity={0.7}
        >
          <RNText style={styles.symbolsText}>{"+  *  #"}</RNText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.key}
          onPress={() => onKeyPress?.("0")}
          accessibilityRole="button"
          accessibilityLabel="0"
          activeOpacity={0.7}
        >
          <RNText style={[styles.digit, styles.digitSolo]}>0</RNText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.sideKey}
          onPress={onDelete}
          accessibilityRole="button"
          accessibilityLabel="Delete"
          activeOpacity={0.7}
        >
          <Backspace
            width={actuatedNormalize(24)}
            height={actuatedNormalize(24)}
            fill="#000000"
          />
        </TouchableOpacity>
      </View>

      {showHomeIndicator ? (
        <HomeIndicator mode="light" containerStyle={styles.home} />
      ) : null}
    </View>
  );
};

const KEY_W = actuatedNormalize(117);
const KEY_H = actuatedNormalize(46);
const GAP_X = actuatedNormalize(6);
const GAP_Y = actuatedNormalize(10);

const styles = StyleSheet.create({
  board: {
    width: actuatedNormalize(375),
    backgroundColor: "#D4D6DC",
    paddingTop: actuatedNormalize(6),
    paddingBottom: actuatedNormalize(4),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: GAP_X,
    rowGap: GAP_Y,
    paddingHorizontal: actuatedNormalize(6),
  },
  key: {
    width: KEY_W,
    height: KEY_H,
    backgroundColor: "#FCFCFE",
    borderRadius: actuatedNormalize(5),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 1,
  },
  sideKey: {
    width: KEY_W,
    height: KEY_H,
    alignItems: "center",
    justifyContent: "center",
  },
  digit: {
    fontSize: actuatedNormalize(25),
    lineHeight: actuatedNormalize(28),
    color: "#000000",
    textAlign: "center",
    letterSpacing: 0.29,
    marginTop: actuatedNormalize(-2),
  },
  digitSolo: {
    marginTop: 0,
  },
  letters: {
    fontSize: actuatedNormalize(10),
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 2,
    textAlign: "center",
    marginTop: actuatedNormalize(-2),
  },
  lettersSpacer: {
    height: actuatedNormalize(10),
  },
  symbolsText: {
    fontSize: actuatedNormalize(16),
    fontWeight: "500",
    color: "#000000",
    letterSpacing: 1,
  },
  home: {
    marginTop: actuatedNormalize(8),
    opacity: 0.9,
  },
});

export default IOSNumbersKeyboard;

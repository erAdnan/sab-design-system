import React, { FC } from "react";
import { StyleSheet, Text as RNText, View, ViewStyle } from "react-native";
import Svg, { Path, Rect } from "react-native-svg";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

export interface StatusBarIPhoneProps {
  time?: string;
  containerStyle?: ViewStyle;
}

const CellularIcon = () => (
  <Svg
    width={actuatedNormalize(19)}
    height={actuatedNormalize(12)}
    viewBox="0 0 19 12"
  >
    <Rect x={0} y={7.5} width={3} height={4.5} rx={0.5} fill="#000" />
    <Rect x={5} y={5} width={3} height={7} rx={0.5} fill="#000" />
    <Rect x={10} y={2.5} width={3} height={9.5} rx={0.5} fill="#000" />
    <Rect
      x={15}
      y={0}
      width={3}
      height={12}
      rx={0.5}
      fill="#000"
      opacity={0.3}
    />
  </Svg>
);

const WifiIcon = () => (
  <Svg
    width={actuatedNormalize(17)}
    height={actuatedNormalize(12)}
    viewBox="0 0 17 12"
    fill="none"
  >
    <Path
      d="M8.5 11.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z"
      fill="#000"
    />
    <Path
      d="M4.2 7.1a6.1 6.1 0 0 1 8.6 0"
      stroke="#000"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Path
      d="M1.6 4.4a9.8 9.8 0 0 1 13.8 0"
      stroke="#000"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

/**
 * iPhone status bar — Figma Status Bar - iPhone (1173:11484)
 */
export const StatusBarIPhone: FC<StatusBarIPhoneProps> = ({
  time = "9:41",
  containerStyle,
}) => {
  return (
    <View style={[styles.bar, containerStyle]}>
      <View style={styles.timeWrap}>
        <RNText style={styles.time}>{time}</RNText>
      </View>
      <View style={styles.levels}>
        <CellularIcon />
        <WifiIcon />
        <View style={styles.battery}>
          <View style={styles.batteryBorder}>
            <View style={styles.batteryFill} />
          </View>
          <View style={styles.batteryCap} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    width: actuatedNormalize(375),
    height: actuatedNormalize(50),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: actuatedNormalize(16),
  },
  timeWrap: {
    flex: 1,
    justifyContent: "center",
  },
  time: {
    fontSize: actuatedNormalize(17),
    lineHeight: actuatedNormalize(22),
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    width: actuatedNormalize(54),
  },
  levels: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: actuatedNormalize(6),
  },
  battery: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryBorder: {
    width: actuatedNormalize(25),
    height: actuatedNormalize(13),
    borderRadius: actuatedNormalize(4),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(0,0,0,0.35)",
    padding: actuatedNormalize(2),
    justifyContent: "center",
  },
  batteryFill: {
    flex: 1,
    borderRadius: actuatedNormalize(2.5),
    backgroundColor: "#000000",
  },
  batteryCap: {
    width: actuatedNormalize(1.5),
    height: actuatedNormalize(4),
    marginLeft: actuatedNormalize(1),
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
});

export default StatusBarIPhone;

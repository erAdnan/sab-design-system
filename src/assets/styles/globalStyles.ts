import { StyleSheet } from "react-native";
import { Size } from ".";

export const globalStyles = StyleSheet.create({
  rtlTitle: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: Size.spacingXS,
  },
  rtlText: {
    flexDirection: "row-reverse",
    alignItems: "flex-end",
    gap: Size.spacingXS,
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
  },
  bgBlack: {
    backgroundColor: "#000000",
  },
  textBlack: {
    color: "#000000",
  },
  bgWhite: {
    backgroundColor: "#ffffff",
  },
  textWhite: {
    color: "#ffffff",
  },
});

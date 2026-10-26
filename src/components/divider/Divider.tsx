import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";

interface DividerProps {
  overrideStyles?: ViewStyle;
}

export const Divider: React.FC<DividerProps> = ({ overrideStyles = {} }) => {
  const { theme } = useTheme();
  const dividerStyles = StyleSheet.create({
    general: {
      display: "flex",
      height: 1,
      alignItems: "flex-start",
      width: "100%",
      alignSelf: "stretch",
      backgroundColor: theme.primarycolor2_20,
    },
  });

  return <View style={[dividerStyles.general, overrideStyles]} />;
};

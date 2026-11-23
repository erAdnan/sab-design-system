import { View, Text as RNText } from "react-native";
import { versionLabel } from "./version";

/**
 * Canvas badge so screenshots and demos show which package version is running.
 */
export function StorybookVersionBadge() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 4,
        backgroundColor: "#161616",
      }}
    >
      <RNText
        style={{
          color: "#F5F2ED",
          fontSize: 12,
          fontWeight: "600",
          fontFamily: "System",
        }}
      >
        {versionLabel}
      </RNText>
    </View>
  );
}

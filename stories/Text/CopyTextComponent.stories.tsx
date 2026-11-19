import CopyTextComponent from "../../src/components/snackbar/CopyTextComponent";
import { View, StyleSheet } from "react-native";

export default {
  title: "Components/Layout/Text/CopyTextComponent",
  component: CopyTextComponent,
  argTypes: {
    text: { control: "text" },
    duration: { control: "number" },
    language: { control: "radio", options: ["en", "ar"] },
    enableDarktheme: { control: "boolean" },
  },
  args: {
    text: "Reference Number Copied",
    duration: 5000,
    language: "en",
    enableDarktheme: false,
  },
};

export const Default = {
  render: (args: any) => (
    <View style={styles.stage}>
      <CopyTextComponent {...args} onDismiss={() => console.log("dismissed")} />
    </View>
  ),
};

const styles = StyleSheet.create({
  stage: {
    flex: 1,
    // The Storybook slot centers its children (alignItems: "center"), which
    // collapses this stage to 0 width. The toast is absolutely positioned
    // against the stage, so it needs a real width to size correctly.
    width: "100%",
    minHeight: 200,
  },
});

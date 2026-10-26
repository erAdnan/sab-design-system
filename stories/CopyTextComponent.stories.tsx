import CopyTextComponent from "../src/components/snackbar/CopyTextComponent";
import { View, StyleSheet } from "react-native";

export default {
  title: "Components/CopyTextComponent",
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
    minHeight: 200,
  },
});

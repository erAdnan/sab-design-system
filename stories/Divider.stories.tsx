import { Divider } from "../src/components/divider/Divider";
import { TextTitle } from "../src/components/text/TextTitle";
import { Text } from "../src/components/text/Text";
import { StyleSheet, View } from "react-native";
import { spacingS } from "../src/assets/styles/constants/size";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Layout/Divider",
  component: Divider,
  tags: ["!autodocs"],
};

const DividerExample = () => {
  const styles = StyleSheet.create({
    text: {
      marginHorizontal: spacingS,
      marginBottom: spacingS,
    },
    title: {
      paddingVertical: spacingS,
    },
  });
  return (
    <View>
      <View>
        <TextTitle text="Headline" overrideStyles={styles.title} />
        <Text overrideStyles={styles.text}>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
          consectetur
        </Text>
      </View>
      <Divider />
      <View>
        <TextTitle text="Headline" overrideStyles={styles.title} />
        <Text overrideStyles={styles.text}>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
          consectetur
        </Text>
      </View>
      <Divider />
      <View>
        <TextTitle text="Headline" overrideStyles={styles.title} />
        <Text overrideStyles={styles.text}>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
          consectetur
        </Text>
      </View>
    </View>
  );
};


export const Default = {
  render: DividerExample,
  args: {
  }
};
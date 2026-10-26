import { View } from "react-native";
import { RagIconType, Rag } from "../src/components/rag/Rag";
import { spacingS } from "../src/assets/styles/constants/size";
import RagFilledSuccess from "../src/components/icons/ragFilled/RagFilledSuccess";
import RagFilledError from "../src/components/icons/ragFilled/RagFilledError";
import RagFilledWarning from "../src/components/icons/ragFilled/RagFilledWarning";
import RagFilledInfo from "../src/components/icons/ragFilled/RagFilledInfo";

export default {
  title: "Components/Rag",
  component: Rag,
};

const InteractiveTemplateDefault = (args: any) => {
  return <View style={{ flexDirection: "column", justifyContent: "space-around", gap: spacingS }}>
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <Rag {...args} type={RagIconType.success} size="extralarge" />
      <Rag {...args} type={RagIconType.success} size="large" />
      <Rag {...args} type={RagIconType.success} size="medium" />
      <Rag {...args} type={RagIconType.success} size="small" />
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <Rag {...args} type={RagIconType.warning} size="extralarge" />
      <Rag {...args} type={RagIconType.warning} size="large" />
      <Rag {...args} type={RagIconType.warning} size="medium" />
      <Rag {...args} type={RagIconType.warning} size="small" />
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <Rag {...args} type={RagIconType.error} size="extralarge" />
      <Rag {...args} type={RagIconType.error} size="large" />
      <Rag {...args} type={RagIconType.error} size="medium" />
      <Rag {...args} type={RagIconType.error} size="small" />
    </View>
    <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
      <Rag {...args} type={RagIconType.info} size="extralarge" />
      <Rag {...args} type={RagIconType.info} size="large" />
      <Rag {...args} type={RagIconType.info} size="medium" />
      <Rag {...args} type={RagIconType.info} size="small" />
    </View>
  </View>;
};

const InteractiveTemplateFamily = () => {
   return (
    <View style={{ flexDirection: "row", flex: 3, flexWrap: "wrap", gap: spacingS }}>
      <Rag shape='family' type={RagIconType.success} />
      <Rag shape='family' type={RagIconType.warning}/>
      <Rag shape='family' type={RagIconType.info} />
      <Rag shape='family' type={RagIconType.loading} />
      <Rag shape='family' type={RagIconType.delete} />
      <Rag shape='family' type={RagIconType.error} />
    </View>
   )
}

// Filled RAGs are the small-size variant only; larger sizes use the default (outline) icons.
const filledSize = 16;

const InteractiveTemplateFilled = () => {
  return <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center", gap: spacingS }}>
    <RagFilledSuccess width={filledSize} height={filledSize} />
    <RagFilledWarning width={filledSize} height={filledSize} />
    <RagFilledError width={filledSize} height={filledSize} />
    <RagFilledInfo width={filledSize} height={filledSize} />
  </View>;
};

export const Default = {
  render: InteractiveTemplateDefault,
};

export const FilledSmall = {
  render: InteractiveTemplateFilled,
};

export const Family = {
  render: InteractiveTemplateFamily
}

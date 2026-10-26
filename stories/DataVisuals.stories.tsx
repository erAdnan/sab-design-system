import { View } from "react-native";
import { CarbonFootprint as CarbonFootprintComponent } from "../src/components/dataVisuals/CarbonFootprint";
import { Text } from "../src/components/text/Text";
import { fontMedium, fontSmall, lineHeightLarge, lineHeightXLarge, spacingS, spacingXS, spacingXXS } from "../src/assets/styles/constants/size";

export default {
  title: "Components/Data Visuals",
  components: [CarbonFootprintComponent]
}

export const CarbonFootprint = {
  render: CarbonFootprintComponent,
  args: {
    loading: false,
    // Example for SubScript text if needed for CO2e, string can also be passed for label if no need for different line heights of the text
    label: <View style={{ display: 'flex', flexDirection: 'row', marginBottom: -spacingXS}}>
      <Text size={fontMedium} variant="primarycolor4static">CO</Text>
      <Text size={fontSmall} variant="primarycolor4static" overrideStyles={{ lineHeight: lineHeightXLarge }}>2</Text>
      <Text size={fontMedium} variant="primarycolor4static">e</Text>
      <Text size={fontMedium} variant="primarycolor4static" overrideStyles={{ marginLeft: spacingXXS}}>this month</Text>
    </View>,
    amount: "180 kg",
   
  }
}
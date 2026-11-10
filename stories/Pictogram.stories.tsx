import { ScrollView, useWindowDimensions, View } from "react-native";
import { Pictogram } from "../src/components/pictogram/Pictogram";
import { fontXLarge, spacingSM, spacingXS } from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";
import { PictogramSpecial } from "../src/components/pictogram/PictogramSpecial";
import { PictogramSabstorePlus } from "../src/components/pictogram/PictogramSabstorePlus";
import Bolt from "../src/components/icons/filled/Bolt";

import { tx } from "../src/localization/tx";
export default {
    title: "Components/Pictograms",
    component: Pictogram,
};

const InteractiveTemplate = (args: any) => {
    const { height } = useWindowDimensions();

    return (
        <ScrollView
            style={{ height: height - 250 }}
            contentContainerStyle={{ paddingBottom: spacingSM }}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
        >
            <Text bold size={fontXLarge}>{tx("Icons")}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacingXS, marginVertical: spacingSM }}>
                <Pictogram {...args} type="success" />
                <Pictogram {...args} type="error" />
                <Pictogram {...args} type="warning" />
                <Pictogram {...args} type="info" />
                <Pictogram {...args} type="fingerprint" />
                <Pictogram {...args} type="faceId" />
                <Pictogram {...args} type="lock" />
                <Pictogram {...args} type="thumb" />
                <Pictogram {...args} type="mailbox" />
                <Pictogram {...args} type="nfc" />
                <Pictogram {...args} type="link" />
                <Pictogram {...args} type="loginLocked" />
                <Pictogram {...args} type="achievement" />
            </View>
            <Text bold size={fontXLarge}>{tx("Number and Loader")}</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacingXS, marginVertical: spacingSM }}>
                <Pictogram {...args} type="number" number={72} />
                <Pictogram {...args} type="loader" loading />
            </View>
            <Text bold size={fontXLarge}>{tx("Carbon Footprint - new")}</Text>
            <Pictogram {...args} type="carbon-footprint" />
            <Text bold size={fontXLarge}>{tx("Special")}</Text>
            <PictogramSpecial {...args} icon={<Bolt />}/>
            <Text bold size={fontXLarge}>{tx("Sabstore Plus")}</Text>
            <PictogramSabstorePlus />
        </ScrollView>
    );
};

export const All = {
    render: InteractiveTemplate,
};

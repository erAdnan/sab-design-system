import { useState } from "react";
import { Tabs } from "../src/components/tabs/Tabs";
import { View } from "react-native";
import { Text } from "../src/components/text/Text";
import BeneficiaryOutline from "../src/components/icons/users/BeneficiaryOutline";

import { deepTranslateArgs, tx } from "../src/localization/tx";
export default {
    title: "Components/Tabs",
    component: Tabs,
    args: {
        loading: false
    }
};

const items = [
    {
        label: "All",
        id: 1,
        onButtonPress: () => console.log("Button 1 Pressed"),
        subItems: [{
            id: 1,
            label: "All Subtab 1",
            onButtonPress: () => console.log("All Subtab 1 Pressed"),
        },
        {
            id: 2,
            label: "All Subtab 2",
            onButtonPress: () => console.log("All Subtab 2 Pressed"),
        },
        {
            id: 3,
            label: "All Subtab 3",
            onButtonPress: () => console.log("All Subtab 3 Pressed"),
        }]
    },
    {
        label: "Local",
        id: 2,
        onButtonPress: () => console.log("Button 2 Pressed"),
        subItems: [{
            id: 1,
            label: "Local 1",
            onButtonPress: () => console.log("Local Subtab 1 Pressed"),
        },
        {
            id: 2,
            label: "Local 2",
            onButtonPress: () => console.log("Local Subtab 2 Pressed"),
        },
        {
            id: 3,
            label: "Local 3",
            onButtonPress: () => console.log("Local Subtab 3 Pressed"),
        }]
    },
    {
        label: "SAB",
        id: 3,
        onButtonPress: () => console.log("Button 3 Pressed"),
    },
    {
        label: "International",
        id: 4,
        onButtonPress: () => console.log("Button 4 Pressed"),
    },
	{
		label: "Test",
		icon: <BeneficiaryOutline strokeWidth={10}></BeneficiaryOutline>,
        id: 5,
        onButtonPress: () => console.log("Button 5 Pressed"),
    },
];

const InteractiveTemplateTabs = (args: any) => {
    const [activeMainTab, setActive] = useState<number | null>(null);
    const [activeSubTab, setActiveSub] = useState<number | null>(null);

    const getContent = () => {
        switch (activeMainTab) {
            case 1:
                return <Text>{`Displaying content for All tab ${activeSubTab ? `and SubTab ${activeSubTab}` : ''}`}</Text>;
            case 2:
                return <Text>{`Displaying content for Local tab ${activeSubTab ? `and SubTab ${activeSubTab}` : ''}`}</Text>;
            case 3:
                return <Text>{tx("Displaying content for SAB tab")}</Text>;
            case 4:
                return <Text>{tx("Displaying content for International tab")}</Text>;
            case 5:
				return <Text>{tx("Displaying content for Test tab")}</Text>;
            default:
                return <Text>{tx("No selected tab")}</Text>;
        }
    };

    return (
        <View>
            <Tabs
                items={deepTranslateArgs(items)}
                active={activeMainTab}
                activeSubTab={activeSubTab}
                onTabPress={(id: number) => setActive(id)}
                onSubTabPress={(id: number) => setActiveSub(id)}
                {...args}
            />
            <View style={{ marginTop: 20 }}>
                {getContent()}
            </View>
        </View>
    );
};

export const Default = {
    render: InteractiveTemplateTabs,
    args: {
        subtabs: false,
    },
};


import { Dropdown } from "../src/components/dropdown/Dropdown";

export default {
    title: "Components/Dropdown",
    component: Dropdown,
};

const InteractiveTemplate = (args: any) => {


    const handlePress = (value: any) => {
        console.log('DropdownMenuItem pressed', value);
    };

    return <Dropdown {...args} onItemPress={handlePress} />;
};

export const Default = {
    render: InteractiveTemplate,
    args: {
        items: [{ withSar: true, label: "Saudi Riyal", value: "dirh1" }, { label: "(AED) Dirhams", value: "dirh2" }],
    },
};

import * as allStories from "./Uploader.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import { Uploader } from "../src/components/uploader/Uploader";
import { useState } from "react";
import { mobileContentDecorators } from "../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
    title: "Components/Uploader",
    component: Uploader,
    tags: ["!autodocs"],
    argTypes: {
        title:        { control: "text" },
        subTitle:     { control: "text" },
        disabled:     { control: "boolean" },
        loading:      { control: "boolean" },
        mandatory:    { control: "boolean" },
        showDivider:  { control: "boolean" },
        errorMessage: { control: "text" },
    },
    args: {
        title: "Title",
        subTitle: "Helper Text",
        disabled: false,
        loading: false,
        mandatory: false,
        showDivider: true,
    },
};

export const Default = {
    args: {
        onIconPress: () => console.log("Icon Pressed"),
    },
};

export const Disabled = {
    args: {
        onIconPress: () => console.log("Icon Pressed"),
        disabled: true,
    },
};

export const Loading = {
    args: {
        loading: true,
    },
};

const InteractiveTemplate = (args: any) => {
    const allFiles = [
        { id: 1, label: "Jan_2025.pdf" },
        { id: 2, label: "Feb_2025.pdf" },
        { id: 3, label: "Mar_2025.pdf" },
    ];

    const [files, setFiles] = useState(allFiles);

    const handleFiles = (id: string | number) => {
        setFiles(files.filter((file) => file.id !== id));
    };

    return <Uploader {...args} files={files} handleRemoveFile={handleFiles} />;
};

export const Files = {
    render: InteractiveTemplate,
    args: {
        onIconPress: () => console.log("Icon Pressed"),
    },
};

/** Attached + disabled — icon uses primary/gray/20, chips still visible */
export const AttachedDisabled = {
    render: InteractiveTemplate,
    args: {
        disabled: true,
        onIconPress: () => {},
    },
};

export const InvalidFormat = {
    args: {
        errorMessage: "Invalid format",
        files: [{ id: 1, label: "Jan_2025.pdf", error: true }],
        onIconPress: () => console.log("Icon Pressed"),
        handleRemoveFile: (id: string | number) => console.log("Remove file", id),
    },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "Disabled",
    "Loading",
    "Files",
    "AttachedDisabled",
    "InvalidFormat",
]);

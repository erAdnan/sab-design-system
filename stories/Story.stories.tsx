import { Story } from "../src/components/story/Story";

export default {
  title: "Components/Story",
  component: Story,
  argTypes: {
    seen: { action: "Seen", control: "boolean" },
  },
  args: {
    seen: false,
    img: "https://t4.ftcdn.net/jpg/04/44/53/99/360_F_444539901_2GSnvmTX14LELJ6edPudUsarbcytOEgj.jpg",
    onStoryPress: () => console.log("Story pressed"),
    loading: false,
  },
};

export const WithText = {
  args: {
    text: "Text line",
  },
};

export const WithExtraContent = {
  args: {
    text: "Text line",
    extraContent: "Extra content",
  },
};

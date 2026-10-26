import { NewHubsButtonListItem } from "../src/components/button/NewHubsButtonListItem";
import Filter from "../src/components/icons/functionals/Filter";
import Home from "../src/components/icons/functionals/Home";

export default {
  title: "Components/NewHubsButtonListItem",
  component: NewHubsButtonListItem,
  argTypes: {
    title: { action: "Title", control: "text" },
    body: { action: "Body", control: "text" },
  },
  args: {
    loading: false,
  },
};

export const Default = {
  args: {
    title: "Label",
    body: "Manage limits, view transfer history and more services",
    icon: <Filter />
  },
};

export const WithChips = {
  args: {
    title: "Label",
    body: "Manage limits, view transfer history and more services",
    icon: <Filter />,
    chipsLabel: "New"
  },
};

import { SelectionModule } from "../src/components/cards/SelectionModule";

export default {
  title: "Components/CardsSelectionModule",
  component: SelectionModule,
  argTypes: {
    showChipsInfo: { action: "Show chips info", control: "boolean" },
    showChevron: { action: "Show chevron", control: "boolean" },
  },
  args: {
    showChipsInfo: true,
    showChevron: true,
    "chipsInfoProps.label": "Active",
    "chipsInfoProps.state": "success",
    "chipsInfoProps.showIcon": true,
    accountName: "Account name",
    cardNumber: "4272-2201-0114-9091",
    cardName: "Advanced Credit Card Platinum",
    loading: false
  },
};

export const Default = {
  args: {
    imageProps: {
      isAbsolutePath: true,
      url: require("../src/assets/images/card-image.png"),
    },
  },
};

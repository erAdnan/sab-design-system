import { FlagListItem } from "../src/components/list/FlagListItem";

export default {
  title: "Components/FlagListItem",
  component: FlagListItem
}

export const US = {
  args: {
    circleImageProps: { url: require('../src/assets/images/flagUSsquare.png'), isAbsolutePath: true },
    rectImageProps: { url: require('../src/assets/images/flagUSsquare.png'), isAbsolutePath: true },
    countryName: "United States of America",
    showDivider: true
  }
}

export const Placeholder = {
  args: {
    countryName: "Antartica",
    showDivider: true
  }
}

export const PlaceholderWithAction = {
  args: {
    countryName: "Antartica",
    showDivider: true,
    showAction: true,
    checkboxProps: {
      isChecked: false,
      onPress: () => {}
    }
  }
}
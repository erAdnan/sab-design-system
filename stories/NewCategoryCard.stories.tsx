import Prepaid from "../src/components/icons/outline/Prepaid";
import { NewCategoryCard } from "../src/components/productsCards/NewCategoryCard";

export default {
  title: 'Components/New Category Card',
  component: NewCategoryCard
}

export const Default = {
  args: {
    icon: <Prepaid />,
    label: "Label"
  }
}
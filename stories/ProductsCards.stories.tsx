import * as allStories from "./ProductsCards.stories";
import { createAllVariantsStory } from "../.storybook/allVariants";
import Gift from "../src/components/icons/other/Gift";
import { ProductsCards } from "../src/components/productsCards/ProductsCards";

export default {
  title: "Components/Data Display/ProductsCards",
  component: ProductsCards,
  tags: ["!autodocs"],
  argTypes: {
    type: {
      action: "Type",
      control: "radio",
      options: ["product-page", "carousel"],
    },
    icon: { action: "Icon", control: "boolean" },
  },
  args: {
    type: "product-page",
    icon: null,
    loading: false,
    showChipsOffers: false,
    chipsOffersProps: { type: 'centered', label: 'Label'}
  },
};

export const ProductPageWithoutIconAndChips = {
  args: {
    type: "product-page",
    text: "Product Name",
  },
};

export const ProductPageWithChips = {
  args: {
    type: "product-page",
    text: "Product Name",
    chipsProps: {
      label: "Best Deal",
      state: "info",
    },
  },
};

export const ProductPageWithChipsOffers = {
  args: {
    type: "product-page",
    text: "Product Name",
    category: "Category",
    chipsProps: {
      label: "Best Deal",
      state: "info",
    },
    showChipsOffers: true,
    chipsOffersProps: {
      label: 'Label',
      type: 'centered'
    }
  },
};

export const ProductPageWithChipsAndIcon = {
  args: {
    type: "product-page",
    text: "Product Name",
    category: "Category",
    chipsProps: {
      label: "Best Deal",
      state: "info",
    },
    icon: <Gift />,
  },
};

export const Carousel = {
  args: {
    type: "carousel",
    text: "Product Name...",
  },
};

export const CarouselWithIcon = {
  args: {
    type: "carousel",
    text: "Product Name...",
    icon: <Gift />,
  },
};

export const ProductPageWithFavorite = {
  args: {
    type: "product-page",
    text: "Product Name",
    category: "Category",
    showFavorite: true,
    isFavorite: false,
    showChipsOffers: true,
    chipsOffersProps: {
      label: 'Label',
      type: 'centered'
    }
  },
};

export const CarouselWithChipsOffers = {
  args: {
    type: "carousel",
    text: "Product Name",
    showChipsOffers: true,
    chipsOffersProps: {
      label: 'Label',
      type: 'centered'
    }
  },
};

export const AllVariants = createAllVariantsStory(allStories, [
    "ProductPageWithoutIconAndChips",
    "ProductPageWithChips",
    "ProductPageWithChipsOffers",
    "ProductPageWithChipsAndIcon",
    "Carousel",
    "CarouselWithIcon",
    "ProductPageWithFavorite",
    "CarouselWithChipsOffers",
]);

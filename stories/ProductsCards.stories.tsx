import Gift from "../src/components/icons/other/Gift";
import { LearningProductCard as LearningProductCardComponent } from "../src/components/productsCards/LearningProductCard";
import { ProductsCards } from "../src/components/productsCards/ProductsCards";

export default {
  title: "Components/ProductsCards",
  component: ProductsCards,
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

const LearningProductCardTemplate = (args: any) => {
  return (
    <LearningProductCardComponent {...args} />
  )
}

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

export const LearningProductCard = {
  render: LearningProductCardTemplate,
  args: {
    subheading: "Label",
    title: "Headline",
    bodyText: "Learn to save your money using this tried and tested way.",
    percentage: 80,
    percentageText: "80% Left"
  }
}

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

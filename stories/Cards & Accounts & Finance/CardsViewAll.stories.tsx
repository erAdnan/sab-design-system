import * as allStories from "./CardsViewAll.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { CardsViewAll } from '../../src/components/cardsNew/CardsViewAll';
export default {
    title: "Components/Cards & Accounts & Finance/CardsViewAll",
    component: CardsViewAll,
    argTypes: {
        cardName: {
          action: "Card Name",
          control: "radio",
          options: [
            "Emirates Infinite",
            "AlFursan",
            "Signature",
            "Cashback",
            "Premier",
            "Advance",
            "Platinum",
            "My",
            "Business",
            "Titanium",
            "Aqsat",
            "Muse World",
            "Muse Low Limit",
            "Noon",
            "Umlaty Multi Currency",
            "Mada Card Advanced",
            "Mada Card Generic",
            "Mada Card Household",
            "Mada Card Premier",
            "Mada Card Private",
            "Mada Card Rowad",
            "Mada Card Salary Card",
            "Arab National Bank Generic Card",
            "Alinma Bank Generic Card",
            "Banque Saudi Fransi Generic Card",
            "Bilad Bank Generic Card",
            "Jazira Bank Generic Card",
            "Rajhi Generic Card",
            "Riyadh Bank Generic Card",
            "SNB Generic Card",
            "D360 Generic Card",
            "GIB Generic Card",
            "Meem Generic Card",
            "Neo Generic Card",
            "SAIB Generic Card",
            "STC Generic Card",
            "Vision Bank Generic Card",
            "SAB Qatar Airways",
            "Premier Top Tier"
          ]
        },
    state: {
      control: "radio",
      options: [
        "default",
        "inactive",
        "activation-required",
        "frozen",
        "expiring-soon",
        "blocked",
        "new-card",
        "carousel",
        "description",
        "carouselProcessing",
        "carouselInactive",
        "carouselActive",
        "selection",
        "active",
      ],
    },
    supplementaryCard: {
      control: "boolean",
    },
    },
    args: {
      state: "default",
      cardName: "Emirates Infinite",
      loading: false,
      numberOfLines: 1,
      supplementaryCard: false,
    }
};

export const Default = {
  args: { 
    expiryDate: "03/28",
    amount: "3,000.00",
    fourDigits: "7997",
  }
};

export const DefaultWithSupplementaryTag = {
  args: {
    ...Default.args,
    cardName: "Premier",
    fourDigits: "7977",
    supplementaryCard: true,
    supplementaryCardLabel: "Supplementary Card",
  },
};

export const Inactive = {
  args: {
    state: "inactive",
    stateLabel: "Inactive"
  }
};

export const ActivationRequired = {
  args: {
    state: "activation-required",
    stateLabel: "Activation required",
    linkButtonProps: {
      buttonText: { children: "Activate Card" },
      size: "small",
      linkIconRight: true,
      overrideStyles: { paddingHorizontal: 0 },
    },
  }
};

export const Frozen = {
  args: {
    fourDigits: "7977",
    state: "frozen",
    stateLabel: "Frozen"
  }
};

export const ExpiringSoon = {
  args: {
    fourDigits: "7977",
    state: "expiring-soon",
    stateLabel: "Expiring Soon",
  }
};

export const Blocked = {
  args: {
    fourDigits: "7977",
    state: "blocked",
    stateLabel: "Blocked",
  }
};

export const NewCard = {
  args: {
    state: "new-card",
    newCardLabel: "Apply for a New Card",
  }
};

export const Carousel = {
  args: {
    state: "carousel",
    fourDigits: "7997",
  }
};

export const CarouselInactive = {
  args: {
    state: "carouselInactive",
    stateLabel: "Inactive"
  }
};

export const carouselProcessing = {
  args: {
    state: "carouselProcessing",
    stateLabel: "Under Proce...",
    fourDigits: "7997",
  }
};

export const Description = {
  args: {
    state: "description", 
    description: "Lorem ipsum dolor sit amet amet, consectetur adipiscing elit",
    fourDigits: "7997",
  }
}

export const Selection = {
  args: {
    state: "selection",
    description: "Lorem ipsum dolor sit amet amet, consectetur adipiscing elit consectetur adipiscing",
    checkboxProps: { disabled: false },
    linkButtonProps: { buttonText: { children: "Link Button" }, size: "small", overrideStyles: { paddingHorizontal: 0 } },
    fourDigits: "7997",
  }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "Default",
    "DefaultWithSupplementaryTag",
    "Inactive",
    "ActivationRequired",
    "Frozen",
    "ExpiringSoon",
    "Blocked",
    "NewCard",
    "Carousel",
    "CarouselInactive",
    "carouselProcessing",
    "Description",
    "Selection",
]);

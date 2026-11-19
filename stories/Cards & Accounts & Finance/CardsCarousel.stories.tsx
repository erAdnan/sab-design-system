import * as allStories from "./CardsCarousel.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { useState } from "react";
import { LanguageWrapper } from "../../src/components/local/LanguageWrapper";
import { CardsCarousel } from "../../src/components/cards/CardsCarousel";

export default {
    title: "Components/Cards & Accounts & Finance/Cards Carousel",
    component: CardsCarousel,
    args: {
        accountNumber: "****** 6234",
        availableLimitLabel: "Available Limit",
        availableLimit: "56,234.00",
        loading: false,
    }
};

export const Platinum = {
    args: {
        type: "platinum",
        cardTitle: "Platinum Card",
        handlePress: () => console.log("Platinum Card Pressed"),
    }
};

export const Premier = {
    args: {
        type: "premier",
        cardTitle: "Premier Card",
        handlePress: () => console.log("Premier Card Pressed"),
    }
};

export const Signature = {
    args: {
        type: "signature",
        cardTitle: "Signature Credit Card",
        handlePress: () => console.log("Signature Card Pressed"),
    }
};

export const Solid = {
    args: {
        type: "solid",
        cardTitle: "Platinum Card",
        handlePress: () => console.log("Solid Card Pressed"),
    }
};



export const AllVariants = createAllVariantsStory(allStories, [
    "Platinum",
    "Premier",
    "Signature",
    "Solid",
]);

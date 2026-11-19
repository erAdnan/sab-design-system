import * as allStories from "./CreditCards.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import { CreditCard } from '../../src/components/cardsNew/CreditCard';
import Success from "../../src/components/icons/status/Success";

const ACTIVE_STATUS = { label: "Active", state: "success", showIcon: true };

const Template = ({ showActiveStatus, statusChipsProps, ...args }: any) => (
    <CreditCard
        {...args}
        statusChipsProps={statusChipsProps ?? (showActiveStatus ? ACTIVE_STATUS : undefined)}
    />
);

export default {
    title: "Components/Cards & Accounts & Finance/CreditCards",
    component: CreditCard,
    render: Template,
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
                "World Elite",
                "Muse World",
                "Muse Low Limit",
                "Noon",
                "Umlaty Multi Currency",
                "Default", "DebitCard",
                "Mada Card Advanced",
                "Mada Card Generic",
                "Mada Card Household",
                "Mada Card Premier",
                "Mada Card Private",
                "Mada Card Rowad",
                "Mada Card Salary Card",
                "Mada Premier Top Tier",
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
                "Mastercard Platinum",
                "Premier Top Tier"
            ]
        },
        cardType: { action: "Card Type", control: "radio", options: ["visa", "mastercard", "visa-platinum", "visa-signature", "mada"] },
        view: { action: "View", control: "radio", options: ["default", "detailed", "virtual", "carousel", "selection"] },
        showActiveStatus: { control: "boolean" },
    },
    args: {
        cardNumber: "1234-5678-8910",
        availableLimitLabel: "Available Limit",
        availableLimit: "56,234.00",
        creditLimitLabel: "Credit Limit",
        creditLimit: "56,234.00",
        cardType: "visa",
        freeze: false,
        cardName: "Emirates Infinite",
        creditLimitProgress: 100,
        view: "detailed",
        currenciesLabel: "Currencies",
        numOfCurrencies: 17,
        cardHolderName: "Card Holder Name",
        loading: false,
        showActiveStatus: true
    }
};

export const Cards = {
    args: {
    }
};

export const CardsWithStatus = {
    args: {
        statusChipsProps: { label: "Inactive", state: "error", showIcon: true }
    }
}


export const CardsNovmberRelease = {
    args: {
        chipIconChip: <Success fill={"#E5F2F2"}/>,
        chipText: "Inactive",
        novReleaseFlag: true,
        view: "carousel",
        cardName: "Default",
        cardNumber: "1234-5678-8910",
        defaultCardName:"Default Card Name",
    }
};


export const DebitCard = {
    args: {
        novReleaseFlag: true,
        view: "carousel",
        cardName: "DebitCard",
        cardNumber: "1234-5678-8910",
        defaultCardName:"Debit Card Name",
        accountNumber:"68492358992",
    }
};

export const MadaCard = {
    args: {
        cardType: "mada",
        cardName: "Mada Card Generic",
    }
};

export const DefaultView = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        statusChipsProps: { label: "Active", state: "success", showIcon: true },
    }
};


// ---- Figma parity (Cards & Accounts page 227:2376, credit cards): View (Default 343x172 / Carousel 200x100 / Virtual 325x205) x Status ----
export const DefaultViewCard = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        showActiveStatus: false
    }
};

export const DefaultViewFrozen = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        freeze: true,
        showActiveStatus: false
    }
};

export const DefaultViewInactive = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        statusOverlay: "inactive",
        showActiveStatus: false
    }
};

export const DefaultViewExpiringSoon = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        statusOverlay: "expiring-soon",
        showActiveStatus: false
    }
};

export const DefaultViewBlocked = {
    args: {
        view: "default",
        cardName: "Emirates Infinite",
        statusOverlay: "blocked",
        showActiveStatus: false
    }
};

export const CarouselViewCard = {
    args: {
        view: "carousel",
        cardName: "Emirates Infinite",
        showActiveStatus: false
    }
};

export const CarouselViewFrozen = {
    args: {
        view: "carousel",
        cardName: "Emirates Infinite",
        freeze: true,
        showActiveStatus: false
    }
};

export const CarouselViewInactive = {
    args: {
        view: "carousel",
        cardName: "Emirates Infinite",
        statusOverlay: "inactive",
        showActiveStatus: false
    }
};

export const CarouselViewExpiringSoon = {
    args: {
        view: "carousel",
        cardName: "Emirates Infinite",
        statusOverlay: "expiring-soon",
        showActiveStatus: false
    }
};

export const CarouselViewBlocked = {
    args: {
        view: "carousel",
        cardName: "Emirates Infinite",
        statusOverlay: "blocked",
        showActiveStatus: false
    }
};

export const VirtualViewCard = {
    args: {
        view: "virtual",
        cardName: "Emirates Infinite",
        showActiveStatus: false
    }
};

export const VirtualViewFrozen = {
    args: {
        view: "virtual",
        cardName: "Emirates Infinite",
        freeze: true,
        showActiveStatus: false
    }
};

export const VirtualViewInactive = {
    args: {
        view: "virtual",
        cardName: "Emirates Infinite",
        statusOverlay: "inactive",
        showActiveStatus: false
    }
};

export const VirtualViewExpiringSoon = {
    args: {
        view: "virtual",
        cardName: "Emirates Infinite",
        statusOverlay: "expiring-soon",
        showActiveStatus: false
    }
};

export const VirtualViewBlocked = {
    args: {
        view: "virtual",
        cardName: "Emirates Infinite",
        statusOverlay: "blocked",
        showActiveStatus: false
    }
};

// View all = 73x46 thumbnail (renders the virtual artwork, no text).
export const ViewAllCard = {
    args: {
        view: "virtual",
        isViewAll: true,
        cardName: "Emirates Infinite",
        showActiveStatus: false
    }
};

export const ViewAllFrozen = {
    args: {
        view: "virtual",
        isViewAll: true,
        cardName: "Emirates Infinite",
        freeze: true,
        showActiveStatus: false
    }
};

export const ViewAllInactive = {
    args: {
        view: "virtual",
        isViewAll: true,
        cardName: "Emirates Infinite",
        statusOverlay: "inactive",
        showActiveStatus: false
    }
};

export const ViewAllExpiringSoon = {
    args: {
        view: "virtual",
        isViewAll: true,
        cardName: "Emirates Infinite",
        statusOverlay: "expiring-soon",
        showActiveStatus: false
    }
};

export const ViewAllBlocked = {
    args: {
        view: "virtual",
        isViewAll: true,
        cardName: "Emirates Infinite",
        statusOverlay: "blocked",
        showActiveStatus: false
    }
};

export const AllVariants = createAllVariantsStory(allStories, [
    "Cards",
    "CardsWithStatus",
    "CardsNovmberRelease",
    "DebitCard",
    "MadaCard",
    "DefaultView",
    "DefaultViewCard",
    "DefaultViewFrozen",
    "DefaultViewInactive",
    "DefaultViewExpiringSoon",
    "DefaultViewBlocked",
    "CarouselViewCard",
    "CarouselViewFrozen",
    "CarouselViewInactive",
    "CarouselViewExpiringSoon",
    "CarouselViewBlocked",
    "VirtualViewCard",
    "VirtualViewFrozen",
    "VirtualViewInactive",
    "VirtualViewExpiringSoon",
    "VirtualViewBlocked",
    "ViewAllCard",
    "ViewAllFrozen",
    "ViewAllInactive",
    "ViewAllExpiringSoon",
    "ViewAllBlocked",
]);

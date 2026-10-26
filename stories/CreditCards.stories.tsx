import { background } from "@storybook/core/theming";
import { CreditCard } from '../src/components/cardsNew/CreditCard';
import Success from "../src/components/icons/status/Success";

const ACTIVE_STATUS = { label: "Active", state: "success", showIcon: true };

const Template = ({ showActiveStatus, statusChipsProps, ...args }: any) => (
    <CreditCard
        {...args}
        statusChipsProps={statusChipsProps ?? (showActiveStatus ? ACTIVE_STATUS : undefined)}
    />
);

export default {
    title: "Components/CreditCards",
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
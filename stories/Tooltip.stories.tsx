import { TooltipComponent } from "../src/components/tooltip/Tooltip";

export default {
    title: 'Components/Tooltip',
    component: TooltipComponent,
    argTypes: {
        'text': { action: 'Tooltip text', control: 'text' },
        'width': { action: 'Tooltip width', control: 'number' },
        'centerIcon': { action: 'Center Icon', control: 'boolean' },
    },
    args: {
        'width': 242,
        'centerIcon': false,
        loading: false
    }
};

const iconText = 'Neque porro quisquam est qui dolorem ipsum quia consectetur';

export const Regular = {
    args: {
        'text': iconText,
    }
};

export const RegularIconCenter = {
    args: {
        'text': iconText,
        'centerIcon': true
    }
};

export const RegularIconRight = {
    args: {
        'text': iconText,
        'iconPosition': 'right'
    }
};

export const Right = {
    args: {
        'text': iconText,
        'tooltipStyle': { position: 'absolute', right: 10, height: 'auto' }
    }
};
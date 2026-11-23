

import { PreloginPageTitle } from "../../src/components/preloginPageTitle/PreloginPageTitle";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";


export default {
  decorators: mobileContentDecorators,
  title: "Components/Data Display/Avatar/User Profile",
  component: PreloginPageTitle,
  argTypes: {
    title: { action: "Title", control: "text" },
    subtitle: { action: "Subtitle", control: "text" },
  },
  args: {
    title: "Welcome Back",
    subtitle: "Mohammed Al-Qahtani",
    loading: false
  },
};

export const Default = {
  args: {
    avatarProps: {
      initials: 'MA',
      size: 'large'
    }
  },
};


import { PreloginPageTitle } from "../src/components/preloginPageTitle/PreloginPageTitle";


export default {
  title: "Components/PreloginPageTitle",
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
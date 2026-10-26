import { ThemeSelector } from "../src/components/themeSelector/ThemeSelector";

export default {
  title: "Components/ThemeSelector",
  component: ThemeSelector,
}

export const ThemeSelectorLight = {
  args: {
    label: "Light",
    type: "light",
  }
}

export const ThemeSelectorDark = {
  args: {
    label: "Dark",
    type: "dark",
  }
}

export const ThemeSelectorFoundingDay = {
  args: {
    label: "Founding Day",
    type: "foundingDay",
  }
}

export const ThemeSelectorNationalDay = {
  args: {
    label: "National Day",
    type: "nationalDay",
  }
}
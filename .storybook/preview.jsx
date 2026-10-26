import { View } from "react-native";
import { ThemeProvider } from "../src/context/theme/themeContext.tsx";
import { ThemeSwitch } from "../src/components/local/ThemeSwitch.tsx";
import { StoryBookWrapper } from "../src/components/local/StoryBookWrapper.tsx";

/** @type{import("@storybook/react").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Components", "Foundations", "*"],
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <View style={{ flex: 1 }}>
          <ThemeProvider>
            <StoryBookWrapper>
              <ThemeSwitch />
              <View style={{ flex: 1 }}>
                <Story />
              </View>
            </StoryBookWrapper>
          </ThemeProvider>
        </View>
      );
    },
  ],
};

export default preview;

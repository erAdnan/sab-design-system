import { View } from "react-native";
import { ThemeProvider } from "../src/context/theme/themeContext.tsx";
import { ThemeSwitch } from "../src/components/local/ThemeSwitch.tsx";
import { StoryBookWrapper } from "../src/components/local/StoryBookWrapper.tsx";
import { StorybookVersionBadge } from "./StorybookVersionBadge.jsx";
import { versionLabel } from "./version";

/** @type{import("@storybook/react-webpack5").Preview} */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    deepControls: { enabled: true },
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
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginBottom: 8,
                  zIndex: 9999,
                }}
              >
                <StorybookVersionBadge />
              </View>
              <ThemeSwitch
                overrideStyles={{ marginBottom: 50, flex: 0 }}
              />
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

if (typeof document !== "undefined" && document.title) {
  document.title = `SAB Design System ${versionLabel}`;
}

export default preview;

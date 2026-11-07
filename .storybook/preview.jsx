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
        <View style={canvasRootStyle}>
          <ThemeProvider>
            <StoryBookWrapper>
              <View style={toolbarStyle}>
                <StorybookVersionBadge />
              </View>
              <ThemeSwitch
                overrideStyles={{ marginBottom: 24, flex: 0, width: "100%" }}
              />
              <View style={storySlotStyle}>
                <Story />
              </View>
            </StoryBookWrapper>
          </ThemeProvider>
        </View>
      );
    },
  ],
};

const canvasRootStyle = {
  flex: 1,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  overflow: "hidden",
};

const toolbarStyle = {
  flexDirection: "row",
  justifyContent: "flex-end",
  alignItems: "center",
  marginBottom: 8,
  width: "100%",
  maxWidth: "100%",
  zIndex: 9999,
};

const storySlotStyle = {
  flex: 1,
  width: "100%",
  maxWidth: "100%",
  minWidth: 0,
  overflow: "hidden",
};

if (typeof document !== "undefined" && document.title) {
  document.title = `SAB Design System ${versionLabel}`;
}

export default preview;

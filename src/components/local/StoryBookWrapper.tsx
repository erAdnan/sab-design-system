import { FC, useState } from "react";
import { Platform, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { LanguageWrapper } from "./LanguageWrapper";

interface StoryBookWrapperProps {
  children?: React.ReactNode;
  /** Controlled locale from web Storybook toolbar globals. */
  locale?: "en" | "ar";
  /**
   * Show the in-canvas language button.
   * Web Storybook uses the manager toolbar instead; on-device keeps the button.
   */
  showLanguageSwitcher?: boolean;
}

export const StoryBookWrapper: FC<StoryBookWrapperProps> = ({
  children,
  locale,
  showLanguageSwitcher = Platform.OS !== "web",
}) => {
  const { theme } = useTheme();
  const [arabic, setArabic] = useState(false);

  return (
    <View
      style={{
        backgroundColor: theme.stylesbackground2,
        padding: 16,
        flex: 1,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        minHeight: "100%",
        height: "100%",
        overflow: "visible",
        alignItems: "center",
      }}
    >
      <LanguageWrapper
        locale={locale}
        showSwitcher={showLanguageSwitcher}
        setArabic={() => setArabic(!arabic)}
      >
        {children}
      </LanguageWrapper>
    </View>
  );
};

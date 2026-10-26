import { Appearance } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { lightTheme } from "../../assets/styles/theme/light";
import { darkTheme } from "../../assets/styles/theme/dark";
import { foundingDayTheme } from "../../assets/styles/theme/foundingDay"; // Import Founding Day theme

// Define available theme options
const themes = {
  light: lightTheme,
  dark: darkTheme,
  founding: foundingDayTheme,
};

// Define Theme Context
export const ThemeContext = createContext<{
  theme: any;
  isDarkTheme: boolean;
  setAppTheme: (themeKey: keyof typeof themes) => void;
}>({
  theme: lightTheme, // Default to light theme
  isDarkTheme: false,
  setAppTheme: () => { }, // Placeholder function
});

export const ThemeProvider: React.FC<{ children: React.ReactNode; }> = ({
  children,
}) => {
  const systemTheme = Appearance.getColorScheme(); // Get system dark/light mode
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>(
    systemTheme === "dark" ? "dark" : "light"
  );

  // Once the user explicitly picks a theme (e.g. via the in-app theme switch),
  // we must stop auto-syncing with the OS appearance — otherwise a later
  // (sometimes spurious) appearance-change notification silently reverts the
  // user's choice back to whatever the system is set to.
  const hasManualOverrideRef = useRef(false);

  // Set theme based on current selection
  const theme = useMemo(() => themes[currentTheme], [currentTheme]);
  const isDarkTheme = useMemo(() => currentTheme === "dark", [currentTheme]);

  // Function to switch themes
  const setAppTheme = useCallback((themeKey: keyof typeof themes) => {
    hasManualOverrideRef.current = true;
    setCurrentTheme(themeKey);

    // JS-level `theme`/`isDarkTheme` only re-colors the components *we* draw
    // ourselves. Native, OS-rendered UI — the native iOS tab bar
    // (react-native-bottom-tabs / UITabBar), alerts, keyboards, native
    // navigation bars, etc. — is drawn by UIKit/SwiftUI and always follows
    // the real system light/dark trait, no matter what colors we pass in as
    // props. `Appearance.setColorScheme` forces `overrideUserInterfaceStyle`
    // on every app window, which is the only way to make that native chrome
    // follow the in-app theme instead of the OS setting.
    Appearance.setColorScheme(themeKey === "dark" ? "dark" : "light");
  }, []);

  // Follow system theme changes only until the user manually overrides it.
  useEffect(() => {
    const themeChangeListener = Appearance.addChangeListener(
      ({ colorScheme }) => {
        if (hasManualOverrideRef.current) return;
        if (colorScheme === "light" || colorScheme === "dark") {
          setCurrentTheme(colorScheme);
        }
      }
    );
    return () => themeChangeListener.remove();
  }, []);

  const themeData = useMemo(
    () => ({
      theme,
      isDarkTheme,
      setAppTheme,
    }),
    [theme, isDarkTheme, setAppTheme]
  );

  return (
    <ThemeContext.Provider value={themeData}>{children}</ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => useContext(ThemeContext);

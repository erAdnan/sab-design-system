import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Toggle } from "../toggle/Toggle";
import { Text } from "../text/Text";

interface ThemeSwitchProps {
  overrideStyles?: any;
}

/**
 * ThemeSwitch component to toggle between light and dark themes.
 * @property {any} overrideStyles - Additional styles to override default styles.
 */

export const ThemeSwitch: FC<ThemeSwitchProps> = ({ overrideStyles }) => {
  const { isDarkTheme, setAppTheme } = useTheme();
  const [checkState, setCheckState] = useState(isDarkTheme);

  useEffect(() => {
    setCheckState(isDarkTheme);
  }, [isDarkTheme]);

  const handleChange = () => {
    setAppTheme(isDarkTheme ? "light" : "dark");
    setCheckState(!checkState);
  };

  return (
    <View
      style={[{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 50,
        zIndex: 9999,
      }, overrideStyles]}
    >
      <Text overrideStyles={{ marginRight: 5 }}>Dark theme</Text>
      <Toggle isEnabled={checkState} handleToggle={handleChange} />
    </View>
  );
};

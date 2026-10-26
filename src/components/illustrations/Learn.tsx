import * as React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import LearnLight from "../../assets/svgs/illustration/light/learn.svg";
import LearnDark from "../../assets/svgs/illustration/dark/learn.svg";

const Learn = (props: SvgProps) => {
  const { isDarkTheme } = useTheme();
  const SvgComponent = isDarkTheme ? LearnDark : LearnLight;
  return <SvgComponent {...props} />;
};

export default Learn;

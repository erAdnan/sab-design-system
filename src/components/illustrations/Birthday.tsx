import * as React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import BirthdayLight from "../../assets/svgs/illustration/light/birthday.svg";
import BirthdayDark from "../../assets/svgs/illustration/dark/birthday.svg";

const Birthday = (props: SvgProps) => {
  const { isDarkTheme } = useTheme();
  const SvgComponent = isDarkTheme ? BirthdayDark : BirthdayLight;
  return <SvgComponent {...props} />;
};

export default Birthday;

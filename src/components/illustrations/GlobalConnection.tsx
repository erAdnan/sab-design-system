import * as React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import GlobalConnectionLight from "../../assets/svgs/illustration/light/globalConnection.svg";
import GlobalConnectionDark from "../../assets/svgs/illustration/dark/globalConnection.svg";

const GlobalConnection = (props: SvgProps) => {
  const { isDarkTheme } = useTheme();
  const SvgComponent = isDarkTheme ? GlobalConnectionDark : GlobalConnectionLight;
  return <SvgComponent {...props} />;
};

export default GlobalConnection;

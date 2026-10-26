import * as React from "react";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import OpenBankingLight from "../../assets/svgs/illustration/light/openBanking.svg";
import OpenBankingDark from "../../assets/svgs/illustration/dark/openBanking.svg";

const OpenBanking = (props: SvgProps) => {
  const { isDarkTheme } = useTheme();
  const SvgComponent = isDarkTheme ? OpenBankingDark : OpenBankingLight;
  return <SvgComponent {...props} />;
};

export default OpenBanking;

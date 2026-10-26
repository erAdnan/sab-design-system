import { FC } from "react";
import { useTheme } from "../../../context/theme/themeContext";
import SarDark from "./SarDark";
import SarLight from "./SarLight";
import { SvgProps } from "react-native-svg";

const Sar: FC<SvgProps> = (props) => {
  const { isDarkTheme } = useTheme();

  return isDarkTheme ? <SarDark {...props} /> : <SarLight {...props} />;
};

export default Sar;

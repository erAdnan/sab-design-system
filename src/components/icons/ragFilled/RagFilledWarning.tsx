import * as React from "react";
import Svg, { SvgProps, Rect, Circle } from "react-native-svg";
import { useTheme } from "../../../context/theme/themeContext";
const RagFilledWarning = (props: SvgProps) => {
  const { theme } = useTheme();
  return (
    <Svg
      {...props}
      width={props.width || 16}
      height={props.height || 16}
      fill="none"
      viewBox="0 0 16 16"
      preserveAspectRatio="xMidYMid meet"
    >
      <Rect x={2} y={2} width={12} height={12} rx={6} fill="#FFBB33" />
      <Rect
        x={8.36328}
        y={9.03357}
        width={0.726386}
        height={4.00896}
        rx={0.363193}
        transform="rotate(-180 8.36328 9.03357)"
        fill={theme.primarywhitestatic}
      />
      <Circle
        cx={7.99995}
        cy={10.5214}
        r={0.453903}
        transform="rotate(-180 7.99995 10.5214)"
        fill={theme.primarywhitestatic}
      />
    </Svg>
  );
};
export default RagFilledWarning;

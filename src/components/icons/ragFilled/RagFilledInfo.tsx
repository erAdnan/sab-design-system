import * as React from "react";
import Svg, { SvgProps, Rect, Circle } from "react-native-svg";
import { useTheme } from "../../../context/theme/themeContext";
const RagFilledInfo = (props: SvgProps) => {
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
      <Rect x={2} y={2} width={12} height={12} rx={6} fill="#305A85" />
      <Rect
        x={7.63672}
        y={6.96643}
        width={0.726386}
        height={4.00896}
        rx={0.363193}
        fill={theme.primarywhitestatic}
      />
      <Circle cx={8.00004} cy={5.47856} r={0.453903} fill={theme.primarywhitestatic} />
    </Svg>
  );
};
export default RagFilledInfo;

import * as React from "react";
import Svg, { SvgProps, Rect, Path, G } from "react-native-svg";
import { useTheme } from "../../../context/theme/themeContext";
const RagFilledSuccess = (props: SvgProps) => {
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
      <Rect x={2} y={2} width={12} height={12} rx={6} fill="#00847F" />
      <G transform="translate(2 2)">
        <Path
          d="M3.24121 6.13139L5.08033 7.97051L8.75857 4.02954"
          stroke={theme.primarywhitestatic}
          strokeWidth={0.934156}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
};
export default RagFilledSuccess;

import * as React from "react";
import Svg, { SvgProps, G, Rect, Path } from "react-native-svg";
const Chip = (props: SvgProps) => (
  <Svg width={33} height={24} fill="none" {...props}>
    <G opacity={0.8}>
      <Rect width={33} height={22} y={1} fill="#fff" rx={5} />
      <G stroke="#2A2A2A" strokeLinejoin="bevel" strokeWidth={1.3}>
        <Path
          d="m16.5 1.219-3.667 5.75s1.467 5.03 0 9.342l3.667 6.468 3.667-6.468s-1.467-3.593 0-9.343L16.5 1.218Z"
          clipRule="evenodd"
        />
        <Path d="M0 7.232h12.833M19.8 7.232H33M0 16.032h12.833M19.8 16.032H33" />
      </G>
    </G>
  </Svg>
);
export default Chip;

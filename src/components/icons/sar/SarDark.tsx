import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const SarDark = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      fill={props.fill || "#fff"}
      d="M11.203 17.718A7.292 7.292 0 0 0 10.588 20l6.797-1.436A7.296 7.296 0 0 0 18 16.28l-6.797 1.437ZM17.385 14.26A7.29 7.29 0 0 0 18 11.978l-5.295 1.12v-2.153l4.68-.989A7.29 7.29 0 0 0 18 7.674l-5.295 1.119v-7.74a7.46 7.46 0 0 0-2.118 1.767v6.42l-2.117.448V0a7.457 7.457 0 0 0-2.118 1.767v8.368l-4.738 1.001a7.297 7.297 0 0 0-.615 2.282l5.353-1.13v2.71L.615 16.21A7.292 7.292 0 0 0 0 18.492l6.005-1.269a1.908 1.908 0 0 0 1.182-.784l1.102-1.623c.114-.168.18-.37.18-.589V11.84l2.118-.448v4.305l6.798-1.437Z"
    />
  </Svg>
);
export default SarDark;

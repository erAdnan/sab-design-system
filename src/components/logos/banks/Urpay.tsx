import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Urpay = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 38}
    height={props.height || 38}
    fill="none"
    viewBox="0 0 38 38"
  >
    <Path
      d="M17.2443 13.5205V23.4005H20.7555V13.5205C20.7555 12.1829 21.8499 11.0885 23.1875 11.0885H27.7931V7.57727H23.1875C19.9195 7.57727 17.2443 10.2373 17.2443 13.5205Z"
      fill="#2359FF"
    />
    <Path
      d="M24.2674 21.6978C24.2674 24.5706 21.9266 26.9114 19.0538 26.9114H18.9322C16.0594 26.9114 13.7186 24.5706 13.7186 21.6978V8.36743H10.2074V21.6978C10.2074 26.5162 14.129 30.4226 18.9322 30.4226H19.0538C23.8722 30.4226 27.7786 26.501 27.7786 21.6978V14.5994H24.2674V21.6978Z"
      fill="#2359FF"
    />
  </Svg>
);
export default Urpay;

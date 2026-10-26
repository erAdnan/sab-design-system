import * as React from "react";
import Svg, { G, Mask, Path, Rect, SvgProps } from "react-native-svg";

const BankVault = (props: SvgProps) => (
  <Svg
    {...props}
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    preserveAspectRatio="xMidYMid meet"
  >
    <Mask
      id="bankVaultOutlineMask"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Rect width={24} height={24} fill="#D9D9D9" />
    </Mask>
    <G mask="url(#bankVaultOutlineMask)">
      <Path
        d="M19.6154 4.57056H4.38462C4.01739 4.57056 3.66521 4.6866 3.40554 4.89316C3.14588 5.09972 3 5.37987 3 5.67199V16.1356C3 16.4277 3.14588 16.7079 3.40554 16.9144C3.66521 17.121 4.01739 17.237 4.38462 17.237H19.6154C19.9826 17.237 20.3348 17.121 20.5945 16.9144C20.8541 16.7079 21 16.4277 21 16.1356V5.67199C21 5.37987 20.8541 5.09972 20.5945 4.89316C20.3348 4.6866 19.9826 4.57056 19.6154 4.57056Z"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.0781 13.3848C14.7208 13.3848 15.3371 13.1295 15.7915 12.6751C16.2459 12.2207 16.5012 11.6043 16.5012 10.9617M14.0781 13.3848C13.4355 13.3848 12.8192 13.1295 12.3648 12.6751C11.9103 12.2207 11.655 11.6043 11.655 10.9617M14.0781 13.3848V15.1156M16.5012 10.9617C16.5012 10.3191 16.2459 9.70275 15.7915 9.24833C15.3371 8.79392 14.7208 8.53863 14.0781 8.53863M16.5012 10.9617H18.232M14.0781 8.53863C13.4355 8.53863 12.8192 8.79392 12.3648 9.24833C11.9103 9.70275 11.655 10.3191 11.655 10.9617M14.0781 8.53863V6.80786M11.655 10.9617H9.92428M17.0135 8.02632L15.795 9.24478M12.3612 12.6786L11.1427 13.8971M17.0135 13.8971L15.795 12.6786M12.3612 9.24478L11.1427 8.02632M6.46274 8.53863V13.3848M5.07812 17.604V21.0002M18.232 17.604V21.0002"
        stroke={props.fill || props.stroke || "#00847F"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default BankVault;

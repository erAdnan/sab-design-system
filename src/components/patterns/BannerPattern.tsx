import React from "react";
import { Dimensions } from "react-native";
import Svg, { SvgProps, G, Mask, Rect, Path } from "react-native-svg";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const BannerPattern = (props: SvgProps & { width?: number }) => {
  const width = props.width ?? Dimensions.get("window").width;
  const height = actuatedNormalize(133);

  return (
    <Svg width={width} height={height} fill="none" {...props}>
      <G opacity={0.5}>
        <Mask
          id="a"
          width={width}
          height={240}
          x={0}
          y={-65}
          maskUnits="userSpaceOnUse"
        >
          <Rect
            width={width}
            height={240}
            fill="#fff"
            rx={8}
            transform={`matrix(-1 0 0 1 ${width} -65)`}
          />
        </Mask>
        <G fill="#767676" fillRule="evenodd" clipRule="evenodd" mask="url(#a)">
          <Path
            fillOpacity={0.7}
            d="M-145 40.233 380-90.591 205 175.567 -145 40.233Z"
            opacity={0.08}
          />
          <Path
            fillOpacity={0.9}
            d="M-21-74.022v252.624h320L-21-74.022Z"
            opacity={0.08}
          />
          <Path
            fillOpacity={0.9}
            d="m21 162.747 433.721-268.55 357.182 337.606L21 162.747Z"
            opacity={0.08}
          />
        </G>
      </G>
    </Svg>
  );
};

export default BannerPattern;

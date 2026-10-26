import * as React from "react";
import { Dimensions } from "react-native";
import Svg, {
  SvgProps,
  G,
  Rect,
  Mask,
  Path,
  Defs,
  ClipPath,
} from "react-native-svg";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface SVGRProps extends SvgProps {
  desc?: string;
  descId?: string;
}

const CarouselBannerPattern = ({ desc, descId, ...props }: SvgProps & SVGRProps) => {
  const screenWidth = props.width ?? Dimensions.get("window").width;
  const height = props.height ?? actuatedNormalize(161);

  return (
    <Svg
      width={screenWidth}
      height={height}
      viewBox={`0 0 ${screenWidth} ${height}`} // ✅ Ensures the content scales with screen size
      fill="none"
      aria-describedby={descId}
      {...props}
    >
      {desc ? <desc id={descId}>{desc}</desc> : null}
      <Defs>
        <ClipPath id="clip">
          <Rect width={screenWidth} height={height} rx={8} />
        </ClipPath>
        <Mask id="mask" x="0" y="0" width={screenWidth} height={height}>
          <Rect
            width={screenWidth}
            height={height}
            fill="#fff"
            rx={8}
            transform={`matrix(-1 0 0 1 ${screenWidth} 0)`}
          />
        </Mask>
      </Defs>

      <G clipPath="url(#clip)">
        {/* Background */}
        <Rect width={screenWidth} height={height} fill="#fff" fillOpacity={0.2} rx={8} />
        <Rect width={screenWidth} height={height} fill="#F2F3F4" rx={8} />

        {/* Overlay */}
        <G opacity={0.5} mask="url(#mask)">
          {/* These Paths may still extend out visually, but are masked */}
          <Path
            fill="#fff"
            fillOpacity={0.7}
            d="M-145 105.233 380-25.591 205 161.567l-350-135.334Z"
            opacity={0.08}
          />
          <Path
            fill="#2B2B2B"
            fillOpacity={0.9}
            d="M-21-9.022v252.624h320L-21-9.022Z"
            opacity={0.08}
          />
          <Path
            fill="#2B2B2B"
            fillOpacity={0.9}
            d="m21 227.748 433.721-268.55 357.182 337.606L21 227.748Z"
            opacity={0.08}
          />
        </G>
      </G>
    </Svg>
  );
};

export default CarouselBannerPattern;

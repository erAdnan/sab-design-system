import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  G,
  Circle,
  Defs,
  ClipPath,
  RadialGradient,
  Stop,
} from "react-native-svg"
const MarketingBannerIconSample = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M10.82 1.693a1.928 1.928 0 0 1 2.36 0l1.387 1.074c.354.275.793.417 1.24.403l1.753-.054a1.928 1.928 0 0 1 1.911 1.388l.49 1.684c.125.43.396.803.767 1.055l1.45.987a1.928 1.928 0 0 1 .73 2.246l-.594 1.65a1.93 1.93 0 0 0 0 1.304l.593 1.65a1.928 1.928 0 0 1-.73 2.247l-1.45.986c-.37.252-.64.625-.766 1.055l-.49 1.684a1.928 1.928 0 0 1-1.91 1.388l-1.754-.054a1.928 1.928 0 0 0-1.24.403l-1.386 1.074a1.928 1.928 0 0 1-2.362 0L9.433 22.79a1.928 1.928 0 0 0-1.24-.403l-1.753.054a1.928 1.928 0 0 1-1.911-1.388l-.49-1.684a1.928 1.928 0 0 0-.767-1.055l-1.45-.986a1.928 1.928 0 0 1-.73-2.246l.594-1.65a1.928 1.928 0 0 0 0-1.305l-.593-1.65a1.928 1.928 0 0 1 .73-2.246l1.45-.987c.37-.252.64-.625.766-1.055l.49-1.684a1.928 1.928 0 0 1 1.91-1.388l1.754.054c.447.014.886-.128 1.24-.403l1.386-1.074Z"
    />
    <Path
      fill="#fff"
      d="m9.9 14.962-2.08-1.985 2.08-1.983v3.968Zm6.237-1.985-2.08 1.985v-.002H9.9l2.079-1.984L9.9 10.994h4.158l2.079 1.983Zm-4.158 0 2.079 1.982v-3.965l-2.079 1.982Z"
    />
    <G clipPath="url(#b)">
      <Path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={0.754}
        d="M5.602 8.9c.71 0 1.02-.298 1.02-1.02 0 .722.307 1.02 1.02 1.02-.713 0-1.02.308-1.02 1.02 0-.712-.31-1.02-1.02-1.02Z"
      />
    </G>
    <G clipPath="url(#c)">
      <Path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={0.754}
        d="M7.93 7.57c.948 0 1.36-.399 1.36-1.36 0 .961.41 1.36 1.36 1.36-.95 0-1.36.41-1.36 1.36 0-.95-.412-1.36-1.36-1.36Z"
      />
    </G>
    <G clipPath="url(#d)">
      <Path
        fill="#fff"
        stroke="#fff"
        strokeLinejoin="round"
        strokeWidth={0.754}
        d="M15.924 17.21c.552 0 .793-.232.793-.793 0 .56.24.793.793.793-.554 0-.793.24-.793.793 0-.554-.24-.793-.793-.793Z"
      />
    </G>
    <Circle
      cx={12.172}
      cy={12.943}
      r={6.734}
      fill="#D9D9D9"
      fillOpacity={0.47}
    />
    <Circle
      cx={12.117}
      cy={12.942}
      r={5.447}
      stroke="#fff"
      strokeWidth={0.198}
    />
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M5.263 7.541h2.719v2.72h-2.72z" />
      </ClipPath>
      <ClipPath id="c">
        <Path fill="#fff" d="M7.478 5.756h3.626v3.626H7.478z" />
      </ClipPath>
      <ClipPath id="d">
        <Path fill="#fff" d="M15.66 16.153h2.115v2.115H15.66z" />
      </ClipPath>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(0 12 -12 0 12 12.778)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E6B012" />
        <Stop offset={1} stopColor="#72580C" stopOpacity={0.6} />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default MarketingBannerIconSample

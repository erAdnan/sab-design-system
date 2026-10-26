import * as React from "react";
import Svg, {
    SvgProps,
    Path,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

const GraphPattern = (props: SvgProps) => (
    <Svg
        width={actuatedNormalize(164)}
        height={actuatedNormalize(99)}
        fill="none"
        {...props}
    >
        <Path
            fill="url(#a)"
            fillOpacity={0.5}
            d="M-47.874 31.307-53 37.41v59.368h269V51.545l-4.06-9.08c-4.059-9.081-12.178-27.243-20.298-32.552-8.119-5.309-16.238 2.235-24.357 10.583s-16.239 17.502-24.358 17.03c-8.119-.472-16.238-10.568-24.358-12.554-8.119-1.986-16.238 4.14-24.357 8.666-8.12 4.526-16.239 7.453-24.358 8.24-8.119.788-16.238-.563-24.357-9.888-8.12-9.325-16.239-26.622-24.358-28.932C13.019.748 4.9 13.426-3.22 16.185c-8.119 2.758-16.238-4.401-24.357-2.645-8.12 1.757-16.239 12.43-20.298 17.767Z"
        />
        <Path
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth={3.768}
            d="M69.854 41.879c-8.119.787-16.238-.564-24.357-9.89-8.12-9.324-16.239-26.621-24.358-28.931C13.019.748 4.9 13.426-3.22 16.185c-8.119 2.758-16.238-4.401-24.357-2.645-8.12 1.757-16.239 12.43-20.298 17.767L-53 37.41v59.368"
        />
        <Defs>
            <LinearGradient
                id="a"
                x1={81.5}
                x2={81.241}
                y1={2.778}
                y2={91.446}
                gradientUnits="userSpaceOnUse"
            >
                <Stop offset={0.195} stopColor="#fff" />
                <Stop offset={1} stopColor="#737373" stopOpacity={0} />
            </LinearGradient>
        </Defs>
    </Svg>
);
export default GraphPattern;
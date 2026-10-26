import * as React from "react";
import Svg, { SvgProps, Path, Mask, G } from "react-native-svg";

const Remove = (props: SvgProps) => (
    <Svg
        width={props.width || 24}
        height={props.height || 24}
        fill="none"
        {...props}
    >
        <Mask
            id="a"
            width={props.width || 24}
            height={props.height || 24}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
        >
            <Path fill="#D9D9D9" d="M0 0h24v24H0z" />
        </Mask>
        <G mask="url(#a)">
            <Path
                fill={props.fill || "#DB0011"}
                d="M6.5 12.5a.484.484 0 0 1-.356-.144A.485.485 0 0 1 6 12c0-.142.048-.26.144-.356A.485.485 0 0 1 6.5 11.5h11c.142 0 .26.048.356.144A.485.485 0 0 1 18 12c0 .142-.048.26-.144.356a.484.484 0 0 1-.356.143h-11Z"
            />
        </G>
    </Svg>
);
export default Remove;
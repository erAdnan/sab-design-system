import * as React from "react";
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg";

const AddBare = (props: SvgProps) => (
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
                d="M11.5 12.5h-5a.484.484 0 0 1-.356-.144A.485.485 0 0 1 6 12c0-.142.048-.26.144-.356A.485.485 0 0 1 6.5 11.5h5v-5c0-.142.048-.26.144-.356A.485.485 0 0 1 12 6c.142 0 .26.048.356.144a.485.485 0 0 1 .143.356v5h5c.142 0 .26.048.356.144A.485.485 0 0 1 18 12c0 .142-.048.26-.144.356a.484.484 0 0 1-.356.143h-5v5c0 .142-.048.26-.144.356A.485.485 0 0 1 12 18a.482.482 0 0 1-.356-.144.484.484 0 0 1-.143-.356v-5Z"
            />
        </G>
    </Svg>
);
export default AddBare;
import * as React from "react";
import Svg, { SvgProps, Rect, Mask, Path, G } from "react-native-svg";

const Success = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Rect width={64} height={64} fill="#00847F" rx={32} />
        <Mask
            id="a"
            width={48}
            height={48}
            x={8}
            y={8}
            maskUnits="userSpaceOnUse"
        >
            <Path fill="#D9D9D9" d="M8 8h48v48H8z" />
        </Mask>
        <G mask="url(#a)">
            <Path
                fill="#fff"
                d="m27.1 39.762 17.604-17.604c.195-.195.426-.299.694-.312.268-.013.512.091.733.312.22.22.33.458.33.713 0 .255-.11.493-.33.714l-17.9 17.9c-.323.323-.7.484-1.13.484-.432 0-.809-.161-1.132-.484l-8.1-8.1a.999.999 0 0 1-.305-.695c-.01-.268.096-.512.317-.732.22-.22.458-.331.713-.331.255 0 .493.11.714.33l7.792 7.805Z"
            />
        </G>
    </Svg>
);
export default Success;

import * as React from "react";
import Svg, { SvgProps, Rect, Mask, Path, G } from "react-native-svg";

const Mailbox = (props: SvgProps) => (
    <Svg
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <Rect width={64} height={64} fill="#00847F" rx={32} />
        <Mask
            id="a"
            width={32}
            height={32}
            x={16}
            y={16}
            maskUnits="userSpaceOnUse"
        >
            <Path fill="#D9D9D9" d="M16 16h32v32H16z" />
        </Mask>
        <G mask="url(#a)">
            <Path
                fill="#fff"
                d="M22.154 41.333c-.614 0-1.126-.205-1.537-.616-.411-.411-.617-.924-.617-1.538V24.82c0-.613.206-1.125.617-1.537.41-.41.923-.616 1.537-.616h19.692c.614 0 1.126.205 1.537.616.411.412.617.924.617 1.537v14.36c0 .613-.206 1.126-.617 1.537-.41.41-.923.616-1.537.616H22.154ZM42.667 25.18l-10.07 6.592a2.03 2.03 0 0 1-.285.124.949.949 0 0 1-.312.05.949.949 0 0 1-.311-.05 2.03 2.03 0 0 1-.286-.124l-10.07-6.592v14a.8.8 0 0 0 .231.59c.154.153.35.23.59.23h19.692c.24 0 .436-.077.59-.23a.8.8 0 0 0 .23-.59v-14ZM32 30.666 42.256 24H21.744L32 30.667Zm-10.667-5.205V24.38v.046-.068 1.104Z"
            />
        </G>
    </Svg>
);
export default Mailbox;
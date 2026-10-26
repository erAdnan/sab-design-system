import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

interface SVGRProps {
    desc?: string;
    descId?: string;
}

const DropdownAddon = ({ desc, descId, ...props }: SvgProps & SVGRProps) => (
    <Svg
        width={13}
        height={7}
        fill="none"
        aria-describedby={descId}
        {...props}
    >
        {desc ? <desc id={descId}>{desc}</desc> : null}
        <Path fill="#fff" d="m12 6.778-6-6-6 6h12Z" />
    </Svg>
);
export default DropdownAddon;
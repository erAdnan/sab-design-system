import * as React from "react";
import Svg, { SvgProps, Path, Rect } from "react-native-svg";

const ContactBook = ({
  fill = "#DB0011",
  width = 24,
  height = 24,
  ...props
}: SvgProps) => (
  <Svg
    {...props}
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    preserveAspectRatio="xMidYMid meet"
  >
    <Path
      stroke={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3.361 2.833H1M3.361 8.5H1m2.361 5.667H1M12.684 5.889a1.889 1.889 0 1 1-3.778 0 1.889 1.889 0 0 1 3.778 0ZM7.06 12.71c.999-1.54 2.586-2.116 3.735-2.115 1.148 0 2.689.576 3.689 2.116a.31.31 0 0 1 .024.324c-.234.415-.96 1.238-1.483 1.293-.603.064-2.18.073-2.23.073-.05 0-1.674-.01-2.275-.073-.525-.056-1.25-.878-1.485-1.293-.058-.103-.04-.225.025-.325Z"
    />
    <Rect
      width={14}
      height={17}
      x={3.5}
      y={0.5}
      stroke={fill}
      rx={1.5}
    />
  </Svg>
);

export default ContactBook;

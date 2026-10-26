import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const Education = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      fill={props.fill || "#724DDE"}
      fillRule="evenodd"
      d="M3.667 4.462c0-.316.259-.574.577-.574h15.512c.318 0 .577.258.577.574 0 .317-.259.573-.577.573h-3.559v3.02c0 2.298-1.883 4.167-4.197 4.167s-4.197-1.87-4.197-4.167v-3.02H5.857v4.56c0 .317-.259.573-.579.573a.576.576 0 0 1-.577-.573v-4.56h-.457a.576.576 0 0 1-.577-.573ZM12 13.055a7.892 7.892 0 0 1 3.872 1.009c2.17 1.22 3.628 3.423 3.628 5.94 0 .304-.266.551-.595.551H5.095c-.329 0-.595-.247-.595-.55 0-2.52 1.46-4.724 3.631-5.943A7.889 7.889 0 0 1 12 13.055Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default Education;

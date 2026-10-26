import React, { FC } from "react";
import LogoImage from "../icons/sab360/LogoImage";
import LogoImageLarge from "../icons/sab360/LogoImageLarge";
import { useTheme } from "../../context/theme/themeContext";
import LogoImageVertical from "../icons/sab360/LogoImageVertical";

interface SABLogoProps {
  vertical?: boolean;
  width?: number;
  height?: number;
  small?: boolean;
}

/**
 * @property vertical - optional boolean, use when small size of logo is needed
 */

export const SABLogo: FC<SABLogoProps> = ({ small,width, height, vertical }) => {
  const { theme } = useTheme();
  if (small) {
      return (
        <LogoImage fill={theme.primarycolor3} color={theme.primarytextcolor} width={width} height={height} />
      );
    }
  if (vertical) {
    return (
      <LogoImageVertical fill={theme.primarycolor3} color={theme.primarytextcolor} width={width} height={height}/>
    );
  }
  return (
    <LogoImageLarge fill={theme.primarycolor3} color={theme.primarytextcolor} width={width} height={height} />
  );
};

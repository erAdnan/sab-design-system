import React, { ReactElement, useMemo } from 'react'
import ImageThumbnail from "../imageThumbnail/ImageThumbnail";

interface LogoWrapperProps {
  size: 'extra-small' | 'small' | 'medium' | 'large';
  logo: ReactElement | any;
  isSvg?: boolean;
}

export const LogoWrapper: React.FC<LogoWrapperProps> = ({
  size,
  logo,
  isSvg = true
}) => {
  const logoSize = useMemo(() => {
    switch (size) {
      case 'extra-small':
        return { width: 24, height: 24 };
       case 'small':
        return { width: 32, height: 32 };
       case 'medium':
        return { width: 48, height: 48 };
       case 'large':
        return { width: 72, height: 72 };
    }
  }, [size])
const dynamicIcon = useMemo(
    () => logo
    ? React.cloneElement(logo, {
      width: logoSize.width,
      height: logoSize.height
    })
    : null,
  [logo, logoSize]);
  return isSvg ? dynamicIcon : <ImageThumbnail isAbsolutePath url={logo} width={logoSize.width} height={logoSize.height}/>
}

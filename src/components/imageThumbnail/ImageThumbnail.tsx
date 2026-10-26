import { FC, useMemo, useState } from "react";
import { ImageBackground, ImageResizeMode, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { radiusS } from "../../assets/styles/constants/size";

export interface ImageThumbnailProps {
  width: number;
  height: number;
  url?: any;
  children?: any;
  resizeMode?: ImageResizeMode;
  overrideStyles?: any;
  overrideImageStyles?: any;
  isAbsolutePath?: boolean;
  localSvg?: React.FC<any>;
  fallbackLocalUrl?: string;
}

const FALLBACK_URL = "https://i.ibb.co/chfZMJZN/image-thumbnail-full.png";

/**
 * ImageThumbnail component
 * @property {number} width - width of the image
 * @property {number} height - height of the image
 * @property {string} url - url of the image, optional
 * @property {boolean} isAbsolutePath - Optional boolean, should be set to true when images from local file system are used
 * @property {any} children - children of the component, optional
 * @property {ImageResizeMode} resizeMode - resizeMode of the image, optional. Default is 'cover', can be 'contain', 'stretch', 'repeat', 'center'
 * @property {any} overrideStyles - override styles of the component, optional
 * @property {any} overrideImageStyles - override styles of the image, optional
 * @property {React.FC<any>} localSvg - A React functional component representing a local SVG asset.
 */
const ImageThumbnail: FC<ImageThumbnailProps> = ({
  url,
  children,
  width,
  height,
  resizeMode = "cover",
  overrideStyles,
  overrideImageStyles,
  isAbsolutePath = false,
  localSvg: LocalSvgComponent,
  fallbackLocalUrl,
}) => {
  
   const [fallback, setFallback] = useState(false);


  const isSvg = useMemo(
    () => typeof url === "string" && url?.endsWith(".svg"),
    [url]
  ); // Check if the URL is an SVG

  const placeholder = fallbackLocalUrl
    ? { uri: fallbackLocalUrl } // fallback to your local URL
    : require("../../assets/images/merchant_placeholder.png"); // default

  if (LocalSvgComponent) {
    return (
      <LocalSvgComponent
        width={width}
        height={height}
        style={[{ borderRadius: radiusS }, overrideStyles]}
      />
    );
  }

  if (isSvg && url && !fallback) {
    return (
      <View
      style={[
        {
          width,
          height,
          // borderRadius: radiusS,
          overflow: "hidden",
        },
        overrideImageStyles,
      ]}
    >
      <SvgUri
         uri={url}
        width={width}
        height={height}
        style={[{ borderRadius: radiusS }, overrideImageStyles]}
        onError={() => setFallback(true)}
      />
      {children}
    </View>
    );
  }

   const imgSource =
    !fallback && url
      ? isAbsolutePath
        ? url // if local absolute path, use directly
        : { uri: url } // remote URL
      : placeholder; // fallback

  return (
    <ImageBackground
      source={imgSource}
      resizeMode={resizeMode}
      onError={() => setFallback(true)}
      style={[
        {
          margin: 0,
          padding: 0,
          borderRadius: radiusS,
          width: width,
          height: height,
        },
        overrideStyles,
      ]}
      imageStyle={overrideImageStyles}
    >
      {children}
    </ImageBackground>
  );
};

export default ImageThumbnail;

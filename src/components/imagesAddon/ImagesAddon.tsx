import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { FC } from "react";
import { SvgUri } from "react-native-svg";
import More from "../icons/functionals/More";

export interface ImagesAddonProps {
  images: string[];
  onMoreIconPress?: () => void;
}

export const ImagesAddon: FC<ImagesAddonProps> = ({ images, onMoreIconPress }) => {
  const { theme } = useTheme();
  const addonStyles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
    },
    image: {
      borderRadius: actuatedNormalize(24),
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      marginLeft: actuatedNormalize(-20),
      backgroundColor: theme.primarycolor4static,
      objectFit: "cover",
      borderColor: theme.neutraltint,
      borderWidth: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden", // 👈 helps clip SVG inside borderRadius
    },
  });

  // 👇 helper to render PNG/JPG with <Image /> or .svg with <SvgUri />
  const renderLogo = (uri: string, index: number) => {
    const isSvg = uri.toLowerCase().endsWith(".svg");
    const style = { ...addonStyles.image, zIndex: index === 0 ? 1 : -index };

    if (isSvg) {
      return (
        <View style={style}>
          <SvgUri
            key={index}
            uri={uri}
            width={actuatedNormalize(36)}
            height={actuatedNormalize(36)}
          />
        </View>
      );
    }

    return <Image key={index} source={{ uri }} style={style} resizeMode="cover" />;
  };
  return (
    <View style={addonStyles.container}>
    {images.length <= 3 ? (
      images.map((image, index) => renderLogo(image, index))
    ) : (
      <>
        {renderLogo(images[0], 0)}
        {renderLogo(images[1], 1)}
        <TouchableOpacity
          style={addonStyles.image}
          onPress={() => onMoreIconPress && onMoreIconPress()}
        >
          <More fill={theme.primarycolor} />
        </TouchableOpacity>
      </>
    )}
  </View>
  );
};
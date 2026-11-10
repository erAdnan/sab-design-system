import React, { FC, ReactElement } from "react";
import { I18nManager, StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmall,

  lineHeightSmallMedium,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { Title } from "../text/Title";
import { Avatar } from "../avatar/Avatar";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import ImageThumbnail, { ImageThumbnailProps } from "../imageThumbnail/ImageThumbnail";

interface BlockProductProps {
  title: string;
  subtitle: string;
  linkButtonText: string;
  showLinkButton?: boolean;
  linkButtonIconLeft?: boolean;
  linkButtonIconRight?: boolean;
  onLinkButtonPress?: () => void;
  addOnType?: "bigIcon" | "image";
  icon?: ReactElement;
  imgUrl?: string;
  loading?: boolean;
  imgType: 'image' | 'avatar';
  imgProps?: ImageThumbnailProps;
  overrideStyles?: any;
  skeletonStyles?: any;
}

/**
 * @property title - Text to be displayed in bold
 * @property subtitle - Text to be displayed on the second line
 * @property linkButtonText - Text for link button
 * @property onLinkButtonPress - Optonal callback for link button press
 * @property linkButtonIconRight - Boolean to show/hide link button right icon (default is true)
 * @property linkButtonIconLeft - Boolean to show/hide link button left icon (default is false)
 * @property showLinkButton - Boolean to show/hide link button (default is true)
 * @property addOnType - Changes addOn to be displayed on top (bigIcon - icon needs to be passed, or image - image url needs to be passed)
 * @property icon - React element (icon) to be passed when addOnType is "bigIcon"
 * @property imgUrl - Img url (string) to be passed when addOnType is "image"
 * @property loading - boolean for showing the skeleton
 **/
const BlockProductSkeleton: React.FC<Partial<BlockProductProps>> = ({ imgType,skeletonStyles }) => {
  const { theme } = useTheme();
  const isImage = imgType === 'image'
  return (
     <View
      style={[{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        alignSelf: "stretch",
        height: actuatedNormalize(isImage ? 306 : 224),
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        // alignItems: isImage ? 'center': 'flex-start'
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      },skeletonStyles]}>
      <SkeletonBox shape={isImage ? "square" : "circle"} size="large" overrideStyles={{ alignSelf: isImage ? 'center' : 'flex-start' }} />
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center" }}>
        <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
      </View>
      <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
    </View>
  )
}

export const Product: FC<BlockProductProps> = ({
  title,
  subtitle,
  linkButtonText,
  showLinkButton = true,
  linkButtonIconLeft = false,
  linkButtonIconRight = true,
  onLinkButtonPress,
  addOnType = "bigIcon",
  icon,
  imgUrl = "",
  loading = false,
  imgType = 'avatar',
  imgProps,
  overrideStyles,
  skeletonStyles,
}) => {
  const { theme } = useTheme();
  return loading ? <BlockProductSkeleton imgType={imgType} skeletonStyles={skeletonStyles} /> : (
    <View
      style={[{
        ...styles.container,
        backgroundColor: theme.stylesblockbg,
        height: imgType === "image" ? actuatedNormalize(354) : actuatedNormalize(224),
      },overrideStyles]}
    >
      <View style={{display:"flex",flexDirection: "column",gap:actuatedNormalize(20)}}>
  {addOnType === "bigIcon" ? (
          <Avatar size="large" icon={icon} />
        ) : (
          imgType === 'avatar' ? <Avatar
            size="large"
            img={imgUrl || "https://i.ibb.co/chfZMJZN/image-thumbnail-full.png"}
            /> : <View style={styles.imgContainer}>{imgProps && <ImageThumbnail {...imgProps} />}</View>
      )}
      <View style={styles.textContent}>
        <Title
          size={fontLarge}
          variant="primarytextcolor"
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),
            alignSelf: "flex-start",
          }}
        >
          {title}
        </Title>
        <Text size={fontSmall} variant="primClr" overrideStyles={{...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }) }}>{subtitle}</Text>
      </View>
      </View>
      
      {showLinkButton && (
        <Button
          variant="link"
          size="small"
          onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
          buttonText={{ children: linkButtonText || "" ,overrideStyles:{
                          lineHeight:lineHeightSmallMedium,
                        }}}
          linkIconRight={linkButtonIconRight}
          linkIconLeft={linkButtonIconLeft}
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            gap:0,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    alignSelf: "stretch",
    minHeight: actuatedNormalize(224),
    borderRadius: radiusS,
    padding: spacingS,
    justifyContent:"space-between",
  },
  textContent: {
    display: "flex",
    flexDirection: "column",
  },
  imgContainer: {
    alignSelf: 'center'
  }
});

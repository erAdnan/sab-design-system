import React, { FC, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontLarge,
  fontSmall,
  fontWeightMedium,
  fontWeightRegular,
  fontXXSmall,
  lineHeightLarge,
  lineHeightSmall,
  lineHeightXXSmall,
  radiusS,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { Title } from "../text/Title";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface BlockArticleProps {
  subheading: string | ReactNode;
  title: string | ReactNode;
  body: string | ReactNode;
  linkButtonText: string;
  showLinkButton?: boolean;
  linkButtonIconLeft?: boolean;
  linkButtonIconRight?: boolean;
  onLinkButtonPress?: () => void;
  loading?: boolean;
}

/**
 *  @property subheading - show subheading as per the figma
 * @property title - Text to be displayed in bold
 * @property body - Text to be displayed on the second line
 * @property linkButtonText - Text for link button
 * @property onLinkButtonPress - Optonal callback for link button press
 * @property linkButtonIconRight - Boolean to show/hide link button right icon (default is true)
 * @property linkButtonIconLeft - Boolean to show/hide link button left icon (default is false)
 * @property showLinkButton - Boolean to show/hide link button (default is true)
 * @property loading - boolean for showing the skeleton
 **/

export const Article: FC<BlockArticleProps> = ({
  subheading,
  title,
  body,
  linkButtonText,
  showLinkButton = true,
  linkButtonIconLeft = false,
  linkButtonIconRight = true,
  onLinkButtonPress,
  loading = false,
}) => {
  const { theme } = useTheme();
  return loading ? (
    <View
      style={{
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        alignSelf: "stretch",
        backgroundColor: theme.stylesblockbg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        padding: spacingS,
        gap: spacingS,
        borderRadius: radiusS,
      }}>
      <View style={{ flexDirection: "column", gap: spacingXS, justifyContent: "center", }}>
        <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
        <SkeletonBox shape="line" size="small" overrideStyles={{ width: "100%" }} />
      </View>
      <SkeletonBox shape="line" size="medium" overrideStyles={{ width: "100%" }} />
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.stylesblockbg,
      }}
    >
       
      <View style={styles.textContent}>
      {typeof subheading === "string" ? (
        <Text
          size={fontXXSmall}
          variant="secondarycolor10"
          overrideStyles={{
            fontWeight: fontWeightRegular,
            lineHeight: lineHeightXXSmall,
          }}
        >
          {subheading}
        </Text>
      ) : (
        subheading
      )}
      {typeof title === "string" ? (
        <Title
          size={fontLarge}
          variant="primarytextcolor"
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
            alignSelf: "flex-start",
            fontWeight: fontWeightMedium,
            lineHeight:lineHeightLarge,
          }}
        >
          {title}
        </Title>
      ) : (
        title
      )}
        {typeof body === "string" ? (
          <Text
            size={fontSmall}
            overrideStyles={{
              fontWeight: fontWeightRegular,
              lineHeight: lineHeightSmall,
            }}
          >
            {body}
          </Text>
        ) : (
          body
        )}


      </View>
      {showLinkButton && (
        <Button
          variant="link"
          size="small"
          onButtonPress={() => onLinkButtonPress && onLinkButtonPress()}
          buttonText={{ children: linkButtonText || "" }}
          linkIconRight={linkButtonIconRight}
          linkIconLeft={linkButtonIconLeft}
          overrideStyles={{
            paddingHorizontal: 0,
            paddingVertical: 0,
          }}
        />
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    maxWidth: "100%",
    minWidth: 0,
    alignSelf: "stretch",
    alignItems:"flex-start",
    borderRadius: radiusS,
    padding: spacingS,
  },
  textContent: {
    display: "flex",
    alignItems:"flex-start",
    flexDirection: "column",
    gap:actuatedNormalize(2),
  },
});

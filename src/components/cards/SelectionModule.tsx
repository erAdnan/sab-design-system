import React, { FC } from "react";
import { ChipsInfo, ChipsInfoProps } from "../chips/ChipsInfo";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import ImageThumbnail, {
  ImageThumbnailProps,
} from "../imageThumbnail/ImageThumbnail";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface SelectionModuleProps {
  cardName: string;
  accountName: string;
  cardNumber: string;
  imageProps: ImageThumbnailProps;
  showChipsInfo?: boolean;
  chipsInfoProps?: ChipsInfoProps;
  showChevron?: boolean;
  onChevronPress?: () => void;
  loading?: boolean;
}

/**
 * @property cardName - Text for the first line in bold
 * @property accountName - Text for the second line
 * @property cardNumber - Text for the third line
 * @property imageProps - Props to configure image (URL, isAbsolutePath...)
 * @property showChipsInfo - Boolean to show/hide chips info
 * @property chipsInfoProps - Configuration for chips info
 * @property showChevron - Boolean to show/hide chevron right
 * @property onChevronPress - Optional callback to handle chevron press event
 * @property loading - Boolean to show/hide loading state
 */

export const SelectionModule: FC<SelectionModuleProps> = ({
  cardName,
  accountName,
  cardNumber,
  imageProps,
  showChipsInfo,
  chipsInfoProps,
  showChevron,
  onChevronPress,
  loading = false,
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.stylesblockbg,
      padding: spacingS,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
    },
    cardDetailsWrapper: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: spacingS,
      alignSelf: "flex-start",
    },
    cardDetails: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXXS,
      flex: 1,
      alignItems: "flex-start",
    },
    chipsContainer: {
      height: actuatedNormalize(24),
      display: "flex",
      alignItems: "flex-end",
      flexDirection: "row",
      justifyContent: "flex-end",
    },
  });
  return loading ? (
    <View style={{
      backgroundColor: theme.stylesblockbg,
      display: "flex",
      flexDirection: "row",
      gap: spacingS,
      padding: spacingS,
      // width: width,
      // height: height,
      borderRadius: radiusS,
      width: "100%",
    }}>
      <View>
        <SkeletonBox shape="square" size="large" />
      </View>
      <View style={{ display: "flex", flexDirection: "column", gap: spacingS }}>
        <SkeletonBox shape="line" size="medium" />
        <SkeletonBox shape="line" size="large" />
        <View style={{ marginTop: spacingXS, display: "flex", alignItems: "flex-end" }}>
          <SkeletonBox shape="line" size="large" overrideStyles={{ width: "30%" }} />
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.cardDetailsWrapper}>
        <View>
          <ImageThumbnail
            {...imageProps}
            width={actuatedNormalize(70)}
            height={actuatedNormalize(45)}
          />
        </View>
        <View style={styles.cardDetails}>
          <Text
            overrideStyles={{
              paddingBottom: actuatedNormalize(2),
            }}
            numberOfLines={1}
            size={fontMediumLarge}
            bold
          >
            {cardName}
          </Text>
          <Text numberOfLines={1} size={fontMedium} variant="primarytextcolor2">
            {accountName}
          </Text>
          <Text size={fontSmall} variant="primarytextcolor2">
            {cardNumber}
          </Text>
        </View>
        {showChevron && (
          <ChevronRight
            fill={theme.primarytextcolor}
            onPress={() => onChevronPress && onChevronPress()}
          />
        )}
      </View>
      <View style={styles.chipsContainer}>
        {showChipsInfo && <ChipsInfo {...chipsInfoProps} />}
      </View>
    </View>
  );
};

import React, { FC, useState } from "react";
import ImageThumbnail from "../imageThumbnail/ImageThumbnail";
import { ImageBackground, StyleSheet, View } from "react-native";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SarFont } from "../sarFont/SarFont";
import {
  fontMedium,
  fontXLG,
  lineHeightXLG,
  spacingXS,
} from "../../assets/styles/constants/size";
import LogoNoText from "../icons/sab360/LogoNoText";
import Chip from "../icons/sab360/Chip";
import Visa from "../icons/sab360/Visa";
import Password from "../icons/functionals/Password";
import PasswordOff from "../icons/functionals/PasswordOff";
import { lightTheme } from "../../assets/styles/theme/light";

interface PreviewModuleCardsProps {
  availableLimitLabel: string;
  amount: string;
  accountNumber: string;
  cardName: string;
  onIconPress?: () => void;
}

/**
 *
 * @property {string} cardName - Text for the card name
 * @property {string} availableLimitLabel - Text for the available limit / amount label
 * @property {string} amount - Text for available limit / amount, sar symbol will be added automatically
 * @property {string} accountNumber - Text for the account number
 * @property {string} onIconPress - Event handler for "eye" icon press
 */

const PreviewModuleCards: FC<PreviewModuleCardsProps> = ({
  availableLimitLabel,
  amount,
  accountNumber,
  cardName,
  onIconPress,
}) => {
  const [visible, setVisible] = useState(false);

  const handleIconPress = () => {
    setVisible(!visible);
    onIconPress && onIconPress();
  };
  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: actuatedNormalize(24),
      height: actuatedNormalize(184),
      width: "100%",
    },
    contentWrapper: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    amountWrapper: {
      display: "flex",
      flexDirection: "row",
    },
  });
  console.log(visible);
  return (
    <ImageBackground source={require("../../assets/images/cardBackground.png")}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={{ gap: spacingXS }}>
            <View
              style={[
                styles.amountWrapper,
                { gap: spacingXS, alignItems: "flex-start" },
              ]}
            >
              <Text size={fontMedium} variant="primarycolor4static">
                {availableLimitLabel}
              </Text>
              {visible ? (
                <Password
                  onPress={handleIconPress}
                  fill={lightTheme.primarycolor4static}
                  width={actuatedNormalize(16)}
                  height={actuatedNormalize(16)}
                />
              ) : (
                <PasswordOff
                  onPress={handleIconPress}
                  fill={lightTheme.primarycolor4static}
                  width={actuatedNormalize(16)}
                  height={actuatedNormalize(16)}
                />
              )}
            </View>

            <View style={styles.amountWrapper}>
              <SarFont
                size={fontXLG}
                lineHeight={lineHeightXLG}
                variant="primarycolor4static"
              />
              <Text bold size={fontXLG} variant="primarycolor4static">
                {amount}
              </Text>
            </View>
          </View>
          <View style={{ gap: spacingXS }}>
            <Text bold size={fontMedium} variant="primarycolor4static">
              {accountNumber}
            </Text>
            <Text size={fontMedium} variant="primarycolor4static">
              {cardName}
            </Text>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <LogoNoText />
          <Chip />
          <Visa />
        </View>
      </View>
    </ImageBackground>
  );
};

export default PreviewModuleCards;

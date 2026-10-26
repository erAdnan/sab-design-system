import {StyleSheet, View} from "react-native";
import React, {FC} from "react";
import {fontXLarge, fontXXSmall, spacingL, spacingML} from "../../../assets/styles/constants/size";
import {useTheme} from "../../../context/theme/themeContext";
import {actuatedNormalize} from "../../../assets/styles/utils/pixelScaling";

interface DialPadPinProps {
  pinLength: number;
  code: (string | number)[];
  dialPadContent: (string | number)[];
}

export const DialPadPin: FC < DialPadPinProps > = ({pinLength, code, dialPadContent}) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    dialPadPinContainer: {
      display: "flex",
      gap: spacingML,
      flexDirection: "row",
      marginBottom: spacingL,
      alignItems: "center",
      justifyContent: "center",
      height: fontXLarge,
      overflow: "visible",
      width: "100%"
    },
    pinSlot: {
      backgroundColor: theme.primarytextcolor,
      borderRadius: actuatedNormalize(100),
      width: fontXXSmall,
      height: fontXXSmall
    },
    pinSelected: {
      backgroundColor: theme.primarycolor3
    },
    pinLastSelected: {
      width: fontXLarge,
      height: fontXLarge
    }
  });

  return (<View style={styles.dialPadPinContainer}>
    {
      Array.from({
        length: pinLength
      }, (_, index) => {
        const item = dialPadContent[index];
        const isSelected = (typeof item === "number" || typeof item === "string") && code[index] !== undefined;
        const isLastSelected = isSelected && index === code.length - 1 && index !== pinLength - 1;

        return (<View key={index}>
          {
            isSelected
              ? (<View style={[
                  styles.pinSlot, styles.pinSelected, isLastSelected && styles.pinLastSelected
                ]}/>)
              : (<View style={[styles.pinSlot]}/>)
          }
        </View>);
      })
    }
  </View>);
};
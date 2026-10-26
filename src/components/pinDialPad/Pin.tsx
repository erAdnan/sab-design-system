import {
	I18nManager,
  StyleSheet,
  View,
} from "react-native";
import React, { FC, useMemo, useState } from "react";
import { DialPadPin } from "./components/DialPadPin";
import { DialPadKeypad } from "./components/DialPadKeypad";
import { Text } from "../text/Text";
import { fontMediumLarge, fontWeightRegular, lineHeightXLarge, spacingS } from "../../assets/styles/constants/size";

interface PinProps {
	info: string, 
	pinLength: number, 
	onPinCompleted?: (code: string) => void,
	onFaceIdPress?: () => void, 
}

const englishNumbers: (number | string)[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "X"];
const arabicNumbers: (string | number)[] = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "", "٠", "X"];


const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  info: {
    fontWeight: fontWeightRegular,
    lineHeight: lineHeightXLarge,
    marginBottom: spacingS
  }
});

/**
 * @property {string} info - Text on top of the dial pad
 * @property {string} pinLength - How many digits is the pin
 * @property {() => void} onFaceIdPress - Called when the face id is pressed. If not provided the face id button is hidden
 * @property {(code: string) => void} onPinCompleted - Called when the pin is the pin length
 */

export const Pin: FC<PinProps> = ( { info, pinLength, onFaceIdPress, onPinCompleted } ) => {
 	const [code, setCode] = useState<(string | number)[]>([]);
	const isArabic = I18nManager.isRTL;
	 const dialPadContent = useMemo(() => (isArabic ? arabicNumbers : englishNumbers), [isArabic]);

	return (
		<View style={styles.container}>
			<Text variant="primarycolor2_100" size={fontMediumLarge} overrideStyles={styles.info}>{info}</Text>
			
			<DialPadPin
				pinLength={pinLength}
				code={code}
				dialPadContent={dialPadContent}
			/>

			<DialPadKeypad
				pinLength={pinLength}
				dialPadContent={dialPadContent}
				setCode={setCode}
				code={code}
				onFaceIdPress={onFaceIdPress}
				onPinCompleted={onPinCompleted}
			/>
		</View>
	);
};

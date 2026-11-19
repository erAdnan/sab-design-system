import {
	I18nManager,
  StyleSheet,
  View,
} from "react-native";
import React, { FC, useMemo, useState } from "react";
import { DialPadPin } from "./components/DialPadPin";
import { DialPadKeypad, PinBiometricType } from "./components/DialPadKeypad";
import { Text } from "../text/Text";
import { fontMediumLarge, fontWeightRegular, lineHeightXLarge, spacingS } from "../../assets/styles/constants/size";

export type { PinBiometricType };

interface PinProps {
	info?: string, 
	pinLength: number, 
	onPinCompleted?: (code: string) => void,
	onFaceIdPress?: () => void,
	/** Figma MPIN.keyboard Type=faceID | Fingerprint | Default */
	biometricType?: PinBiometricType,
	onBiometricPress?: () => void,
	/** When false, hides the pin-dot row (MPIN keyboard-only) */
	showPinDots?: boolean,
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
 * @property {PinBiometricType} biometricType - MPIN keypad biometric slot (faceId | fingerprint | none)
 * @property {() => void} onBiometricPress - Called when biometric key is pressed
 * @property {(code: string) => void} onPinCompleted - Called when the pin is the pin length
 */

export const Pin: FC<PinProps> = ( {
	info,
	pinLength,
	onFaceIdPress,
	onPinCompleted,
	biometricType,
	onBiometricPress,
	showPinDots = true,
} ) => {
 	const [code, setCode] = useState<(string | number)[]>([]);
	const isArabic = I18nManager.isRTL;
	 const dialPadContent = useMemo(() => (isArabic ? arabicNumbers : englishNumbers), [isArabic]);

	const resolvedBiometric: PinBiometricType =
		biometricType ??
		(onFaceIdPress || onBiometricPress ? "faceId" : "none");

	const handleBiometric = onBiometricPress ?? onFaceIdPress;

	return (
		<View style={styles.container}>
			{info ? (
				<Text variant="primarycolor2_100" size={fontMediumLarge} overrideStyles={styles.info}>{info}</Text>
			) : null}
			
			{showPinDots ? (
				<DialPadPin
					pinLength={pinLength}
					code={code}
					dialPadContent={dialPadContent}
				/>
			) : null}

			<DialPadKeypad
				pinLength={pinLength}
				dialPadContent={dialPadContent}
				setCode={setCode}
				code={code}
				biometricType={resolvedBiometric}
				onFaceIdPress={handleBiometric}
				onPinCompleted={onPinCompleted}
			/>
		</View>
	);
};

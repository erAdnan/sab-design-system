import { StyleSheet, View, FlatList, TouchableOpacity, I18nManager } from "react-native";
import React, { FC } from "react";
import Icon from "../../icon/Icon";
import { useTheme } from "../../../context/theme/themeContext";
import { fontLG, iconS, spacingXS } from "../../../assets/styles/constants/size";
import { actuatedNormalize } from "../../../assets/styles/utils/pixelScaling";
import { Text } from "../../text/Text";
import Backspace from "../../icons/functionals/Backspace";

interface DialPadKeypadProps {
  dialPadContent: (string | number)[];
  pinLength: number;
  code: (string | number)[];
  setCode: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  onFaceIdPress?: () => void;
  onPinCompleted?: (code: string) => void;
}

export const DialPadKeypad: FC<DialPadKeypadProps> = ({
  dialPadContent,
  pinLength,
  code,
  setCode,
  onFaceIdPress,
  onPinCompleted,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
    },
    dialPadContainer: {
      width: actuatedNormalize(103),
      height: actuatedNormalize(56),
      justifyContent: "center",
      alignItems: "center",
      margin: spacingXS,
      borderColor: "transparent",
    },
  });

  const processContent = (content: (string | number)[]) => {
    const reversedContent = [];
    for (let i = 0; i < content.length; i += 3) {
      const isLastRow = i + 3 >= content.length;
      const portion = content.slice(i, i + 3);
      reversedContent.push(...(isLastRow ? portion : portion.reverse()));
    }
    return reversedContent;
  };

  const isRTL = I18nManager.isRTL;

  const processedDialPadContent = isRTL ? processContent(dialPadContent) : dialPadContent;

  return (
    <FlatList
      style={styles.container}
      data={processedDialPadContent}
      numColumns={3}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            if (item === "") {
              onFaceIdPress && onFaceIdPress();
              return;
            }

            if (item === "X") {
              setCode((prev) => prev.slice(0, -1));
            } else {
				if (code.length === pinLength) return;
				
				if (code.length === pinLength - 1 && onPinCompleted) {
					onPinCompleted([...code, item].join(""));
				}

              	setCode((prev) => [...prev, item]);
            }
          }}
        >
          <View style={styles.dialPadContainer}>
  {item === "X" ? (
    <Backspace
      fill={theme.primarytextcolor}
      style={{
        transform: [{ rotate: isRTL ? "180deg" : "0deg" }],
      }}
      width={iconS}
      height={iconS}
    />
  ) : item === "" ? (
    onFaceIdPress && (
      <Icon name="face_id" width={iconS} height={iconS} type="functionals" />
    )
  ) : (
    <Text variant="primarytextcolor" size={fontLG}>
      {item}
    </Text>
  )}
</View>
        </TouchableOpacity>
      )}
    />
  );
};
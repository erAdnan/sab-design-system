// components/text/InlineText.tsx
import React from "react";
import { Pressable, Text as RNText, StyleProp, TextStyle } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import fonts from "../../assets/styles/constants/fonts";
import { withReadingTextAlign } from "../../localization/rtlStyle";

interface TextParagraphProps {
  mainText: string;
  subText: string;
  size?: number;
  lineHeight?: number;
  mainTextStyle?: StyleProp<TextStyle>;
  subTextStyle?: StyleProp<TextStyle>;
  variant?: string; // Theme key, like "primarycolor2_100"
  subVariant?: string; // Theme key for subtext
  onSubTextPress?: () => void;
}

/**
 *
 * @property mainText - String  content for disclaimer or  bullet points text use this prop
 * @property subText - String  if you want to show red color text or subtext varaint use this like "Terms & Condtion"
 * @property size - The font size to be used
 *  @property variant - Determines the font color for mainText
 *  @property lineHeight - default is 16 use as per the component behaviour
 *  @property mainTextStyle - Custom styles to be applied to the mainText
 *  @property subTextStyle - Custom styles to be applied to the subText
 *  @property subVariant - Determines the font color for subText
 * @property onSubTextPress - Callback when subText is pressed
 *
 */

const TextParagraph: React.FC<TextParagraphProps> = ({
  mainText,
  subText,
  size = 12,
  lineHeight = 16,
  variant = "primarycolor2_100",
  subVariant = "primarycolor3static",
  mainTextStyle,
  subTextStyle,
  onSubTextPress,
}) => {
  const { theme } = useTheme();

  return (
    <RNText
      style={fonts.withTrueBoldWeight([
        {
          fontSize: size,
          lineHeight,
          fontFamily: fonts.HSBC,
          color: theme[variant],
        },
        withReadingTextAlign(mainTextStyle),
      ])}
    >
      {mainText + " "}
      <RNText
        style={fonts.withTrueBoldWeight([
          {
            fontSize: size,
            lineHeight,
            fontFamily: fonts.HSBC,
            color: theme[subVariant],
          },
          withReadingTextAlign(subTextStyle),
        ])}
        onPress={onSubTextPress}
        suppressHighlighting={true}
      >
        {subText}
      </RNText>
    </RNText>
  );
};

export default TextParagraph;

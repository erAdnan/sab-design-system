import { FC } from "react";
import { View } from "react-native";
import { Text } from "./Text";

export interface TextTextProps {
  text: string;
  hierarchy?: "primary" | "secondary";
  variant?: string;
  bullet?: "true" | "false" | "true.success";
  editable?: boolean;
  copyable?: boolean;
  loading?: boolean;
  textWidth: number;
  loadingStateStyles?: any;
  loadingNumOfLines?: any;
  overrideTextStyles?: any;
}

/**
 * Text.text component
 * @property text - text to display
 * @property hierarchy - variant of the text, can be primary or secondary
 * @property bullet - bullet point type, can be true, false or true.success
 * @property editable - boolean to make the text editable
 * @property copyable - boolean to make the text copyable
 */
export const TextText: FC<TextTextProps> = ({
  hierarchy = "primary",
  variant,
  bullet = "false",
  editable = false,
  copyable = false,
  text,
  loading = false,
  textWidth,
  loadingStateStyles,
  loadingNumOfLines,
  overrideTextStyles
}) => (
  <View>
    <Text
      variant={
        variant || (hierarchy === "primary" ? "primarytextcolor" : "primarytextcolor2")
      }
      editable={editable && !copyable ? true : false}
      copyable={copyable && !editable ? true : false}
      bulletPointProps={{
        type: bullet === "true" || bullet === "false" ? "disc" : "success",
        variant: bullet === "true.success" ? "primary" : hierarchy,
      }}
      showBulletPoint={bullet !== "false"}
      loading={loading}
      textWidth={textWidth}
      loadingStateStyles={loadingStateStyles}
      loadingNumOfLines={loadingNumOfLines}
      overrideStyles={overrideTextStyles}
    >
      {text}
    </Text>
  </View>
);

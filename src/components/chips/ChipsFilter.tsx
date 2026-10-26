import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  lineHeightMedium,
  lineHeightSmallMedium,
  radiusS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { Rag, RagIconType } from "../rag/Rag";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { NewCurrency } from "../text/NewCurrency";
import Warning from "../icons/status/Warning";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";

interface ChipsFilterProps extends AutomationProps {
  onClosePress?: () => void;
  label: string;
  loading?: boolean;
  error?: boolean;
  overrideStyles?: any;
}

/**
 * @property onClosePress - Optional callback for pressing the close icon (RAG)
 * @property label - Text to show inside chips
 * @property loading - Loading state of the chips
 * @property error - Error styling (e.g. invalid format)
 */

export const ChipsFilter: FC<ChipsFilterProps> = ({
  onClosePress,
  label,
  loading = false,
  error = false,
  overrideStyles,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const iconErrorSize = actuatedNormalize(16);

  const styles = StyleSheet.create({
    container: {
      paddingVertical: actuatedNormalize(7),
      paddingHorizontal: actuatedNormalize(8),
      backgroundColor: theme.ragneutraltint,
      borderRadius: radiusS,
      alignSelf: "flex-start",
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      alignItems: "center",
    },
  });
  return loading ? (
    <View>
      <SkeletonBox shape="square" size="medium" overrideStyles={{ width: actuatedNormalize(140) }} />
    </View>
  ) : (
    <View
      style={[
        styles.container,
        error && {
          backgroundColor: theme.ragcolor3tint,
          borderWidth: actuatedNormalize(1),
          borderColor: theme.strokecolor3tint,
        },
        overrideStyles,
      ]}
      {...getAutomationProps(testID, accessibilityLabel, label)}
    >
      {error && (
        <Warning
          width={iconErrorSize}
          height={iconErrorSize}
          fill={theme.ragcolor3}
        />
      )}
      <NewCurrency
        textstyle={{
          lineHeight: error ? lineHeightMedium : lineHeightSmallMedium,
        }}
        text={label}
        size={fontMedium}
        variant={error ? "primarycolor2_100static" : "primarytextcolor"}
      />

      {!error && (
        <Rag
          type={RagIconType.close}
          size="small"
          colorFill={theme.primarytextcolor}
          onPress={() => onClosePress && onClosePress()}
          testID={testID ? `${testID}-close` : undefined}
          accessibilityLabel={
            accessibilityLabel ? `${accessibilityLabel}-close` : "close"
          }
        />
      )}
    </View>
  );
};

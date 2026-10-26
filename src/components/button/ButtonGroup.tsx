import { FC } from "react";
import { Button, ButtonProps } from "./Button";
import { StyleSheet, View } from "react-native";
import { Size } from "../../assets/styles";
import { widthXl } from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Disclaimer, DisclaimerProps } from "../disclaimer/Disclaimer";

export interface ButtonGroupProps {
  type: "stacked" | "inline";
  primaryButton: ButtonProps;
  secondaryButton?: ButtonProps;
  tertiaryButton?: ButtonProps;
  overrideStyles?: any;
  loading?: boolean;
  checkBorder?: boolean;
  secondaryBtnBorderColor?: string;
  disclaimerProps?: DisclaimerProps;
}

/**
 * ButtonGroup Component
 * @property type: Determines the layout of the buttons. Default is "stacked" (accepts "stacked" or "inline")
 * @property primaryButton: The main button that will be displayed. Required and accepts ButtonProps
 * @property secondaryButton: The secondary button that will be displayed. Optional and accepts ButtonProps
 * @property tertiaryButton: The tertiary button that will be displayed. Optional and accepts ButtonProps. Can be "link" or "icon" variant
 * @property disclaimerProps: Optional Disclaimer props rendered above the buttons (stacked only, not while loading)
 * @property loading - boolean for showing the skeleton
 * @property Pass this as true only in the Button Group Review. When set to true, the secondary button will display a white border color (checkBorder={true}).
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({
  type = "stacked",
  primaryButton,
  secondaryButton,
  tertiaryButton,
  overrideStyles,
  loading,
  checkBorder,
  secondaryBtnBorderColor,
  disclaimerProps,
}) => {
  const { theme } = useTheme();
  const buttonsLayout = type === "stacked" ? styles.stacked : styles.inline;
  const content = (
    <>
      <Button
        overrideStyles={{ width: type === "stacked" ? "100%" : tertiaryButton ? "auto" : actuatedNormalize(160) }}
        loading={loading}
        loadingStyles={type === "stacked" && { width: "100%" }}
        {...primaryButton}
      />
      {secondaryButton && (
        <Button
          overrideStyles={{ width: type === "stacked" ? "100%" : tertiaryButton ? "auto" : actuatedNormalize(160), ...(checkBorder && { borderColor: secondaryBtnBorderColor || theme.primarycolor4static,}),  }}
          loading={loading}
          loadingStyles={type === "stacked" && { width: "100%" }}
          {...secondaryButton}
        />
      )}
      {tertiaryButton && (
        <Button
          overrideStyles={
            type === "stacked"
              ? styles.tertiaryButtonLink
              : styles.tertiaryButtonIcon
          }
          {...tertiaryButton}
          variant={type === "stacked" ? "link" : "icon"}
          loading={loading}
        />
      )}
    </>
  );
  if (disclaimerProps && type === "stacked" && !loading) {
    return (
      <View style={[styles.withDisclaimer, overrideStyles]}>
        <View style={styles.disclaimerWrapper}>
          <Disclaimer {...disclaimerProps} />
        </View>
        <View style={buttonsLayout}>{content}</View>
      </View>
    );
  }
  return (
    <View style={[overrideStyles, buttonsLayout]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  withDisclaimer: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  disclaimerWrapper: {
    width: "100%",
    marginBottom: Size.spacingM,
  },
  stacked: {
    flexDirection: "column",
    alignItems: "center",
    gap: Size.spacingS,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Size.spacingS,
  },
  tertiaryButtonLink: {
    width: "100%",
  },
  tertiaryButtonIcon: {
    minWidth: widthXl,
  },
});

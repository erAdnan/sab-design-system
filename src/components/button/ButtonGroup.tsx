import { FC, ReactElement } from "react";
import { Button, ButtonProps } from "./Button";
import { StyleSheet, View } from "react-native";
import { Size } from "../../assets/styles";
import { spacingXS, widthXl } from "../../assets/styles/constants/size";
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
  const isInline = type === "inline";
  const hasTertiary = !!tertiaryButton;
  // Figma inline group: 343 wide, 16 gap, buttons flex 1 (max 163.5), optional 48x48 icon button.
  // Stacked group: full width buttons, 16 gap, link button 24 below the last button.
  const buttonSlot = (children: ReactElement) =>
    isInline ? <View style={styles.inlineSlot}>{children}</View> : children;
  const content = (
    <>
      {buttonSlot(
        <Button
          overrideStyles={{ width: "100%" }}
          loading={loading}
          loadingStyles={{ width: "100%" }}
          {...primaryButton}
        />
      )}
      {secondaryButton &&
        buttonSlot(
          <Button
            overrideStyles={{ width: "100%", ...(checkBorder && { borderColor: secondaryBtnBorderColor || theme.primarycolor4static }) }}
            loading={loading}
            loadingStyles={{ width: "100%" }}
            {...secondaryButton}
          />
        )}
      {hasTertiary && (
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
    alignItems: "stretch",
    gap: Size.spacingS,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Size.spacingS,
  },
  // Figma button.group inline: buttons are flex 1 with max-width 163.5 (2 x 163.5 + 16 gap = 343).
  inlineSlot: {
    flex: 1,
    minWidth: 0,
    maxWidth: actuatedNormalize(163.5),
  },
  // Figma stacked group: 16 between buttons, 24 before the link button (16 gap + 8).
  tertiaryButtonLink: {
    width: "100%",
    marginTop: spacingXS,
  },
  // Figma icon button: 48 x 48, 24px icon centered, no horizontal padding.
  tertiaryButtonIcon: {
    width: widthXl,
    minWidth: widthXl,
    paddingHorizontal: 0,
  },
});

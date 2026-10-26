import React, {
  FC,
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  I18nManager,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { TooltipComponent, TooltipProps } from "../tooltip/Tooltip";
import {
  fontMedium,
  fontMediumLarge,
  fontSmall,
  fontWeightBold,
  fontWeightRegular,
  lineHeightMediumLarge,
  radiusS,
  sizeL,
  spacingS,
  spacingXS,
} from "../../assets/styles/constants/size";
import { CurrencyText } from "../text/CurrencyText";
import InputSkeleton from "./InputSkeleton";
import { Rag, RagIconType } from "../rag/Rag";
import fonts from "../../assets/styles/constants/fonts";
import { AutomationProps, getAutomationProps } from "../automationProps";
import { useKeyboardAwareInputFocus } from "../keyboard-aware";

export interface TextFieldInputProps extends AutomationProps {
  textInputInput: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  error: boolean;
  fetched: boolean;
  labelMandatory?: boolean;
  labelTooltip?: boolean;
  tooltipProps?: TooltipProps;
  defaultText?: string;
  helperText?: string;
  helperTextSecond?: string;
  linkButtonLink?: string;
  onButtonLinkPressed?: () => void;
  hideLinkButton?: boolean;
  labelLinkButton?: string;
  onLabelLinkPress?: () => void;
  leftContent?: ReactElement;
  rightContent?: ReactElement;
  multiline?: boolean;
  inputHeight?: number;
  enablePassword?: boolean;
  loading?: boolean;
  editable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  maxLength?: number;
  autoCorrect?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad"
    | "decimal-pad"
    | "visible-password"
    | "ascii-capable"
    | "numbers-and-punctuation"
    | "url"
    | "name-phone-pad"
    | "twitter"
    | "web-search";
  textstyle?: TextStyle;
  currencyTextStyle?: any;
  textBoxStyle?: any;
  inputTextWidthOverride?: string | number;
  autoFocus?: boolean;
  overrideInputStyle?: object;
  showStatus?: boolean;
  ragIconType?: RagIconType;
  ragSize?: "extralarge" | "large" | "medium" | "small";
  baseLineHeightIos?: number;
  containerStyle?: any;
  disableSelectionControl?: boolean;
  helperCheck?: boolean;
  truncateText?: boolean;
  maxChars?: number;
  /** Overrides the input box container styles (background, border, etc.) */
  inputContainerStyle?: ViewStyle;
  placeholderColor?: string;
  cursorColor?: string;
  textContentType?: TextInputProps["textContentType"];
}

/**
 * @property textInputInput - The value of the text input field. Represents the current value entered by the user.
 * @property onChange - A callback function triggered whenever the text input value changes. Receives the updated value as an argument.
 * @property placeholder - Optional placeholder text to be displayed inside the text input field when it is empty.
 * @property label - Optional label text to describe the text input field. Typically displayed above or beside the input field.
 * @property disabled - Optional flag to indicate whether the input should be disabled.
 * @property error - A flag indicating whether the input should reflect an error state. If `true`, an error style will be applied to the label, input border and helper text.
 * @property fetched - A flag indicating whether the input should reflect fetched state. If `true`, fetched styles will be applied.
 * @property labelMandatory - Optional flag to indicate whether the label should show a mandatory asterisk (*) sign to indicate that the field is required.
 * @property labelTooltip - Optional flag to indicate whether the label should have a tooltip to display some additional info.
 * @property tooltipProps - Props for TooltipComponent (text, showBottomsheet, onInfoIconPress, children). When showBottomsheet is true, info icon press skips the tooltip.
 * @property helperText - Optional helper text to provide additional information or instructions to the user about the input field or error message.
 * @property helperTextSecond - An optional second helper text displayed on a new line. This is specifically used for managing the maximum transfer limit.
 * @property linkButtonLink - Text used on the link button. Used if there is a link button attached to the component.
 * @property onButtonLinkPressed - Optional callback function that is triggered when the link button is pressed. Can be used to perform custom actions when the button is clicked.
 * @property hideLinkButton - Optional flag to hide the link button. When `true`, the link button will not be displayed in the component.
 * @property labelLinkButton - Optional link text displayed on the right side of the label row.
 * @property onLabelLinkPress - Optional callback triggered when the label link is pressed.
 * @property leftContent - Optional React element to be displayed on the left side of the text input (e. g. search icon).
 * @property rightContent - Optional React element to be displayed on the right side of the text input (e.g. calendar icon or chevron for dropdown)
 * @property multiline - Optional flag to enable using input as textarea (when true, textarea is enabled and height will be the same as the input content)
 * @property inputHeight - Optional. Used only when rendering a message box.
 * Requires the `multiline` prop to be set to `true` for this to take effect.
 * When `multiline` is true and `inputHeight` is provided, the height will be applied.
 * @property enablePassword - Optional flag to enable using input as password (Handled in PasswordInput component)
 * @property maxLength - Optional number to specify the maximum number of characters allowed in the input field.
 * @property autoCorrect - Optional boolean to enable or disable auto-correction.
 * @property autoCapitalize - Optional string to control automatic capitalization behavior. Can be one of `"none"`, `"sentences"`, `"words"`, or `"characters"`.
 * @property keyboardType - Optional string to control which keyboard layout to use. Can be values like `"default"`, `"email-address"`, `"numeric"`, `"phone-pad"`, etc.
 * @property textstyle -  Optional Style for the helper text Currency Text Component
 * @property currencyTextStyle -  Optional Style for the helper text Currency Text Component
 * @property onFocus -  Optional function if you want to handle outside the component access this props
 * @property onBlur -  Optional function if you want to handle outside the component access this props
 * @property textBoxStyle -  Optional Style for the Text Box
 * @property defaultText - use this props for disclaimer text only optional props
 * @property autoFocus - Optional boolean Whether the input should focus automatically when the component mounts
 * @property overrideInputStyle - use this props to change font style , font-family for TextInput
 * @property showStatus - use this props to set to true to show the check or uncheck email verified icon 
 * @property ragIconType- Icon to display of type RagIconType
 * @property ragSize -Sets the height and width of the component. Default is "medium" (Accepts "extralarge", "large", "medium", "small")
 * @property baseLineHeightIos - this is only for one case for amount input text we add this props for device specific fix
 * @property containerStyle – Use this property to adjust the spacing in the main container. You can either remove the gap or increase it for specific devices using this prop.
 * @property disableSelectionControl - By default it is true. If you do not want to use selection handling (i.e., you don’t want to call onSelectionChange and selection), then pass disableSelectionControl={false}
 * */

export const TextFieldInput: FC<TextFieldInputProps> = ({
  textInputInput,
  onChange,
  placeholder,
  label,
  error,
  disabled,
  fetched,
  defaultText,
  helperText,
  helperTextSecond,
  linkButtonLink,
  onButtonLinkPressed = () => {},
  hideLinkButton = true,
  labelLinkButton,
  onLabelLinkPress = () => {},
  leftContent,
  rightContent,
  labelMandatory,
  labelTooltip,
  tooltipProps,
  multiline = false,
  inputHeight,
  enablePassword = false,
  loading = false,
  editable = true,
  maxLength,
  autoCorrect = false,
  autoCapitalize = "none",
  keyboardType = "default",
  textstyle,
  currencyTextStyle,
  onBlur,
  onFocus,
  textBoxStyle,
  inputTextWidthOverride,
  autoFocus,
  overrideInputStyle,
  showStatus=false,
  ragIconType=RagIconType.error,
  ragSize="small",
  baseLineHeightIos,
  containerStyle,
  disableSelectionControl=true,
  helperCheck,
  truncateText,
  maxChars,
  inputContainerStyle,
  placeholderColor,
  cursorColor,
  textContentType,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const DEFAULT_MAX_CHARS= Platform.OS === "ios" ? 32 : 34;
  const [textInputState, setTextInputState] = useState("default");
  const [selection, setSelection] = useState<
    { start: number; end: number } | undefined
  >({ start: 0, end: 0 });
  const inputRef = useRef<TextInput | null>(null);
  const notifyKeyboardAwareFocus = useKeyboardAwareInputFocus();
  const handleInputChange = useCallback(
    (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange]
  );

  const effectiveStateType = useMemo(() => {
    if (disabled) return "disabled";
    if (error) return "error";
    if (fetched) return "fetched";
    if (textInputInput) return "filled";
    return textInputState;
  }, [disabled, error, fetched, textInputInput, textInputState]);

  const labelColor = useMemo(() => {
    if (error) {
      return "ragcolor3";
    }
    return "primarytextcolor";
  }, [disabled, error]);

  const stylesByState: Record<
    any,
    {
      borderColor?: any;
      backgroundColor: any;
      textColor: any;
      borderWidth: number;
    }
  > = useMemo(
    () => ({
      active: {
        borderColor: theme.primClr,
        backgroundColor: theme.primarycolor4,
        textColor: theme.primarycolor,
        borderWidth: 1,
      },
      filled: {
        borderColor: theme.primarygray,
        backgroundColor: theme.primarycolor4,
        textColor: theme.primarycolor,
        borderWidth: 1,
      },
      error: {
        borderColor: theme.strokecolor3tint,
        backgroundColor: theme.primarycolor4,
        textColor: theme.primarycolor,
        borderWidth: 1,
      },
      disabled: {
        borderColor: theme.primarygray,
        backgroundColor: theme.primarycolor2_10,
        textColor: theme.primarycolor2_70,
        borderWidth: 1,
      },
      fetched: {
        backgroundColor: theme.primarycolor2_10,
        textColor: theme.primarycolor,
        borderWidth: 0,
      },
      default: {
        borderColor: theme.primarygray,
        backgroundColor: theme.primarycolor4,
        textColor: theme.primarycolor2_60,
        borderWidth: 1,
      },
    }),
    [theme]
  );

  const { borderColor, backgroundColor, textColor, borderWidth } =
    stylesByState[effectiveStateType];

  // Compute font inputFontFamily based on state
  const fontFamily = useMemo(
    () =>
      textInputState === "filled" ||
      textInputState === "fetched" ||
      (textInputInput && textInputInput.length > 0)
        ? fonts.HSBC_Bold
        : fonts.HSBC,
    [textInputState, textInputInput]
  );

  const inputWidth = useMemo(() => {
     if (leftContent && rightContent) {
      return isRtl ? "90%" : "80%";
    } else if (leftContent) {
      return "85%";
    } else if (rightContent) {
      return isRtl ? "100%" : "95%";
    } else if (!hideLinkButton) {
      return "70%";
    } else {
      return "100%";
    }
  }, [leftContent, rightContent, hideLinkButton]);

  const truncate = (text?: string) => {
  if (!truncateText || !text) return text;
  const limit = maxChars ?? DEFAULT_MAX_CHARS;
  return text.length > limit ? text.slice(0, limit) + "…" : text;
   };

  const displayedText = useMemo(() => {
  return truncateText ? truncate(textInputInput) : textInputInput;
}, [textInputInput, truncateText, maxChars]);

  const displayedPlaceholder = useMemo(
  () => truncate(placeholder),
  [placeholder, truncateText, maxChars]
);

const hasHelperContentView = Boolean(defaultText || helperText || helperTextSecond);

  return (
    <SafeAreaView>
      {loading ? (
        <InputSkeleton label={Boolean(label)} />
      ) : (
        <View style={[styles.inputWrapper,containerStyle]}>
          {(label || labelLinkButton) && (
            <View style={styles.labelWrapper}>
              <View style={styles.labelLeft}>
                {label ? (
                  <View style={{ flexDirection: "row", flexShrink: 1 }}>
                    <Text size={fontMedium} numberOfLines={1} overrideStyles={{ ...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),}} variant={labelColor}>
                      {label}
                    </Text>

                    {labelMandatory && (
                      <Text size={fontMedium} variant="primarycolor3">
                        {` *`}
                      </Text>
                    )}
                  </View>
                ) : null}
                {labelTooltip && tooltipProps && (
                  <TooltipComponent
                    iconStyle={{
                      width: actuatedNormalize(16),
                      height: actuatedNormalize(16),
                    }}
                    tooltipStyle={{ marginTop: actuatedNormalize(2) }}
                    {...tooltipProps}
                  />
                )}
              </View>
              {labelLinkButton ? (
                <Button
                  variant="link"
                  size="small"
                  buttonText={{
                    children: labelLinkButton,
                    size: fontMedium,
                    variant: "primarycolor3",
                  }}
                  onButtonPress={onLabelLinkPress}
                  overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0,height: "auto",width: "auto" }}
                />
              ) : null}
            </View>
          )}
          <View
            style={{
              ...styles.input,
              height: multiline ? (inputHeight ? inputHeight : "auto") : sizeL,
              flexDirection: isRtl ? "row-reverse" : "row",
              ...(multiline && { alignItems: "flex-start" }),
              borderColor,
              backgroundColor,
              borderWidth,
              ...inputContainerStyle,
            }}
          >
            <View
              style={[
                {
                  display: "flex",
                  flexDirection: isRtl ? "row-reverse" : "row",
                  gap: spacingXS,
                  ...(!multiline && {alignItems:"center"}),
                  ...(multiline && { flex: 1, alignSelf: "stretch",}),
                },
                textBoxStyle,
              ]}
            >
              {leftContent}
              <TextInput
                ref={inputRef}
                style={fonts.withTrueBoldWeight({
                  color: textColor,
                  fontFamily:fontFamily,
                  width: (multiline ? "100%" : inputTextWidthOverride ?? inputWidth) as any,
                  fontSize: fontMediumLarge,
                  textAlign: isRtl ? "right" : "left",
                  ...(multiline
                    ? {
                        flex: inputHeight ? 1 : undefined,
                        textAlignVertical: "top",
                        paddingVertical: 0,
                      }
                    : {
                        height: "100%",
                        // lineHeight: lineHeightMediumLarge,
                      }),
                  ...(overrideInputStyle || {}),
                })}
                value={truncateText ? displayedText : textInputInput}
                onChangeText={handleInputChange}
                onFocus={() => {
                  setTextInputState("active");
                  notifyKeyboardAwareFocus?.(inputRef.current);
                  onFocus?.();
                }}
                onBlur={() => {
                  if (textInputInput) {
                    setTextInputState("filled");
                  }
                  notifyKeyboardAwareFocus?.(null);
                  onBlur?.();
                }}
                {...(!disableSelectionControl && {
                selection: selection,
                onSelectionChange: (event: any) => {
                setSelection(event.nativeEvent.selection);
                },
                })}
                cursorColor={cursorColor ??textColor}
                placeholder={truncateText ? displayedPlaceholder : placeholder}
                placeholderTextColor={placeholderColor ?? theme.primarycolor2_60}
                editable={!disabled && editable}
                underlineColorAndroid="transparent"
                secureTextEntry={enablePassword}
                multiline={multiline}
                maxLength={maxLength}
                autoCorrect={autoCorrect}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                textContentType={textContentType}
                pointerEvents={!disabled && editable ? "auto" : "none"}
                autoFocus={autoFocus}
                {...getAutomationProps(testID, accessibilityLabel, label ?? placeholder)}
              />
            </View>
            {!hideLinkButton && linkButtonLink?.length ? (
              <View style={styles.linkButton}>
                <Button
                  variant="link"
                  buttonText={{ children: linkButtonLink }}
                  onButtonPress={onButtonLinkPressed}
                  size="small"
                  linkIconRight={!isRtl}
                  linkIconLeft={isRtl}
                  overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0 }}
                />
              </View>
            ) : (
              <></>
            )}
            {showStatus ? (
  <View
    style={styles.rightInputContent}
  >
    <Rag type={ragIconType} size={ragSize}  />
  </View>
) : (
  rightContent && (
    <View
      style={isRtl ? styles.leftInputContent : styles.rightInputContent}
    >
      {rightContent}
    </View>
  )
)}
          </View>

          {hasHelperContentView && <View
            style={{
              alignSelf: helperCheck ? isRtl ? "flex-start" : "flex-end": "flex-start",
              alignItems: helperCheck ? isRtl ? "flex-start" : "flex-end": "flex-start",
            }}
          >
            {defaultText && (
              <Text size={fontMedium} variant="primarytextcolor" overrideStyles={{...(I18nManager.isRTL && { paddingBottom: actuatedNormalize(3) }),}}>
                {defaultText}
              </Text>
            )}
            {helperText && (
              <CurrencyText
                text={helperText}
                variant={error ? "ragcolor3": "primarytextcolor2"}
                size={fontSmall}
                textstyle={{ textAlign: "right", ...(textstyle ?? {}) }}
                currencyTextStyle={currencyTextStyle}
                baseLineHeightIos={baseLineHeightIos}
              />
            )}
            {helperTextSecond && (
              <CurrencyText
                text={helperTextSecond}
                variant={error ? "ragcolor3":"primarytextcolor2"}
                size={fontSmall}
                textstyle={{ textAlign: "right", ...(textstyle ?? {}) }}
                currencyTextStyle={currencyTextStyle}
                baseLineHeightIos={baseLineHeightIos}
              />
            )}
          </View>}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: spacingXS,
  },
  labelWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: spacingXS,
  },
  labelLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacingXS,
    minWidth: 0,
  },
  input: {
    //height: Size.sizeL,
    paddingHorizontal: spacingS,
    paddingVertical: actuatedNormalize(10),
    borderRadius: radiusS,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  leftInputContent: {
    position: "absolute",
    left: spacingS,
    zIndex: 1,
    elevation: 1,
  },
  rightInputContent: {
    position: "absolute",
    right: spacingS,
    zIndex: 1,
    elevation: 1,
  },
  linkButton: {
    alignSelf: "flex-end",
    maxWidth: "30%",
  },
});

import React, { ReactElement, useRef } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  I18nManager,
  Platform,
} from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { useKeyboardAwareInputFocus } from "../keyboard-aware";
import {
  fontSmallMedium,
  fontXXLG,
  lineHeightSmallMedium,
  lineHeightXXLG,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { SarFont } from "../sarFont/SarFont";
import { Text } from "../text/Text";
import { NewCurrency } from "../text/NewCurrency";
import { ChipsInfo } from "../chips/ChipsInfo";
import ChevronDown from "../icons/arrows/chevron/ChevronDown";
import Info from "../icons/status/Info";
import { AmountEntryTextSkeleton } from "./AmountEntryTextSkeleton";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface AmountEntryTextProps {
  amount? : string;
  onChangeValue?: (value: string) => void; // optional callback for handling changes
  showChipsInfoText?: boolean;
  chipsInfoTextLabel?: string;
  chipsInfoTextState?: "success" | "error" | "info" | "warning";
  showIcon?: boolean;
  onIconPress?: () => void;
  cursorColor?: string;
  loading?: boolean;
  showSarSymbol?: boolean;
  onBlur:any;
  onFocus:any;
  ref:any;
  maxLength:number;
  editable:boolean;
  testID:string;
  accessibilityLabel:string;
  placeholder?: string;
  /** Shows the currency selector above the amount */
  showCurrencySelector?: boolean;
  currencyLabel?: string;
  /** 24x24 currency artwork rendered at the start of the selector */
  currencyIcon?: ReactElement;
  /** Trailing icon of the selector; the batch-36 "switch" icon once it lands */
  currencySwitchIcon?: ReactElement;
  onCurrencyPress?: () => void;
  /** Helper text under the amount */
  helperText?: string;
  /** Trailing icon of the helper text, defaults to the info glyph */
  helperIcon?: ReactElement;
  /** Opens exchange-rate / helper info when the trailing helper icon is pressed */
  onHelperIconPress?: () => void;
}

/**
 * @property amount - Current amount value to be displayed in the input.
 * @property onChangeValue - Optional callback for passing the entered amount. It will be called everytime amount input is out of focus.
 * @property showChipsInfoText - Boolean for showing/hiding a label with icon (chips info text component) under the amount
 * @property chipsInfoTextLabel - Text to be displayed inside chips info text component
 * @property chipsInfoTextState - Changes the icon and needed stylings inside chips info text component
 * @property showIcon - Boolean to show/hide ChevronDown icon
 * @property onIconPress - Optional callback for handling chevron icon press event
 * @property cursorColor - Optional prop to change the cursor color.
 * @property loading - Whether to show a loading indicator.
 * @property showSarSymbol - Whether to display the SAR currency symbol beside the amount.
 * @property onBlur - Callback triggered when the input loses focus.
 * @property onFocus - Callback triggered when the input gains focus.
 * @property ref - Reference to the input field for external access.
 * @property maxLength - Maximum number of characters allowed in the input.
 * @property editable - Determines whether the input field is editable.
 * @property testID - Used for testing to identify the component.
 * @property accessibilityLabel - Accessibility label for screen readers.
 * @property [placeholder] - Placeholder text displayed when the input is empty.
 * @property showCurrencySelector - Boolean for showing the currency selector above the amount
 * @property currencyLabel - Label inside the currency selector, e.g. "Saudi Riyal"
 * @property currencyIcon - 24x24 currency artwork rendered at the start of the selector
 * @property currencySwitchIcon - Trailing icon of the selector (the batch-36 "switch" icon)
 * @property onCurrencyPress - Callback for pressing the currency selector
 * @property helperText - Helper text under the amount
 * @property helperIcon - Trailing icon of the helper text, defaults to the info glyph
 * @property onHelperIconPress - Callback when the helper trailing icon is pressed
 **/

export const AmountEntryText: React.FC<AmountEntryTextProps> = ({
  amount,
  onChangeValue,
  showChipsInfoText = false,
  chipsInfoTextLabel,
  chipsInfoTextState,
  showIcon = false,
  onIconPress,
  cursorColor = "",
  loading = false,
  showSarSymbol = true,
  ref,
  onFocus,
  onBlur,
  maxLength,
  placeholder,
  editable,
  testID,
  accessibilityLabel,
  showCurrencySelector = false,
  currencyLabel,
  currencyIcon,
  currencySwitchIcon,
  onCurrencyPress,
  helperText,
  helperIcon,
  onHelperIconPress,
}) => {
  
  const { theme } = useTheme();
  const notifyKeyboardAwareFocus = useKeyboardAwareInputFocus();
  const innerInputRef = useRef<TextInput | null>(null);

  const setInputRef = (node: TextInput | null) => {
    innerInputRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref && typeof ref === "object") {
      (ref as React.MutableRefObject<TextInput | null>).current = node;
    }
  };

  const amountPlaceholder = placeholder ? placeholder : "1.00";
  const amountFontStyle = fonts.withTrueBoldWeight({
    ...styles.amountFont,
    color: amount ? theme.primarytextcolor : theme.stylescolor7,
  });

  return loading ? (
    <View style={styles.container}>
      <AmountEntryTextSkeleton />
    </View>
  ) : (
    <View style={styles.container}>
      <View
        style={
          showCurrencySelector
            ? styles.currencyAmountGroup
            : styles.amountOnlyGroup
        }
      >
        {showCurrencySelector && (
          <TouchableOpacity
            style={[styles.currencySelector, { backgroundColor: theme.tintneutralshade }]}
            onPress={() => onCurrencyPress && onCurrencyPress()}
            disabled={!onCurrencyPress}
            accessibilityLabel={currencyLabel}
          >
            {currencyIcon}
            <Text size={fontSmallMedium} variant="primarytextcolor" overrideStyles={styles.currencyLabel}>
              {currencyLabel}
            </Text>
            {currencySwitchIcon}
          </TouchableOpacity>
        )}
        <View style={styles.amountWrapper}>
          {showIcon && (
            <TouchableOpacity onPress={() => onIconPress && onIconPress()}>
              <ChevronDown
                fill={theme.primarytextcolor}
                onPress={() => onIconPress && onIconPress()}
              />
            </TouchableOpacity>
          )}
          {showSarSymbol && (
            <SarFont
              size={fontXXLG}
              lineHeight={lineHeightXXLG}
              variant={
                amount  ? "primarytextcolor" : "stylescolor7"
              }
              overrideStyles={{ marginHorizontal: spacingXXXS }}
            />
          )}
          <View style={styles.inputSizer}>
            <View
              accessible={false}
              accessibilityElementsHidden
              importantForAccessibility="no-hide-descendants"
            >
              <Text
                bold
                size={fontXXLG}
                numberOfLines={1}
                overrideStyles={styles.inputSizerText}
              >
                {amount || amountPlaceholder}
              </Text>
            </View>
          <TextInput
            value={amount}
            ref={setInputRef}
            onChangeText={(text) => {
              let normalizedText = text;
              if (Platform.OS === "ios") {
                normalizedText = text.replace(',', '.');
              }
              onChangeValue?.(normalizedText);
            }}
            onBlur={() => {
              notifyKeyboardAwareFocus?.(null);
              onBlur?.();
            }}
            onFocus={() => {
              notifyKeyboardAwareFocus?.(innerInputRef.current);
              onFocus?.();
            }}
            keyboardType={"decimal-pad"}
            multiline={false}
            numberOfLines={1}
            style={[amountFontStyle, styles.textInput]}
            cursorColor={cursorColor || theme.primarycolor}
            placeholder={amountPlaceholder}
            placeholderTextColor={theme.stylescolor7}
            editable={editable}
            autoFocus={true}
            testID={testID}
            maxLength={maxLength}
            accessibilityLabel={accessibilityLabel}
            selectionColor={theme.primarycolor}
          />
          </View>
        </View>
      </View>
      {helperText && (
        <View style={styles.helperWrapper}>
          <NewCurrency
            text={helperText}
            size={fontSmallMedium}
            variant="primarytextcolor2"
            textstyle={styles.helperText}
          />
          <TouchableOpacity
            onPress={onHelperIconPress}
            disabled={!onHelperIconPress}
            accessibilityRole="button"
            hitSlop={{
              top: spacingXS,
              bottom: spacingXS,
              left: spacingXS,
              right: spacingXS,
            }}
          >
            {helperIcon ?? (
              <Info
                width={actuatedNormalize(16)}
                height={actuatedNormalize(16)}
                fill={theme.primarytextcolor2}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      {showChipsInfoText && (
        <View>
          <ChipsInfo
            type="textWithIcon"
            state={chipsInfoTextState}
            label={chipsInfoTextLabel}
            overrideLabelStyles={{
              color:
                chipsInfoTextState === "error"
                  ? theme.ragcolor3
                  : theme.primarytextcolor,
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: spacingXXS,
  },
  /** Figma Amount entry text (currencyExchange): wrapper gap 16 between selector and amount */
  currencyAmountGroup: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: spacingS,
  },
  amountOnlyGroup: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  amountWrapper: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse":"row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: spacingXS,
  },
  currencySelector: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    minWidth: actuatedNormalize(60),
    minHeight: actuatedNormalize(41),
    borderRadius: radiusS,
    padding: spacingXS,
    gap: spacingXS,
  },
  currencyLabel: {
    lineHeight: lineHeightSmallMedium,
  },
  helperWrapper: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingXXS,
  },
  helperText: {
    lineHeight: lineHeightSmallMedium,
  },
  amountFont: {
    fontSize: fontXXLG,
    lineHeight: lineHeightXXLG,
    fontFamily: fonts.HSBC_Bold,
  },
  inputSizer: {
    flexShrink: 1,
    justifyContent: "center",
  },
  inputSizerText: {
    lineHeight: lineHeightXXLG,
    opacity: 0,
    paddingHorizontal: 2,
  },
  textInput: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    padding: 0,
    textAlignVertical: "center",
  },
});

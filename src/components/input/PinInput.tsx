import React, { useState, useRef, FC, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  I18nManager,
} from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontWeightBold,
  radiusS,
  spacingXL,
  spacingXS,
} from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";
import { useKeyboardAwareInputFocus } from "../keyboard-aware";

interface PinInputProps extends AutomationProps {
  type: "pin" | "otp";
  onSubmit?: (values: string[]) => void;
  onChange?: (values: string[], currentIndex: number) => void;
  error?: boolean;
  loading?: boolean;
  enablePinInput?:boolean;
  clearOnError?: boolean;
  keyBoardOpen?: boolean;
  editable?: boolean;

}

/**
 * @property type: Determines if the cells should represent PIN (4 cells) or OTP code (6 cells)
 * @property onSubmit: Callback for getting all the inputs from cells, called when all cells are filled. It will be called with an array of strings but it can be changed to one joined string
 * please advise what will make development easier
 * @property onChange: Callback fired on each input field change (useful for handling negative cases)
 * @property error: Boolean for error state of the pin cells, border color will be changed to indicate the wrong pin/otp
 * @property clearOnError: Boolean that indicates the error state of the PIN/OTP cells. When enabled, this prop clears all entered OTP/PIN values
 * */

export const PinInput: FC<PinInputProps> = ({
  type = "pin",
  onSubmit,
  onChange,
  error = false,
  loading = false,
  enablePinInput,
  clearOnError,
  keyBoardOpen=false,
  editable=false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const notifyKeyboardAwareFocus = useKeyboardAwareInputFocus();
  const initialCells = Array(type === "pin" ? 4 : 6)
    .fill(null)
    .map(() => ({
      value: "",
      state: error ? "error" : "default",
    }));

  const [cells, setCells] = useState(initialCells);
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const stylesByState: Record<
    any,
    {
      borderColor?: any;
    }
  > = useMemo(
    () => ({
      default: {
        borderColor: theme.primarycolor2,
      },
      error: {
        borderColor: theme.strokecolor3tint,
      },
      filled: {
        borderColor: theme.primarycolor2_50,
      },
    }),
    [theme]
  );

  useEffect(() => {
    setCells(
      cells.map((cell) => ({
        value: cell.value,
        state: error ? "error" : "default",
      }))
    );
  }, [error]);

  useEffect(() => {
  setCells(
    Array(type === "pin" ? 4 : 6).fill({
      value: "",
      state: error ? "error" : "default",
    })
  );
}, [type]);

useEffect(() => {
  if (error && clearOnError) {
    setCells(
      Array(type === "pin" ? 4 : 6).fill({
        value: "",
        state: "error",
      })
    );

    // focus first input again
    // setTimeout(() => {
    //   inputsRef.current[0]?.focus();
    // }, 100);
  }
}, [error, clearOnError, type]);

  const handleChange = (text: string, index: number) => {
  const numericText = text.replace(/[^0-9]/g, "");

  // 🚀 CASE 1: iOS OTP AutoFill (full code pasted into one box)
  if (numericText.length > 1) {
    console.log("🔥 iOS OTP AutoFill Triggered:", numericText);
    const otpArray = numericText.slice(0, cells.length).split("");

    const updatedCells = cells.map((_, i) => ({
      value: otpArray[i] || "",
      state: otpArray[i] ? "filled" : "default",
    }));

    setCells(updatedCells);
    onChange && onChange(updatedCells.map(c => c.value), otpArray.length - 1);

    // Focus last filled cell
    const lastIndex = Math.min(otpArray.length, cells.length) - 1;
    handleFocus(lastIndex);

    // Auto submit if complete
    if (otpArray.length === cells.length) {
      onSubmit && onSubmit(otpArray);
    }
    return;
  }

  // ✍️ CASE 2: Normal single digit entry
  if (numericText.length === 1) {
    const updatedCells = [...cells];
    updatedCells[index] = { value: numericText, state: "filled" };
    setCells(updatedCells);

    onChange && onChange(updatedCells.map(c => c.value), index);

    if (index < cells.length - 1) {
      handleFocus(index + 1);
    }

    if (updatedCells.every(cell => cell.value !== "")) {
      onSubmit && onSubmit(updatedCells.map(cell => cell.value));
    }
  }

  // 🧹 CASE 3: Deletion
  if (numericText.length === 0) {
    const updatedCells = [...cells];
    updatedCells[index] = { value: "", state: "default" };
    setCells(updatedCells);
    onChange && onChange(updatedCells.map(c => c.value), index);
  }
};

  const handleBackspace = (index: number) => {
    const updatedCells = [...cells];

    // If the current cell has value, clear it
    if (cells[index].value !== "") {
      updatedCells[index] = { value: "", state: "default" };
      setCells(updatedCells);
      onChange && onChange(updatedCells.map((cell) => cell.value), index);
      return;
    }
    // Otherwise move to previous and clear
    if (index > 0) {
      updatedCells[index - 1] = { value: "", state: "default" };
      setCells(updatedCells);
      onChange && onChange(updatedCells.map((cell) => cell.value), index - 1);
      handleFocus(index - 1);
    }
  };

  useEffect(() => {
    if(keyBoardOpen){
    const timeout = setTimeout(() => {
    inputsRef.current[0]?.focus();
  }, 300);

  return () => clearTimeout(timeout);
    }else{
      Keyboard.dismiss();
    }
  
}, [keyBoardOpen]);

  const handleFocus = (index: number) => {
    inputsRef.current[index]?.focus();
  };

  const renderInputs = () => {
    return cells.map((cell, index) => (
      <View key={index} style={{ position: "relative" }}>
           <TextInput
            ref={(ref) => {
              inputsRef.current[index] = ref;
            }}
            value={cell.value}
            onChangeText={(text) => handleChange(text, index)}
            keyboardType="numeric"
            cursorColor={theme.primarycolor}
            style={fonts.withTrueBoldWeight({
              ...styles.cell,
              ...stylesByState[cell.state],
              backgroundColor: theme.primarycolor4,
               borderWidth:1,
              color: theme.primarycolor,
            })}
            onFocus={() => {
              notifyKeyboardAwareFocus?.(inputsRef.current[index] ?? null);
            }}
            onBlur={() => {
              notifyKeyboardAwareFocus?.(null);
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
            secureTextEntry={enablePinInput}
            maxLength={Platform.OS === "ios" ? cells.length : 1} // 👈 allow paste
            editable={editable}
            {...getNestedAutomationProps(
              { testID, accessibilityLabel },
              `cell-${index + 1}`,
              `cell-${index + 1}`
            )}
          />
           {loading && (
         <View
          style={[
            StyleSheet.absoluteFill,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <SkeletonBox shape="square" size="large" />
        </View>
      )}
        
      </View>
    ));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={styles.container}
        {...getAutomationProps(testID, accessibilityLabel, type)}
      >
        {renderInputs()}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row" ,
    alignItems: "center",
    gap: spacingXS,
  },
  cell: {
    width: actuatedNormalize(44),
    height: spacingXL,
    padding: spacingXS,
    textAlign: "center",
    fontFamily: fonts.HSBC_Bold,
    fontSize: fontMediumLarge,
    fontWeight: fontWeightBold,
    borderWidth: actuatedNormalize(2),
    borderRadius: radiusS,
  },
  default: {
    borderColor: "red",
  },
});

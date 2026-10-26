import React, { FC, useCallback, useState } from "react";
import { I18nManager, StyleSheet, TouchableOpacity, View } from "react-native";
import { TextFieldInput, TextFieldInputProps } from "./TextFieldInput";
import Search from "../icons/functionals/Search";
import { useTheme } from "../../context/theme/themeContext";
import Close from "../icons/arrows/outline/Close";
import Filter from "../icons/functionals/Filter";
import { spacingS, spacingXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { getNestedAutomationProps } from "../automationProps";

const SEARCH_ICON_SIZE = actuatedNormalize(16);
const TRAILING_ICON_SIZE = actuatedNormalize(24);

export interface SearchInputProps extends TextFieldInputProps {
  onSearchIconPress?: (text: string) => void;
  showFilterIcon?: boolean;
  onFilterIconPress?: () => void;
  onSearchTextChange?: (text: string) => void;
  initialValue?: string;
  useWhiteBackground?: boolean;
  iconColorLite?: string;
}

/*
 * @property onSearchIconPress - Optional callback for search icon press event
 * @property showFilterIcon - Boolean to show/hide filter icon
 * @property onFilterIconPress - Optional callback for filter icon press event
 * @property onSearchTextChange - Optional callback for search input change event
 * @property initialValue - Optional initial text to prefill the search field
 * @property useWhiteBackground - When true, the background uses the theme-aware primarywhite token (white in light, dark in dark) instead of the default grey
 */

export const SearchInput: FC<SearchInputProps> = ({
  onSearchIconPress,
  showFilterIcon,
  onFilterIconPress,
  onSearchTextChange,
  initialValue = "",
  useWhiteBackground = false,
  iconColorLite,
  ...props
}) => {
  const [searchText, setSearchText] = useState(initialValue);
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;

  const iconColor = props.disabled ? theme.primarycolor2_70 : theme.primarytextcolor;
  const closeIconColor = props.disabled ? theme.primarycolor2_70 : theme.primarycolor3;

  const handleTextChange = useCallback(
    (text: string) => {
      setSearchText(text);
      onSearchTextChange?.(text);
    },
    [onSearchTextChange]
  );

  const getTrailingIcon = () => {
    if (searchText.length > 0) {
      return (
        <TouchableOpacity
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          onPress={() => {
            setSearchText("");
            onSearchTextChange?.("");
            onSearchIconPress?.("");
          }}
          {...getNestedAutomationProps(props, "clear", "clear")}
        >
          <Close
            width={TRAILING_ICON_SIZE}
            height={TRAILING_ICON_SIZE}
            fill={iconColorLite ?? closeIconColor}
          />
        </TouchableOpacity>
      );
    }
    if (showFilterIcon) {
      return (
        <TouchableOpacity
          onPress={() => onFilterIconPress && onFilterIconPress()}
          {...getNestedAutomationProps(props, "filter", "filter")}
        >
          <Filter
            width={TRAILING_ICON_SIZE}
            height={TRAILING_ICON_SIZE}
            fill={iconColorLite ?? iconColor}
          />
        </TouchableOpacity>
      );
    }
  };

  const searchIcon = (
    <View style={isRtl ? styles.searchIconRtl : undefined}>
      <Search
        width={SEARCH_ICON_SIZE}
        height={SEARCH_ICON_SIZE}
        fill={iconColorLite ?? iconColor}
        onPress={() => onSearchIconPress && onSearchIconPress(searchText)}
      />
    </View>
  );

  const trailingIcon = getTrailingIcon();

  // LTR: search in-flow (leftContent), clear/filter absolute (rightContent) — unchanged.
  //
  // RTL: TextFieldInput's row-reverse + left/right swap double-flips icons. Instead:
  // - Keep search as leftContent and force flexDirection "row" so Yoga RTL places it
  //   on the right in-flow (same clearance for placeholder and typed text as LTR).
  // - Render clear/filter ourselves on the physical left (avoid absolute rightContent).
  const field = (
    <TextFieldInput
      {...props}
      onChange={handleTextChange}
      textInputInput={searchText}
      inputContainerStyle={{
        borderRadius: actuatedNormalize(36),
        backgroundColor: useWhiteBackground
          ? theme.whiteinvert
          : theme.primarygrayinvert,
        borderWidth: 0,
        ...props.inputContainerStyle,
        ...(isRtl ? { flexDirection: "row" as const } : null),
      }}
      textBoxStyle={{
        flex: 1,
        ...props.textBoxStyle,
        ...(isRtl ? { flexDirection: "row" as const } : null),
      }}
      leftContent={searchIcon}
      rightContent={isRtl ? undefined : trailingIcon}
      overrideInputStyle={{
        ...(isRtl && trailingIcon
          ? { paddingEnd: TRAILING_ICON_SIZE + spacingXS }
          : null),
        ...(props.overrideInputStyle as object | undefined),
      }}
    />
  );

  if (!isRtl) {
    return field;
  }

  return (
    <View>
      {field}
      {trailingIcon ? (
        <View style={styles.rtlTrailingIcon} pointerEvents="box-none">
          {trailingIcon}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchIconRtl: {
    transform: [{ scaleX: -1 }],
  },
  // `right` is swapped to physical left under I18nManager RTL — matches clear in LTR.
  rtlTrailingIcon: {
    position: "absolute",
    right: spacingS,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    zIndex: 1,
    elevation: 1,
  },
});

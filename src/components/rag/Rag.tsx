import { StyleSheet, View, Text as TextWrapper, Platform } from "react-native";
import { FC, ReactElement, useMemo } from "react";
import { Size } from "../../assets/styles";
import Info from "../icons/status/Info";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Success from "../icons/status/Success";
import Error from "../icons/status/Error";
import Warning from "../icons/status/Warning";
import { useTheme } from "../../context/theme/themeContext";
import { Spinner } from "../spinner/Spinner";
import {
  heightM,
  ragSizeMapping,
  spacingXXS,
} from "../../assets/styles/constants/size";
import Close from "../icons/status/Close";
import React from "react";
import Icon, { LocalIconProps } from "../icon/Icon";
import RAGFamilySuccess from "../icons/ragFamily/RAGFamilySuccess";
import RAGFamilyFailure from "../icons/ragFamily/RAGFamilyFailure";
import RAGFamilyWarning from "../icons/ragFamily/RAGFamilyWarning";
import RAGFamilyInfo from "../icons/ragFamily/RAGFamilyInfo";
import RAGFamilyRemove from "../icons/ragFamily/RAGFamilyRemove";
import RAGFamilyLoading from "../icons/ragFamily/RAGFamilyLoading";

import fonts from "../../assets/styles/constants/fonts";
export interface RagProps {
  type: RagIconType;
  shape?: 'default' | 'family';
  number?: number;
  showVerticalTrack?: boolean;
  size?: "extralarge" | "large" | "medium" | "small";
  onPress?: () => void;
  icon?: LocalIconProps;
  customIcon?: ReactElement;
  overrideStyles?: any;
  verticalOverrideStyle? :any;
  colorFill?: string;
  // Override the color of the digit and circle bg for RagIconType.number
  numberColor?: string;
  numberBgColor?: string;
}

export enum RagIconType {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info",
  icon = "icon",
  number = "number",
  empty = "empty",
  spinner = "spinner",
  loading = "loading",
  close = "close",
  delete = "delete"
}

/**
 * Rag component to display a circle with an icon or number
 * @property type - Icon to display of type RagIconType
 * @property number - Number to display inside RAG of icon type number
 * @property size - Sets the height and width of the component. Default is "medium" (Accepts "extralarge", "large", "medium", "small")
 * @property showVerticalTrack: Boolean that toggles appearance of vertical line at the bottom center (like in Tracker component)
 * @property onPress: Optional callback for RAG types that have onPress event
 * @property icon - Configure icon with LocalIconProps when type icon is used (example in Tracker component)
 * @property overrideStyles - overRideStyles use this props to align center and pass flex:1 accordinig to your requirment
 * @property verticalOverrideStyle - verticalOverrideStyle use this props pass flex:1 that will cover the tracker component
 * @property colorFill - use this props to change the icon color.
 * @property customIcon - use this props to change the icon color.
 * @returns
 */
export const Rag: FC<RagProps> = ({
  type,
  shape = 'default',
  number,
  showVerticalTrack = false,
  size = "medium",
  onPress,
  icon,
  customIcon,
  overrideStyles,
  verticalOverrideStyle,
  colorFill,
  numberColor,
  numberBgColor,
}) => {
  const { theme } = useTheme();
  const iconProps = {
    width: ragSizeMapping[size],
    height: ragSizeMapping[size],
  };

  const isFamilyIcon = useMemo(() => shape === 'family', [shape]);

  const getIcon = () => {
    switch (type) {
      case RagIconType.success:
        return isFamilyIcon ? <RAGFamilySuccess /> : <Success {...iconProps} />;
      case RagIconType.error:
        return isFamilyIcon ? <RAGFamilyFailure /> : <Error {...iconProps} fill={colorFill} />;
      case RagIconType.warning:
        return isFamilyIcon ? <RAGFamilyWarning /> : <Warning {...iconProps} />;
      case RagIconType.info:
        return isFamilyIcon ? <RAGFamilyInfo /> : <Info {...iconProps} />;
      case RagIconType.delete:
        return <RAGFamilyRemove />;
      case RagIconType.loading:
        return <RAGFamilyLoading />;
      case RagIconType.icon:
        if (customIcon) {
          return React.cloneElement(customIcon, { ...iconProps });
        }
      
        if (icon && !React.isValidElement(icon)) {
          const localIcon = icon as LocalIconProps;
          return <Icon type={localIcon.type} name={localIcon.name} {...iconProps} />;
        }
      
        return <Icon type="banking" name="mobile" {...iconProps} />;
      case RagIconType.close:
        return <Close {...iconProps} fill={colorFill} onPress={() => onPress && onPress()} />;
      case RagIconType.number:
        return (
          <View
            style={{
              ...styles.numberIcon,
              ...styles[size],
              backgroundColor: numberBgColor || theme.primarycolor,
            }}
          >
            <TextWrapper
              style={fonts.withTrueBoldWeight({
                color: numberColor || theme.primarytextcolor4,
                fontSize: ragSizeMapping[size] / 2,
              })}
            >
              {number}
            </TextWrapper>
          </View>
        );
      case RagIconType.empty:
        return (
          <View
            style={{
              ...styles.emptyIcon,
              ...styles[size],
              backgroundColor: theme.primarycolor2_10static,
              borderColor: theme.primarycolor2static,
            }}
          />
        );
      case RagIconType.spinner:
        return (
          <View
            style={{
              ...styles.spinnerIcon,
              ...styles[size],
              backgroundColor: theme.primarygray,
              borderColor: theme.primarycolor2static,
            }}
          >
            <Spinner
              color={theme.primarycolor4static}
              size={ragSizeMapping[size] - 8}
            />
          </View>
        );
      default:
        return <Info />;
    }
  };

  const getLineColor = () => {
    switch (type) {
      case RagIconType.success:
        return theme.secondarycolor10;
      case RagIconType.error:
        return theme.ragcolor3;
      case RagIconType.warning:
        return theme.infocolorwawrning;
      case RagIconType.info:
        return theme.ragneutral;
      case RagIconType.icon:
        return theme.primarycolor3;
      case RagIconType.number:
        return theme.primarytextcolor;
      case RagIconType.empty:
        return theme.primarycolor2static;
      case RagIconType.spinner:
        return theme.primarycolor2static;
      default:
        return theme.ragcolor6;
    }
  };

  return (
    <View style={[{alignItems:"center"},overrideStyles]}>
      {getIcon()}
      {showVerticalTrack && (
        <View
        style={[
          type === RagIconType.icon ? styles.verticalDashed : styles.vertical,
          { borderColor: getLineColor() },
          verticalOverrideStyle,   // ✅ Apply custom vertical styling
        ]}
        />
      )}
    </View>
  );
};

/*
 * Styles to use for RAG component
 */
const styles = StyleSheet.create({
  extralarge: {
    height: Size.ragSizeMapping.extralarge,
    width: Size.ragSizeMapping.extralarge,
  },
  large: {
    height: Size.ragSizeMapping.large,
    width: Size.ragSizeMapping.large,
  },
  medium: {
    height: Size.ragSizeMapping.medium,
    width: Size.ragSizeMapping.medium,
  },
  small: {
    height: Size.ragSizeMapping.small,
    width: Size.ragSizeMapping.small,
  },
  numberIcon: {
    borderWidth: 1,
    borderRadius: actuatedNormalize(50),
    height: heightM,
    width: actuatedNormalize(25),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyIcon: {
    borderWidth: actuatedNormalize(1),
    borderRadius: actuatedNormalize(50),
    marginBottom: spacingXXS,
  },
  spinnerIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacingXXS,
    borderRadius: actuatedNormalize(50),
    borderWidth: actuatedNormalize(1),
  },
  vertical: {
    borderLeftWidth: 2,
    height: actuatedNormalize(30),
    margin: "auto",
    marginTop: actuatedNormalize(-4),
  },
  verticalDashed: {
    borderWidth: 1,
    borderStyle: "dashed",
    width: 1,
    height: actuatedNormalize(30),
    margin: "auto",
    marginTop: actuatedNormalize(-3),
  },
});

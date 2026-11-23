import { FC, ReactElement, useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  I18nManager,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Rag, RagIconType } from "../rag/Rag";
import {
  fontLarge,
  fontSmall,
  fontWeightMedium,
  radiusS,
  spacing1XS,
  spacingS,
  spacingXS,
  spacingXXS,
  widthM,
} from "../../assets/styles/constants/size";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import Close from "../icons/arrows/outline/Close";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import i18n from "i18next";
import { LanguageCodes } from "../../localization/languages";
import { Avatar } from "../avatar/Avatar";
import ChevronLeft from "../icons/arrows/chevron/ChevronLeft";
import { Button, ButtonProps } from "../button/Button";
import SnackbarSkeleton from "./SnackbarSkeleton";
import fonts from "../../assets/styles/constants/fonts";
import { AutomationProps, getAutomationProps, getNestedAutomationProps } from "../automationProps";
export interface SnackbarProps extends AutomationProps {
  text: string | ReactElement;
  usage: "inline" | "toast";
  type?: "success" | "error" | "warning" | "info";
  actionAddon?: "close" | "chevron" | null;
  onActionPress?: () => void;
  /** Called whenever the toast is dismissed (auto-timeout, close action, or swipe-to-dismiss) */
  onDismiss?: () => void;
  headline?: string;
  imageUrl?: string;
  duration?: number;
  linkButton?: ButtonProps;
  linkButtonSecondary?: ButtonProps;
  overrideStyles?: any;
  loading?: boolean;
  closeIcon?: boolean;
}

/**
 * Snackbar component
 * @prop {string} text - Text to be displayed in the Snackbar
 * @prop {string} usage - Usage of the Snackbar. "inline" or "toast"
 * @prop {string} type - Type of the Snackbar. "success" | "error" | "warning" | "info"
 * @prop {string} actionAddon - Action addon to be displayed in the Snackbar. "close" | "chevron" | null
 * @prop {function} onActionPress - Function to be called when the action addon is pressed
 * @prop {function} onDismiss - Function to be called whenever the toast is dismissed (auto-timeout, close action, or swipe-to-dismiss)
 * @prop {string} headline - Headline to be displayed in the Snackbar
 * @prop {string} imageUrl - Image URL to be displayed in the Snackbar
 * @prop {number} duration - Duration of the Snackbar in milliseconds
 * @prop {ButtonProps} linkButton - Button to be displayed in the Snackbar
 * @prop {ButtonProps} linkButtonSecondary - Secondary button to be displayed in the Snackbar
 * @prop {any} overrideStyles - Override styles for the Snackbar
 * @prop {boolean} closeIcon - Whether to show the close icon(by default it is true)
 */
export const Snackbar: FC<SnackbarProps> = ({
  text,
  usage,
  type = "success",
  actionAddon = null,
  onActionPress = () => {},
  onDismiss = () => {},
  headline = "",
  imageUrl,
  duration = 5000,
  linkButton,
  linkButtonSecondary,
  overrideStyles,
  loading = false,
  closeIcon = true,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(usage === "inline");

  const isRtl =I18nManager.isRTL;
  const animation = useRef(new Animated.Value(usage === "inline" ? 1 : 0)).current;
  const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const isToast = useMemo(() => usage === "toast", [usage]);

  const slideInAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400, // Slide-in animation duration
      useNativeDriver: true,
    }).start();
  };

  const slideOutAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 400, // Slide-out animation duration
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onDismiss();
    });
  };

  const resetPan = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  };

  const dismissBySwipe = (toValue: { x: number; y: number }) => {
    Animated.timing(pan, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsVisible(false);
      onDismiss();
    });
  };

  const SWIPE_DISMISS_THRESHOLD = 60;
  const SWIPE_DISMISS_VELOCITY = 0.5;
  const SWIPE_OFFSCREEN_DISTANCE = 500;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_evt, gestureState) => {
        if (!isToast) {
          return false;
        }
        if (Platform.OS === "ios") {
          // Swipe up only
          const shouldSet =
            gestureState.dy < -10 && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
          if (shouldSet) {
            console.log("[Snackbar] iOS swipe gesture started", {
              dx: gestureState.dx,
              dy: gestureState.dy,
            });
          }
          return shouldSet;
        }
        // Android: swipe left or right only
        const shouldSet =
          Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
        if (shouldSet) {
          console.log("[Snackbar] Android swipe gesture started", {
            dx: gestureState.dx,
            dy: gestureState.dy,
          });
        }
        return shouldSet;
      },
      onPanResponderMove: (_evt, gestureState) => {
        if (Platform.OS === "ios") {
          if (gestureState.dy <= 0) {
            pan.setValue({ x: 0, y: gestureState.dy });
          }
        } else {
          pan.setValue({ x: gestureState.dx, y: 0 });
        }
      },
      onPanResponderRelease: (_evt, gestureState) => {
        if (Platform.OS === "ios") {
          if (
            gestureState.dy < -SWIPE_DISMISS_THRESHOLD ||
            gestureState.vy < -SWIPE_DISMISS_VELOCITY
          ) {
            console.log("[Snackbar] iOS swipe dismissed", {
              dy: gestureState.dy,
              vy: gestureState.vy,
            });
            dismissBySwipe({ x: 0, y: -SWIPE_OFFSCREEN_DISTANCE });
          } else {
            console.log("[Snackbar] iOS swipe cancelled", {
              dy: gestureState.dy,
              vy: gestureState.vy,
            });
            resetPan();
          }
        } else {
          if (
            Math.abs(gestureState.dx) > SWIPE_DISMISS_THRESHOLD ||
            Math.abs(gestureState.vx) > SWIPE_DISMISS_VELOCITY
          ) {
            console.log("[Snackbar] Android swipe dismissed", {
              dx: gestureState.dx,
              vx: gestureState.vx,
            });
            dismissBySwipe({
              x: gestureState.dx > 0 ? SWIPE_OFFSCREEN_DISTANCE : -SWIPE_OFFSCREEN_DISTANCE,
              y: 0,
            });
          } else {
            console.log("[Snackbar] Android swipe cancelled", {
              dx: gestureState.dx,
              vx: gestureState.vx,
            });
            resetPan();
          }
        }
      },
      onPanResponderTerminate: () => {
        console.log("[Snackbar] swipe gesture terminated");
        resetPan();
      },
    })
  ).current;

  useEffect(() => {
    if (isToast) {
      setIsVisible(true);
    }
  }, [isToast]);

  useEffect(() => {
    if (isVisible && isToast) {
      pan.setValue({ x: 0, y: 0 });
      slideInAnimation();

      const timer = setTimeout(() => {
        slideOutAnimation();
      }, duration);

      return () => clearTimeout(timer); // Clear timeout on unmount
    }
  }, [isVisible, animation, duration]);

  const handleClose = () => {
    onActionPress();
    slideOutAnimation();
  };

  const styles = StyleSheet.create({
    mainContainer: {
      borderWidth: 1,
      borderRadius: radiusS,
      paddingHorizontal: spacingS,
      paddingVertical: spacing1XS,
      width: actuatedNormalize(343),
    },
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: headline ? "flex-start" : "center",
      gap: spacingS,
    },
    textContainer: {
      // width: imageUrl
      //   ? actuatedNormalize(232 - widthM)
      //   : actuatedNormalize(232),
      flex:1,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      flexDirection: "column",
      gap: spacingXXS,
    },
    success: {
      borderColor: theme.greentint,
      backgroundColor: theme.tintstaticgreen,
    },
    error: {
      borderColor: theme.strokecolor3tint,
      backgroundColor: theme.tintstaticred,
    },
    warning: {
      borderColor: theme.ambertint,
      backgroundColor: theme.tintstaticamber,
    },
    info: {
      borderColor: theme.ragneutral,
      backgroundColor: theme.tintstaticneutral,
    },
    linkButtonsContainer: {
      marginTop: spacingXS,
      display: "flex",
      flexDirection: isRtl ? "row-reverse" : "row",
      gap: spacingXS,
    },
    headline: {
      fontFamily: fonts.HSBC_Bold,
    },
  });

  const linkButtonStyles = StyleSheet.create({
    success: {
      backgroundColor: theme.secondarycolor10,
    },
    error: {
      backgroundColor: theme.ragcolor3,
    },
    warning: {
      backgroundColor: theme.ragamber,
    },
    info: {
      backgroundColor: theme.ragneutral,
    },
  });

  const toastStyle: Animated.WithAnimatedObject<ViewStyle> = {
    position: "absolute",
    top: actuatedNormalize(54),
    alignSelf: "center",
    zIndex: 9999,
    elevation: 9999,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-50, 0],
        }),
      },
      { translateX: pan.x },
      { translateY: pan.y },
    ],
  };

  return loading ? (
    <SnackbarSkeleton isToast={usage === "toast"} />
  ) : isVisible ? (
    <Animated.View
      {...(isToast ? panResponder.panHandlers : {})}
      style={[
        styles.mainContainer,
        styles[type],
        isToast ? toastStyle : {},
        overrideStyles,
      ]}
      {...getAutomationProps(testID, accessibilityLabel, headline || (typeof text === "string" ? text : undefined))}
    >
      <View style={styles.container}>
        <View>
          {imageUrl ? (
            <Avatar img={imageUrl} />
          ) : (
            <Rag type={RagIconType[type as RagIconType]} />
          )}
        </View>
        <View style={styles.textContainer}>
          {headline && (
            <Text overrideStyles={styles.headline} size={fontLarge} variant="primarycolorstatic">
              {headline}
            </Text>
          )}
          {
            typeof text === "string" ? (<Text size={fontSmall} variant="primarycolorstatic">
              {text}
            </Text>): (text)
          }
          
          {linkButton && (
            <View style={styles.linkButtonsContainer}>
              <Button
                {...linkButton}
                variant="fill"
                size="small"
                color="primary"
                overrideStyles={linkButtonStyles[type]}
                testID={linkButton.testID ?? (testID ? `${testID}-primary-action` : undefined)}
                accessibilityLabel={
                  linkButton.accessibilityLabel ??
                  (accessibilityLabel ? `${accessibilityLabel}-primary-action` : undefined)
                }
              />
              {linkButtonSecondary && (
                <Button
                  {...linkButtonSecondary}
                  variant="outlined"
                  size="small"
                  overrideStyles={{
                    borderColor: theme.primarycolorstatic,
                  }}
                  buttonText={{
                    ...linkButtonSecondary.buttonText,
                    variant: "primarycolorstatic",
                  }}
                  testID={linkButtonSecondary.testID ?? (testID ? `${testID}-secondary-action` : undefined)}
                  accessibilityLabel={
                    linkButtonSecondary.accessibilityLabel ??
                    (accessibilityLabel ? `${accessibilityLabel}-secondary-action` : undefined)
                  }
                />
              )}
            </View>
          )}
        </View>
        {actionAddon && (
          <View>
            {actionAddon === "close" && closeIcon ? (
              <TouchableOpacity
                onPress={handleClose}
                {...getNestedAutomationProps(
                  { testID, accessibilityLabel },
                  "close",
                  "close"
                )}
              >
                <Close fill={theme.primarycolorstatic} width={16} height={16} />
              </TouchableOpacity>
            ) : actionAddon === "close" && !closeIcon ? null : (
              <TouchableOpacity
                onPress={onActionPress}
                {...getNestedAutomationProps(
                  { testID, accessibilityLabel },
                  "action",
                  "action"
                )}
              >
                {isRtl ? (
                  <ChevronLeft fill={theme.primarycolorstatic} />
                ) : (
                  <ChevronRight fill={theme.primarycolorstatic} />
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </Animated.View>
  ) : null;
};
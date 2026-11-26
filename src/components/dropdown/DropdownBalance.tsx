import React, {
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  I18nManager,
  Dimensions,
  Platform,
  Easing,
} from "react-native";
import { DropdownScreenMenuItem } from "./DropdownScreenMenuItem";
import { DropdownMenuItemProps } from "./DropdownMenuItem";
import { useTheme } from "../../context/theme/themeContext";
import { radiusS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { BlurView } from "@react-native-community/blur";

type DropdownPosition = {
  x: number;
  y: number;
  width: number;
};

export interface DropdownBalanceProps {
  items: DropdownMenuItemProps[];
  onItemPress: (item: string | number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  trigger: ReactElement;
  width?: number;
  overrideStyles?: any;
  dropdownPosition?: DropdownPosition;
}

export const DropdownBalance: React.FC<DropdownBalanceProps> = ({
  items,
  onItemPress,
  isOpen,
  setIsOpen,
  trigger,
  overrideStyles,
  width = 228,
  dropdownPosition,
}) => {
  const { theme, isDarkTheme } = useTheme();
  const [blurReady, setBlurReady] = useState(Platform.OS === "ios");
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState(
    dropdownPosition || { x: 0, y: 0, width: 0 },
  );
  const dropdownAnimation = useRef(new Animated.Value(0)).current;
  const backdropAnimation = useRef(new Animated.Value(0)).current;
  const isRTL = useMemo(() => I18nManager.isRTL, []);
  const screenWidth = Dimensions.get("window").width;
  const dropdownWidth = actuatedNormalize(width);
  const checkcolorIOS = isDarkTheme ? "dark" : "light";
  const checkcolorAndroid = isDarkTheme ? "light" : "xlight";
  const checkcolor = Platform.OS === "ios" ? checkcolorIOS : checkcolorAndroid;
  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: dropdownWidth,
      // backgroundColor: theme.primaryinvert,
      borderRadius: actuatedNormalize(12),
      ...(Platform.OS === "android" && { overflow: "hidden" }),
    },
    shadowWrapper: {
      shadowColor: theme.primarycolorstatic,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
      borderRadius: radiusS,
    },
    listContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: radiusS,
      flex: 1,
      // backgroundColor: theme.stylesblockbg,
      overflow: "hidden",
    },
    itemContainer: {
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: theme.primarywhite,
    },
    lastItemContainer: {
      borderBottomWidth: 0,
    },
  });

  const handleItemPress = (val: string | number) => {
    onItemPress(val);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      dropdownAnimation.setValue(0);
      backdropAnimation.setValue(0);

      Animated.parallel([
        Animated.timing(dropdownAnimation, {
          toValue: 1,
          duration: 600, // half of 1000
          easing: Easing.bezier(0.22, 1, 0.36, 1),
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnimation, {
          toValue: 1,
          duration: 550, // half of 900
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    }

    if (isOpen && Platform.OS === "android") {
      setBlurReady(false);

      // ensures modal is fully mounted
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBlurReady(true);
        });
      });
    }

    if (!isOpen) {
      setBlurReady(Platform.OS === "ios"); // reset for next open
    }
  }, [isOpen, dropdownAnimation, backdropAnimation]);

  useEffect(() => {
    if (triggerRef.current && isOpen) {
      triggerRef.current.measureInWindow((x, y, width, height) => {
        const triggerX = x;
        const triggerY = y + height;

        let correctedX = triggerX;

        // If pop-up goes beyond RIGHT edge → shift left
        if (correctedX + dropdownWidth > screenWidth - 10) {
          correctedX = screenWidth - dropdownWidth - 10;
        }

        // If pop-up goes beyond LEFT edge → shift right
        if (correctedX < 10) {
          correctedX = 10;
        }

        setPosition({
          x: correctedX,
          y: triggerY,
          width,
        });
      });
    }
  }, [isOpen]);

  const Content = (
    <View style={styles.listContainer}>
      {/*
        ScrollView instead of FlatList: device Storybook wraps the canvas in a
        ScrollView, and Modal still inherits that context, which makes nested
        VirtualizedList log a console error.
      */}
      <ScrollView
        bounces={false}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
      >
        {items.map((item, index) => (
          <View
            key={`${String(item.value)}-${index}`}
            style={
              index === items.length - 1
                ? styles.lastItemContainer
                : styles.itemContainer
            }
          >
            <DropdownScreenMenuItem {...item} onPress={handleItemPress} />
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsOpen(true)}>
        <View ref={triggerRef}>{trigger}</View>
      </TouchableWithoutFeedback>

      {isOpen && (
        <Modal
          transparent={true}
          visible={isOpen}
          animationType="none"
          onRequestClose={() => setIsOpen(false)}
        >
          {/* BACKGROUND CLICK + BLUR */}
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <Animated.View
              style={[StyleSheet.absoluteFill, { opacity: backdropAnimation }]}
            >
               {/* Blur Background */}
              {blurReady ? (
                <BlurView
                  style={StyleSheet.absoluteFill}
                  blurType="light"
                  blurAmount={5}
                />
              ) : (
                <View
                  style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: "transparent" },
                  ]}
                />
              )}
            </Animated.View>
          </TouchableWithoutFeedback>

          {/* DROPDOWN CONTAINER ABOVE BLUR */}
          <Animated.View
            pointerEvents="box-none"
            style={[
              {
                position: "absolute",
                top: position.y + actuatedNormalize(40),
                left: isRTL
                  ? position.x + actuatedNormalize(40)
                  : position.x - actuatedNormalize(40),
                right: isRTL ? position.x : undefined,
                width: dropdownWidth,
                borderRadius: actuatedNormalize(12),
              },
              {
                opacity: dropdownAnimation,
                transform: [
                  // Slight upward offset so menu "unfolds" downward from trigger
                  {
                    translateY: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-4, 0],
                    }),
                  },
                  // Horizontal scale for width expansion
                  {
                    scaleX: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.9, 1],
                    }),
                  },
                  // Vertical scale — more pronounced to mimic WhatsApp unfold
                  {
                    scaleY: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.82, 1],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={[styles.container, overrideStyles]}>
              <View style={styles.shadowWrapper}>
                {blurReady ? (
                  <BlurView
                    blurType={checkcolor}
                    style={{...(Platform.OS === "ios" && styles.container)}}
                    blurAmount={30}
                  >
                    {Content}
                  </BlurView>
                ) : (
                  <View
                    style={[
                      styles.container,
                      { backgroundColor: theme.stylesblockbg },
                    ]}
                  >
                    {Content}
                  </View>
                )}
              </View>
            </View>
          </Animated.View>
        </Modal>
      )}
    </View>
  );
};
import React, { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View, Text, TouchableWithoutFeedback, I18nManager } from 'react-native';
import { DropdownScreenMenuItem } from './DropdownScreenMenuItem';
import { DropdownMenuItemProps } from './DropdownMenuItem';
import { useTheme } from "../../context/theme/themeContext";
import { radiusS } from '../../assets/styles/constants/size';
import { actuatedNormalize, isTab } from '../../assets/styles/utils/pixelScaling';

type DropdownPosition = {
  x: number;
  y: number;
  width: number;
}

export interface DropdownScreenProps {
  items: DropdownMenuItemProps[];
  onItemPress: (item: string | number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  trigger: ReactElement;
  width?: number;
  overrideStyles?: any;
  dropdownPosition?: DropdownPosition; // use to set the custom position on the screen level if default position is not working fine
}

export const DropdownScreen: React.FC<DropdownScreenProps> = ({
  items,
  onItemPress,
  isOpen,
  setIsOpen,
  trigger,
  overrideStyles,
  width = 228,
  dropdownPosition,
}) => {
  const { theme } = useTheme();
  const triggerRef = useRef<View>(null);
  const [position, setPosition] = useState(dropdownPosition || { x: 0, y: 0, width: 0 });
  const isRTL = useMemo(() => I18nManager.isRTL, []);

  const dropdownWidth = actuatedNormalize(width);

  const styles = StyleSheet.create({
    container: {
      position: "absolute",
      width: dropdownWidth,
      backgroundColor: theme.primaryinvert,
      borderRadius: actuatedNormalize(12),
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
      backgroundColor: theme.stylesblockbg,
      overflow: "hidden",
    },
    itemContainer: {
      width: "100%",
      borderBottomWidth: 1,
      borderBottomColor: theme.strokeBorderColor,
    },
    lastItemContainer: {
      borderBottomWidth: 0,
    }
  });

  const handleItemPress = (val: string | number) => {
    onItemPress(val);
    setIsOpen(false);
  };

  useEffect(() => {
    if (!dropdownPosition) {
      if (triggerRef.current && isOpen) {
        triggerRef.current.measureInWindow((x, y, width, height) => {
          const newPosition = {
            x: actuatedNormalize(x),
            y: actuatedNormalize(y - height),
            width: actuatedNormalize(width)
          };

          setPosition(newPosition);
        });
      }
    }
  }, [isOpen, dropdownPosition]);

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => setIsOpen(true)}>
        <View ref={triggerRef}>
          {trigger}
        </View>
      </TouchableWithoutFeedback>

      {isOpen && (
        <Modal transparent={true} visible={isOpen} animationType='none' onRequestClose={() => setIsOpen(false)}>
          <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
            <View style={StyleSheet.absoluteFill}>
              <View style={[styles.container, {
                  bottom: position.y,
                  ...(!isRTL ? {
                    left: position.x + position.width / 2 - dropdownWidth
                  } :
                  {
                    right: position.x + position.width / 2
                  }),
                  width: dropdownWidth, ...overrideStyles
               }]}>
                <View style={styles.shadowWrapper}>
                <View  style={styles.listContainer}>
                {/*
                  ScrollView instead of FlatList: device Storybook wraps the
                  canvas in a ScrollView, and Modal still inherits that context,
                  which makes nested VirtualizedList log a console error.
                */}
                <ScrollView
                  bounces={false}
                  nestedScrollEnabled
                  keyboardShouldPersistTaps="handled"
                >
                  {items.map((item, index) => (
                    <View
                      key={`${String(item.value)}-${index}`}
                      style={index === items.length - 1 ? styles.lastItemContainer : styles.itemContainer}
                    >
                      <DropdownScreenMenuItem {...item} onPress={handleItemPress} />
                    </View>
                  ))}
                </ScrollView>
                </View>
                </View>
                

              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};
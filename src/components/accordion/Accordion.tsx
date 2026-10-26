import { StyleSheet,TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode, useState } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { spacingS, spacing1XS, radiusS, fontSmallMedium, spacingXS } from "../../assets/styles/constants/size";
import { AccordionSkeleton } from "./AccordionSkeleton";
import { ListItem, ListItemActionType, ListItemProps } from "../list/ListItem";
import { Divider } from "../divider/Divider";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import DocumentEdit from "../icons/functionals/DocumentEdit";
import { Checkbox, CheckboxProps } from "../checkbox/Checkbox";
import { getAutomationProps, getNestedAutomationProps } from "../automationProps";

export interface AccordionProps extends Partial<ListItemProps> {
  text: string;
  items?: ReactNode;
  overrideStyles?: any;
  overrideItemsStyles?: any;
  loading?: boolean;
  defaultOpen?: boolean;
  isOpen?: boolean; // controlled mode
  showDivider?: boolean;
  showEdit?: boolean;
  editLabel?: string;
  showCheckbox?: boolean;
  checkboxProps?: CheckboxProps;
  onEditPress?: () => void;
  handleActionPress?: () => void;
}

/**
 * @property text - Main text for the accordion
 * @property items - content of the accordion, can be any React element
 * @property overrideStyles - Overrides styles of accordion wrapper
 * @property overrideItemStyles - Overrides styles of accordion content
 * @property showDivider - Whether to show a divider for the list item. Default is false. Use this prop only if you want to show a divider for the accordion, not for the ListItem itself.
 * @property defaultOpen - If true, the accordion will be expanded by default when rendered.
 **/

/**
 * Accordion component supports both controlled and uncontrolled usage.
 * - Use `isOpen` + `handleActionPress` for controlled mode (e.g. in list).
 * - Use `defaultOpen` for uncontrolled (standalone).
 */

export const Accordion: FC<AccordionProps> = ({
  text,
  items,
  overrideStyles,
  overrideItemsStyles,
  loading = false,
  defaultOpen = false,
  isOpen: controlledOpen, // <- controlled value
  showDivider = false,
  showEdit = false,
  showCheckbox = false,
 checkboxProps,
  editLabel = "Edit Section",
  onEditPress,
  handleActionPress,
  ...props
}) => {
  const { theme } = useTheme();

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = typeof controlledOpen === "boolean";
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const handleToggle = () => {
    if (handleActionPress) {
      handleActionPress();
    } else {
      setInternalOpen((prev) => !prev);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      width: "100%",
    },
    itemsContainer: {
      marginTop: spacingS,
      width: "100%",
    },
    editOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      marginTop: actuatedNormalize(24),
    },
    titleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      width: "100%",
    },
  });

  return loading ? (
    <AccordionSkeleton />
  ) : (
    <View
      style={[styles.container, overrideStyles]}
      {...getAutomationProps(props.testID, props.accessibilityLabel, text)}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "column",
        }}
        >
          <View style={styles.titleWrapper}>
            {showCheckbox && checkboxProps && (
              <Checkbox
                {...checkboxProps}
                overrideStyles={{ padding: 0 }}
                testID={checkboxProps.testID ?? (props.testID ? `${props.testID}-checkbox` : undefined)}
                accessibilityLabel={
                  checkboxProps.accessibilityLabel ??
                  (props.accessibilityLabel ? `${props.accessibilityLabel}-checkbox` : "checkbox")
                }
              />
            )}
            {showCheckbox ? (
              <View style={{ flex: 1, minWidth: 0 }}>
                {/* @ts-ignore */}
                <ListItem
                  label={{ children: text, medium: true, numberOfLines: 1 }}
                  actionType={ListItemActionType.chevron}
                  handleAction={handleToggle}
                  overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0, }}
                  showBackground={false}
                  showDivider={false}
                  isOpen={isOpen}
                  chevronUp
                  testID={props.testID ? `${props.testID}-toggle` : undefined}
                  accessibilityLabel={
                    props.accessibilityLabel ? `${props.accessibilityLabel}-toggle` : text
                  }
                  {...props}
                />
              </View>
            ) : (
              <>
                {/* @ts-ignore */}
                <ListItem
                  label={{ children: text, medium: true, numberOfLines: 1 }}
                  actionType={ListItemActionType.chevron}
                  handleAction={handleToggle}
                  overrideStyles={{ paddingHorizontal: 0, paddingVertical: 0, }}
                  showBackground={false}
                  showDivider={false}
                  isOpen={isOpen}
                  chevronUp
                  addonBodyWrapperStyle={{flex: 1.5}}
                  actionBadgeStyle={{flex: 0.5}}
                  testID={props.testID ? `${props.testID}-toggle` : undefined}
                  accessibilityLabel={
                    props.accessibilityLabel ? `${props.accessibilityLabel}-toggle` : text
                  }
                  {...props}
                />
              </>
            )}
          </View>  
        
      </View>
      {showDivider && (
        <Divider overrideStyles={{ marginTop: actuatedNormalize(16) }} />
      )}
     
      {isOpen && (
        <View style={[styles.itemsContainer, overrideItemsStyles]}>
          {items}
        </View>
        )}
        {isOpen && showEdit && (
          <TouchableOpacity
            onPress={onEditPress}
            style={styles.editOptionContainer}
            {...getNestedAutomationProps(props, "edit", editLabel)}
          >
            <DocumentEdit fill={theme.primarycolor3} />
            <Text variant="primarycolor3" size={fontSmallMedium}>{editLabel}</Text>

          </TouchableOpacity>
          )}
        </View>
  );
};

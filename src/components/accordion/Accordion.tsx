import { StyleSheet,TouchableOpacity, View } from "react-native";
import React, { FC, ReactNode, useState } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { spacingS, spacingM, spacing1XS, radiusS, fontSmallMedium, spacingXS } from "../../assets/styles/constants/size";
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
      alignItems: "stretch",
      paddingVertical: spacing1XS,
      paddingHorizontal: spacingS,
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS,
      // Fill the parent (story frame is already capped at the 343 content width).
      // A fixed 343dp width overflows once the canvas is narrower than that.
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      // Figma open state: 24dp bottom padding below the content / edit action.
      ...(isOpen ? { paddingBottom: spacingM } : null),
    },
    itemsContainer: {
      // Header row bottom padding (12) before the content block.
      marginTop: spacing1XS,
      width: "100%",
      minWidth: 0,
    },
    editOptionContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacingXS,
      // Figma: 16dp gap between detail list and the 48dp tertiary "Edit Section" button.
      marginTop: spacingS,
      height: actuatedNormalize(48),
    },
    titleWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
      width: "100%",
      minWidth: 0,
    },
    checkboxSlot: {
      flexGrow: 0,
      flexShrink: 0,
    },
    // Title takes the leftover width and wraps. Chevron stays in this slot's
    // trailing edge (ListItem action is flexShrink: 0).
    titleSlot: {
      flex: 1,
      flexShrink: 1,
      minWidth: 0,
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
              <View style={styles.checkboxSlot}>
                <Checkbox
                  {...checkboxProps}
                  overrideStyles={{ padding: 0 }}
                  testID={checkboxProps.testID ?? (props.testID ? `${props.testID}-checkbox` : undefined)}
                  accessibilityLabel={
                    checkboxProps.accessibilityLabel ??
                    (props.accessibilityLabel ? `${props.accessibilityLabel}-checkbox` : "checkbox")
                  }
                />
              </View>
            )}
            <View style={styles.titleSlot}>
              {/* @ts-ignore */}
              <ListItem
                {...props}
                label={{ children: text, medium: true, fill: true }}
                actionType={ListItemActionType.chevron}
                handleAction={handleToggle}
                overrideStyles={{
                  paddingHorizontal: 0,
                  paddingVertical: 0,
                  width: "100%",
                  maxWidth: "100%",
                  minWidth: 0,
                  flex: 1,
                  alignSelf: "stretch",
                }}
                showBackground={false}
                showDivider={false}
                isOpen={isOpen}
                chevronUp
                actionBadgeStyle={{ flexGrow: 0, flexShrink: 0 }}
                testID={props.testID ? `${props.testID}-toggle` : undefined}
                accessibilityLabel={
                  props.accessibilityLabel ? `${props.accessibilityLabel}-toggle` : text
                }
              />
            </View>
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

import { useCallback, useRef, useState, type ReactElement } from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import { DropdownScreen } from "../../src/components/dropdown/DropdownScreen";
import Icon from "../../src/components/icon/Icon";
import {
  MOBILE_FRAME_WIDTH,
  mobileFrameDecorators,
} from "../../.storybook/mobileContentFrame";
import { useTheme } from "../../src/context/theme/themeContext";
import { actuatedNormalize } from "../../src/assets/styles/utils/pixelScaling";

export default {
  decorators: mobileFrameDecorators,
  title: "Components/Data Display/Dropdown/Dropdown",
  component: DropdownScreen,
};

const menuIcon: ReactElement = <Icon type="functionals" name="menu" />;
const DROPDOWN_WIDTH = 228;

const InteractiveTemplate = (args: any) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [webOverrideStyles, setWebOverrideStyles] = useState<
    Record<string, number | null> | undefined
  >(undefined);
  const triggerWrapRef = useRef<View>(null);
  const menuWidth = args.width ?? DROPDOWN_WIDTH;

  const handlePress = (value: any) => {
    console.log("DropdownMenuItem pressed", value);
  };

  /**
   * Web Storybook only: pin the Modal menu under the trigger via overrideStyles.
   * Mobile keeps the component's own measure/`bottom` positioning unchanged.
   */
  const handleSetIsOpen = useCallback(
    (open: boolean) => {
      if (!open) {
        setIsOpen(false);
        setWebOverrideStyles(undefined);
        return;
      }

      if (Platform.OS !== "web") {
        setIsOpen(true);
        return;
      }

      triggerWrapRef.current?.measureInWindow((x, y, width, height) => {
        const dropdownWidth = actuatedNormalize(menuWidth);
        const screenWidth = Dimensions.get("window").width;
        const pad = actuatedNormalize(8);
        const left = Math.max(
          pad,
          Math.min(
            x + width - dropdownWidth,
            screenWidth - dropdownWidth - pad,
          ),
        );
        setWebOverrideStyles({
          top: y + height + actuatedNormalize(4),
          left,
          bottom: null,
          right: null,
        });
        setIsOpen(true);
      });
    },
    [menuWidth],
  );

  return (
    <View
      style={{
        width: MOBILE_FRAME_WIDTH,
        maxWidth: "100%",
        minHeight: actuatedNormalize(640),
        paddingTop: actuatedNormalize(24),
        paddingHorizontal: actuatedNormalize(16),
        paddingBottom: actuatedNormalize(32),
        justifyContent: "flex-start",
        alignItems: "flex-end",
        backgroundColor: theme.primaryinvert,
      }}
    >
      <View ref={triggerWrapRef} collapsable={false}>
        <DropdownScreen
          {...args}
          isOpen={isOpen}
          setIsOpen={handleSetIsOpen}
          onItemPress={handlePress}
          overrideStyles={
            Platform.OS === "web" ? webOverrideStyles : undefined
          }
          trigger={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: actuatedNormalize(8),
                paddingHorizontal: actuatedNormalize(12),
              }}
            >
              <Icon
                type="functionals"
                name="menu"
                fill={theme.primarytextcolor}
              />
              <Text
                style={{
                  color: theme.primarytextcolor,
                  marginLeft: actuatedNormalize(8),
                }}
              >
                More
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export const WithIcons = {
  render: InteractiveTemplate,
  args: {
    items: [
      { label: "Label", value: "label 1", icon: menuIcon },
      { label: "Label", value: "label 2", icon: menuIcon },
    ],
  },
};

export const NoIcons = {
  render: InteractiveTemplate,
  args: {
    items: [
      { label: "Label", value: "label 1" },
      { label: "Label", value: "label 2" },
    ],
  },
};

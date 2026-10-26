import React, { FC, ReactElement } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { spacingXS } from "../../assets/styles/constants/size";
import { ListItem, ListItemProps } from "../list/ListItem";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import CategoryListSkeleton from "./CategoryListSkeleton";

interface CategoryListWidgetProps {
  listItemProps: ListItemProps;
  progressIndicatorPercentage: number;
  addonBackgroundColor: string;
  addonIcon?: ReactElement;
  progressIndicatorColor: string;
  showProgressIndicator?: boolean;
  loading?: boolean;
}

/**
 * @property lisItemProps - Props to configure list item. Check example in storybook for default configuration
 * @property progressIndicatorPercentage - Percentage of progress indicator to be filled
 * @property addonBackgroundColor - sets a BG color for icon - choose color according to the color of the icon
 * @property addonIcon - SVG icon to be displayed as addon
 * @property progressIndicatorColor - Color of the filled portion of progress indicator - choose same color as the addon icon color
 * @property showProgressIndicator - Controls whether the progress indicator is rendered. Defaults to true
 */

export const CategoryList: FC<CategoryListWidgetProps> = ({
  listItemProps,
  progressIndicatorPercentage,
  addonBackgroundColor,
  addonIcon,
  progressIndicatorColor,
  showProgressIndicator = true,
  loading = false,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
    },
    itemAddon: {
      display: "flex",
      width: actuatedNormalize(48),
      height: actuatedNormalize(48),
      borderRadius: actuatedNormalize(24),
      backgroundColor: addonBackgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    listItemWrapper: {
      paddingVertical: spacingXS,
      paddingHorizontal: 0,
    },
  });

  return loading ? (
    <CategoryListSkeleton />
  ) : (
    <View style={styles.container}>
      <ListItem
        addOn={addonIcon ? <View style={styles.itemAddon}>{addonIcon}</View> : undefined}
        overrideStyles={styles.listItemWrapper}
        {...listItemProps}
        showDivider={false}
      />
      {showProgressIndicator && (
        <ProgressIndicator
          progress={progressIndicatorPercentage}
          containerColor={theme.stylescolor7}
          progressColor={progressIndicatorColor}
        />
      )}
    </View>
  );
};

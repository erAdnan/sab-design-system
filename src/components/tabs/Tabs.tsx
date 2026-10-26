import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Tab, TabProps } from "./Tab";
import { spacingXS, widthM, widthXl } from "../../assets/styles/constants/size";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { AutomationProps } from "../automationProps";

export interface TabsProps extends AutomationProps {
    items: TabProps[];
    active?: number | string | null;
    onTabPress: (id: number) => void;
    activeSubTab?: number | string | null;
    onSubTabPress?: (id: number | null) => void;
    loading?: boolean;
    overrideStyle?: any;
}

/**
 * Tabs Component
 * @property items: Array of TabProps to be displayed as tabs
 * @property active: ID of the active tab
 * @property onTabPress: Event handler for tab press
 * @property activeSubTab: ID of the active sub tab, if any
 * @property onSubTabPress: Event handler for sub tab press, if any
 * @property loading: Boolean to show/hide loading state
 */
export const Tabs: FC<TabsProps> = ({
    items,
    active = null,
    activeSubTab = null,
    onTabPress,
    onSubTabPress = () => { },
    loading = false,
    overrideStyle,
    testID,
    accessibilityLabel,
}) => {
    const handlePress = (id: number) => {
        onTabPress(id);
        onSubTabPress(null);
    };

    const handleSubTabPress = (id: number) => {
        onSubTabPress(id);
    };

    const subItems = items.find((item) => item.id === active)?.subItems ?? [];

    return loading ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.container}>
                {items.map((item, index) => (
                    <SkeletonBox shape="square" size="large" key={index} overrideStyles={{ width: actuatedNormalize(80) }} />
                ))}
            </View>
        </ScrollView>
    ) : (
        <View>
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.tabScroller}
            >
                <View style={[styles.container,overrideStyle]}>
                    {items.map((item, index) => (
                        <Tab
                            {...item}
                            setActive={handlePress}
                            key={index}
                            isActive={active === item.id}
                            testID={item.testID ?? (testID ? `${testID}-${item.id}` : undefined)}
                            accessibilityLabel={item.accessibilityLabel ?? (accessibilityLabel ? `${accessibilityLabel}-${item.id}` : item.label)}
                        />
                    ))}
                </View>
            </ScrollView>
            {subItems.length > 0 ? (
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={styles.tabScroller}
                >
                <View style={[styles.container, styles.subTabsContainer]}>
                    {subItems.map((subItem, index) => (
                        <Tab
                            {...subItem}
                            setActive={handleSubTabPress}
                            key={index}
                            isActive={activeSubTab === subItem.id}
                            testID={subItem.testID ?? (testID ? `${testID}-sub-${subItem.id}` : undefined)}
                            accessibilityLabel={subItem.accessibilityLabel ?? (accessibilityLabel ? `${accessibilityLabel}-sub-${subItem.id}` : subItem.label)}
                        />
                    ))}
                </View>
            </ScrollView>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    tabScroller: {
        flexGrow: 0,
        flexShrink: 0,
    },
    container: {
        flexDirection: "row",
        gap: spacingXS,
        marginBottom: spacingXS,
    },
    subTabsContainer: {
        marginTop: spacingXS,
    }
});

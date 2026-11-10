import { Animated, FlatList, useWindowDimensions, View } from "react-native";
import {
  BalanceModule,
  BalanceModuleExtendedProps,
} from "../src/components/balanceModule/BalanceModule";
import { useCallback, useRef, useState } from "react";
import { NavigationDots } from "../src/components/navigationDots/NavigationDots";
import { spacingM } from "../src/assets/styles/constants/size";
import { QuickActionButtonPattern } from "../src/components/button/QuickActionButtonPattern";
import MyAccounts from "../src/components/icons/banking/MyAccounts";
import { useTheme } from "../src/context/theme/themeContext";
import Graph from "../src/components/icons/banking/Graph";
import Card from "../src/components/icons/banking/Card";
import VirtualCard from "../src/components/icons/banking/VirtualCard";
import More from "../src/components/icons/functionals/More";
import { DropdownScreen } from "../src/components/dropdown/DropdownScreen";
import Icon from "../src/components/icon/Icon";

export default {
  title: "Components/BalanceModule",
  component: BalanceModule,
  argTypes: {},
  args: {
    title: "Main Account",
    balance: 23130,
    loading: false,
  },
};

export const Default = {
  args: {
    isMainAccount: true,
  },
};

const InteractiveTemplate = () => {
  const { isDarkTheme, theme } = useTheme();
  const items: BalanceModuleExtendedProps[] = [
    {
      key: "1",
      title: "Savings Account 1",
      balance: 23130,
      currency: "sar",
    },
    {
      key: "2",
      title: "Savings Account 2",
      balance: 32910,
      currency: "sar",
    },
    {
      key: "3",
      title: "Savings Account 3",
      balance: 15210,
      currency: "sar",
    },
    {
      key: "4",
      title: "Savings Account 4",
      balance: 3130,
      currency: "sar",
    },
    {
      key: "5",
      title: "Savings Account 5",
      balance: 130,
      currency: "sar",
    },
  ];

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const keyExtractor = useCallback(
    (item: BalanceModuleExtendedProps) => item.key,
    []
  );

  const [currentItem, setCurrentItem] = useState(1);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ item?: BalanceModuleExtendedProps }> }) => {
      const next = viewableItems[0]?.item?.key ?? viewableItems[1]?.item?.key;
      if (next != null) {
        setCurrentItem(parseInt(String(next), 10));
      }
    }
  ).current;

  const renderItem = useCallback(
    ({ item }: { item: BalanceModuleExtendedProps }) => {
      const { key: _listKey, ...balanceProps } = item;
      return (
        <View style={{ width: width - 32 }}>
          <BalanceModule {...balanceProps} />
        </View>
      );
    },
    [width]
  );

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        pagingEnabled
        horizontal
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        decelerationRate={-100000000000000}
        scrollEventThrottle={16}
      />
      <View style={{ marginTop: spacingM }}>
        <NavigationDots
          numberOfDots={items.length}
          activeDotIndex={currentItem}
        />
      </View>
      <View style={{ marginTop: spacingM }}>
        <QuickActionButtonPattern
          type={4}
          quickActionButton1={{
            type: "vertical",
            text: "Account Info",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <MyAccounts
                fill={
                  isDarkTheme
                    ? theme.primarycolor4static
                    : theme.primarycolor3static
                }
              />
            ),
          }}
          quickActionButton2={{
            type: "vertical",
            text: "Virtual Card",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <VirtualCard
                fill={
                  isDarkTheme
                    ? theme.primarycolor4static
                    : theme.primarycolor3static
                }
              />
            ),
          }}
          quickActionButton3={{
            type: "vertical",
            text: "History",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <Card
                fill={
                  isDarkTheme
                    ? theme.primarycolor4static
                    : theme.primarycolor3static
                }
              />
            ),
          }}
          quickActionButton4={{
            type: "vertical",
            text: "Insights",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <Graph
                fill={
                  isDarkTheme
                    ? theme.primarycolor4static
                    : theme.primarycolor3static
                }
              />
            ),
          }}
        />
      </View>
    </View>
  );
};

export const Interactive = {
  render: InteractiveTemplate,
};


const InteractiveWithDropdownTemplate = (args: any) => {
  const { isDarkTheme, theme } = useTheme();
  const [hiddenBalances, setHiddenBalances] = useState<{ [key: string]: boolean }>({});

  const toggleHideAmount = (key: string) => {
    setHiddenBalances(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const items: BalanceModuleExtendedProps[] = [
    {
      key: "1",
      title: "Current **6234",
      balance: 6234,
      currency: "sar",
    },
    {
      key: "2",
      title: "Current **6235",
      balance: 32910,
      currency: "sar",
    },
    {
      key: "3",
      title: "Current **6236",
      balance: 15210,
      currency: "sar",
    },
    {
      key: "4",
      title: "Current **6237",
      balance: 3130,
      currency: "sar",
    },
    {
      key: "5",
      title: "Current **6238",
      balance: 130,
      currency: "sar",
    },
  ];

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const keyExtractor = useCallback(
    (item: BalanceModuleExtendedProps) => item.key,
    []
  );

  const [currentItem, setCurrentItem] = useState(1);
  // FlatList forbids swapping onViewableItemsChanged after mount — keep a stable ref.
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ item?: BalanceModuleExtendedProps }> }) => {
      const next = viewableItems[0]?.item?.key ?? viewableItems[1]?.item?.key;
      if (next != null) {
        setCurrentItem(parseInt(String(next), 10));
      }
    }
  ).current;

  const renderItem = useCallback(
    ({ item }: { item: BalanceModuleExtendedProps }) => {
      const { key, ...balanceProps } = item;
      return (
        <View style={{ width: width - 32 }}>
          <BalanceModule
            {...balanceProps}
            loading={args.loading}
            hideBalance={hiddenBalances[key]}
            hideAmountOnPress={() => toggleHideAmount(key)}
          />
        </View>
      );
    },
    [args.loading, hiddenBalances, width]
  );

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownItems = [
    { label: "All Accounts", value: "all accounts", icon: <Icon type="functionals" name="arrange"></Icon>  },
    { label: "E-statement", value: "e-statement", icon: <Icon type="banking" name="statement"></Icon>  },
    { label: "Account Visibility", value: "account visibility", icon: <Icon type="banking" name="account_actions"></Icon> },
    { label: "Open New Account", value: "open new account", icon: <Icon type="banking" name="account_add"></Icon>  },
  ];

  // Get the value of the clicked dropdown item
  const handlePress = (value: any) => {
    console.log("DropdownMenuItem clicked", value);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FlatList
        data={items}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        pagingEnabled
        horizontal
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        scrollEventThrottle={16}
      />
      {!args.loading && <View style={{ marginTop: spacingM }}>
        <NavigationDots
          numberOfDots={items.length}
          activeDotIndex={currentItem}
        />
      </View>}
      <View style={{ marginTop: spacingM }}>
        <QuickActionButtonPattern
          type={4}
          quickActionButton1={{
            type: "vertical",
            text: "Transfer",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <Icon
                fill={isDarkTheme
                  ? theme.primarycolor4static
                  : theme.primarycolor3static} type={"banking"} name={"quick_transfer"}/>
            ),
          }}
          quickActionButton2={{
            type: "vertical",
            text: "Insights",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <Graph
                fill={
                  isDarkTheme
                    ? theme.primarycolor4static
                    : theme.primarycolor3static
                }
              />
            ),
          }}
          quickActionButton3={{
            type: "vertical",
            text: "Details",
            onButtonPress: () => {
              console.log("Button Pressed");
            },
            icon: (
              <Icon
                fill={isDarkTheme
                  ? theme.primarycolor4static
                  : theme.primarycolor3static} type={"banking"} name={"account_info"}/>
            ),
          }}
          quickActionButton4={{
            type: "vertical",
            text: "More",
            onButtonPress: () => {
              console.log("Button Pressed");
              setDropdownOpen(true);
            },
            icon: (
              <DropdownScreen
                items={dropdownItems}
                onItemPress={handlePress}
                isOpen={dropdownOpen}
                setIsOpen={setDropdownOpen}
               //example for custom position: dropdownPosition={{ x: 220, y: 280, width: 228}}
                trigger={
                  <More
                    fill={
                      isDarkTheme
                        ? theme.primarycolor4static
                        : theme.primarycolor3static
                    }
                  />}
              />
            ),
          }}
          loading={args.loading}
        />
      </View>
    </View>
  );
};

export const InteractiveWithDropdown = {
  render: (args: any) => <InteractiveWithDropdownTemplate {...args} />,
  args: {
    loading: false
  }
};

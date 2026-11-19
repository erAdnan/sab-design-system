import * as allStories from "./NewBalanceModule.stories";
import { createAllVariantsStory } from "../../.storybook/allVariants";
import Bolt from "../../src/components/icons/filled/Bolt";
import { ListItemBadgeType } from "../../src/components/list/ListItem";
import { IcsabCashback as IcsabCashbackComponent, IcsabCashbackProps } from "../../src/components/newBalanceModule/IcsabCashback";
import { FCAndLifeGoals as FCAndLifeGoalsComponent, FCAndLifeGoalsProps } from "../../src/components/newBalanceModule/FCAndLifeGoals";
import Home from "../../src/components/icons/sab360/Home";
import { PFM as PFMComponent } from "../../src/components/newBalanceModule/PFM";
import type { LineChartDataPoint } from "../../src/components/graphs/line-chart";
import { Animated, FlatList, useWindowDimensions, View } from "react-native";
import { useCallback, useRef, useState } from "react";
import { NavigationDots } from "../../src/components/navigationDots/NavigationDots";
import { fontMediumLarge, spacingL } from "../../src/assets/styles/constants/size";
import { mobileContentDecorators } from "../../.storybook/mobileContentFrame";

export default {
  decorators: mobileContentDecorators,
  title: "Components/Cards & Accounts & Finance/NewBalanceModule",
  components: [IcsabCashbackComponent, FCAndLifeGoalsComponent, PFMComponent]
};

export const IcsabCashback = {
  render: (args: IcsabCashbackProps) => <IcsabCashbackComponent {...args} />,
  args: {
    pictogramIcon: <Bolt />,
    mainLabel: 'Available points',
    points: "6,234.00",
    progressPercentage: 45,
    loading: false,
    listItem: {
      title: { children: "Label", size: fontMediumLarge },
      badgeType: ListItemBadgeType.numberWithText,
      badgeText: "Pts",
      badgeNumber: "1234.90",
    }
  }
};

export const FCAndLifeGoals = {
  render: (args: FCAndLifeGoalsProps) => <FCAndLifeGoalsComponent {...args} />,
  args: {
    pictogramIcon: <Home />,
    mainLabel: 'Summer Holidays',
    secondaryLabel: 'Total Amount Saved',
    amount: '6,234.00',
    text: { text: 'Ends on 30 December, 2025', variant: 'primarytextcolor2' },
    spentLabel: 'Spent',
    spentAmount: '500.00',
    targetAmount: '800.00',
    targetLabel: 'Target',
    progressPercentage: '80',
    isActive: true,
    argTypes: {
      isActive: { action: "Active", control: 'boolean' }
    }
  }
};

const pfmChartData: LineChartDataPoint[] = [
  { date: "2026-02-01T00:00:00", dateView: "1", amount: 120, currency: "SAR" },
  { date: "2026-02-06T00:00:00", dateView: "6", amount: 280, currency: "SAR" },
  { date: "2026-02-11T00:00:00", dateView: "11", amount: 190, currency: "SAR" },
  { date: "2026-02-16T00:00:00", dateView: "16", amount: 350, currency: "SAR" },
  { date: "2026-02-21T00:00:00", dateView: "21", amount: 410, currency: "SAR" },
  { date: "2026-02-26T00:00:00", dateView: "26", amount: 80, currency: "SAR" },
  { date: "2026-02-30T00:00:00", dateView: "30", amount: 270, currency: "SAR" },
];

const PFMInteractiveTemplate = (args: any) => {
  const items: any[] = [
    {
      key: "1",
      mainLabel: 'All Accounts',
      totalSpentLabel: 'Total Spent',
      amount: '6,234.00',
      periodLabel: 'May 2025',
      chartData: pfmChartData,
    },
    {
      key: "2",
      mainLabel: 'Main Account',
      totalSpentLabel: 'Total Spent',
      amount: '1,234.00',
      periodLabel: 'May 2025',
      chartData: pfmChartData,
    },
    {
      key: "3",
      mainLabel: 'New Account',
      totalSpentLabel: 'Total Spent',
      amount: '2,234.00',
      periodLabel: 'May 2025',
      chartData: pfmChartData,
    },
    {
      key: "4",
      mainLabel: 'Personal Loan',
      totalSpentLabel: 'Total Spent',
      amount: '12,234.00',
      periodLabel: 'May 2025',
      chartData: pfmChartData,
    },
  ];

  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const keyExtractor = useCallback(
    (item: any) => item.key,
    []
  );

  const [currentItem, setCurrentItem] = useState(1);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: Array<{ item?: { key?: string } }> }) => {
      const next = viewableItems[0]?.item?.key ?? viewableItems[1]?.item?.key;
      if (next != null) {
        setCurrentItem(parseInt(String(next), 10));
      }
    }
  ).current;

  const renderItem = useCallback(
    ({ item }: { item: any }) => {
      return (
        <View style={{ width: width - 32 }}>
          <PFMComponent {...item} loading={args.loading} />
        </View>
      );
    },
    [args]
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
      {!args.loading && <View style={{ marginTop: -spacingL }}>
        <NavigationDots
          numberOfDots={items.length}
          activeDotIndex={currentItem}
        />
      </View>}
    </View>
  );
};

export const PFM = {
  render: (args: any) => <PFMInteractiveTemplate {...args} />,
  args: {
    loading: false
  }
  // args: {
  //   mainLabel: 'All Accounts',
  //   totalSpentLabel: 'Total Spent',
  //   amount: '6,234.00',
  //   periodLabel: 'May 2025',
  // }
}

export const AllVariants = createAllVariantsStory(allStories, [
    "IcsabCashback",
    "FCAndLifeGoals",
    "PFM",
]);

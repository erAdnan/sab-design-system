import React, { FC } from "react";
import { ListItem, ListItemProps } from "./ListItem";
import { View } from "react-native";

interface ListProps {
  items: ListItemProps[];
}

export const List: FC<ListProps> = ({ items }) => {
  return (
    <View>
      {items.map((item, index) => (
        <ListItem {...item} key={index} />
      ))}
    </View>
  );
};

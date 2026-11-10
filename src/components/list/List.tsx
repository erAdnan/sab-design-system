import React, { FC } from "react";
import { ListItem, ListItemProps } from "./ListItem";
import { View } from "react-native";

interface ListProps {
  items: ListItemProps[];
}

export const List: FC<ListProps> = ({ items }) => {
  return (
    <View style={{ width: "100%", maxWidth: "100%", minWidth: 0, alignSelf: "stretch" }}>
      {items.map((item, index) => (
        <ListItem {...item} key={index} />
      ))}
    </View>
  );
};

import React, { FC } from 'react'
import { Filter, FilterTagProps } from "../tags/Filter";
import { StyleSheet, View } from "react-native";
import { fontMedium, spacingXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";

interface FilterTagsInputProps {
  label: string;
  filterTags: FilterTagProps[]
}

export const FilterTagsInput: FC<FilterTagsInputProps> = ({
  label,
  filterTags
}) => {
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXS,
      alignItems: 'flex-start'
    },
    tags: {
      display: 'flex',
      flexDirection: 'row',
      gap: spacingXS,
      flexWrap: 'wrap'
    }
  });
  return (
    <View style={styles.container}>
      <Text size={fontMedium}>{label}</Text>
      <View style={styles.tags}>
        {filterTags.map((tag, key) => <Filter {...tag} key={key} />)}
      </View>
    </View>
  )
}

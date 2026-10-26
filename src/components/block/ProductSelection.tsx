import React from 'react'
import { useTheme } from "../../context/theme/themeContext";
import { I18nManager, StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontMediumLarge, fontSmall, fontWeightBold, fontWeightMedium, lineHeightMediumLarge, lineHeightSmall, radiusS, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { SarFont } from "../sarFont/SarFont";
import { NewCurrency } from '../text/NewCurrency';

interface ProductSelectionProps {
  title: string;
  subtitle?: string;
  value: string;
  details?: string;
  selected?: boolean;
  showDetails?: boolean;
  currency?: string;
}

export const ProductSelection: React.FC<ProductSelectionProps> = ({
  title,
  subtitle,
  value,
  details,
  selected = false,
  showDetails = false,
  currency,
}) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      width: "100%",
      padding: spacingS,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusS
    },
    content: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXS, 
    },
    selected: {
      backgroundColor: theme.ragneutraltint,
      borderWidth:1,
      borderColor: theme.ragneutral,
    },
    textWrapper: {
      display: "flex",
      flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
      gap: spacingXXS,
      alignItems:"center",
      justifyContent: "flex-end"
    }
  })
  return (
    <View style={selected ? [styles.container, styles.selected] : styles.container}>
      <View style={[styles.content,{ flexShrink: 1, flexGrow: 1, maxWidth: "65%", alignItems:"flex-start" }]}>
        <NewCurrency  size={fontMediumLarge} variant={selected ? "primarytextcolor" : "primarytextcolor"} text={title} textstyle={{textAlign:"left"}} />
        {subtitle && <Text size={fontSmall} variant={selected ? "primarytextcolor2" : "primarytextcolor2"}>{subtitle}</Text>}
      </View>
      <View style={[styles.content,{ flexShrink: 0 }]}>
        <View style={styles.textWrapper}>
          <SarFont size={fontMediumLarge} variant={selected ? "primarytextcolor" : "primarytextcolor"}/>
            <Text size={fontMediumLarge} overrideStyles={{lineHeight:lineHeightMediumLarge}} variant={selected ? "primarytextcolor" : "primarytextcolor"}  bold>{value}</Text>
        </View>
        {showDetails && <View style={styles.textWrapper}>
           {!currency && <SarFont lineHeight={lineHeightSmall} size={fontSmall} variant={selected ? "primarytextcolor" : "primarytextcolor2"}/>}
          <Text size={fontSmall} variant={"primarytextcolor2"}>{details}</Text>
          {currency && <Text size={fontSmall} variant={"primarytextcolor2"}>{currency}</Text>}
        </View>}    
      </View>
    </View>
  )
}

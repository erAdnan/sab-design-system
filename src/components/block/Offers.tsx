import React from 'react'
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import Offer from "../icons/filled/Offer";
import Voucher from "../icons/filled/Voucher";
import { Text } from "../text/Text";
import { fontMediumLarge, fontSmall, fontWeightMedium, fontXSmall, fontXXSmall, lineHeightMediumLarge, lineHeightSmall, lineHeightXSmall, lineHeightXXSmall } from "../../assets/styles/constants/size";
import ChevronRight from "../icons/arrows/chevron/ChevronRight";
import fonts from "../../assets/styles/constants/fonts";

interface BlockOffersProps {
  category: string;
  title: string;
  type: 'discount' | 'cashback';
  showAction?: boolean;
  onActionPress?: () => void;
  validity?: string;
  validityLabel?: string;
}

export const BlockOffers: React.FC<BlockOffersProps> = ({
  category = 'Category',
  title = 'Title',
  type = 'discount',
  showAction = false,
  onActionPress,
  validity = '',
  validityLabel = 'Valid until'
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      width: actuatedNormalize(343),
      padding: actuatedNormalize(16),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      borderRadius: actuatedNormalize(8),
    },
    cashback: { backgroundColor: theme.ragcolor15tintstatic },
    discount: { backgroundColor: theme.ragneutraltint },
    leftContent: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: actuatedNormalize(8),
    },
    textWrapper: {
      display: 'flex',
      flexDirection: 'column',
      // gap: actuatedNormalize(4)
    },
    rightContent: {
      backgroundColor: theme.inverttransparent,
      paddingTop: actuatedNormalize(4),
      paddingBottom: actuatedNormalize(4),
      paddingLeft: actuatedNormalize(12),
      paddingRight: actuatedNormalize(12),
      borderRadius: actuatedNormalize(4),
      alignItems: 'center'
    }
})
  return (
    <View style={[styles.container, styles[type]]}>
      <View style={styles.leftContent}>
        {type === 'discount' && <Voucher />}
        {type === 'cashback' && <Offer />}
        <View style={styles.textWrapper}>
          <Text variant="primarytextcolor2" overrideStyles={{lineHeight:lineHeightSmall}} size={fontSmall}>{category}</Text>
          <Text variant="primarytextcolor" overrideStyles={{ fontFamily: fonts.HSBC_Medium,lineHeight:lineHeightMediumLarge }} size={fontMediumLarge}>{title}</Text>
        </View>  
      </View>
       {(validity?.length && !showAction) ? <View style={[styles.rightContent, styles.textWrapper]}>
          <Text size={fontXXSmall} overrideStyles={{lineHeight:lineHeightXXSmall}} variant="primarytextcolor2">{validityLabel}</Text>
          <Text size={fontXSmall} overrideStyles={{lineHeight:lineHeightXSmall}} variant="primarytextcolor">{validity}</Text>
        </View> : <></>}
      {(showAction && !validity?.length) ? <TouchableOpacity>
        <ChevronRight fill={theme.primarycolorstatic} onPress={() => onActionPress && onActionPress()} />
      </TouchableOpacity>
        : <></>}
    </View>
  )
}

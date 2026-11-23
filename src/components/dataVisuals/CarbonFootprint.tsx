import React, { ReactElement } from 'react'
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { fontMedium, fontXXLarge } from "../../assets/styles/constants/size";
import Health from "../icons/sab360/Health";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface CarbonFootprintProps {
  label: string | ReactElement;
  amount: string;
  loading?: boolean;
}

export const CarbonFootprint: React.FC<CarbonFootprintProps> = ({ label, amount, loading }) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    outerContainer: {
      width: actuatedNormalize(212),
      height: actuatedNormalize(212),
      borderRadius: actuatedNormalize(212),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 132, 127, 0.1)"
    },
    outerContainer2: {
      width: actuatedNormalize(184),
      height: actuatedNormalize(184),
      borderRadius: actuatedNormalize(184),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 132, 127, 0.20)",
    },
    container: {
      width: actuatedNormalize(158),
      height: actuatedNormalize(158),
      borderRadius: actuatedNormalize(158),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.secondarycolor10,
    }
  })
  return loading ? <SkeletonBox shape="circle" size="extralarge" overrideStyles={{ width: actuatedNormalize(158), height: actuatedNormalize(158)}} /> : (
    <View style={styles.outerContainer}>
      <View style={styles.outerContainer2}>
        <View style={styles.container}>
          <Health />
          {typeof label === 'string' ? <Text size={fontMedium} variant="primarycolor4static">{label}</Text> : label}
          <Text size={fontXXLarge} variant="primarycolor4static" bold>{amount}</Text>
        </View>
      </View>  
    </View>
  )
}

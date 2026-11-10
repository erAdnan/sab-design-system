import React, { useMemo } from 'react';
import { Avatar, AvatarProps } from "../avatar/Avatar";
import { StyleSheet, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { fontLarge, fontSmallMedium, radiusS, spacingS, spacingXXS } from "../../assets/styles/constants/size";
import { PieGraph } from "../pieGraph/PieGraph";
import fonts from "../../assets/styles/constants/fonts";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { useFluidWidth } from "../../assets/styles/utils/responsive";

interface BlockInformationProps {
  avatarProps: AvatarProps;
  avatarType: 'icon' | 'avatar' | 'pieGraph';
  headline?: string;
  pieGraphPercentage?: number;
  label: string;
  loading?: boolean;
}

/**
 * @property avatarProps - Props of the avatar that will be displayed on top (icon, image url, initials etc.)
 * @property avatarType - option for avatar that can be used in order to show correct component with correct bg color
 * @property iconType - Icon type to be displayed on the left side of the text, default is "banking"
 * @property headline - Optional string for the first line of text
 * @property pieGraphPercentage - To be passed when avatarType is 'pieGrah'
 * @property label - String to be used for the text that will always be visible (with or without headline)
 **/
export const Information: React.FC<BlockInformationProps> = ({
  avatarProps,
  avatarType,
  headline,
  pieGraphPercentage,
  label,
  loading
}) => {
  const { theme } = useTheme();
  const frame = useFluidWidth();
  const styles = StyleSheet.create({
    container: {
      height: actuatedNormalize(132),
      ...frame.of(168),
      padding: spacingS,
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    },
    textContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: spacingXXS,
      alignItems: 'flex-start'
    },
  });

  const isPieGraph = useMemo(() => {
    return avatarType === 'pieGraph'
  }, [avatarType]);

  return loading ? (
    <View style={styles.container}>
      <SkeletonBox shape='circle' size='large' />
      <View style={{ ...styles.textContent, width: "100%"}}>
        <SkeletonBox shape='line' size='small' overrideStyles={{ width: "100%"}}/>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: "100%"}}/>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {isPieGraph ? <PieGraph percentage={pieGraphPercentage || 0} /> : <Avatar {...avatarProps} overrideStyles={avatarType === 'icon' && { backgroundColor: theme.inverttransparent }} />}
      <View style={styles.textContent}>
        {headline && <Text size={fontSmallMedium}>{headline}</Text>}
        <Text size={fontLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium}}>{label}</Text>
      </View>
    </View>
  )
}

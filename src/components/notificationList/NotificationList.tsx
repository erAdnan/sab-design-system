import React, { FC, useMemo } from 'react'
import { Badge, BadgeSize } from "../badge/Badge"
import { useTheme } from "../../context/theme/themeContext";
import { StyleSheet, View } from "react-native";
import { fontMedium, fontSmall, spacingS, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";

interface NotificationListProps {
  title: string;
  body: string;
  read: boolean;
  timeLabel: string;
  showStatus: boolean;
  loading?: boolean;
}

export const NotificationList: FC<NotificationListProps> = ({
  title,
  body,
  read,
  timeLabel,
  showStatus,
  loading
}) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: spacingS,
      borderBottomColor: theme.primarycolor2_20,
      borderBottomWidth: 1,
      gap: read? spacingXS :spacingXXS,
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
      alignSelf: "stretch",
      alignItems: "stretch",
    },
    titleWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: "center",
      width: "100%",
      maxWidth: "100%",
      minWidth: 0,
    },
    titleText: {
      flex: 1,
      minWidth: 0,
      textAlign: "left",
      marginEnd: spacingXS,
    },
    statusWrapper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: "center",
      flexGrow: 0,
      flexShrink: 0,
      marginStart: "auto",
    }
  });
  const showBadge = useMemo(() => {
    return showStatus && !read
  }, [showStatus, read]);
  return loading ? (
    <View style={{...styles.container, backgroundColor: theme.stylesblockbg, borderBottomWidth: 0, gap: spacingXS}}>
      <View style={{ ...styles.titleWrapper, marginBottom: spacingS }}>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: "100%", maxWidth: "100%", flexShrink: 1}}/>
        <SkeletonBox shape='line' size='medium' overrideStyles={{ width: actuatedNormalize(80)}}/>
      </View>
      <SkeletonBox shape='line' size='small' overrideStyles={{ width: '100%' }} />
      <SkeletonBox shape='line' size='small' overrideStyles={{ width: '100%' }}/>
    </View>
  ) : (
    <View style={{ ...styles.container, backgroundColor: read ? "transparent" : theme.stylesblockbg }}>
      <View style={styles.titleWrapper}>
        <Text overrideStyles={styles.titleText} numberOfLines={1} bold>{title}</Text>
        <View style={styles.statusWrapper}>
          <Text size={fontMedium} overrideStyles={{ marginHorizontal: spacingXS}}>{timeLabel}</Text>
          {showBadge && <Badge size={BadgeSize.xs} />}
        </View>
      </View>
      <Text size={fontSmall} variant={read ? "primarytextcolor" : "primarytextcolor2"} overrideStyles={{ textAlign: "left", width: "100%" }}>{body}</Text>
    </View>
  )
}

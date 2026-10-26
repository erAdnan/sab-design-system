import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "../icon/Icon";
import Password from "../icons/functionals/Password";
import PasswordOff from "../icons/functionals/PasswordOff";
import {
  fontSmallMedium,
  fontXLG,
  fontXXLG,
  lineHeightXLG,
  radiusL,
  radiusS,
  radiusXS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";

import { useTheme } from "../../context/theme/themeContext";
import { Balance } from "../balance/Balance";
import { Text } from "../text/Text";
import Graph from "../icons/banking/Graph";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { LightSkeletonBox } from "../skeleton/LightSkeletonBox";

export interface BalanceModuleProps {
  title: string;
  balance: number;
  account?: string;
  hideBalance?: boolean;
  currency: "sar" | string;
  info?: string;
  overrideStyles?: any;
  loading?: boolean;
  isMainAccount?: boolean;
  onPressTitle? : () => void;
  hideAmountOnPress? : () => void;
  balanceVariant?: string;
  isLiteDashboard?: boolean;
  balanceSize?: number;
}

export interface BalanceModuleExtendedProps extends BalanceModuleProps {
  key: string;
}

/**
 * @property title: Title of the balance module
 * @property balance: Balance amount
 * @property account: Account number
 * @property hideBalance: Boolean to hide balance
 * @property currency: Currency to be displayed (default is SAR)
 * @property info: Additional information
 * @property overrideStyles: Override styles for the component
 * @property isMainAccount: Adds background with border radius to the title
 * @property onPressTitle: Pass this prop when you want to enable an onPress action on the current account text.
 * @property hideAmountOnPress: add on press to changes the hideBalance state for show and hide the balance
 * @property balanceVariant: pass this true for the Ramadan theme change the Balance & currency change color balanceVariant="primarycolor4static"
 * @property isLiteDashboard: Lite dashboard styling — transparent account pill, white title/icon, frosted icon wrapper
 * @property balanceSize: Size of the balance text
 */
export const BalanceModule: FC<BalanceModuleProps> = ({
  title,
  balance,
  account,
  hideBalance = false,
  currency = "sar",
  info,
  overrideStyles,
  loading = false,
  isMainAccount = false,
  onPressTitle,
  hideAmountOnPress,
  balanceVariant,
  isLiteDashboard = false,
  balanceSize = fontXLG,
}) => {
  const { theme } = useTheme();

  const SkeletonPiece = isLiteDashboard ? LightSkeletonBox : SkeletonBox;

  const styles = StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: spacingS,
    },
    textContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingXXS,
    },
    accountName: {
      backgroundColor: isLiteDashboard ? "transparent" : theme.stylesblockbg,
      borderRadius: actuatedNormalize(100),
      paddingVertical: spacingXS,
      paddingHorizontal: spacingS,
    },

    infoContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: spacingS,
    },
    infoTextContainer: {
      display: "flex",
      flexDirection: "row",
      gap: spacingXS,
      paddingHorizontal: spacingS,
      paddingVertical: spacingXXS,
      alignItems: "center",
      backgroundColor: theme.stylesblockbg,
      borderRadius: radiusL,
    },
    iconWrapper: {
      height: actuatedNormalize(32),
      width: actuatedNormalize(32),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isLiteDashboard
        ? "rgba(242, 243, 244, 0.10)"
        : theme.stylesblockbg,
      borderRadius: radiusS,
      borderWidth: 1,
      borderColor: isLiteDashboard
        ? theme.primarycolor2_100static
        : theme.primarycolor2_20,
    },
  });


  const iconSize = actuatedNormalize(16);
  const visibilityIcon = hideBalance ? (
    isLiteDashboard ? (
      <PasswordOff
        width={iconSize}
        height={iconSize}
        fill={theme.primarycolor4static}
      />
    ) : (
      <Icon
        name="password_off"
        type="functionals"
        width={iconSize}
        height={iconSize}
      />
    )
  ) : isLiteDashboard ? (
    <Password
      width={iconSize}
      height={iconSize}
      fill={theme.primarycolor4static}
    />
  ) : (
    <Icon
      name="password"
      type="functionals"
      width={iconSize}
      height={iconSize}
    />
  );

  return (
  <View style={[styles.container, overrideStyles]}>
      <View style={styles.textContainer}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: spacingXS,
            alignItems: "center",
          }}
        >
          {loading ? <SkeletonPiece shape="line" size="small" overrideStyles={{ width: actuatedNormalize(94)}}/> : <TouchableOpacity
            onPress={onPressTitle}
            disabled={!onPressTitle} // avoid press effect if no handler passed
          >
            <View style={styles.accountName}>
              <Text
                size={fontSmallMedium}
                variant={isLiteDashboard ? "primarycolor4static" : undefined}
              >
                {title}
              </Text>
            </View>
          </TouchableOpacity>}
          {loading ? <SkeletonPiece shape="square" size="medium"/> : <TouchableOpacity onPress={hideAmountOnPress} style={styles.iconWrapper}>
            {visibilityIcon}
          </TouchableOpacity>}
        </View>
        {loading ? <SkeletonPiece shape="line" size="medium" overrideStyles={{ width: '100%', marginVertical: spacingS }}/> : <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: spacingXXS,
            alignItems: "center",
          }}
        >
          <Balance
            currency={currency}
            firstValue={balance}
            firstValueSize={balanceSize}
            hidden={hideBalance}
            balanceWrapper={{ alignItems: "center", }}
            balanceTextWrapper={{ alignItems: "center", }}
            balanceVariant={balanceVariant}
            titleLineHeight={actuatedNormalize(36)}
          />
        </View>}           
      </View>
        {(account || info) && <View style={styles.infoContainer}>
          {account && (
            <Text size={fontSmallMedium} variant="primarycolor2_100static">
              {account}
            </Text>
          )}
          {info && (
            <View style={styles.infoTextContainer}>
              <View>
                <Graph fill={theme.primarytextcolor} />
              </View>
              <Text>{info}</Text>
            </View>
          )}
        </View>}
    </View>
  );
};

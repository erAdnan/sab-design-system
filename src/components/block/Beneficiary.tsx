import React, { FC } from "react";
import { Avatar, AvatarProps } from "../avatar/Avatar";
import { StyleSheet, View } from "react-native";
import { Size } from "../../assets/styles";
import { Text } from "../text/Text";
import { fontSmallMedium } from "../../assets/styles/constants/size";
import BlockSkeleton from "./BlockSkeleton";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

interface BlockBeneficiaryProps {
  avatarProps: AvatarProps;
  name: string;
  description: string;
  loading?: boolean;
}

/**
 * Beneficiary Component
 * @property avatarProps - Configuration for the avatar to be displayed at the top of the block (initials, img, size etc.)
 * @property name - The name of the beneficiary (string)
 * @property description - The description that will be displayed under the name (string)
 * @property loading - boolean for showing the skeleton
 **/

export const Beneficiary: FC<BlockBeneficiaryProps> = ({
  avatarProps,
  name,
  description,
  loading = false,
}) => {
  return loading ? (
    <BlockSkeleton isBeneficiary width={actuatedNormalize(80)} />
  ) : (
    <View style={styles.container}>
      <Avatar {...avatarProps} />
      <View>
        <Text size={fontSmallMedium} overrideStyles={{ flex: 1 }}>
          {name}
        </Text>
        <Text size={fontSmallMedium} variant="primarytextcolor2">
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: Size.spacingXS,
    paddingVertical: Size.spacingXS,
  },
});

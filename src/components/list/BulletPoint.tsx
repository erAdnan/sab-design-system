import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Success from "../icons/functionals/Success";
import { useTheme } from "../../context/theme/themeContext";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";

import fonts from "../../assets/styles/constants/fonts";
const DISC_FILL_SIZE = actuatedNormalize(6);

export interface BulletPointProps {
  type: "success" | "disc" | "discFill";
  variant: "primary" | "secondary";
}

/**
 *
 * @property type - Success shows checkmark, disc shows outline circle, discFill shows filled circle (primClr)
 * @propery variant - primary will show green checkmark, secondary will show a grey one (disc / success only)
 */

export const BulletPoint: FC<BulletPointProps> = ({
  type = "disc",
  variant = "primary",
}) => {
  const { theme } = useTheme();

  if (type === "discFill") {
    return (
      <View
        style={[
          styles.discFill,
          { backgroundColor: theme.primClr },
        ]}
      />
    );
  }

  return (
    <View>
      {type === "disc" ? (
        <View>
          <Text
            style={fonts.withTrueBoldWeight({
              color:
                variant === "primary"
                  ? theme.primarytextcolor
                  : theme.primarytextcolor2,
              marginBottom: actuatedNormalize(2),
            })}
          >
            ￮
          </Text>
        </View>
      ) : (
        <View>
          <Success
              stroke={theme["primarycolor4static"]}
              height={actuatedNormalize(12)}
              width={actuatedNormalize(12)}
            fill={
              variant === "primary"
                ? theme["ragcolor6"]
                : theme["primarycolor2"]
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  discFill: {
    width: DISC_FILL_SIZE,
    height: DISC_FILL_SIZE,
    borderRadius: DISC_FILL_SIZE / 2,
  },
});

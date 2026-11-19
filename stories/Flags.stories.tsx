import { ScrollView, View } from "react-native";
import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";
import {
  CircularFlagMeta,
  CircularFlags,
  RoundedFlagMeta,
  RoundedFlags,
} from "../src/assets/svgs/flags/FlagList";
import {
  fontLarge,
  fontSmall,
  spacingS,
  spacingXS,
} from "../src/assets/styles/constants/size";
import { Text } from "../src/components/text/Text";
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";
import { foundationsDocsCanvas } from "../.storybook/foundationsDocs";

export default {
  title: "Foundations/Assets/Flags",
  parameters: {
    docs: {
      ...foundationsDocsCanvas,
    },
  },
};

type FlagGalleryProps = {
  flags: Record<string, ComponentType<SvgProps>>;
  labels: Record<string, string>;
  title: string;
  width: number;
  height: number;
};

const FlagGallery = ({
  flags,
  labels,
  title,
  width,
  height,
}: FlagGalleryProps) => {
  const names = Object.keys(flags).sort((a, b) => a.localeCompare(b));

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: spacingS,
      }}
    >
      <Text bold size={fontLarge}>
        {title} ({names.length})
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: spacingXS,
          marginTop: spacingS,
        }}
      >
        {names.map((name) => {
          const Flag = flags[name];
          return (
            <View
              key={name}
              style={{
                width: actuatedNormalize(72),
                alignItems: "center",
                gap: actuatedNormalize(6),
              }}
            >
              <View
                style={{
                  width,
                  height,
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Flag width={width} height={height} />
              </View>
              <Text
                size={fontSmall}
                numberOfLines={2}
                overrideStyles={{ textAlign: "center" }}
              >
                {labels[name] ?? name}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export const Circular = {
  render: () => (
    <FlagGallery
      title="Circular flags"
      flags={CircularFlags}
      labels={CircularFlagMeta}
      width={24}
      height={24}
    />
  ),
};

export const Rounded = {
  render: () => (
    <FlagGallery
      title="Rounded flags"
      flags={RoundedFlags}
      labels={RoundedFlagMeta}
      width={32}
      height={20}
    />
  ),
};

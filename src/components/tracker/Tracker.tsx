import { StyleSheet, View } from "react-native";
import { Title, TitleProps } from "../text/Title";
import { FC } from "react";
import { Size } from "../../assets/styles";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Rag, RagIconType } from "../rag/Rag";
import { Text } from "../text/Text";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMedium,
  fontXSmall,
  lineHeightMedium,
  lineHeightXSmall,
  spacingS,
  spacingXXXS,
} from "../../assets/styles/constants/size";
import { SarFont } from "../sarFont/SarFont";
import { LocalIconProps } from "../icon/Icon";
import TrackerSkeleton from "./TrackerSkeleton";

interface TrackerProps {
  textHeadline: string;
  text2: string;
  type: RagIconType;
  balance: boolean;
  rightTextHeadline: string;
  rightText2: string;
  number?: number;
  icon?: LocalIconProps;
  loading?: boolean;
  overrideStyles?:any;
  leftWrapperStyle?: any;
  rightWrapperStyle?:any;
  fontTitleSize?: number | undefined;
  textHeadlineTitleprops?: TitleProps;
  textHeadlineTitlepropsRight?: TitleProps;
  sizeRag?: "extralarge" | "large" | "medium" | "small";
  balanceOverrideStyle?: any;
  showVerticalTrack?: boolean;
}

/**
 * Tracker component to display a tracker with an icon, title, subtitle, and number
 * @property textHeadline - Title on the left side of the tracker
 * @property text2 - Subtitle on the left side of the tracker
 * @property type - Determines what RAG to display on the left side of the tracker
 * @property balance - Determines if the right side of the tracker should be displayed
 * @property rightTextHeadline - Title on the right side of the tracker
 * @property rightText2 - Subtitle on the right side of the tracker
 * @property number - Number to display on the left side of the tracker inside a circle
 * @property icon - Configure with LocalIconProps to choose any icon from assets/svgs (See story example - Tracker.stories.tsx - Icons)
 * @property overrideStyles: Applies new styling settings that will override the default ones
 * @property leftWrapperStyle: Applies new styling left child wrapper 
 * @property rightWrapperStyle: Applies new styling right child wrapper
 * @property fontTitleSize - use this props for changing the font size
 * @property sizeRag - Sets the height and width of the rag component. Default is "medium" (Accepts "extralarge", "large", "medium", "small")
 * @property balanceOverrideStyle - use this style for balance elements
 * @property showVerticalTrack - use this props if you dont want to show vertical line {showVerticalTrack = false}
 */
export const Tracker: FC<TrackerProps> = ({
  textHeadline,
  text2,
  type,
  balance = true,
  rightTextHeadline,
  rightText2,
  number,
  icon,
  loading = false,
  overrideStyles,
  leftWrapperStyle,
  rightWrapperStyle,
  fontTitleSize,
  textHeadlineTitleprops,
  textHeadlineTitlepropsRight,
  sizeRag="medium",
  balanceOverrideStyle,
  showVerticalTrack=true,
}) => {
  const { theme } = useTheme();
  return loading ? (
    <TrackerSkeleton content={balance} />
  ) : (
    <View style={[styles.container,overrideStyles]}>
      <View style={[styles.leftSideWrapper,leftWrapperStyle]}>
        {number && (
          <View style={styles.iconWrapper}>
            <Rag type={type} number={number} numberColor={theme.primarywhitestatic} numberBgColor={theme.primarycolorstatic} showVerticalTrack={showVerticalTrack} icon={icon} size={sizeRag} overrideStyles={{flex:1}} verticalOverrideStyle={{flex:1}} />
          </View>
        )}
        <View style={styles.titleWrapper}>
          <Title
            overrideStyles={{
              paddingHorizontal: 0,
              paddingVertical: 0,
              alignItems: "flex-start",
            }}
            subtitle={text2}
            size={fontTitleSize ?? fontMedium}
            subtitleSize={fontXSmall}
            subtitleVariant="primarytextcolor2"
            {...textHeadlineTitleprops}
          >
            {textHeadline}
          </Title>
        </View>
      </View>
      {balance && (
        <View style={[styles.rightSideWrapper,rightWrapperStyle]}>
          <View style={[styles.balance,balanceOverrideStyle]}>
            <SarFont
              size={fontMedium}
              lineHeight={lineHeightMedium}
              overrideStyles={{
                paddingHorizontal: spacingXXXS,
              }}
            />
            <Title
              size={fontTitleSize ?? fontMedium}
              subtitleSize={fontXSmall}
              subtitleVariant="primarytextcolor2"
              overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0 }}
              {...textHeadlineTitlepropsRight}
           >
              {rightTextHeadline}
            </Title>
          </View>
          {rightText2 && (
            <View style={styles.balance}>
              <SarFont
                size={fontXSmall}
                lineHeight={lineHeightXSmall}
                variant="primarytextcolor2"
                overrideStyles={{
                  paddingHorizontal: spacingXXXS,
                  paddingBottom: spacingS,
                }}
              />
              <Text
                size={fontXSmall}
                variant="primarytextcolor2"
                overrideStyles={{ paddingVertical: 0, paddingHorizontal: 0 }}
              >
                {rightText2}
              </Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

/*
 * Styles to use for Tracker component
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "center",
    height: "auto",
  },
  leftSideWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: Size.spacingS,
    width: "50%",
  },
  titleWrapper: {
    display: "flex",
    alignItems: "flex-end",
    marginTop: actuatedNormalize(5),
  },
  iconWrapper: {
    display: "flex",
    alignItems: "flex-start",
  },
  rightSideWrapper: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "50%",
    gap: Size.spacingXXS,
    paddingTop: actuatedNormalize(5),
  },
  balance: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Size.spacingXXS,
  },
});

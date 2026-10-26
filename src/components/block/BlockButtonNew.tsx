import React, {
  FC,
  ReactElement,
  isValidElement,
  useEffect,
  useState,
} from "react";
import {
  I18nManager,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SvgProps, SvgUri, SvgXml } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";
import {
  fontMediumLarge,
  fontSmall,
  fontSmallMedium,
  lineHeightMediumLarge,
  lineHeightSmall,
  lineHeightSmallMedium,
  radiusS,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { Button } from "../button/Button";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import More from "../icons/functionals/More";
import { NewCurrency } from "../text/NewCurrency";

const LOGO_MORE_THRESHOLD = 3;
const LOGO_SIZE = actuatedNormalize(36);
const LOGO_INNER = actuatedNormalize(24);
const LOGO_OVERLAP = actuatedNormalize(-12);

const logoContentStyle = {
  alignItems: "center" as const,
  justifyContent: "center" as const,
};

/** A logo can be a local SVG element or a remote image/SVG URL. */
export type BlockButtonNewLogo = string | ReactElement<SvgProps>;

export interface BlockButtonNewProps {
  caption: string;
  mainText: string;
  secondaryText: string;
  secondaryCaption: string;
  buttonText: string;
  logos?: BlockButtonNewLogo[];
  onButtonPress: () => void;
  onMoreIconPress?: () => void;
  loading?: boolean;
  overrideStyles?: any;
  currency?: string;
}

const isSvgUrl = (value: string) => {
  const path = value.split("?")[0].split("#")[0].toLowerCase();
  return path.endsWith(".svg");
};

type RemoteUrlLogoProps = {
  uri: string;
  style: StyleProp<ViewStyle>;
  innerSize: number;
};

/** Renders a remote logo URL: fetched SVG markup, SvgUri fallback, or a raster Image. */
const RemoteUrlLogo: FC<RemoteUrlLogoProps> = ({ uri, style, innerSize }) => {
  const [svgXml, setSvgXml] = useState<string | null>(null);

  useEffect(() => {
    if (!isSvgUrl(uri)) {
      return;
    }
    let cancelled = false;
    const loadSvg = async () => {
      try {
        const response = await fetch(uri);
        if (!response.ok) {
          throw new Error(`Logo request failed: ${response.status}`);
        }
        const xml = await response.text();
        if (!cancelled) {
          setSvgXml(xml);
        }
      } catch {
        if (!cancelled) {
          setSvgXml(null);
        }
      }
    };
    setSvgXml(null);
    loadSvg();
    return () => {
      cancelled = true;
    };
  }, [uri]);

  if (isSvgUrl(uri)) {
    if (svgXml) {
      return (
        <View style={[style, logoContentStyle]}>
          <SvgXml xml={svgXml} width={innerSize} height={innerSize} />
        </View>
      );
    }
    return (
      <View style={[style, logoContentStyle]}>
        <SvgUri uri={uri} width={innerSize} height={innerSize} />
      </View>
    );
  }

  return <Image source={{ uri }} style={style as StyleProp<ImageStyle>} resizeMode="cover" />;
};

export const BlockButtonNew: FC<BlockButtonNewProps> = ({
  caption,
  mainText,
  secondaryText,
  secondaryCaption,
  buttonText,
  logos = [],
  onButtonPress,
  onMoreIconPress,
  loading = false,
  overrideStyles,
  currency="SAR",
}) => {
  const { theme } = useTheme();

  const showMoreButton = logos.length >= LOGO_MORE_THRESHOLD;
  const visibleLogos = showMoreButton ? logos.slice(0, 2) : logos;

  const hasLogos = logos.length > 0;
  const hasSecondary = !!(secondaryText || secondaryCaption);

  const styles = StyleSheet.create({
    container: {
      width: actuatedNormalize(344),
      padding: spacingS,
      flexDirection: "column",
      alignItems: "flex-start",
      gap: spacingXS,
      borderRadius: radiusS,
      backgroundColor: theme.stylesblockbg,
    },
    contentRow: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "stretch",
      gap: spacingS,
    },
    contentMain: {
      flex: 1,
      minWidth: 0,
      alignItems: "flex-start",
      justifyContent: hasLogos ? "space-between" : "flex-end",
      gap: spacingXS,
    },
    logos: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoCircle: {
      position: "relative",
      width: LOGO_SIZE,
      height: LOGO_SIZE,
      paddingVertical: actuatedNormalize(5.538),
      paddingHorizontal: actuatedNormalize(4.5),
      justifyContent: "center",
      alignItems: "center",
      flexShrink: 0,
      borderRadius: actuatedNormalize(75),
      borderWidth: 0.75,
      borderColor: theme.neutraltint,
      backgroundColor: theme.primarycolor4static,
      overflow: "hidden",
    },
    logoOverlap: {
      marginLeft: LOGO_OVERLAP,
    },
    mainTextContent: {
      gap: spacingXXS,
      alignItems: "flex-start",
    },
    mainText: {
      flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
    },
    contentActions: {
      flexShrink: 0,
      alignItems: "flex-end",
      justifyContent: hasSecondary ? "space-between" : "flex-end",
      gap: spacingXS,
    },
    secondaryTextContent: {
      alignItems: "flex-end",
      gap: spacingXXS,
    },
    actionButton: {
      height: actuatedNormalize(31),
      minWidth: actuatedNormalize(60),
      paddingVertical: spacingXXS,
      paddingHorizontal: spacingS,
    },
    skeletonTop: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: spacingS,
    },
    skeletonLogos: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacingXS,
    },
    skeletonCircle: {
      width: LOGO_SIZE,
      height: LOGO_SIZE,
    },
    skeletonTitle: {
      alignItems: "flex-end",
      gap: spacingXS,
    },
    skeletonTitleLine: {
      width: actuatedNormalize(120),
      height: actuatedNormalize(12),
    },
    skeletonSubtitleLine: {
      width: actuatedNormalize(88),
      height: actuatedNormalize(12),
    },
    skeletonBottom: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      gap: spacingS,
    },
    skeletonTextGroup: {
      flex: 1,
      gap: spacingXS,
    },
    skeletonBottomLine: {
      width: "100%",
      height: actuatedNormalize(12),
    },
  });

  const getLogoCircleStyle = (index: number, total: number) => [
    styles.logoCircle,
    index > 0 ? styles.logoOverlap : null,
    { zIndex: total - index, elevation: total - index },
  ];

  const renderLogoItem = (logo: BlockButtonNewLogo, index: number) => {
    const circleStyle = getLogoCircleStyle(index, visibleLogos.length);
    if (isValidElement(logo)) {
      return (
        <View key={`logo-${index}`} style={circleStyle}>
          {React.cloneElement(logo, {
            width: LOGO_INNER,
            height: LOGO_INNER,
            preserveAspectRatio: "xMidYMid meet",
          })}
        </View>
      );
    }
    if (typeof logo === "string") {
      return (
        <RemoteUrlLogo
          key={`logo-${index}`}
          uri={logo}
          style={circleStyle}
          innerSize={LOGO_INNER}
        />
      );
    }
    return null;
  };

  const renderLogos = () => (
    <View style={styles.logos}>
      {visibleLogos.map((logo, index) => renderLogoItem(logo, index))}
      {showMoreButton && (
        <TouchableOpacity
          style={[styles.logoCircle, styles.logoOverlap, { zIndex: 0, elevation: 0 }]}
          onPress={() => onMoreIconPress?.()}
        >
          <More fill={theme.primarycolorstatic} width={actuatedNormalize(16)} height={actuatedNormalize(16)} />
        </TouchableOpacity>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, overrideStyles]}>
        <View style={styles.skeletonTop}>
          <View style={styles.skeletonLogos}>
            {[0, 1, 2].map((index) => (
              <SkeletonBox
                key={index}
                shape="circle"
                size="medium"
                overrideStyles={styles.skeletonCircle}
              />
            ))}
          </View>
          <View style={styles.skeletonTitle}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonTitleLine}
            />
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonSubtitleLine}
            />
          </View>
        </View>
        <View style={styles.skeletonBottom}>
          <View style={styles.skeletonTextGroup}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonBottomLine}
            />
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonBottomLine}
            />
          </View>
          <View style={styles.skeletonTextGroup}>
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonBottomLine}
            />
            <SkeletonBox
              shape="line"
              size="small"
              overrideStyles={styles.skeletonBottomLine}
            />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, overrideStyles]}>
      <View style={styles.contentRow}>
        <View style={styles.contentMain}>
          {logos.length > 0 && renderLogos()}
          <View style={styles.mainTextContent}>
            <Text
              size={fontSmall}
              variant="primarycolor2_100"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightSmall,
                textAlign: "left",
              }}
            >
              {caption}
            </Text>
            <View style={styles.mainText}>
              <NewCurrency text={currency}  size={fontMediumLarge} textstyle={{
                lineHeight: lineHeightMediumLarge,
              }} />
              <Text
              bold
              size={fontMediumLarge}
              variant="primarytextcolor"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightMediumLarge,
                textAlign: "left",
              }}
            >
              {mainText}
            </Text>
            </View>
            
          </View>
        </View>

        <View style={styles.contentActions}>
          <View style={styles.secondaryTextContent}>
            <Text
              medium
              size={fontMediumLarge}
              variant="primarytextcolor"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightMediumLarge,
                textAlign: "right",
              }}
            >
              {secondaryText}
            </Text>
            <Text
              size={fontSmall}
              variant="primarycolor2_100"
              numberOfLines={1}
              overrideStyles={{
                lineHeight: lineHeightSmall,
                textAlign: "right",
              }}
            >
              {secondaryCaption}
            </Text>
          </View>
          <Button
            variant="fill"
            color="secondary"
            size="small"
            buttonText={{
              children: buttonText,
              size: fontSmallMedium,
              overrideStyles: {
                lineHeight: lineHeightSmallMedium,
              },
            }}
            overrideStyles={styles.actionButton}
            onButtonPress={onButtonPress}
          />
        </View>
      </View>
    </View>
  );
};

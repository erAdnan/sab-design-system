import React, {FC, useMemo} from "react";
import {useTheme} from "../../context/theme/themeContext";
import {LanguageCodes} from "../../localization/languages";
import i18n from "i18next";
import {I18nManager, StyleSheet, View} from "react-native";
import {spacingS, spacingXS} from "../../assets/styles/constants/size";
import {SkeletonBox} from "../skeleton/SkeletonBox";
import {actuatedNormalize} from "../../assets/styles/utils/pixelScaling";
interface HeaderProps {
  type: | "link" | "level0" | "level1" | "level1-intermediate" | "level1-foryou" | "level2" | "authentication" | "search" | "level1services";
  state: "prelogin" | "postlogin";
}
/**
 * @property type: Options for choosing header type (same types as in Figma)
 * @property state: Changes the version of the header depeneding on the "prelogin" or "postlogin" state, applicable in cases where header looks different in each state
 */

export const HeaderSkeleton: FC < HeaderProps > = ({type, state}) => {
  const {theme} = useTheme();
  const isRtl = I18nManager.isRTL;

  const isPostLogin = useMemo(() => state === "postlogin", [state]);

  const styles = StyleSheet.create({
    inlineContent: {
      display: "flex",
      justifyContent: "space-between",
      flexDirection: isRtl
        ? "row-reverse"
        : "row"
    },
    boxContainer: {
      display: "flex",
      justifyContent: "flex-start",
      gap: spacingXS,
      flexDirection: isRtl
        ? "row-reverse"
        : "row"
    },
    headerContent: {
      display: "flex",
      flexDirection: "column",
      gap: spacingXS,
      backgroundColor: theme.stylesblockbg,
      padding: spacingS
    },
    squareSmall: {
      width: actuatedNormalize(64)
    },
    squareMedium: {
      width: actuatedNormalize(112)
    },
    squareLarge: {
      width: actuatedNormalize(162),
      maxWidth: "100%",
    }
  });

  return (<View style={styles.headerContent}>
    {
      type === "link" && (<View style={styles.inlineContent}>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>{" "}
          {isPostLogin && (<SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>)}
        </View>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="square" size="medium"/>
        </View>
      </View>)
    }
    {
      type === "level0" && (<View style={styles.inlineContent}>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>{" "}
          {isPostLogin && (<SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>)}
        </View>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="circle" size="medium"/>{" "}
          {
            isPostLogin && (<> {
              " "
            } < SkeletonBox shape = "circle" size = "medium" /> {
              " "
            } < SkeletonBox shape = "circle" size = "medium" /> </>)
          }
        </View>
      </View>)
    }
    {
      type === "level1" && (<View style={styles.inlineContent}>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>

          <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>
        </View>
        {
          isPostLogin && (<View style={styles.boxContainer}>
            <SkeletonBox shape="circle" size="medium"/>
            <SkeletonBox shape="circle" size="medium"/>
            <SkeletonBox shape="circle" size="medium"/>
          </View>)
        }
      </View>)
    }
    {
      type === "level1-foryou" && (<View style={styles.inlineContent}>
        <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareSmall}/>
        <View style={styles.boxContainer}>
          <SkeletonBox shape="circle" size="medium"/>
          <SkeletonBox shape="circle" size="medium"/>
        </View>
      </View>)
    }
    {
      (type === "level2" || type === "search") && (<View style={styles.inlineContent}>
        <SkeletonBox shape="circle" size="medium"/>
        <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareMedium}/>
        <View style={{
            width: 60
          }}></View>
      </View>)
    }
    {
      type === "level1-intermediate" && (<View style={styles.inlineContent}>
        <SkeletonBox shape="circle" size="medium"/>
      </View>)
    }
    {
      type === "authentication" && (<View style={styles.inlineContent}>
        <View style={{
            width: 60
          }}></View>
        <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareMedium}/>
        <SkeletonBox shape="circle" size="medium"/>
      </View>)
    }
    {
      (type === "level1" || type === "level1-foryou" || type === "level1-intermediate") && (<View style={styles.inlineContent}>
        <SkeletonBox shape="square" size="medium" overrideStyles={styles.squareLarge}/>
      </View>)
    }
  </View>);
};

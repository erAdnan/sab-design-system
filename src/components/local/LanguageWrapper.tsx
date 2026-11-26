import React, { FC, useEffect, useState } from "react";
import { View, I18nManager, Modal, Alert, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { LanguageCodes } from "../../localization/languages";
import { Text } from "../text/Text";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNRestart from "react-native-restart";
import { Button } from "../button/Button";
import { BlurView } from "@react-native-community/blur";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/theme/themeContext";

interface LanguageWrapperProps {
  children?: React.ReactNode;
  setArabic?: (isArabic: boolean) => void;
  /** Controlled locale (e.g. from web Storybook toolbar). */
  locale?: "en" | "ar" | string;
  /** When false, hide the in-canvas language button (web toolbar handles it). */
  showSwitcher?: boolean;
  /** Extra header control rendered beside the language button (device theme toggle). */
  accessory?: React.ReactNode;
}

export const LanguageWrapper: FC<LanguageWrapperProps> = ({
  children,
  setArabic,
  locale,
  showSwitcher = Platform.OS !== "web",
  accessory,
}) => {
  const { theme } = useTheme();
  const [lang, setLang] = useState(LanguageCodes.en);
  const [isSelectLangOpen, setIsSelectLangOpen] = useState(false);
  const { t } = useTranslation();

  const applyLanguage = async (newLang: string) => {
    const isRTL = newLang === LanguageCodes.ar;

    await AsyncStorage.setItem("appLanguage", newLang);
    setLang(newLang as LanguageCodes);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      if (Platform.OS === "web" && typeof document !== "undefined") {
        document.documentElement.dir = isRTL ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
      }
      RNRestart.Restart();
      // On web the restart mock is a no-op — keep applying i18n below.
    }

    if (Platform.OS === "web" && typeof document !== "undefined") {
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      document.documentElement.lang = newLang;
    }

    i18n.changeLanguage(newLang);
    setArabic?.(isRTL);
    setIsSelectLangOpen(false);
  };

  useEffect(() => {
    AsyncStorage.getItem("appLanguage").then((savedLang: any) => {
      if (savedLang && !locale) {
        applyLanguage(savedLang);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount hydrate only
  }, []);

  useEffect(() => {
    if (!locale) return;
    // Always sync i18n + dir with the toolbar, even when local state already matches
    // (e.g. after hot reload or when resources load after first paint).
    if (locale === lang && i18n.language === locale) return;
    applyLanguage(locale);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync from toolbar globals
  }, [locale]);

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        // Web: at least the canvas height so the iframe document can grow and scroll.
        // Device: allow the story ScrollView to shrink inside the fixed story view.
        minHeight: Platform.OS === "web" ? "100%" : 0,
        overflow: "visible",
        alignSelf: "stretch",
      }}
    >
      {showSwitcher || accessory ? (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "100%",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 12,
            paddingHorizontal: 16,
            paddingVertical: 8,
            alignSelf: "stretch",
            backgroundColor: theme.stylesblockbg ?? theme.stylesbackground2,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.primarytextcolor2 ?? "#E5E5E5",
          }}
        >
          {accessory}
          {showSwitcher ? (
            <Button
              size="small"
              variant="outlined"
              buttonText={{ children: t("changeLanguage") }}
              onButtonPress={() => setIsSelectLangOpen(true)}
            />
          ) : null}
        </View>
      ) : null}
      <Modal
        transparent
        animationType="slide"
        visible={isSelectLangOpen}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setIsSelectLangOpen(false);
        }}
      >
        <View style={styles.overlay}>
          {Platform.OS === "ios" ? (
            <BlurView
              style={styles.blur}
              blurType="light"
              blurAmount={10}
              onTouchEnd={() => setIsSelectLangOpen(false)}
            />
          ) : (
            <View
              style={styles.fallbackBlur}
              onTouchEnd={() => setIsSelectLangOpen(false)}
            />
          )}

          <View style={styles.modalContainer}>
            <Text overrideStyles={styles.title}>{t("selectLanguage")}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => applyLanguage(LanguageCodes.en)}
                style={
                  lang === LanguageCodes.en ? styles.cancelBtn : styles.changeBtn
                }
              >
                <Text
                  variant={
                    lang === LanguageCodes.en
                      ? "primarycolor4static"
                      : "primarytextcolor"
                  }
                >
                  {t("english")}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => applyLanguage(LanguageCodes.ar)}
                style={
                  lang === LanguageCodes.ar ? styles.cancelBtn : styles.changeBtn
                }
              >
                <Text
                  variant={
                    lang === LanguageCodes.ar
                      ? "primarycolor4static"
                      : "primarytextcolor"
                  }
                >
                  {t("arabic")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View
        key={lang}
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "100%",
          minWidth: 0,
          minHeight: Platform.OS === "web" ? undefined : 0,
          overflow: "visible",
          alignItems: "stretch",
          alignSelf: "stretch",
        }}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  fallbackBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  cancelBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#00847F",
  },
  changeBtn: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.45)",
  },
});

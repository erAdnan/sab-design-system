import React, { FC, useEffect, useState } from "react";
import { View, I18nManager, Modal, Alert, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { LanguageCodes } from "../../localization/languages";
import { Text } from "../text/Text";
import i18n from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import  RNRestart from "react-native-restart";
import { Button } from "../button/Button";
import { BlurView } from '@react-native-community/blur';
import { useTranslation } from "react-i18next";

export const LanguageWrapper: FC<any> = ({ children, setArabic }) => {
  const [lang, setLang] = useState(LanguageCodes.en);
  const [isSelectLangOpen, setIsSelectLangOpen] = useState(false);
  const { t } = useTranslation();

    useEffect(() => {
    // On mount, load saved language from storage
      AsyncStorage.getItem("appLanguage").then((savedLang: any) => {
      if (savedLang) {
        setLang(savedLang);
        const isRTL = savedLang === LanguageCodes.ar;
        if (I18nManager.isRTL !== isRTL) {
          I18nManager.allowRTL(isRTL);
          I18nManager.forceRTL(isRTL);
          RNRestart.Restart(); // restart if needed on mount
        } else {
          i18n.changeLanguage(savedLang);
          setArabic(isRTL);
        }
      }
    });
  }, [lang]);

  const handleChange = async (newLang: any) => {
    const isRTL = newLang === LanguageCodes.ar;

    await AsyncStorage.setItem("appLanguage", newLang);
    setLang(newLang);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
      RNRestart.Restart();
      return; // Don't continue further because app restarts
    }

    i18n.changeLanguage(newLang);
    setArabic(isRTL);
    setIsSelectLangOpen(false);
  };

 
  return (
    <View style={{ flex: 1, width: "100%", maxWidth: "100%", minWidth: 0, minHeight: "100%", overflow: "visible", alignSelf: "stretch" }}>
      <View
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "100%",
          alignItems: "flex-end",
          marginBottom: 16,
          alignSelf: "stretch",
        }}
      >
        <Button size="small" variant="outlined" buttonText={{ children: t('changeLanguage') }} onButtonPress={() => setIsSelectLangOpen(true)}/>
      </View>
      <Modal
        transparent
        animationType="slide"
        visible={isSelectLangOpen}
        onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setIsSelectLangOpen(false);
        }}>
        <View style={styles.overlay}>
        {Platform.OS === 'ios' ? (
          <BlurView style={styles.blur} blurType="light" blurAmount={10} onTouchEnd={() => setIsSelectLangOpen(false)}/>
        ) : (
          <View style={styles.fallbackBlur} onTouchEnd={() => setIsSelectLangOpen(false)}/>
        )}

        <View style={styles.modalContainer}>
            <Text overrideStyles={styles.title}>{t('selectLanguage')}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={() => handleChange(LanguageCodes.en)} style={lang === LanguageCodes.en ? styles.cancelBtn : styles.changeBtn}>
                <Text variant={lang === LanguageCodes.en ? "primarycolor4static" : "primarytextcolor"}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChange(LanguageCodes.ar)} style={lang === LanguageCodes.ar ? styles.cancelBtn : styles.changeBtn}>
                <Text variant={lang === LanguageCodes.ar ? "primarycolor4static" : "primarytextcolor"}>{t('arabic')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal>
      <View style={{ flex: 1, width: "100%", maxWidth: "100%", minWidth: 0, overflow: "visible", alignItems: "center", alignSelf: "stretch" }}>
        {children}
      </View>
    </View>
  );
};

 const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
  fallbackBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: "rgba(255, 255, 255, 0.45)",
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonRow: {
    flexDirection: 'row',
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


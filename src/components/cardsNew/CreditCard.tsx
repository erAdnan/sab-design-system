import React, { FC, ReactElement, useMemo, useState } from 'react'
import { Dimensions, I18nManager, Image, ImageBackground, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { fontLarge, fontMedium, fontMediumLarge, fontSmall, fontSmallMedium, fontXSmall, fontXXLarge, fontXXSmall, lineHeightLarge, lineHeightMedium, lineHeightMediumLarge, lineHeightSmallMedium, lineHeightXSmall, radiusL, radiusS, spacing1XS, spacingL, spacingM, spacingS, spacingXL, spacingXS, spacingXXS } from "../../assets/styles/constants/size";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { Text } from "../text/Text";
import { ProgressIndicator } from "../progressIndicator/ProgressIndicator";
import { SarFont } from "../sarFont/SarFont";
import CardInfo from "../icons/banking/CardInfo";
import Freeze from "../icons/banking/Freeze";
import Lock from "../icons/outline/Lock";
import Clock from "../icons/outline/Clock";
import ErrorCircle from "../icons/outline/ErrorCircle";
import { BlurView } from "@react-native-community/blur";
import fonts from "../../assets/styles/constants/fonts";
import Visa from "../icons/sab360/Visa";
import Mastercard from "../icons/banking/Mastercard";
import VisaPlatinum from "../icons/banking/VisaPlatinum";
import VisaSignature from "../icons/banking/VisaSignature";
import Mada from "../icons/banking/Mada";
import { ChipsInfoProps } from "../chips/ChipsInfo";
import { CreditCardSkeleton } from "./CreditCardSkeleton";
import { NewChipsInfo } from '../chips/NewChipsInfo';

const LIGHT_CARD_CONTENT_OVERLAY = "rgba(21, 21, 21, 0.8)";

type DebitKey =
  | 'advance' | 'classic' | 'household' | 'premier'
  | 'premiertoptier' | 'private' | 'rowad' | 'salary';

const DEBIT_KEY: Partial<Record<string, DebitKey>> = {
  'Mada Card Advanced': 'advance',
  'Mada Card Generic': 'classic',
  'Mada Card Household': 'household',
  'Mada Card Premier': 'premier',
  'Mada Premier Top Tier': 'premiertoptier',
  'Mada Card Private': 'private',
  'Mada Card Rowad': 'rowad',
  'Mada Card Salary Card': 'salary',
};

const DEBIT_OVERLAYS: Record<string, ImageSourcePropType> = {
  advance_default_en: require("../../assets/images/creditCards/debit/advance_default_en.png"),
  advance_default_ar: require("../../assets/images/creditCards/debit/advance_default_ar.png"),
  advance_carousel_en: require("../../assets/images/creditCards/debit/advance_carousel_en.png"),
  advance_carousel_ar: require("../../assets/images/creditCards/debit/advance_carousel_ar.png"),
  classic_default_en: require("../../assets/images/creditCards/debit/classic_default_en.png"),
  classic_default_ar: require("../../assets/images/creditCards/debit/classic_default_ar.png"),
  classic_carousel_en: require("../../assets/images/creditCards/debit/classic_carousel_en.png"),
  classic_carousel_ar: require("../../assets/images/creditCards/debit/classic_carousel_ar.png"),
  household_default_en: require("../../assets/images/creditCards/debit/household_default_en.png"),
  household_default_ar: require("../../assets/images/creditCards/debit/household_default_ar.png"),
  household_carousel_en: require("../../assets/images/creditCards/debit/household_carousel_en.png"),
  household_carousel_ar: require("../../assets/images/creditCards/debit/household_carousel_ar.png"),
  premier_default_en: require("../../assets/images/creditCards/debit/premier_default_en.png"),
  premier_default_ar: require("../../assets/images/creditCards/debit/premier_default_ar.png"),
  premier_carousel_en: require("../../assets/images/creditCards/debit/premier_carousel_en.png"),
  premier_carousel_ar: require("../../assets/images/creditCards/debit/premier_carousel_ar.png"),
  premiertoptier_default_en: require("../../assets/images/creditCards/debit/premiertoptier_default_en.png"),
  premiertoptier_default_ar: require("../../assets/images/creditCards/debit/premiertoptier_default_ar.png"),
  premiertoptier_carousel_en: require("../../assets/images/creditCards/debit/premiertoptier_carousel_en.png"),
  premiertoptier_carousel_ar: require("../../assets/images/creditCards/debit/premiertoptier_carousel_ar.png"),
  private_default_en: require("../../assets/images/creditCards/debit/private_default_en.png"),
  private_default_ar: require("../../assets/images/creditCards/debit/private_default_ar.png"),
  private_carousel_en: require("../../assets/images/creditCards/debit/private_carousel_en.png"),
  private_carousel_ar: require("../../assets/images/creditCards/debit/private_carousel_ar.png"),
  rowad_default_en: require("../../assets/images/creditCards/debit/rowad_default_en.png"),
  rowad_default_ar: require("../../assets/images/creditCards/debit/rowad_default_ar.png"),
  rowad_carousel_en: require("../../assets/images/creditCards/debit/rowad_carousel_en.png"),
  rowad_carousel_ar: require("../../assets/images/creditCards/debit/rowad_carousel_ar.png"),
  salary_default_en: require("../../assets/images/creditCards/debit/salary_default_en.png"),
  salary_default_ar: require("../../assets/images/creditCards/debit/salary_default_ar.png"),
  salary_carousel_en: require("../../assets/images/creditCards/debit/salary_carousel_en.png"),
  salary_carousel_ar: require("../../assets/images/creditCards/debit/salary_carousel_ar.png"),
};

const DEBIT_VIRTUAL: Record<DebitKey, ImageSourcePropType> = {
  advance: require("../../assets/images/creditCards/debit/advance_virtual.png"),
  classic: require("../../assets/images/creditCards/debit/classic_virtual.png"),
  household: require("../../assets/images/creditCards/debit/household_virtual.png"),
  premier: require("../../assets/images/creditCards/debit/premier_virtual.png"),
  premiertoptier: require("../../assets/images/creditCards/debit/premiertoptier_virtual.png"),
  private: require("../../assets/images/creditCards/debit/private_virtual.png"),
  rowad: require("../../assets/images/creditCards/debit/rowad_virtual.png"),
  salary: require("../../assets/images/creditCards/debit/salary_virtual.png"),
};

// Solid card color behind the transparent default/carousel overlays (Figma card colors).
const DEBIT_SOLID_BG: Record<DebitKey, string> = {
  advance: "#2E2C31",
  classic: "#5D5D5D",
  household: "#3B2C2B",
  premier: "#473F3F",
  premiertoptier: "#383838",
  private: "#2A2A30",
  rowad: "#575B5D",
  salary: "#676767",
};

type CreditKey =
  | 'advance' | 'alfursan' | 'aqsat' | 'business' | 'cashback' | 'emirates'
  | 'muselowlimit' | 'museworld' | 'my' | 'noon' | 'platinummastercard'
  | 'platinumvisa' | 'premier' | 'premiertoptier' | 'qatarairways'
  | 'signature' | 'umlaty' | 'worldelite';

const CREDIT_KEY: Partial<Record<string, CreditKey>> = {
  'Advance': 'advance',
  'AlFursan': 'alfursan',
  'Aqsat': 'aqsat',
  'Business': 'business',
  'Cashback': 'cashback',
  'Emirates Infinite': 'emirates',
  'Muse Low Limit': 'muselowlimit',
  'Muse World': 'museworld',
  'My': 'my',
  'Noon': 'noon',
  'Mastercard Platinum': 'platinummastercard',
  'Platinum': 'platinumvisa',
  'Premier': 'premier',
  'Premier Top Tier': 'premiertoptier',
  'SAB Qatar Airways': 'qatarairways',
  'Signature': 'signature',
  'Umlaty Multi Currency': 'umlaty',
  'World Elite': 'worldelite',
};

const CREDIT_OVERLAYS: Record<string, ImageSourcePropType> = {
  advance_carousel_en: require("../../assets/images/creditCards/newcards/advance_carousel_en.png"),
  advance_carousel_ar: require("../../assets/images/creditCards/newcards/advance_carousel_ar.png"),
  advance_default_en: require("../../assets/images/creditCards/newcards/advance_default_en.png"),
  advance_default_ar: require("../../assets/images/creditCards/newcards/advance_default_ar.png"),
  alfursan_carousel_en: require("../../assets/images/creditCards/newcards/alfursan_carousel_en.png"),
  alfursan_carousel_ar: require("../../assets/images/creditCards/newcards/alfursan_carousel_ar.png"),
  alfursan_default_en: require("../../assets/images/creditCards/newcards/alfursan_default_en.png"),
  alfursan_default_ar: require("../../assets/images/creditCards/newcards/alfursan_default_ar.png"),
  aqsat_carousel_en: require("../../assets/images/creditCards/newcards/aqsat_carousel_en.png"),
  aqsat_carousel_ar: require("../../assets/images/creditCards/newcards/aqsat_carousel_ar.png"),
  aqsat_default_en: require("../../assets/images/creditCards/newcards/aqsat_default_en.png"),
  aqsat_default_ar: require("../../assets/images/creditCards/newcards/aqsat_default_ar.png"),
  business_carousel_en: require("../../assets/images/creditCards/newcards/business_carousel_en.png"),
  business_carousel_ar: require("../../assets/images/creditCards/newcards/business_carousel_ar.png"),
  business_default_en: require("../../assets/images/creditCards/newcards/business_default_en.png"),
  business_default_ar: require("../../assets/images/creditCards/newcards/business_default_ar.png"),
  cashback_carousel_en: require("../../assets/images/creditCards/newcards/cashback_carousel_en.png"),
  cashback_carousel_ar: require("../../assets/images/creditCards/newcards/cashback_carousel_ar.png"),
  cashback_default_en: require("../../assets/images/creditCards/newcards/cashback_default_en.png"),
  cashback_default_ar: require("../../assets/images/creditCards/newcards/cashback_default_ar.png"),
  emirates_carousel_en: require("../../assets/images/creditCards/newcards/emirates_carousel_en.png"),
  emirates_carousel_ar: require("../../assets/images/creditCards/newcards/emirates_carousel_ar.png"),
  emirates_default_en: require("../../assets/images/creditCards/newcards/emirates_default_en.png"),
  emirates_default_ar: require("../../assets/images/creditCards/newcards/emirates_default_ar.png"),
  muselowlimit_carousel_en: require("../../assets/images/creditCards/newcards/muselowlimit_carousel_en.png"),
  muselowlimit_carousel_ar: require("../../assets/images/creditCards/newcards/muselowlimit_carousel_ar.png"),
  muselowlimit_default_en: require("../../assets/images/creditCards/newcards/muselowlimit_default_en.png"),
  muselowlimit_default_ar: require("../../assets/images/creditCards/newcards/muselowlimit_default_ar.png"),
  museworld_carousel_en: require("../../assets/images/creditCards/newcards/museworld_carousel_en.png"),
  museworld_carousel_ar: require("../../assets/images/creditCards/newcards/museworld_carousel_ar.png"),
  museworld_default_en: require("../../assets/images/creditCards/newcards/museworld_default_en.png"),
  museworld_default_ar: require("../../assets/images/creditCards/newcards/museworld_default_ar.png"),
  my_carousel_en: require("../../assets/images/creditCards/newcards/my_carousel_en.png"),
  my_carousel_ar: require("../../assets/images/creditCards/newcards/my_carousel_ar.png"),
  my_default_en: require("../../assets/images/creditCards/newcards/my_default_en.png"),
  my_default_ar: require("../../assets/images/creditCards/newcards/my_default_ar.png"),
  noon_carousel_en: require("../../assets/images/creditCards/newcards/noon_carousel_en.png"),
  noon_carousel_ar: require("../../assets/images/creditCards/newcards/noon_carousel_ar.png"),
  noon_default_en: require("../../assets/images/creditCards/newcards/noon_default_en.png"),
  noon_default_ar: require("../../assets/images/creditCards/newcards/noon_default_ar.png"),
  platinummastercard_carousel_en: require("../../assets/images/creditCards/newcards/platinummastercard_carousel_en.png"),
  platinummastercard_carousel_ar: require("../../assets/images/creditCards/newcards/platinummastercard_carousel_ar.png"),
  platinummastercard_default_en: require("../../assets/images/creditCards/newcards/platinummastercard_default_en.png"),
  platinummastercard_default_ar: require("../../assets/images/creditCards/newcards/platinummastercard_default_ar.png"),
  platinumvisa_carousel_en: require("../../assets/images/creditCards/newcards/platinumvisa_carousel_en.png"),
  platinumvisa_carousel_ar: require("../../assets/images/creditCards/newcards/platinumvisa_carousel_ar.png"),
  platinumvisa_default_en: require("../../assets/images/creditCards/newcards/platinumvisa_default_en.png"),
  platinumvisa_default_ar: require("../../assets/images/creditCards/newcards/platinumvisa_default_ar.png"),
  premier_carousel_en: require("../../assets/images/creditCards/newcards/premier_carousel_en.png"),
  premier_carousel_ar: require("../../assets/images/creditCards/newcards/premier_carousel_ar.png"),
  premier_default_en: require("../../assets/images/creditCards/newcards/premier_default_en.png"),
  premier_default_ar: require("../../assets/images/creditCards/newcards/premier_default_ar.png"),
  premiertoptier_carousel_en: require("../../assets/images/creditCards/newcards/premiertoptier_carousel_en.png"),
  premiertoptier_carousel_ar: require("../../assets/images/creditCards/newcards/premiertoptier_carousel_ar.png"),
  premiertoptier_default_en: require("../../assets/images/creditCards/newcards/premiertoptier_default_en.png"),
  premiertoptier_default_ar: require("../../assets/images/creditCards/newcards/premiertoptier_default_ar.png"),
  qatarairways_carousel_en: require("../../assets/images/creditCards/newcards/qatarairways_carousel_en.png"),
  qatarairways_carousel_ar: require("../../assets/images/creditCards/newcards/qatarairways_carousel_ar.png"),
  qatarairways_default_en: require("../../assets/images/creditCards/newcards/qatarairways_default_en.png"),
  qatarairways_default_ar: require("../../assets/images/creditCards/newcards/qatarairways_default_ar.png"),
  signature_carousel_en: require("../../assets/images/creditCards/newcards/signature_carousel_en.png"),
  signature_carousel_ar: require("../../assets/images/creditCards/newcards/signature_carousel_ar.png"),
  signature_default_en: require("../../assets/images/creditCards/newcards/signature_default_en.png"),
  signature_default_ar: require("../../assets/images/creditCards/newcards/signature_default_ar.png"),
  umlaty_carousel_en: require("../../assets/images/creditCards/newcards/umlaty_carousel_en.png"),
  umlaty_carousel_ar: require("../../assets/images/creditCards/newcards/umlaty_carousel_ar.png"),
  umlaty_default_en: require("../../assets/images/creditCards/newcards/umlaty_default_en.png"),
  umlaty_default_ar: require("../../assets/images/creditCards/newcards/umlaty_default_ar.png"),
  worldelite_carousel_en: require("../../assets/images/creditCards/newcards/worldelite_carousel_en.png"),
  worldelite_carousel_ar: require("../../assets/images/creditCards/newcards/worldelite_carousel_ar.png"),
  worldelite_default_en: require("../../assets/images/creditCards/newcards/worldelite_default_en.png"),
  worldelite_default_ar: require("../../assets/images/creditCards/newcards/worldelite_default_ar.png"),
  advance_selection_en: require("../../assets/images/creditCards/newcards/advance_selection_en.png"),
  advance_selection_ar: require("../../assets/images/creditCards/newcards/advance_selection_ar.png"),
  alfursan_selection_en: require("../../assets/images/creditCards/newcards/alfursan_selection_en.png"),
  alfursan_selection_ar: require("../../assets/images/creditCards/newcards/alfursan_selection_ar.png"),
  aqsat_selection_en: require("../../assets/images/creditCards/newcards/aqsat_selection_en.png"),
  aqsat_selection_ar: require("../../assets/images/creditCards/newcards/aqsat_selection_ar.png"),
  business_selection_en: require("../../assets/images/creditCards/newcards/business_selection_en.png"),
  business_selection_ar: require("../../assets/images/creditCards/newcards/business_selection_ar.png"),
  cashback_selection_en: require("../../assets/images/creditCards/newcards/cashback_selection_en.png"),
  cashback_selection_ar: require("../../assets/images/creditCards/newcards/cashback_selection_ar.png"),
  emirates_selection_en: require("../../assets/images/creditCards/newcards/emirates_selection_en.png"),
  emirates_selection_ar: require("../../assets/images/creditCards/newcards/emirates_selection_ar.png"),
  muselowlimit_selection_en: require("../../assets/images/creditCards/newcards/muselowlimit_selection_en.png"),
  muselowlimit_selection_ar: require("../../assets/images/creditCards/newcards/muselowlimit_selection_ar.png"),
  museworld_selection_en: require("../../assets/images/creditCards/newcards/museworld_selection_en.png"),
  museworld_selection_ar: require("../../assets/images/creditCards/newcards/museworld_selection_ar.png"),
  my_selection_en: require("../../assets/images/creditCards/newcards/my_selection_en.png"),
  my_selection_ar: require("../../assets/images/creditCards/newcards/my_selection_ar.png"),
  noon_selection_en: require("../../assets/images/creditCards/newcards/noon_selection_en.png"),
  noon_selection_ar: require("../../assets/images/creditCards/newcards/noon_selection_ar.png"),
  platinummastercard_selection_en: require("../../assets/images/creditCards/newcards/platinummastercard_selection_en.png"),
  platinummastercard_selection_ar: require("../../assets/images/creditCards/newcards/platinummastercard_selection_ar.png"),
  platinumvisa_selection_en: require("../../assets/images/creditCards/newcards/platinumvisa_selection_en.png"),
  platinumvisa_selection_ar: require("../../assets/images/creditCards/newcards/platinumvisa_selection_ar.png"),
  premier_selection_en: require("../../assets/images/creditCards/newcards/premier_selection_en.png"),
  premier_selection_ar: require("../../assets/images/creditCards/newcards/premier_selection_ar.png"),
  premiertoptier_selection_en: require("../../assets/images/creditCards/newcards/premiertoptier_selection_en.png"),
  premiertoptier_selection_ar: require("../../assets/images/creditCards/newcards/premiertoptier_selection_ar.png"),
  qatarairways_selection_en: require("../../assets/images/creditCards/newcards/qatarairways_selection_en.png"),
  qatarairways_selection_ar: require("../../assets/images/creditCards/newcards/qatarairways_selection_ar.png"),
  signature_selection_en: require("../../assets/images/creditCards/newcards/signature_selection_en.png"),
  signature_selection_ar: require("../../assets/images/creditCards/newcards/signature_selection_ar.png"),
  umlaty_selection_en: require("../../assets/images/creditCards/newcards/umlaty_selection_en.png"),
  umlaty_selection_ar: require("../../assets/images/creditCards/newcards/umlaty_selection_ar.png"),
  worldelite_selection_en: require("../../assets/images/creditCards/newcards/worldelite_selection_en.png"),
  worldelite_selection_ar: require("../../assets/images/creditCards/newcards/worldelite_selection_ar.png"),
};

const CREDIT_DETAILED: Record<CreditKey, ImageSourcePropType> = {
  advance: require("../../assets/images/creditCards/newcards/advance_detailed.png"),
  alfursan: require("../../assets/images/creditCards/newcards/alfursan_detailed.png"),
  aqsat: require("../../assets/images/creditCards/newcards/aqsat_detailed.png"),
  business: require("../../assets/images/creditCards/newcards/business_detailed.png"),
  cashback: require("../../assets/images/creditCards/newcards/cashback_detailed.png"),
  emirates: require("../../assets/images/creditCards/newcards/emirates_detailed.png"),
  muselowlimit: require("../../assets/images/creditCards/newcards/muselowlimit_detailed.png"),
  museworld: require("../../assets/images/creditCards/newcards/museworld_detailed.png"),
  my: require("../../assets/images/creditCards/newcards/my_detailed.png"),
  noon: require("../../assets/images/creditCards/newcards/noon_detailed.png"),
  platinummastercard: require("../../assets/images/creditCards/newcards/platinummastercard_detailed.png"),
  platinumvisa: require("../../assets/images/creditCards/newcards/platinumvisa_detailed.png"),
  premier: require("../../assets/images/creditCards/newcards/premier_detailed.png"),
  premiertoptier: require("../../assets/images/creditCards/newcards/premiertoptier_detailed.png"),
  qatarairways: require("../../assets/images/creditCards/newcards/qatarairways_detailed.png"),
  signature: require("../../assets/images/creditCards/newcards/signature_detailed.png"),
  umlaty: require("../../assets/images/creditCards/newcards/umlaty_detailed.png"),
  worldelite: require("../../assets/images/creditCards/newcards/worldelite_detailed.png"),
};

// Solid card color behind the transparent carousel overlay (Figma card colors).
const CREDIT_SOLID_BG: Partial<Record<CreditKey, string>> = {
  advance: "#652F2E",
  alfursan: "#262626",
  aqsat: "#263C4E",
  business: "#998C83",
  cashback: "#0B3053",
  emirates: "#261C13",
  muselowlimit: "#8D8D8D",
  museworld: "#A28B4F",
  my: "#BE631F",
  noon: "#1D1D1D",
  platinummastercard: "#484848",
  platinumvisa: "#5E585A",
  premier: "#1A0F30",
  premiertoptier: "#353534",
  qatarairways: "#47011F",
  signature: "#474746",
  umlaty: "#10222D",
  worldelite: "#2A2A2A",
};

const CREDIT_VIRTUAL: Record<CreditKey, ImageSourcePropType> = {
  advance: require("../../assets/images/creditCards/newcards/advance_virtual.png"),
  alfursan: require("../../assets/images/creditCards/newcards/alfursan_virtual.png"),
  aqsat: require("../../assets/images/creditCards/newcards/aqsat_virtual.png"),
  business: require("../../assets/images/creditCards/newcards/business_virtual.png"),
  cashback: require("../../assets/images/creditCards/newcards/cashback_virtual.png"),
  emirates: require("../../assets/images/creditCards/newcards/emirates_virtual.png"),
  muselowlimit: require("../../assets/images/creditCards/newcards/muselowlimit_virtual.png"),
  museworld: require("../../assets/images/creditCards/newcards/museworld_virtual.png"),
  my: require("../../assets/images/creditCards/newcards/my_virtual.png"),
  noon: require("../../assets/images/creditCards/newcards/noon_virtual.png"),
  platinummastercard: require("../../assets/images/creditCards/newcards/platinummastercard_virtual.png"),
  platinumvisa: require("../../assets/images/creditCards/newcards/platinumvisa_virtual.png"),
  premier: require("../../assets/images/creditCards/newcards/premier_virtual.png"),
  premiertoptier: require("../../assets/images/creditCards/newcards/premiertoptier_virtual.png"),
  qatarairways: require("../../assets/images/creditCards/newcards/qatarairways_virtual.png"),
  signature: require("../../assets/images/creditCards/newcards/signature_virtual.png"),
  umlaty: require("../../assets/images/creditCards/newcards/umlaty_virtual.png"),
  worldelite: require("../../assets/images/creditCards/newcards/worldelite_virtual.png"),
};

// Figma display names that differ from the "{cardName} Credit Card" fallback.
const CARD_DISPLAY_NAME: Partial<Record<string, string>> = {
  'AlFursan': 'Alfursan Credit Card',
  'Signature': 'SAB Signature Credit Card',
  'Platinum': 'Platinum Visa Credit Card',
  'My': 'My Card',
  'Aqsat': 'Aqsat Card',
  'World Elite': 'World Elite Exclusive Credit Card',
  'Mastercard Platinum': 'Platinum Mastercard Credit Card',
  'SAB Qatar Airways': 'Qatar Airways Credit Card',
  'Mada Card Advanced': 'Advance Mada Card',
  'Mada Card Generic': 'Classic Mada Card',
  'Mada Card Household': 'Household Mada Card',
  'Mada Card Premier': 'Premier Mada Card',
  'Mada Card Private': 'Private Mada Card',
  'Mada Card Rowad': 'Rowad Mada Card',
  'Mada Card Salary Card': 'Salary Mada Card',
  'Mada Premier Top Tier': 'Premier Top Tier Mada Card',
};

interface CreditCardProps {
  cardName:
  "Default" |
  "Emirates Infinite" |
  "AlFursan" |
  "Signature" |
  "Cashback" |
  "Premier" |
  "Advance" |
  "Platinum" |
  "My" |
  "Business" |
  "Titanium" |
  "Aqsat" |
  "World Elite" |
  "Muse World" |
  "Muse Low Limit" |
  "Noon" |
  "Umlaty Multi Currency" |
  "DebitCard" |
  "Mada Card Advanced" |
  "Mada Card Generic" |
  "Mada Card Household" |
  "Mada Card Premier" |
  "Mada Card Private" |
  "Mada Card Rowad" |
  "Mada Card Salary Card" |
  "Mada Premier Top Tier" |
  "Arab National Bank Generic Card" |
  "Alinma Bank Generic Card" |
  "Banque Saudi Fransi Generic Card" |
  "Bilad Bank Generic Card" |
  "Jazira Bank Generic Card" |
  "Rajhi Generic Card" |
  "Riyadh Bank Generic Card" |
  "SNB Generic Card" |
  "D360 Generic Card" |
  "GIB Generic Card" |
  "Meem Generic Card" |
  "Neo Generic Card" |
  "SAIB Generic Card" |
  "STC Generic Card" |
  "Vision Bank Generic Card" |
  "SAB Qatar Airways" |
  "Mastercard Platinum" |
  "Premier Top Tier";
  cardHolderName?: string;
  defaultCardName: string;
  cardNumber?: string;
  availableLimitLabel?: string;
  availableLimit?: number;
  creditLimitLabel?: string;
  creditLimit?: number;
  currenciesLabel?: string;
  numOfCurrencies?: number;
  freeze?: boolean;
  statusOverlay?: "blocked" | "expiring-soon" | "inactive";
  cardType?: 'visa' | 'mastercard' | 'visa-platinum' | 'visa-signature' | 'mada';
  creditLimitProgress?: number;
  view: "default" | "detailed" | "virtual" | "carousel" | "selection";
  isViewAll?: boolean;
  statusChipsProps?: ChipsInfoProps;
  //Only for NovemberRelease after that this props will be remove
  novReleaseFlag?: boolean;
  chipIconChip?: ReactElement;
  chipText?: string;
  accountNumber?: string;
  accountNumberLabel?: string;
  loading?: boolean;
  isSolidBg?: boolean;
  bgColor?: string;
  hiddenCurrency?: boolean;
  overrideStyles?: any;
  cardsBackgroundStyles?: any;
  onInfoPress?: () => void;
  existingName?: string;
  numberOfLines?: number;
  titleWidth?: number;
  imageUrl?: string;
  hideCardInfo?: boolean;
  isBankType?: boolean;
  isCardLogo?: boolean;
  isLightCardImage?: boolean;
}

export const CreditCard: FC<CreditCardProps> = ({
  cardName="Default",
  defaultCardName="Defaut Credit Card",
  cardNumber,
  availableLimit,
  availableLimitLabel,
  creditLimit,
  creditLimitLabel,
  currenciesLabel,
  numOfCurrencies,
  freeze = false,
  statusOverlay,
  cardType = "visa",
  creditLimitProgress,
  view = 'default',
  isViewAll = false,
  cardHolderName,
  statusChipsProps,
  //NovemberRelease after that this props will be remove
  novReleaseFlag=false,
  chipIconChip,
  chipText,
  accountNumber,
  accountNumberLabel="Account Number",
  loading,
  isSolidBg=false,
  bgColor,
  hiddenCurrency,
  overrideStyles,
  cardsBackgroundStyles,
  onInfoPress,
  existingName,
  numberOfLines=2,
  titleWidth,
  imageUrl,
  hideCardInfo = false,
  isBankType = false,
  isCardLogo = false,
  isLightCardImage = false,
}) => {
  const { theme } = useTheme();
  const isRtl = I18nManager.isRTL;
  const [fallback, setFallback] = useState(false);

  const cardLogo = useMemo(() => {
    switch (cardType) {
      case "visa":
        return <Visa />;
      case "mastercard":
        return <Mastercard />;
      case "visa-platinum":
        return <VisaPlatinum />;
      case "visa-signature":
        return <VisaSignature />;
      case "mada":
        return <Mada />;
    }
  }, [cardType]);


   const cardFullName = useMemo(() => {
    if (cardName === "Default" || cardName === "DebitCard") {
      return defaultCardName;
    }
    const mapped = CARD_DISPLAY_NAME[cardName];
    if (mapped) {
      return mapped;
    } else if (cardName === "Umlaty Multi Currency") {
      return `${cardName} Card`;
    } else if (cardName.endsWith(" Generic Card")) {
      return cardName;
    } else {
      return `${cardName} Credit Card`;
    }
  }, [cardName, defaultCardName]);

  const isVirtualView = useMemo(() => view === 'virtual', [view]);
  const isCarouselView = useMemo(() => view === 'carousel', [view]);
  const isDetailedView = useMemo(() => view === 'detailed', [view]);
  const isDefaultView = useMemo(() => view === 'default', [view]);
  const isSelectionView = useMemo(() => view === 'selection', [view]);

  const isDebitCard = cardName === "DebitCard";

  const debitKey = DEBIT_KEY[cardName];
  const creditKey = CREDIT_KEY[cardName];
  const cardOverlay = useMemo(() => {
    if (isVirtualView) return undefined;
    // Credit detailed renders its own opaque image, so it needs no overlay.
    if (creditKey && isDetailedView) return undefined;
    const lang = I18nManager.isRTL ? "ar" : "en";
    if (debitKey) {
      const debitLayout = isCarouselView || isSelectionView ? "carousel" : "default";
      return DEBIT_OVERLAYS[`${debitKey}_${debitLayout}_${lang}`];
    }
    if (creditKey) {
      const layout = isSelectionView ? "selection" : isCarouselView ? "carousel" : "default";
      return CREDIT_OVERLAYS[`${creditKey}_${layout}_${lang}`];
    }
    return undefined;
  }, [debitKey, creditKey, isVirtualView, isDetailedView, isCarouselView, isSelectionView]);
  const virtualOverride = debitKey ? DEBIT_VIRTUAL[debitKey] : creditKey ? CREDIT_VIRTUAL[creditKey] : undefined;
  const defaultOverride = creditKey ? CREDIT_DETAILED[creditKey] : undefined;
  // Carousel/default/selection credit overlays bake in the SAB logo, chip and card-type branding,
  // so the separate cardLogo would duplicate it.
  const overlayHasBranding = !!creditKey && !!cardOverlay;

  // Solid color + transparent overlay for the states with no opaque base image:
  // all debit (default/carousel/detailed) and credit default/carousel/selection. Credit detailed
  // and virtual keep their opaque image backgrounds.
  const autoSolidBg = useMemo(() => {
    if (isVirtualView) return undefined;
    if (debitKey) return DEBIT_SOLID_BG[debitKey];
    if (creditKey && (isCarouselView || isDefaultView || isSelectionView)) return CREDIT_SOLID_BG[creditKey];
    return undefined;
  }, [debitKey, creditKey, isVirtualView, isCarouselView, isDefaultView, isSelectionView]);
  const useSolidBg = isSolidBg || !!autoSolidBg;
  const resolvedBgColor = bgColor ?? autoSolidBg;

  const defaultBackgroundImage = useMemo(() => {
    switch (cardName) {
      case 'Emirates Infinite':
        return require(`../../assets/images/creditCards/default/EmiratesInfinite.png`);
      case 'Platinum':
        return require(`../../assets/images/creditCards/default/Platinum.png`);
      case 'Cashback':
        return require(`../../assets/images/creditCards/default/Cashbacknew.png`);
      case 'My':
        return require(`../../assets/images/creditCards/default/MyNew.png`);
      case 'AlFursan':
        return require(`../../assets/images/creditCards/default/AlFursan.png`);
      case 'Signature':
        return require(`../../assets/images/creditCards/default/Signature.png`);
      case 'Premier':
        return require(`../../assets/images/creditCards/default/Premier.png`);
      case 'Business':
        return require(`../../assets/images/creditCards/default/Business.png`);
      case 'Advance':
        return require(`../../assets/images/creditCards/default/Advance.png`);
      case 'Titanium':
        return require(`../../assets/images/creditCards/default/Titanium.png`);
      case 'Aqsat':
        return require(`../../assets/images/creditCards/default/Aqsat.png`);
      case 'World Elite':
        return require(`../../assets/images/creditCards/default/WorldElite.png`);
      case 'Muse World':
        return require(`../../assets/images/creditCards/default/MuseWorld.png`);
      case 'Muse Low Limit':
        return require(`../../assets/images/creditCards/default/MuseLowLimit.png`);
      case 'Noon':
        return require(`../../assets/images/creditCards/default/Noon.png`);
      case 'Umlaty Multi Currency':
        {
          if (view === 'carousel')
            return require(`../../assets/images/creditCards/virtual/UmlatyMultiCurrency.png`)
          else return require(`../../assets/images/creditCards/default/UmlatyMultiCurrency.png`)
        }
      case 'Default':
          return require(`../../assets/images/creditCards/default/Default.png`);
      case 'DebitCard':
        return require(`../../assets/images/creditCards/default/DebitDefault.png`);
      case 'SAB Qatar Airways':
        return require(`../../assets/images/creditCards/default/QatarAirwaysDefault.png`);
      case 'Mastercard Platinum':
        return require(`../../assets/images/creditCards/default/MastercardPlatinum.png`);
      case 'Premier Top Tier':
        return require(`../../assets/images/creditCards/default/PremierTopTier.png`);
      case 'Alinma Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Alinma.png`);
      case 'Banque Saudi Fransi Generic Card':
        return require(`../../assets/images/creditCards/virtual/BanqueSaudiFransi.png`);
      case 'Bilad Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Bilad.png`);
      case 'Jazira Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Jazira.png`);
      case 'Rajhi Generic Card':
        return require(`../../assets/images/creditCards/virtual/Rajhi.png`);
      case 'Riyadh Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Riyadh.png`);
      case 'SNB Generic Card':
        return require(`../../assets/images/creditCards/virtual/SNB.png`);
      case 'D360 Generic Card':
        return require(`../../assets/images/creditCards/default/D360.png`);
      case 'GIB Generic Card':
        return require(`../../assets/images/creditCards/default/GIB.png`);
      case 'Meem Generic Card':
        return require(`../../assets/images/creditCards/default/Meem.png`);
      case 'Neo Generic Card':
        return require(`../../assets/images/creditCards/default/Neo.png`);
      case 'SAIB Generic Card':
        return require(`../../assets/images/creditCards/default/SAIB.png`);
      case 'STC Generic Card':
        return require(`../../assets/images/creditCards/default/STC.png`);
      case 'Vision Bank Generic Card':
        return require(`../../assets/images/creditCards/default/Vision.png`);
    }
  }, [cardName]);

  const virtualCardImage = useMemo(() => {
    switch (cardName) {
      case 'Emirates Infinite':
        return require(`../../assets/images/creditCards/virtual/EmiratesInfinite.png`);
      case 'Platinum':
        return require(`../../assets/images/creditCards/virtual/Platinum.png`);
      case 'Cashback':
        return require(`../../assets/images/creditCards/virtual/Cashback.png`);
      case 'My':
        return require(`../../assets/images/creditCards/virtual/MyNew.png`);
      case 'AlFursan':
        return require(`../../assets/images/creditCards/virtual/AlFursan.png`);
      case 'Signature':
        return require(`../../assets/images/creditCards/virtual/Signature.png`);
      case 'Premier':
        return require(`../../assets/images/creditCards/virtual/Premier.png`);
      case 'Business':
        return require(`../../assets/images/creditCards/virtual/Business.png`);
      case 'Advance':
        return require(`../../assets/images/creditCards/virtual/Advance.png`);
      case 'Titanium':
        return require(`../../assets/images/creditCards/virtual/Titanium.png`);
      case 'Aqsat':
        return require(`../../assets/images/creditCards/virtual/Aqsat.png`);
      case 'World Elite':
        return require(`../../assets/images/creditCards/virtual/WorldElite.png`);
      case 'Muse World':
        return require(`../../assets/images/creditCards/virtual/MuseWorld.png`);
      case 'Muse Low Limit':
        return require(`../../assets/images/creditCards/virtual/MuseLowLimit.png`);
      case 'Noon':
        return require(`../../assets/images/creditCards/virtual/Noon.png`);
      case 'Umlaty Multi Currency':
        return require(`../../assets/images/creditCards/virtual/UmlatyMultiCurrency.png`);
      case 'Default':
          return require(`../../assets/images/creditCards/default/Default.png`);  
      case 'DebitCard':
            return require(`../../assets/images/creditCards/default/DebitDefault.png`);
      case 'Mada Card Advanced':
              return require(`../../assets/images/creditCards/virtual/MadaCardAdvance.png`);
      case 'Mada Card Generic':
                return require(`../../assets/images/creditCards/virtual/MadaCardGeneric.png`); 
      case 'Mada Card Household':
                return require(`../../assets/images/creditCards/virtual/MadaCardHousehold.png`); 
      case 'Mada Card Premier':
        return require(`../../assets/images/creditCards/virtual/MadaCardPremier.png`);
      case 'Mada Premier Top Tier':
                return require(`../../assets/images/creditCards/virtual/MadaPremierTopTier.png`);
      case 'Mada Card Private':
                return require(`../../assets/images/creditCards/virtual/MadaCardPrivate.png`);  
      case 'Mada Card Rowad':
                return require(`../../assets/images/creditCards/virtual/MadaCardRowad.png`);  
      case 'Mada Card Salary Card':
        return require(`../../assets/images/creditCards/virtual/MadaCardSalaryCard.png`);
      case 'Arab National Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/ANB.png`);
      case 'Alinma Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Alinma.png`);
      case 'Banque Saudi Fransi Generic Card':
        return require(`../../assets/images/creditCards/virtual/BanqueSaudiFransi.png`);
      case 'Bilad Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Bilad.png`);
      case 'Jazira Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Jazira.png`);
      case 'Rajhi Generic Card':
        return require(`../../assets/images/creditCards/virtual/Rajhi.png`);
      case 'Riyadh Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Riyadh.png`);
      case 'SNB Generic Card':
        return require(`../../assets/images/creditCards/virtual/SNB.png`);
      case 'D360 Generic Card':
        return require(`../../assets/images/creditCards/virtual/D360.png`);
      case 'GIB Generic Card':
        return require(`../../assets/images/creditCards/virtual/GIB.png`);
      case 'Meem Generic Card':
        return require(`../../assets/images/creditCards/virtual/Meem.png`);
      case 'Neo Generic Card':
        return require(`../../assets/images/creditCards/virtual/Neo.png`);
      case 'SAIB Generic Card':
        return require(`../../assets/images/creditCards/virtual/SAIB.png`);
      case 'STC Generic Card':
        return require(`../../assets/images/creditCards/virtual/STC.png`);
      case 'Vision Bank Generic Card':
        return require(`../../assets/images/creditCards/virtual/Vision.png`);
      case 'SAB Qatar Airways':
        return require(`../../assets/images/creditCards/virtual/QatarAirways.png`);
      case 'Mastercard Platinum':
        return require(`../../assets/images/creditCards/virtual/MastercardPlatinum.png`);
      case 'Premier Top Tier':
        return require(`../../assets/images/creditCards/virtual/PremierTopTier.png`);
    }
  }, [cardName]);

  const imageDimensions = useMemo(() => {
    if (isViewAll) {
      return { width: actuatedNormalize(73), height: actuatedNormalize(46) };
    } else {
      switch (view) {
        case "default":
        case "detailed":
          return { width: actuatedNormalize(342), height: actuatedNormalize(172) };
        case "carousel":
          return { width: actuatedNormalize(200), height: actuatedNormalize(100) };
        case "selection":
          return { width: actuatedNormalize(306), height: actuatedNormalize(100) };
        case "virtual":
          return { width: actuatedNormalize(325), height: actuatedNormalize(203) };
      }
    }
  }, [view, cardName]);

  const freezeIconSize = useMemo(() => {
    if (isCarouselView || isSelectionView) {
      return { height: 26, width: 24 }
    }
    if (isViewAll) {
      return { height: 18, width: 16 }
    }
    else return { height: 52, width: 48 }
  }, [isCarouselView, isSelectionView, isViewAll])

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      height: imageDimensions.height,
      width: "100%",
      borderRadius: radiusL,
      overflow: "hidden",
    },
    cardBackgroundImage: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: radiusL,
    },
    lightCardOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: LIGHT_CARD_CONTENT_OVERLAY,
      borderRadius: radiusL,
    },
    cardContent: {
      position: "relative",
      zIndex: 1,
      width: imageDimensions.width,
      height: imageDimensions.height,
    },
    titleWrapper: {
      display: "flex",
      flexDirection: isCarouselView && novReleaseFlag ? "column":"row",
      ...(isCarouselView && novReleaseFlag && { gap: actuatedNormalize(4) }),
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    cardsBackground: {
      width: imageDimensions.width,
      height: imageDimensions.height,
      borderRadius: radiusL,
    },
    cardInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'flex-start',
      gap: cardName === 'Umlaty Multi Currency' || cardName === "SAB Qatar Airways"  && I18nManager.isRTL ? 0 :spacingXXS
    },
    limitContainer: {
      display: "flex",
      flexDirection: "column",
      gap: isCarouselView || isSelectionView ? 0 : spacingXXS
    },
    limitLabels: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    limitText: {
      display: "flex",
      flexDirection: I18nManager.isRTL? "row-reverse" : "row",
      alignItems: "center",
      gap: spacingXXS
    },
    cardLogo: {
      position: "absolute",
      bottom: spacingXS,
      // Carousel nov-release Default/Debit: keep LTR on the end side (right)
      // and RTL on the start side (left) so chip/logo reverse without overlapping.
      ...(isCarouselView &&
      novReleaseFlag &&
      (cardName === "Default" || cardName === "DebitCard")
        ? { end: spacingXS }
        : I18nManager.isRTL
          ? { left: isCarouselView ? spacingXS : spacingS }
          : { right: isCarouselView ? spacingXS : spacingS }),
    },
    iconWrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: actuatedNormalize(48),
      width: actuatedNormalize(48),
      borderRadius: 100,
      backgroundColor: theme.primarycolor4static
    },
    freezeCover: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: radiusS,
      height: imageDimensions.height,
      width: imageDimensions.width,
      backgroundColor: 'transparent',
      overflow: 'hidden'
      
    },
    blurContainer: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      borderRadius: radiusS,
      height: imageDimensions.height,
      width: imageDimensions.width,
    },
    content: {
      width: imageDimensions.width,
      height: imageDimensions.height,
      borderRadius: radiusS,
      display: "flex",
      flexDirection: "column",
      gap: isCarouselView || isSelectionView ? 0 : ((currenciesLabel && statusChipsProps) ? I18nManager.isRTL ? spacingS : spacingXS : !isCarouselView && I18nManager.isRTL  ? 0 : spacingS),
      justifyContent: isCarouselView || isSelectionView ? "space-between" : "flex-start",
      // padding: isCarouselView ? spacingXS : spacingS
      paddingVertical: isSelectionView ? actuatedNormalize(11) : isCarouselView ? spacing1XS : spacingS,
      paddingHorizontal: isSelectionView ? actuatedNormalize(12) : isCarouselView ? spacingXS : spacingS,
    },
    currencyInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'flex-start',
      gap: 0,
    },
    statusContainer: {
      position: "absolute",
      bottom: spacingS,
      ...(I18nManager.isRTL
        ? { right: isCarouselView ? spacingXS : spacingS }
        : { left: isCarouselView ? spacingXS : spacingS }),
    },
    statusPill: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: actuatedNormalize(3),
      paddingHorizontal: actuatedNormalize(8),
      borderRadius: actuatedNormalize(100),
      borderWidth: 1,
    },
    accountNumber:{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    }
  });

  const renderStatusPill = () => {
    if (!statusChipsProps) return null;
    return (
      <View style={styles.statusContainer}>
        <NewChipsInfo state={statusChipsProps.state} label={statusChipsProps.label} />
      </View>
    );
  };

   const renderCardContent = () => (
     (cardNumber && isVirtualView) ?
      <View
  style={{
    position: "absolute",bottom: cardName === "SAB Qatar Airways" ? spacingXL : spacingM,width: imageDimensions.width,paddingHorizontal: spacingS,flexDirection: "row",justifyContent: "flex-start",alignItems: "flex-start",writingDirection: "ltr",transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }}
>
<Text
    size={fontLarge}
    overrideStyles={{ fontFamily: fonts.HSBC_Medium,transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]}}
    variant="primarycolor4static"
  >
    {cardNumber}
  </Text>
</View>: <>
    {isDefaultView ? <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <View style={styles.cardInfo}>
            <Text
              size={fontMediumLarge}
              numberOfLines={numberOfLines}
              variant="primarycolor4static"
              overrideStyles={{
                fontFamily: fonts.HSBC_Bold,
                width: titleWidth ? titleWidth : "auto",
                textAlign: 'left',
                ...(cardName === "SAB Qatar Airways" && { lineHeight: lineHeightMediumLarge }),
              }}
            >
              {existingName ? existingName : cardFullName}
            </Text>
            <Text bold variant="primarycolor4static" overrideStyles={{ lineHeight: lineHeightMediumLarge }}>{cardNumber}</Text>
          </View>
        </View>
        {renderStatusPill()}
        {!isDebitCard && !isCardLogo && !overlayHasBranding && <View style={styles.cardLogo}>
          <Text variant="primarycolor4static">{cardLogo}</Text>
        </View>}
      </View>
    : isVirtualView ? <></> : <View style={styles.content}>
        <View style={styles.titleWrapper}>
          <View style={styles.cardInfo}>
            <Text
                 size={isSelectionView ? fontSmall : isCarouselView ? fontSmallMedium : fontMediumLarge}
                 numberOfLines={isSelectionView || (isCarouselView && !novReleaseFlag) ? 1 : numberOfLines}
              variant="primarycolor4static"
              overrideStyles={{
                fontFamily: isSelectionView || isCarouselView ? fonts.HSBC_Bold : fonts.HSBC_Medium,
                width: titleWidth ? titleWidth : isSelectionView ? actuatedNormalize(180) : isCarouselView ? novReleaseFlag ? "auto" : isRtl ? actuatedNormalize(140) : actuatedNormalize(130) : "auto",
                textAlign: 'left',
                ...(cardName === "SAB Qatar Airways" && {
                    lineHeight: lineHeightMediumLarge,
                }),
              }}
              bold={isCarouselView || isSelectionView}
            >
              {existingName ? existingName : cardFullName}
            </Text>
            {(cardName === 'Umlaty Multi Currency' && cardHolderName && !isCarouselView && !isSelectionView) && <Text variant="primarycolor4static" size={fontSmallMedium} overrideStyles={{ textAlign: 'left',lineHeight:lineHeightSmallMedium}}>{cardHolderName}</Text>}
            {((!isCarouselView || !novReleaseFlag) || isSelectionView) && <Text variant="primarycolor4static" size={isSelectionView ? fontXXSmall : isCarouselView ? fontSmall : undefined} overrideStyles={{lineHeight: isSelectionView ? lineHeightXSmall : lineHeightMediumLarge}}>{cardNumber}</Text>}
          </View>
          {isCarouselView || isSelectionView ? (isCarouselView && novReleaseFlag ? <Text variant="primarycolor4static" bold size={fontXXSmall}>{cardNumber?.slice(0, 4)}</Text> : <></>) : cardName === "Umlaty Multi Currency" || hideCardInfo ? <></>  : <TouchableOpacity onPress={onInfoPress} ><View style={styles.iconWrapper}><CardInfo /></View></TouchableOpacity>}
        </View>
        {cardName === "Umlaty Multi Currency" ? (
          isCarouselView || isSelectionView ? <></> : (
          <View style={styles.currencyInfo}>
            <Text size={fontMedium} variant="primarycolor4static" overrideStyles={{lineHeight:lineHeightMedium}} >{currenciesLabel}</Text>
            <Text variant="primarycolor4static" size={fontLarge} overrideStyles={{ fontFamily: fonts.HSBC_Medium,lineHeight:lineHeightLarge}}>{numOfCurrencies}</Text>
          </View>
          )
        ) : (<View style={styles.limitContainer}>
          <View style={styles.limitLabels}>
            {!novReleaseFlag && !isSelectionView && <Text size={isCarouselView ? fontXXSmall : fontMediumLarge} variant="primarycolor4static">{availableLimitLabel}</Text>}
            {!isCarouselView && !isSelectionView && !isBankType && <Text variant="primarycolor4static">{creditLimitLabel}</Text>}
          </View>
          {!isCarouselView && !isSelectionView && !isBankType && (
            <ProgressIndicator
              progress={creditLimitProgress || 0}
              containerColor={theme.primarycolor2_100}
              progressColor={theme.primarycolor4static}
            />
          )}
          <View style={styles.limitLabels}>
           {isCarouselView && novReleaseFlag ? cardName === "DebitCard" ?
            <View style={styles.accountNumber}> 
            
            <Text variant="primarycolor4static" size={fontXXSmall} bold>{accountNumberLabel}</Text>
            <Text variant="primarycolor4static" size={fontXXSmall} bold>{accountNumber}</Text>
        </View> 
               :
              <View style={styles.limitText}> 
               {
                chipIconChip 
               }
               <Text variant="primarycolor4static" size={fontSmall} bold>{chipText}</Text>
           </View> 
            : <View style={styles.limitText}>
              { hiddenCurrency ? (
             <Text variant="primarycolor4static" size={fontLarge} bold>
                      * * * * *
              </Text>
              ) :
                (
                <>
                <SarFont variant="primarycolor4static" size={fontLarge} lineHeight={lineHeightLarge} />
                <Text variant="primarycolor4static" overrideStyles={{lineHeight:lineHeightLarge}} size={fontLarge} bold>{availableLimit}</Text>
               </>
               )
              }
            </View>
            }
          
            {!isCarouselView && !isSelectionView && !isBankType && (
              <View style={styles.limitText}>
                <SarFont variant="primarycolor4static" size={fontLarge} lineHeight={lineHeightLarge} />
                <Text variant="primarycolor4static" overrideStyles={{lineHeight:lineHeightLarge}} size={fontLarge} bold>{creditLimit}</Text>
              </View>
            )}
          </View>
        
        </View>)}
        {(isDetailedView || (cardName === "Umlaty Multi Currency" && isCarouselView)) && renderStatusPill()}
       {!isDebitCard && !isCardLogo && !overlayHasBranding && <View style={styles.cardLogo}>
          <Text variant="primarycolor4static">{cardLogo}</Text>
        </View>}
        {isDebitCard && !isCardLogo && isCarouselView && <View style={styles.cardLogo}>
        <View style={styles.limitText}> 
               {
                chipIconChip 
               }
               <Text variant="primarycolor4static" size={fontSmall} bold>{chipText}</Text>
           </View> 
        </View>}

        
      </View>}
      { (freeze || statusOverlay) && <View style={styles.freezeCover}>
          <BlurView
            style={styles.blurContainer}
            blurType="light"
            blurAmount={1} 
          />
          {freeze ? (
            <Freeze height={actuatedNormalize(freezeIconSize.height)} width={actuatedNormalize(freezeIconSize.width)} fill={theme.primarycolor4static} />
          ) : statusOverlay === "blocked" ? (
            <Lock width={actuatedNormalize(14)} height={actuatedNormalize(18)} fill={theme.primarycolor4static} />
          ) : statusOverlay === "inactive" ? (
            <ErrorCircle width={actuatedNormalize(18)} height={actuatedNormalize(18)} fill={theme.primarycolor4static} />
          ) : (
            <Clock width={actuatedNormalize(18)} height={actuatedNormalize(18)} fill={theme.primarycolor4static} />
          )}
          </View>}
    </>
  );

  return (
    loading ? <CreditCardSkeleton view={view} /> :
    useSolidBg ?
    <View
    style={[
      styles.container,
      { backgroundColor: resolvedBgColor || theme.pfmEducation10,
        width: imageDimensions.width,
        height: imageDimensions.height, },

    ]}
  >
    {cardOverlay && (
      <View
      style={[styles.cardBackgroundImage]}
      pointerEvents="none"
      >
        <Image source={cardOverlay} style={{ width: "100%", height: "100%" }} resizeMode="stretch" />
      </View>
    )}
    {renderCardContent()}
  </View>:
    <View
      style={[
        styles.container,
        { width: imageDimensions.width, height: imageDimensions.height },
        overrideStyles,
      ]}
    >
      <ImageBackground
        source={
          imageUrl && !fallback
            ? { uri: imageUrl }
            : isVirtualView
              ? (virtualOverride ?? virtualCardImage)
              : (defaultOverride ?? defaultBackgroundImage)
        }
        style={[
          styles.cardBackgroundImage,
          styles.cardsBackground,
          cardsBackgroundStyles,
        ]}
        blurRadius={(freeze || statusOverlay) ? 5 : 0}
        onError={() => setFallback(true)}
        resizeMode="cover"
      />
      {isLightCardImage && <View style={styles.lightCardOverlay} pointerEvents="none" />}
      <View style={styles.cardContent}>{renderCardContent()}</View>
    </View>
    
  )
}


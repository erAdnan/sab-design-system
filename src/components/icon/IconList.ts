import { ImageSourcePropType } from "react-native";
import { FC } from "react";
import { SvgProps } from "react-native-svg";


import _1xpayments from "../../assets/svgs/light/banking/1xpayments.svg";
import account_actions from "../../assets/svgs/light/banking/account_actions.svg";
import account_add from "../../assets/svgs/light/banking/account_add.svg";
import account_info from "../../assets/svgs/light/banking/account_info.svg";
import account_linking from "../../assets/svgs/light/banking/account_linking.svg";
import add_money from "../../assets/svgs/light/banking/add_money.svg";
import addbills from "../../assets/svgs/light/banking/addbills.svg";
import autopay from "../../assets/svgs/light/banking/autopay.svg";
import autoplay from "../../assets/svgs/light/banking/autoplay.svg";
import baggage from "../../assets/svgs/light/banking/baggage.svg";
import bills_history from "../../assets/svgs/light/banking/bills-history.svg";
import bills from "../../assets/svgs/light/banking/bills.svg";
import bookmark from "../../assets/svgs/light/banking/bookmark.svg";
import calendar_custom from "../../assets/svgs/light/banking/calendar_custom.svg";
import calendar_today from "../../assets/svgs/light/banking/calendar_today.svg";
import calendar from "../../assets/svgs/light/banking/calendar.svg";
import card_add from "../../assets/svgs/light/banking/card_add.svg";
import card_international from "../../assets/svgs/light/banking/card_international.svg";
import card_lock from "../../assets/svgs/light/banking/card_lock.svg";
import card_manage from "../../assets/svgs/light/banking/card_manage.svg";
import card_onetime from "../../assets/svgs/light/banking/card_onetime.svg";
import card_scan from "../../assets/svgs/light/banking/card_scan.svg";
import card_security from "../../assets/svgs/light/banking/card_security.svg";
import card_services from "../../assets/svgs/light/banking/card_services.svg";
import card_stop from "../../assets/svgs/light/banking/card_stop.svg";
import card_temporary from "../../assets/svgs/light/banking/card_temporary.svg";
import card_visa from "../../assets/svgs/light/banking/card_visa.svg";
import card_wireless from "../../assets/svgs/light/banking/card_wireless.svg";
import card from "../../assets/svgs/light/banking/card.svg";
import cash_back from "../../assets/svgs/light/banking/cash_back.svg";
import contact_book from "../../assets/svgs/light/banking/contact_book.svg";
import currency from "../../assets/svgs/light/banking/currency.svg";
import digital_shop from "../../assets/svgs/light/banking/digital_shop.svg";
import document from "../../assets/svgs/light/banking/document.svg";
import donate_points from "../../assets/svgs/light/banking/donate_points.svg";
import donation from "../../assets/svgs/light/banking/donation.svg";
import driving_license from "../../assets/svgs/light/banking/driving_license.svg";
import esal_payment from "../../assets/svgs/light/banking/esal_payment.svg";
import exchange from "../../assets/svgs/light/banking/exchange.svg";
import favorite_transfer from "../../assets/svgs/light/banking/favorite_transfer.svg";
import folder from "../../assets/svgs/light/banking/folder.svg";
import future_transfers from "../../assets/svgs/light/banking/future_transfers.svg";
import govt_payment from "../../assets/svgs/light/banking/govt_payment.svg";
import graph from "../../assets/svgs/light/banking/graph.svg";
import hash from "../../assets/svgs/light/banking/hash.svg";
import history_international from "../../assets/svgs/light/banking/history_international.svg";
import home_loan from "../../assets/svgs/light/banking/home_loan.svg";
import hsbc_global from "../../assets/svgs/light/banking/hsbc_global.svg";
import iban from "../../assets/svgs/light/banking/iban.svg";
import icsab from "../../assets/svgs/light/banking/icsab.svg";
import id_card from "../../assets/svgs/light/banking/id_card.svg";
import id from "../../assets/svgs/light/banking/id.svg";
import international from "../../assets/svgs/light/banking/international.svg";
import investments from "../../assets/svgs/light/banking/investments.svg";
import ipo from "../../assets/svgs/light/banking/ipo.svg";
import key from "../../assets/svgs/light/banking/key.svg";
import language_ar from "../../assets/svgs/light/banking/language_ar.svg";
import language_en from "../../assets/svgs/light/banking/language_en.svg";
import login_locked from "../../assets/svgs/light/banking/login_locked.svg";
import login_settings from "../../assets/svgs/light/banking/login_settings.svg";
import login from "../../assets/svgs/light/banking/login.svg";
import local from "../../assets/svgs/light/banking/local.svg";
import loyalty_offers from "../../assets/svgs/light/banking/loyalty_offers.svg";
import loyalty from "../../assets/svgs/light/banking/loyalty.svg";
import make_transfer from "../../assets/svgs/light/banking/make_transfer.svg";
import manage_bills from "../../assets/svgs/light/banking/manage_bills.svg";
import map_atm from "../../assets/svgs/light/banking/map_atm.svg";
import map_bank from "../../assets/svgs/light/banking/map_bank.svg";
import media from "../../assets/svgs/light/banking/media.svg";
import mobile_profile from "../../assets/svgs/light/banking/mobile_profile.svg";
import mobile_tick from "../../assets/svgs/light/banking/mobile_tick.svg";
import mobile from "../../assets/svgs/light/banking/mobile.svg";
import moi_services from "../../assets/svgs/light/banking/moi_services.svg";
import my_accounts from "../../assets/svgs/light/banking/my_accounts.svg";
import nearby from "../../assets/svgs/light/banking/nearby.svg";
import nfc from "../../assets/svgs/light/banking/nfc.svg";
import nodata from "../../assets/svgs/light/banking/nodata.svg";
import notepad from "../../assets/svgs/light/banking/notepad.svg";
import online_transfer from "../../assets/svgs/light/banking/online_transfer.svg";
import open_new from "../../assets/svgs/light/banking/open_new.svg";
import passport from "../../assets/svgs/light/banking/passport.svg";
import payments from "../../assets/svgs/light/banking/payments.svg";
import pending_request from "../../assets/svgs/light/banking/pending_request.svg";
import personal_loan from "../../assets/svgs/light/banking/personal_loan.svg";
import pin from "../../assets/svgs/light/banking/pin.svg";
import plan from "../../assets/svgs/light/banking/plan.svg";
import points_breakdown from "../../assets/svgs/light/banking/points_breakdown.svg";
import prepaid from "../../assets/svgs/light/banking/prepaid.svg";
import qr_code from "../../assets/svgs/light/banking/qr_code.svg";
import quick_transfer from "../../assets/svgs/light/banking/quick_transfer.svg";
import redeem from "../../assets/svgs/light/banking/redeem.svg";
import refund from "../../assets/svgs/light/banking/refund.svg";
import registration from "../../assets/svgs/light/banking/registration.svg";
import request_pay from "../../assets/svgs/light/banking/request_pay.svg";
import rtp from "../../assets/svgs/light/banking/rtp.svg";
import sab_products from "../../assets/svgs/light/banking/sab_products.svg";
import sabbpay from "../../assets/svgs/light/banking/sabbpay.svg";
import sabbot from "../../assets/svgs/light/banking/sabbot.svg";
import sadad from "../../assets/svgs/light/banking/sadad.svg";
import sabtag from "../../assets/svgs/light/banking/sabtag.svg";
import security_settings from "../../assets/svgs/light/banking/security_settings.svg";
import sentence from "../../assets/svgs/light/banking/sentence.svg";
import shopping from "../../assets/svgs/light/banking/shopping.svg";
import split_pay from "../../assets/svgs/light/banking/split_pay.svg";
import split from "../../assets/svgs/light/banking/split.svg";
import statement from "../../assets/svgs/light/banking/statement.svg";
import telecommunication from "../../assets/svgs/light/banking/telecommunication.svg";
import timer from "../../assets/svgs/light/banking/timer.svg";
import traffic from "../../assets/svgs/light/banking/traffic.svg";
import tranfers from "../../assets/svgs/light/banking/tranfers.svg";
import travel from "../../assets/svgs/light/banking/travel.svg";
import verify from "../../assets/svgs/light/banking/verify.svg";
import virtual_cards from "../../assets/svgs/light/banking/virtual_cards.svg";
import voucher from "../../assets/svgs/light/banking/voucher.svg";
import wealth_mgmt from "../../assets/svgs/light/banking/wealth_mgmt.svg";
import movies from "../../assets/svgs/light/banking/movies.svg";
import beauty from "../../assets/svgs/light/banking/beauty.svg";
import kids from "../../assets/svgs/light/banking/kids.svg";
import gaming from "../../assets/svgs/light/banking/gaming.svg";
import calculator from "../../assets/svgs/light/banking/calculator.svg";
import snowflake from "../../assets/svgs/light/banking/snowflake.svg";
import leaf from "../../assets/svgs/light/banking/leaf.svg";
import watch from "../../assets/svgs/light/banking/watch.svg";
import placeholder from "../../assets/svgs/light/banking/placeholder.svg";
import household from "../../assets/svgs/light/banking/household.svg";
import alawwal_pay from "../../assets/svgs/light/banking/alawwal_pay.svg";
import dual_user from "../../assets/svgs/light/banking/dual_user.svg";
import shield_lock from "../../assets/svgs/light/banking/shield_lock.svg";
import tag from "../../assets/svgs/light/banking/tag.svg";
import card_info from "../../assets/svgs/light/banking/card_info.svg";
import transfers from "../../assets/svgs/light/banking/transfers.svg";
import growth from "../../assets/svgs/light/banking/growth.svg";
import savings_jar from "../../assets/svgs/light/banking/savings_jar.svg";
import bank_vault from "../../assets/svgs/light/banking/bank_vault.svg";
import family from "../../assets/svgs/light/banking/family.svg";


// ---- Dark Banking SVG Imports ----
import _1xpayments_dark from "../../assets/svgs/dark/banking/1xpayments.svg";
import account_actions_dark from "../../assets/svgs/dark/banking/account_actions.svg";
import account_add_dark from "../../assets/svgs/dark/banking/account_add.svg";
import account_info_dark from "../../assets/svgs/dark/banking/account_info.svg";
import account_linking_dark from "../../assets/svgs/dark/banking/account_linking.svg";
import add_money_dark from "../../assets/svgs/dark/banking/add_money.svg";
import addbills_dark from "../../assets/svgs/dark/banking/addbills.svg";
import autopay_dark from "../../assets/svgs/dark/banking/autopay.svg";
import autoplay_dark from "../../assets/svgs/dark/banking/autoplay.svg";
import baggage_dark from "../../assets/svgs/dark/banking/baggage.svg";
import bills_history_dark from "../../assets/svgs/dark/banking/bills-history.svg";
import bills_dark from "../../assets/svgs/dark/banking/bills.svg";
import bookmark_dark from "../../assets/svgs/dark/banking/bookmark.svg";
import calendar_dark from "../../assets/svgs/dark/banking/calendar.svg";
import calendar_custom_dark from "../../assets/svgs/dark/banking/calendar_custom.svg";
import calendar_today_dark from "../../assets/svgs/dark/banking/calendar_today.svg";
import card_dark from "../../assets/svgs/dark/banking/card.svg";
import card_add_dark from "../../assets/svgs/dark/banking/card_add.svg";
import card_info_dark from "../../assets/svgs/dark/banking/card_info.svg";
import card_international_dark from "../../assets/svgs/dark/banking/card_international.svg";
import card_lock_dark from "../../assets/svgs/dark/banking/card_lock.svg";
import card_manage_dark from "../../assets/svgs/dark/banking/card_manage.svg";
import card_onetime_dark from "../../assets/svgs/dark/banking/card_onetime.svg";
import card_scan_dark from "../../assets/svgs/dark/banking/card_scan.svg";
import card_security_dark from "../../assets/svgs/dark/banking/card_security.svg";
import card_services_dark from "../../assets/svgs/dark/banking/card_services.svg";
import card_stop_dark from "../../assets/svgs/dark/banking/card_stop.svg";
import card_temporary_dark from "../../assets/svgs/dark/banking/card_temporary.svg";
import card_visa_dark from "../../assets/svgs/dark/banking/card_visa.svg";
import card_wireless_dark from "../../assets/svgs/dark/banking/card_wireless.svg";
import cash_back_dark from "../../assets/svgs/dark/banking/cash_back.svg";
import contact_book_dark from "../../assets/svgs/dark/banking/contact_book.svg";
import currency_dark from "../../assets/svgs/dark/banking/currency.svg";
import digital_shop_dark from "../../assets/svgs/dark/banking/digital_shop.svg";
import document_dark from "../../assets/svgs/dark/banking/document.svg";
import donate_points_dark from "../../assets/svgs/dark/banking/donate_points.svg";
import donation_dark from "../../assets/svgs/dark/banking/donation.svg";
import driving_license_dark from "../../assets/svgs/dark/banking/driving_license.svg";
import esal_payment_dark from "../../assets/svgs/dark/banking/esal_payment.svg";
import exchange_dark from "../../assets/svgs/dark/banking/exchange.svg";
import favorite_transfer_dark from "../../assets/svgs/dark/banking/favorite_transfer.svg";
import folder_dark from "../../assets/svgs/dark/banking/folder.svg";
import future_transfers_dark from "../../assets/svgs/dark/banking/future_transfers.svg";
import govt_payment_dark from "../../assets/svgs/dark/banking/govt_payment.svg";
import graph_dark from "../../assets/svgs/dark/banking/graph.svg";
import hash_dark from "../../assets/svgs/dark/banking/hash.svg";
import history_international_dark from "../../assets/svgs/dark/banking/history_international.svg";
import home_loan_dark from "../../assets/svgs/dark/banking/home_loan.svg";
import hsbc_global_dark from "../../assets/svgs/dark/banking/hsbc_global.svg";
import iban_dark from "../../assets/svgs/dark/banking/iban.svg";
import icsab_dark from "../../assets/svgs/dark/banking/icsab.svg";
import id_dark from "../../assets/svgs/dark/banking/id.svg";
import id_card_dark from "../../assets/svgs/dark/banking/id_card.svg";
import international_dark from "../../assets/svgs/dark/banking/international.svg";
import investments_dark from "../../assets/svgs/dark/banking/investments.svg";
import ipo_dark from "../../assets/svgs/dark/banking/ipo.svg";
import key_dark from "../../assets/svgs/dark/banking/key.svg";
import language_ar_dark from "../../assets/svgs/dark/banking/language_ar.svg";
import language_en_dark from "../../assets/svgs/dark/banking/language_en.svg";
import login_dark from "../../assets/svgs/dark/banking/login.svg";
import login_locked_dark from "../../assets/svgs/dark/banking/login_locked.svg";
import login_settings_dark from "../../assets/svgs/dark/banking/login_settings.svg";
import local_dark from "../../assets/svgs/dark/banking/local.svg";
import loyalty_dark from "../../assets/svgs/dark/banking/loyalty.svg";
import loyalty_offers_dark from "../../assets/svgs/dark/banking/loyalty_offers.svg";
import make_transfer_dark from "../../assets/svgs/dark/banking/make_transfer.svg";
import manage_bills_dark from "../../assets/svgs/dark/banking/manage_bills.svg";
import map_atm_dark from "../../assets/svgs/dark/banking/map_atm.svg";
import map_bank_dark from "../../assets/svgs/dark/banking/map_bank.svg";
import media_dark from "../../assets/svgs/dark/banking/media.svg";
import calculator_dark from "../../assets/svgs/dark/banking/calculator.svg";
import movies_dark from "../../assets/svgs/dark/banking/movies.svg";
import mobile_dark from "../../assets/svgs/dark/banking/mobile.svg";
import mobile_profile_dark from "../../assets/svgs/dark/banking/mobile_profile.svg";
import mobile_tick_dark from "../../assets/svgs/dark/banking/mobile_tick.svg";
import moi_services_dark from "../../assets/svgs/dark/banking/moi_services.svg";
import my_accounts_dark from "../../assets/svgs/dark/banking/my_accounts.svg";
import nearby_dark from "../../assets/svgs/dark/banking/nearby.svg";
import nfc_dark from "../../assets/svgs/dark/banking/nfc.svg";
import nodata_dark from "../../assets/svgs/dark/banking/nodata.svg";
import notepad_dark from "../../assets/svgs/dark/banking/notepad.svg";
import online_transfer_dark from "../../assets/svgs/dark/banking/online_transfer.svg";
import open_new_dark from "../../assets/svgs/dark/banking/open_new.svg";
import passport_dark from "../../assets/svgs/dark/banking/passport.svg";
import payments_dark from "../../assets/svgs/dark/banking/payments.svg";
import pending_request_dark from "../../assets/svgs/dark/banking/pending_request.svg";
import personal_loan_dark from "../../assets/svgs/dark/banking/personal_loan.svg";
import pin_dark from "../../assets/svgs/dark/banking/pin.svg";
import plan_dark from "../../assets/svgs/dark/banking/plan.svg";
import points_breakdown_dark from "../../assets/svgs/dark/banking/points_breakdown.svg";
import prepaid_dark from "../../assets/svgs/dark/banking/prepaid.svg";
import qr_code_dark from "../../assets/svgs/dark/banking/qr_code.svg";
import quick_transfer_dark from "../../assets/svgs/dark/banking/quick_transfer.svg";
import redeem_dark from "../../assets/svgs/dark/banking/redeem.svg";
import refund_dark from "../../assets/svgs/dark/banking/refund.svg";
import registration_dark from "../../assets/svgs/dark/banking/registration.svg";
import request_pay_dark from "../../assets/svgs/dark/banking/request_pay.svg";
import rtp_dark from "../../assets/svgs/dark/banking/rtp.svg";
import sab_products_dark from "../../assets/svgs/dark/banking/sab_products.svg";
import sabbpay_dark from "../../assets/svgs/dark/banking/sabbpay.svg";
import sabbot_dark from "../../assets/svgs/dark/banking/sabbot.svg";
import sadad_dark from "../../assets/svgs/dark/banking/sadad.svg";
import sabtag_dark from "../../assets/svgs/dark/banking/sabtag.svg";
import security_settings_dark from "../../assets/svgs/dark/banking/security_settings.svg";
import sentence_dark from "../../assets/svgs/dark/banking/sentence.svg";
import shopping_dark from "../../assets/svgs/dark/banking/shopping.svg";
import split_dark from "../../assets/svgs/dark/banking/split.svg";
import split_pay_dark from "../../assets/svgs/dark/banking/split_pay.svg";
import statement_dark from "../../assets/svgs/dark/banking/statement.svg";
import tag_dark from "../../assets/svgs/dark/banking/tag.svg";
import telecommunication_dark from "../../assets/svgs/dark/banking/telecommunication.svg";
import timer_dark from "../../assets/svgs/dark/banking/timer.svg";
import traffic_dark from "../../assets/svgs/dark/banking/traffic.svg";
import tranfers_dark from "../../assets/svgs/dark/banking/tranfers.svg";
import travel_dark from "../../assets/svgs/dark/banking/travel.svg";
import verify_dark from "../../assets/svgs/dark/banking/verify.svg";
import virtual_cards_dark from "../../assets/svgs/dark/banking/virtual_cards.svg";
import voucher_dark from "../../assets/svgs/dark/banking/voucher.svg";
import wealth_mgmt_dark from "../../assets/svgs/dark/banking/wealth_mgmt.svg";
import beauty_dark from "../../assets/svgs/dark/banking/beauty.svg";
import kids_dark from "../../assets/svgs/dark/banking/kids.svg";
import gaming_dark from "../../assets/svgs/dark/banking/gaming.svg";
import snowflake_dark from "../../assets/svgs/dark/banking/snowflake.svg";
import leaf_dark from "../../assets/svgs/dark/banking/leaf.svg";
import watch_dark from "../../assets/svgs/dark/banking/watch.svg";
import placeholder_dark from "../../assets/svgs/dark/banking/placeholder.svg";
import household_dark from "../../assets/svgs/dark/banking/household.svg";
import alawwal_pay_dark from "../../assets/svgs/dark/banking/alawwal_pay.svg";
import dual_user_dark from "../../assets/svgs/dark/banking/dual_user.svg";
import shield_lock_dark from "../../assets/svgs/dark/banking/shield_lock.svg";
import transfers_dark from "../../assets/svgs/dark/banking/transfers.svg";
import growth_dark from "../../assets/svgs/dark/banking/growth.svg";
import savings_jar_dark from "../../assets/svgs/dark/banking/savings_jar.svg";
import bank_vault_dark from "../../assets/svgs/dark/banking/bank_vault.svg";
import family_dark from "../../assets/svgs/dark/banking/family.svg";


import arrow_down_light from "../../assets/svgs/light/arrows/arrow_down.svg";
import arrow_left_light from "../../assets/svgs/light/arrows/arrow_left.svg";
import arrow_right_light from "../../assets/svgs/light/arrows/arrow_right.svg";
import arrow_up_light from "../../assets/svgs/light/arrows/arrow_up.svg";
import chevron_down_light from "../../assets/svgs/light/arrows/chevron_down.svg";
import chevron_left_light from "../../assets/svgs/light/arrows/chevron_left.svg";
import chevron_right_light from "../../assets/svgs/light/arrows/chevron_right.svg";
import chevron_up_light from "../../assets/svgs/light/arrows/chevron_up.svg";
import switch_light from "../../assets/svgs/light/arrows/switch.svg";
import chevron_effect_down_light from "../../assets/svgs/light/arrows/chevron_effect_down.svg";
import chevron_effect_left_light from "../../assets/svgs/light/arrows/chevron_effect_left.svg";
import chevron_effect_right_light from "../../assets/svgs/light/arrows/chevron_effect_right.svg";
import chevron_effect_up_light from "../../assets/svgs/light/arrows/chevron_effect_up.svg";
import crossarrow_north_east_light from "../../assets/svgs/light/arrows/crossarrow_north_east.svg";
import crossarrow_north_west_light from "../../assets/svgs/light/arrows/crossarrow_north_west.svg";
import crossarrow_south_east_light from "../../assets/svgs/light/arrows/crossarrow_south_east.svg";
import crossarrow_south_west_light from "../../assets/svgs/light/arrows/crossarrow_south_west.svg";
import functional_down_light from "../../assets/svgs/light/arrows/functional_down.svg";
import functional_left_light from "../../assets/svgs/light/arrows/functional_left.svg";
import functional_right_light from "../../assets/svgs/light/arrows/functional_right.svg";
import functional_up_light from "../../assets/svgs/light/arrows/functional_up.svg";
import outline_close_light from "../../assets/svgs/light/arrows/outline_close.svg";
import outline_inward_arrows_light from "../../assets/svgs/light/arrows/outline_inward_arrows.svg";
import outline_navigate_light from "../../assets/svgs/light/arrows/outline_navigate.svg";
import outline_refresh_light from "../../assets/svgs/light/arrows/outline_refresh.svg";

import arrow_down_dark from "../../assets/svgs/dark/arrows/arrow_down.svg";
import arrow_left_dark from "../../assets/svgs/dark/arrows/arrow_left.svg";
import arrow_right_dark from "../../assets/svgs/dark/arrows/arrow_right.svg";
import arrow_up_dark from "../../assets/svgs/dark/arrows/arrow_up.svg";
import chevron_down_dark from "../../assets/svgs/dark/arrows/chevron_down.svg";
import chevron_left_dark from "../../assets/svgs/dark/arrows/chevron_left.svg";
import chevron_right_dark from "../../assets/svgs/dark/arrows/chevron_right.svg";
import chevron_up_dark from "../../assets/svgs/dark/arrows/chevron_up.svg";
import switch_dark from "../../assets/svgs/dark/arrows/switch.svg";
import chevron_effect_down_dark from "../../assets/svgs/dark/arrows/chevron_effect_down.svg";
import chevron_effect_left_dark from "../../assets/svgs/dark/arrows/chevron_effect_left.svg";
import chevron_effect_right_dark from "../../assets/svgs/dark/arrows/chevron_effect_right.svg";
import chevron_effect_up_dark from "../../assets/svgs/dark/arrows/chevron_effect_up.svg";
import crossarrow_north_east_dark from "../../assets/svgs/dark/arrows/crossarrow_north_east.svg";
import crossarrow_north_west_dark from "../../assets/svgs/dark/arrows/crossarrow_north_west.svg";
import crossarrow_south_east_dark from "../../assets/svgs/dark/arrows/crossarrow_south_east.svg";
import crossarrow_south_west_dark from "../../assets/svgs/dark/arrows/crossarrow_south_west.svg";
import functional_down_dark from "../../assets/svgs/dark/arrows/functional_down.svg";
import functional_left_dark from "../../assets/svgs/dark/arrows/functional_left.svg";
import functional_right_dark from "../../assets/svgs/dark/arrows/functional_right.svg";
import functional_up_dark from "../../assets/svgs/dark/arrows/functional_up.svg";
import outline_close_dark from "../../assets/svgs/dark/arrows/outline_close.svg";
import outline_inward_arrows_dark from "../../assets/svgs/dark/arrows/outline_inward_arrows.svg";
import outline_navigate_dark from "../../assets/svgs/dark/arrows/outline_navigate.svg";
import outline_refresh_dark from "../../assets/svgs/dark/arrows/outline_refresh.svg";

// Functionals

import activate from "../../assets/svgs/light/functionals/activate.svg";
import add_1 from "../../assets/svgs/light/functionals/add-1.svg";
import add from "../../assets/svgs/light/functionals/add.svg";
import appearence from "../../assets/svgs/light/functionals/appearence.svg";
import arrange from "../../assets/svgs/light/functionals/arrange.svg";
import attach from "../../assets/svgs/light/functionals/attach.svg";
import backspace from "../../assets/svgs/light/functionals/backspace.svg";
import call from "../../assets/svgs/light/functionals/call.svg";
import cancel from "../../assets/svgs/light/functionals/cancel.svg";
import category from "../../assets/svgs/light/functionals/category.svg";
import chat from "../../assets/svgs/light/functionals/chat.svg";
import copy from "../../assets/svgs/light/functionals/copy.svg";
import deleteIcon from "../../assets/svgs/light/functionals/delete.svg"; // renamed `delete` since it's a reserved word
import delink from "../../assets/svgs/light/functionals/delink.svg";
import discover from "../../assets/svgs/light/functionals/discover.svg";
import document_edit from "../../assets/svgs/light/functionals/document_edit.svg";
import download from "../../assets/svgs/light/functionals/download.svg";
import drop from "../../assets/svgs/light/functionals/drop.svg";
import edit from "../../assets/svgs/light/functionals/edit.svg";
import face_id from "../../assets/svgs/light/functionals/face_id.svg";
import filter from "../../assets/svgs/light/functionals/filter.svg";
import fingerprint from "../../assets/svgs/light/functionals/fingerprint.svg";
import folder_add from "../../assets/svgs/light/functionals/folder_add.svg";
import help from "../../assets/svgs/light/functionals/help.svg";
import history from "../../assets/svgs/light/functionals/history.svg";
import home from "../../assets/svgs/light/functionals/home.svg";
import info from "../../assets/svgs/light/functionals/info.svg";
import limit from "../../assets/svgs/light/functionals/limit.svg";
import link from "../../assets/svgs/light/functionals/link.svg";
import list from "../../assets/svgs/light/functionals/list.svg";
import map_view from "../../assets/svgs/light/functionals/map_view.svg";
import menu from "../../assets/svgs/light/functionals/menu.svg";
import minus from "../../assets/svgs/light/functionals/minus.svg";
import more from "../../assets/svgs/light/functionals/more.svg";
import more_vert from "../../assets/svgs/light/functionals/more_vert.svg";
import money_limit from "../../assets/svgs/light/functionals/money_limit.svg";
import ellipsis from "../../assets/svgs/light/functionals/ellipsis.svg";
import push_pin from "../../assets/svgs/light/functionals/push_pin.svg";
import password_off from "../../assets/svgs/light/functionals/password_off.svg";
import password from "../../assets/svgs/light/functionals/password.svg";
import pdf from "../../assets/svgs/light/functionals/pdf.svg";
import plus from "../../assets/svgs/light/functionals/plus.svg";
import power_off from "../../assets/svgs/light/functionals/power_off.svg";
import progress_activity from "../../assets/svgs/light/functionals/progress_activity.svg";
import sab360 from "../../assets/svgs/light/functionals/sab360.svg";
import search from "../../assets/svgs/light/functionals/search.svg";
import services from "../../assets/svgs/light/functionals/services.svg";
import settings from "../../assets/svgs/light/functionals/settings.svg";
import share from "../../assets/svgs/light/functionals/share.svg";
import star from "../../assets/svgs/light/functionals/star.svg";
import stacks from "../../assets/svgs/light/functionals/stacks.svg";
import success from "../../assets/svgs/light/functionals/success.svg";
import tick from "../../assets/svgs/light/functionals/tick.svg";
import apply_finance from "../../assets/svgs/light/functionals/apply-finance.svg";
import vertical_align_bottom from "../../assets/svgs/light/functionals/vertical_align_bottom.svg";
import warning from "../../assets/svgs/light/functionals/warning.svg";
import customer_service from "../../assets/svgs/light/functionals/customer_service.svg";
import exit from "../../assets/svgs/light/functionals/exit.svg";


//Functionals Dark

import activateDark from "../../assets/svgs/dark/functionals/activate.svg";
import add_1Dark from "../../assets/svgs/dark/functionals/add-1.svg";
import addDark from "../../assets/svgs/dark/functionals/add.svg";
import appearenceDark from "../../assets/svgs/dark/functionals/appearence.svg";
import arrangeDark from "../../assets/svgs/dark/functionals/arrange.svg";
import attachDark from "../../assets/svgs/dark/functionals/attach.svg";
import backspaceDark from "../../assets/svgs/dark/functionals/backspace.svg";
import callDark from "../../assets/svgs/dark/functionals/call.svg";
import cancelDark from "../../assets/svgs/dark/functionals/cancel.svg";
import categoryDark from "../../assets/svgs/dark/functionals/category.svg";
import chatDark from "../../assets/svgs/dark/functionals/chat.svg";
import copyDark from "../../assets/svgs/dark/functionals/copy.svg";
import deleteDark from "../../assets/svgs/dark/functionals/delete.svg";
import delinkDark from "../../assets/svgs/dark/functionals/delink.svg";
import discoverDark from "../../assets/svgs/dark/functionals/discover.svg";
import document_editDark from "../../assets/svgs/dark/functionals/document_edit.svg";
import downloadDark from "../../assets/svgs/dark/functionals/download.svg";
import dropDark from "../../assets/svgs/dark/functionals/drop.svg";
import editDark from "../../assets/svgs/dark/functionals/edit.svg";
import face_idDark from "../../assets/svgs/dark/functionals/face_id.svg";
import filterDark from "../../assets/svgs/dark/functionals/filter.svg";
import fingerprintDark from "../../assets/svgs/dark/functionals/fingerprint.svg";
import folder_addDark from "../../assets/svgs/dark/functionals/folder_add.svg";
import helpDark from "../../assets/svgs/dark/functionals/help.svg";
import historyDark from "../../assets/svgs/dark/functionals/history.svg";
import homeDark from "../../assets/svgs/dark/functionals/home.svg";
import infoDark from "../../assets/svgs/dark/functionals/info.svg";
import limitDark from "../../assets/svgs/dark/functionals/limit.svg";
import linkDark from "../../assets/svgs/dark/functionals/link.svg";
import listDark from "../../assets/svgs/dark/functionals/list.svg";
import map_viewDark from "../../assets/svgs/dark/functionals/map_view.svg";
import menuDark from "../../assets/svgs/dark/functionals/menu.svg";
import minusDark from "../../assets/svgs/dark/functionals/minus.svg";
import moreDark from "../../assets/svgs/dark/functionals/more.svg";
import more_vertDark from "../../assets/svgs/dark/functionals/more_vert.svg";
import money_limitDark from "../../assets/svgs/dark/functionals/money_limit.svg";
import ellipsisDark from "../../assets/svgs/dark/functionals/ellipsis.svg";
import push_pinDark from "../../assets/svgs/dark/functionals/push_pin.svg";
import password_offDark from "../../assets/svgs/dark/functionals/password_off.svg";
import passwordDark from "../../assets/svgs/dark/functionals/password.svg";
import pdfDark from "../../assets/svgs/dark/functionals/pdf.svg";
import plusDark from "../../assets/svgs/dark/functionals/plus.svg";
import power_offDark from "../../assets/svgs/dark/functionals/power_off.svg";
import progress_activityDark from "../../assets/svgs/dark/functionals/progress_activity.svg";
import sab360Dark from "../../assets/svgs/dark/functionals/sab360.svg";
import searchDark from "../../assets/svgs/dark/functionals/search.svg";
import servicesDark from "../../assets/svgs/dark/functionals/services.svg";
import settingsDark from "../../assets/svgs/dark/functionals/settings.svg";
import shareDark from "../../assets/svgs/dark/functionals/share.svg";
import starDark from "../../assets/svgs/dark/functionals/star.svg";
import stacksDark from "../../assets/svgs/dark/functionals/stacks.svg";
import successDark from "../../assets/svgs/dark/functionals/success.svg";
import tickDark from "../../assets/svgs/dark/functionals/tick.svg";
import apply_financeDark from "../../assets/svgs/dark/functionals/apply-finance.svg";
import vertical_align_bottomDark from "../../assets/svgs/dark/functionals/vertical_align_bottom.svg";
import warningDark from "../../assets/svgs/dark/functionals/warning.svg";
import customer_serviceDark from "../../assets/svgs/dark/functionals/customer_service.svg";
import exitDark from "../../assets/svgs/dark/functionals/exit.svg";



// Light Notifications SVGs
import blockLight from "../../assets/svgs/light/notifications/block.svg";
import emailLight from "../../assets/svgs/light/notifications/email.svg";
import messageLight from "../../assets/svgs/light/notifications/message.svg";
import request_infoLight from "../../assets/svgs/light/notifications/request_info.svg";
import reviewLight from "../../assets/svgs/light/notifications/review.svg";
import sendLight from "../../assets/svgs/light/notifications/send.svg";
import thumb_downLight from "../../assets/svgs/light/notifications/thumb_down.svg";
import thumb_upLight from "../../assets/svgs/light/notifications/thumb_up.svg";

// Dark Notifications SVGs
import blockDark from "../../assets/svgs/dark/notifications/block.svg";
import emailDark from "../../assets/svgs/dark/notifications/email.svg";
import messageDark from "../../assets/svgs/dark/notifications/message.svg";
import request_infoDark from "../../assets/svgs/dark/notifications/request_info.svg";
import reviewDark from "../../assets/svgs/dark/notifications/review.svg";
import sendDark from "../../assets/svgs/dark/notifications/send.svg";
import thumb_downDark from "../../assets/svgs/dark/notifications/thumb_down.svg";
import thumb_upDark from "../../assets/svgs/dark/notifications/thumb_up.svg";


// Light Others SVGs
import announcementLight from "../../assets/svgs/light/other/announcement.svg";
import autopayLight from "../../assets/svgs/light/other/autopay.svg";
import ecommerceLight from "../../assets/svgs/light/other/ecommerce.svg";
import educationLight from "../../assets/svgs/light/other/education.svg";
import foodLight from "../../assets/svgs/light/other/food.svg";
import foryouLight from "../../assets/svgs/light/other/foryou.svg";
import giftLight from "../../assets/svgs/light/other/gift.svg";
import heartLight from "../../assets/svgs/light/other/heart.svg";
import hospitalLight from "../../assets/svgs/light/other/hospital.svg";
import houseLight from "../../assets/svgs/light/other/house.svg";
import insightLight from "../../assets/svgs/light/other/insight.svg";
import loungeLight from "../../assets/svgs/light/other/lounge.svg";
import moonLight from "../../assets/svgs/light/other/moon.svg";
import offer_newLight from "../../assets/svgs/light/other/offer_new.svg";
import technologyLight from "../../assets/svgs/light/other/technology.svg";
import transportationLight from "../../assets/svgs/light/other/transportation.svg";
import vehicleLight from "../../assets/svgs/light/other/vehicle.svg";
import welcomeLight from "../../assets/svgs/light/other/welcome.svg";
import target from "../../assets/svgs/light/other/target.svg";
import esim from "../../assets/svgs/light/other/eSIM.svg";
import redeempoints from "../../assets/svgs/light/other/redeempoints.svg";
import icsabcash from "../../assets/svgs/light/other/icsabcash.svg";
import pointssummary from "../../assets/svgs/light/other/pointssummary.svg";
import activity from "../../assets/svgs/light/other/activity.svg";
import bag from "../../assets/svgs/light/other/bag.svg";
import lipstick from "../../assets/svgs/light/other/lipstick.svg";
import puzzle from "../../assets/svgs/light/other/puzzle.svg";
import appliances from "../../assets/svgs/light/other/appliances.svg";
import stackLight from "../../assets/svgs/light/functionals/stack.svg";


// Dark Others SVGs
import announcementDark from "../../assets/svgs/dark/other/announcement.svg";
import autopayDark from "../../assets/svgs/dark/other/autopay.svg";
import ecommerceDark from "../../assets/svgs/dark/other/ecommerce.svg";
import educationDark from "../../assets/svgs/dark/other/education.svg";
import foodDark from "../../assets/svgs/dark/other/food.svg";
import foryouDark from "../../assets/svgs/dark/other/foryou.svg";
import giftDark from "../../assets/svgs/dark/other/gift.svg";
import heartDark from "../../assets/svgs/dark/other/heart.svg";
import hospitalDark from "../../assets/svgs/dark/other/hospital.svg";
import houseDark from "../../assets/svgs/dark/other/house.svg";
import insightDark from "../../assets/svgs/dark/other/insight.svg";
import loungeDark from "../../assets/svgs/dark/other/lounge.svg";
import moonDark from "../../assets/svgs/dark/other/moon.svg";
import offer_newDark from "../../assets/svgs/dark/other/offer_new.svg";
import technologyDark from "../../assets/svgs/dark/other/technology.svg";
import transportationDark from "../../assets/svgs/dark/other/transportation.svg";
import vehicleDark from "../../assets/svgs/dark/other/vehicle.svg";
import welcomeDark from "../../assets/svgs/dark/other/welcome.svg";
import targetDark from "../../assets/svgs/dark/other/target.svg";
import esimDark from "../../assets/svgs/dark/other/eSIM.svg";
import activityDark from "../../assets/svgs/dark/other/activity.svg";
import bagDark from "../../assets/svgs/dark/other/bag.svg";
import lipstickDark from "../../assets/svgs/dark/other/lipstick.svg";
import puzzleDark from "../../assets/svgs/dark/other/puzzle.svg";
import appliancesDark from "../../assets/svgs/dark/other/appliances.svg";
import icsabcashDark from "../../assets/svgs/dark/other/icsabcash.svg";
import pointssummaryDark from "../../assets/svgs/dark/other/pointssummary.svg";
import redeempointsDark from "../../assets/svgs/dark/other/redeempoints.svg";
import stackDark from "../../assets/svgs/dark/functionals/stack.svg";

//Sab360

import activitysab360 from "../../assets/svgs/light/sab360/activity.svg";
import beautysab360 from "../../assets/svgs/light/sab360/beauty.svg";
import cashsab360 from "../../assets/svgs/light/sab360/cash.svg";
import educationsab360 from "../../assets/svgs/light/sab360/education.svg";
import eclipsesab360 from "../../assets/svgs/light/sab360/eclipse.svg";
import filtersab360 from "../../assets/svgs/light/sab360/filter.svg";
import familysab360 from "../../assets/svgs/light/sab360/family.svg";
import feessab360 from "../../assets/svgs/light/sab360/fees.svg";
import foodsab360 from "../../assets/svgs/light/sab360/food.svg";
import giftsab360 from "../../assets/svgs/light/sab360/gift.svg";
import healthsab360 from "../../assets/svgs/light/sab360/health.svg";
import homesab360 from "../../assets/svgs/light/sab360/home.svg";
import incomesab360 from "../../assets/svgs/light/sab360/income.svg";
import insurancesab360 from "../../assets/svgs/light/sab360/insurance.svg";
import investmentssab360 from "../../assets/svgs/light/sab360/investments.svg";
import leisuresab360 from "../../assets/svgs/light/sab360/leisure.svg";
import logoBrandsab360 from "../../assets/svgs/light/sab360/logoBrand.svg";
import otherssab360 from "../../assets/svgs/light/sab360/others.svg";
import shoppingsab360 from "../../assets/svgs/light/sab360/shopping.svg";
import transersab360 from "../../assets/svgs/light/sab360/transfers.svg";
import transportsab360 from "../../assets/svgs/light/sab360/transport.svg";
import travelsab360 from "../../assets/svgs/light/sab360/travel.svg";
import medalsab360 from "../../assets/svgs/light/sab360/medal.svg";
import carbonfootprint from "../../assets/svgs/light/sab360/carbon-footprint.svg";
import pinsab360 from "../../assets/svgs/light/sab360/pin.svg";
import pointsSummarySab360 from "../../assets/svgs/light/sab360/pointsSummary.svg";
import redeemsab360 from "../../assets/svgs/light/sab360/redeem.svg";

import activitysab360Dark from "../../assets/svgs/dark/sab360/activity.svg";
import beautysab360Dark from "../../assets/svgs/dark/sab360/beauty.svg";
import cashsab360Dark from "../../assets/svgs/dark/sab360/cash.svg";
import educationsab360Dark from "../../assets/svgs/dark/sab360/education.svg";
import eclipsesab360Dark from "../../assets/svgs/dark/sab360/eclipse.svg";
import filtersab360Dark from "../../assets/svgs/dark/sab360/filter.svg";
import familysab360Dark from "../../assets/svgs/dark/sab360/family.svg";
import feessab360Dark from "../../assets/svgs/dark/sab360/fees.svg";
import foodsab360Dark from "../../assets/svgs/dark/sab360/food.svg";
import giftsab360Dark from "../../assets/svgs/dark/sab360/gift.svg";
import healthsab360Dark from "../../assets/svgs/dark/sab360/health.svg";
import homesab360Dark from "../../assets/svgs/dark/sab360/home.svg";
import incomesab360Dark from "../../assets/svgs/dark/sab360/income.svg";
import insurancesab360Dark from "../../assets/svgs/dark/sab360/insurance.svg";
import investmentssab360Dark from "../../assets/svgs/dark/sab360/investments.svg";
import leisuresab360Dark from "../../assets/svgs/dark/sab360/leisure.svg";
import logoBrandsab360Dark from "../../assets/svgs/dark/sab360/logoBrand.svg";
import otherssab360Dark from "../../assets/svgs/dark/sab360/others.svg";
import shoppingsab360Dark from "../../assets/svgs/dark/sab360/shopping.svg";
import transersab360Dark from "../../assets/svgs/dark/sab360/transfers.svg";
import transportsab360Dark from "../../assets/svgs/dark/sab360/transport.svg";
import travelsab360Dark from "../../assets/svgs/dark/sab360/travel.svg";
import medalsab360Dark from "../../assets/svgs/dark/sab360/medal.svg";
import carbonfootprintDark from "../../assets/svgs/dark/sab360/carbon-footprint.svg";
import pinsab360Dark from "../../assets/svgs/dark/sab360/pin.svg";
import pointsSummarySab360Dark from "../../assets/svgs/dark/sab360/pointsSummary.svg";
import redeemsab360Dark from "../../assets/svgs/dark/sab360/redeem.svg";


// Social 

import facebookLight from "../../assets/svgs/light/social/facebook.svg";
import instagramLight from "../../assets/svgs/light/social/instagram.svg";
import linkedinLight from "../../assets/svgs/light/social/linkedin.svg";
import twitterLight from "../../assets/svgs/light/social/twitter.svg";
import whatsappLight from "../../assets/svgs/light/social/whatsapp.svg";

import facebookDark from "../../assets/svgs/dark/social/facebook.svg";
import instagramDark from "../../assets/svgs/dark/social/instagram.svg";
import linkedinDark from "../../assets/svgs/dark/social/linkedin.svg";
import twitterDark from "../../assets/svgs/dark/social/twitter.svg";
import whatsappDark from "../../assets/svgs/dark/social/whatsapp.svg";


// Filled 

import account_actionsfilled from "../../assets/svgs/light/filled/account_actions.svg";
import account_infofilled from "../../assets/svgs/light/filled/account_info.svg";
import activatefilled from "../../assets/svgs/light/filled/activate.svg";
import addfilled from "../../assets/svgs/light/filled/add.svg";
import announcementfilled from "../../assets/svgs/light/filled/announcement.svg";
import autopayfilled from "../../assets/svgs/light/filled/autopay.svg";
import baggagefilled from "../../assets/svgs/light/filled/baggage.svg";
import bookmarkfilled from "../../assets/svgs/light/filled/bookmark.svg";
import calendarfilled from "../../assets/svgs/light/filled/calendar.svg";
import calendar_customfilled from "../../assets/svgs/light/filled/calendar_custom.svg";
import calendar_todayfilled from "../../assets/svgs/light/filled/calendar_today.svg";
import callfilled from "../../assets/svgs/light/filled/call.svg";
import camerafilled from "../../assets/svgs/light/filled/camera.svg";
import cancelfilled from "../../assets/svgs/light/filled/cancel.svg";
import cardfilled from "../../assets/svgs/light/filled/card.svg";
import card_securityfilled from "../../assets/svgs/light/filled/card_security.svg";
import card_servicesfilled from "../../assets/svgs/light/filled/card_services.svg";
import card_stopfilled from "../../assets/svgs/light/filled/card_stop.svg";
import card_temporaryfilled from "../../assets/svgs/light/filled/card_temporary.svg";
import card_wirelessfilled from "../../assets/svgs/light/filled/card_wireless.svg";
import categoryfilled from "../../assets/svgs/light/filled/category.svg";
import chatfilled from "../../assets/svgs/light/filled/chat.svg";
import copyfilled from "../../assets/svgs/light/filled/copy.svg";
import check_circlefilled from "../../assets/svgs/light/filled/check_circle.svg";
import crownfilled from "../../assets/svgs/light/filled/crown.svg";
import currencyfilled from "../../assets/svgs/light/filled/currency.svg";
import deletefilled from "../../assets/svgs/light/filled/delete.svg";
import discoverfilled from "../../assets/svgs/light/filled/discover.svg";
import dissatisfiedfilled from "../../assets/svgs/light/filled/dissatisfied.svg";
import documentfilled from "../../assets/svgs/light/filled/document.svg";
import document_editfilled from "../../assets/svgs/light/filled/document_edit.svg";
import driving_licensefilled from "../../assets/svgs/light/filled/driving_license.svg";
import ecommercefilled from "../../assets/svgs/light/filled/ecommerce.svg";
import editfilled from "../../assets/svgs/light/filled/edit.svg";
import emailfilled from "../../assets/svgs/light/filled/email.svg";
import folderfilled from "../../assets/svgs/light/filled/folder.svg";
import foryoufilled from "../../assets/svgs/light/filled/foryou.svg";
import fullfilled from "../../assets/svgs/light/filled/full.svg";
import govt_paymentfilled from "../../assets/svgs/light/filled/govt_payment.svg";
import heartfilled from "../../assets/svgs/light/filled/heart.svg";
import homefilled from "../../assets/svgs/light/filled/home.svg";
import icsabfilled from "../../assets/svgs/light/filled/icsab.svg";
import idfilled from "../../assets/svgs/light/filled/id.svg";
import id_cardfilled from "../../assets/svgs/light/filled/id_card.svg";
import infofilled from "../../assets/svgs/light/filled/info.svg";
import insightfilled from "../../assets/svgs/light/filled/insight.svg";
import keyfilled from "../../assets/svgs/light/filled/key.svg";
import libraryfilled from "../../assets/svgs/light/filled/library.svg";
import limitfilled from "../../assets/svgs/light/filled/limit.svg";
import loungefilled from "../../assets/svgs/light/filled/lounge.svg";
import loyaltyfilled from "../../assets/svgs/light/filled/loyalty.svg";
import map_atmfilled from "../../assets/svgs/light/filled/map_atm.svg";
import map_bankfilled from "../../assets/svgs/light/filled/map_bank.svg";
import map_viewfilled from "../../assets/svgs/light/filled/map_view.svg";
import menufilled from "../../assets/svgs/light/filled/menu.svg";
import messagefilled from "../../assets/svgs/light/filled/message.svg";
import mobilefilled from "../../assets/svgs/light/filled/mobile.svg";
import my_accountsfilled from "../../assets/svgs/light/filled/my_accounts.svg";
import neutralfilled from "../../assets/svgs/light/filled/neutral.svg";
import nfcfilled from "../../assets/svgs/light/filled/nfc.svg";
import notepadfilled from "../../assets/svgs/light/filled/notepad.svg";
import offer_newfilled from "../../assets/svgs/light/filled/offer_new.svg";
import partialfilled from "../../assets/svgs/light/filled/partial.svg";
import paymentsfilled from "../../assets/svgs/light/filled/payments.svg";
import pdffilled from "../../assets/svgs/light/filled/pdf.svg";
import peoplefilled from "../../assets/svgs/light/filled/people.svg";
import pinfilled from "../../assets/svgs/light/filled/pin.svg";
import planfilled from "../../assets/svgs/light/filled/plan.svg";
import planefilled from "../../assets/svgs/light/filled/plane.svg";
import profilefilled from "../../assets/svgs/light/filled/profile.svg";
import redeemfilled from "../../assets/svgs/light/filled/redeem.svg";
import removefilled from "../../assets/svgs/light/filled/remove.svg";
import reviewfilled from "../../assets/svgs/light/filled/review.svg";
import sab360filled from "../../assets/svgs/light/filled/sab360.svg";
import sabtagfilled from "../../assets/svgs/light/filled/sabtag.svg";
import sendfilled from "../../assets/svgs/light/filled/send.svg";
import smileyfilled from "../../assets/svgs/light/filled/smiley.svg";
import starfilled from "../../assets/svgs/light/filled/star.svg";
import statementfilled from "../../assets/svgs/light/filled/statement.svg";
import successfilled from "../../assets/svgs/light/filled/success.svg";
import thumb_downfilled from "../../assets/svgs/light/filled/thumb_down.svg";
import thumb_upfilled from "../../assets/svgs/light/filled/thumb_up.svg";
import timerfilled from "../../assets/svgs/light/filled/timer.svg";
import trafficfilled from "../../assets/svgs/light/filled/traffic.svg";
import tranfersfilled from "../../assets/svgs/light/filled/tranfers.svg";
import travelfilled from "../../assets/svgs/light/filled/travel.svg";
import vehiclefilled from "../../assets/svgs/light/filled/vehicle.svg";
import verifyfilled from "../../assets/svgs/light/filled/verify.svg";
import virtual_cardsfilled from "../../assets/svgs/light/filled/virtual_cards.svg";
import warningfilled from "../../assets/svgs/light/filled/warning.svg";
import within_sabfilled from "../../assets/svgs/light/filled/within_sab.svg";
import voucherfilled from "../../assets/svgs/light/filled/voucher.svg";
import vector_logofilled from "../../assets/svgs/light/filled/vector-logo.svg";
import cash_backfilled from "../../assets/svgs/light/filled/cash_back.svg";
import bolt from "../../assets/svgs/light/filled/bolt.svg";
import offerfilled from "../../assets/svgs/light/filled/offer.svg";
import walletfilled from "../../assets/svgs/light/filled/wallet.svg";
import push_pinfilled from "../../assets/svgs/light/filled/push_pin.svg";

import account_actionsfilledDark from "../../assets/svgs/dark/filled/account_actions.svg";
import account_infofilledDark from "../../assets/svgs/dark/filled/account_info.svg";
import activatefilledDark from "../../assets/svgs/dark/filled/activate.svg";
import addfilledDark from "../../assets/svgs/dark/filled/add.svg";
import announcementfilledDark from "../../assets/svgs/dark/filled/announcement.svg";
import autopayfilledDark from "../../assets/svgs/dark/filled/autopay.svg";
import baggagefilledDark from "../../assets/svgs/dark/filled/baggage.svg";
import bookmarkfilledDark from "../../assets/svgs/dark/filled/bookmark.svg";
import calendarfilledDark from "../../assets/svgs/dark/filled/calendar.svg";
import calendar_customfilledDark from "../../assets/svgs/dark/filled/calendar_custom.svg";
import calendar_todayfilledDark from "../../assets/svgs/dark/filled/calendar_today.svg";
import callfilledDark from "../../assets/svgs/dark/filled/call.svg";
import camerafilledDark from "../../assets/svgs/dark/filled/camera.svg";
import cancelfilledDark from "../../assets/svgs/dark/filled/cancel.svg";
import cardfilledDark from "../../assets/svgs/dark/filled/card.svg";
import card_securityfilledDark from "../../assets/svgs/dark/filled/card_security.svg";
import card_servicesfilledDark from "../../assets/svgs/dark/filled/card_services.svg";
import card_stopfilledDark from "../../assets/svgs/dark/filled/card_stop.svg";
import card_temporaryfilledDark from "../../assets/svgs/dark/filled/card_temporary.svg";
import card_wirelessfilledDark from "../../assets/svgs/dark/filled/card_wireless.svg";
import categoryfilledDark from "../../assets/svgs/dark/filled/category.svg";
import chatfilledDark from "../../assets/svgs/dark/filled/chat.svg";
import copyfilledDark from "../../assets/svgs/dark/filled/copy.svg";
import check_circlefilledDark from "../../assets/svgs/dark/filled/check_circle.svg";
import crownfilledDark from "../../assets/svgs/dark/filled/crown.svg";
import currencyfilledDark from "../../assets/svgs/dark/filled/currency.svg";
import deletefilledDark from "../../assets/svgs/dark/filled/delete.svg";
import discoverfilledDark from "../../assets/svgs/dark/filled/discover.svg";
import dissatisfiedfilledDark from "../../assets/svgs/dark/filled/dissatisfied.svg";
import documentfilledDark from "../../assets/svgs/dark/filled/document.svg";
import document_editfilledDark from "../../assets/svgs/dark/filled/document_edit.svg";
import driving_licensefilledDark from "../../assets/svgs/dark/filled/driving_license.svg";
import ecommercefilledDark from "../../assets/svgs/dark/filled/ecommerce.svg";
import editfilledDark from "../../assets/svgs/dark/filled/edit.svg";
import emailfilledDark from "../../assets/svgs/dark/filled/email.svg";
import folderfilledDark from "../../assets/svgs/dark/filled/folder.svg";
import foryoufilledDark from "../../assets/svgs/dark/filled/foryou.svg";
import fullfilledDark from "../../assets/svgs/dark/filled/full.svg";
import govt_paymentfilledDark from "../../assets/svgs/dark/filled/govt_payment.svg";
import heartfilledDark from "../../assets/svgs/dark/filled/heart.svg";
import homefilledDark from "../../assets/svgs/dark/filled/home.svg";
import icsabfilledDark from "../../assets/svgs/dark/filled/icsab.svg";
import idfilledDark from "../../assets/svgs/dark/filled/id.svg";
import id_cardfilledDark from "../../assets/svgs/dark/filled/id_card.svg";
import infofilledDark from "../../assets/svgs/dark/filled/info.svg";
import insightfilledDark from "../../assets/svgs/dark/filled/insight.svg";
import keyfilledDark from "../../assets/svgs/dark/filled/key.svg";
import libraryfilledDark from "../../assets/svgs/dark/filled/library.svg";
import limitfilledDark from "../../assets/svgs/dark/filled/limit.svg";
import loungefilledDark from "../../assets/svgs/dark/filled/lounge.svg";
import loyaltyfilledDark from "../../assets/svgs/dark/filled/loyalty.svg";
import map_atmfilledDark from "../../assets/svgs/dark/filled/map_atm.svg";
import map_bankfilledDark from "../../assets/svgs/dark/filled/map_bank.svg";
import map_viewfilledDark from "../../assets/svgs/dark/filled/map_view.svg";
import menufilledDark from "../../assets/svgs/dark/filled/menu.svg";
import messagefilledDark from "../../assets/svgs/dark/filled/message.svg";
import mobilefilledDark from "../../assets/svgs/dark/filled/mobile.svg";
import my_accountsfilledDark from "../../assets/svgs/dark/filled/my_accounts.svg";
import neutralfilledDark from "../../assets/svgs/dark/filled/neutral.svg";
import nfcfilledDark from "../../assets/svgs/dark/filled/nfc.svg";
import notepadfilledDark from "../../assets/svgs/dark/filled/notepad.svg";
import offer_newfilledDark from "../../assets/svgs/dark/filled/offer_new.svg";
import partialfilledDark from "../../assets/svgs/dark/filled/partial.svg";
import paymentsfilledDark from "../../assets/svgs/dark/filled/payments.svg";
import pdffilledDark from "../../assets/svgs/dark/filled/pdf.svg";
import peoplefilledDark from "../../assets/svgs/dark/filled/people.svg";
import pinfilledDark from "../../assets/svgs/dark/filled/pin.svg";
import planfilledDark from "../../assets/svgs/dark/filled/plan.svg";
import planefilledDark from "../../assets/svgs/dark/filled/plane.svg";
import profilefilledDark from "../../assets/svgs/dark/filled/profile.svg";
import redeemfilledDark from "../../assets/svgs/dark/filled/redeem.svg";
import removefilledDark from "../../assets/svgs/dark/filled/remove.svg";
import reviewfilledDark from "../../assets/svgs/dark/filled/review.svg";
import sab360filledDark from "../../assets/svgs/dark/filled/sab360.svg";
import sabtagfilledDark from "../../assets/svgs/dark/filled/sabtag.svg";
import sendfilledDark from "../../assets/svgs/dark/filled/send.svg";
import smileyfilledDark from "../../assets/svgs/dark/filled/smiley.svg";
import starfilledDark from "../../assets/svgs/dark/filled/star.svg";
import statementfilledDark from "../../assets/svgs/dark/filled/statement.svg";
import successfilledDark from "../../assets/svgs/dark/filled/success.svg";
import thumb_downfilledDark from "../../assets/svgs/dark/filled/thumb_down.svg";
import thumb_upfilledDark from "../../assets/svgs/dark/filled/thumb_up.svg";
import timerfilledDark from "../../assets/svgs/dark/filled/timer.svg";
import trafficfilledDark from "../../assets/svgs/dark/filled/traffic.svg";
import tranfersfilledDark from "../../assets/svgs/dark/filled/tranfers.svg";
import travelfilledDark from "../../assets/svgs/dark/filled/travel.svg";
import vehiclefilledDark from "../../assets/svgs/dark/filled/vehicle.svg";
import verifyfilledDark from "../../assets/svgs/dark/filled/verify.svg";
import virtual_cardsfilledDark from "../../assets/svgs/dark/filled/virtual_cards.svg";
import warningfilledDark from "../../assets/svgs/dark/filled/warning.svg";
import within_sabfilledDark from "../../assets/svgs/dark/filled/within_sab.svg";
import voucherfilledDark from "../../assets/svgs/dark/filled/voucher.svg";
import vector_logofilledDark from "../../assets/svgs/dark/filled/vector-logo.svg";
import cash_backfilledDark from "../../assets/svgs/dark/filled/cash_back.svg";
import boltDark from "../../assets/svgs/dark/filled/bolt.svg";
import offerfilledDark from "../../assets/svgs/dark/filled/offer.svg";
import walletfilledDark from "../../assets/svgs/dark/filled/wallet.svg";
import push_pinfilledDark from "../../assets/svgs/dark/filled/push_pin.svg";

// ---- Users SVG Imports ----
import people_users from "../../assets/svgs/light/users/people.svg";
import profile_add_users from "../../assets/svgs/light/users/profile_add.svg";
import profile_edit_users from "../../assets/svgs/light/users/profile_edit.svg";
import local_users from "../../assets/svgs/light/users/local.svg";
import profile_users from "../../assets/svgs/light/users/profile.svg";
import hsbc_services_users from "../../assets/svgs/light/users/hsbc_services.svg";
import add_beneficiary_users from "../../assets/svgs/light/users/add_beneficiary.svg";
import beneficiary_users from "../../assets/svgs/light/users/beneficiary.svg";
import smiley_users from "../../assets/svgs/light/users/smiley.svg";
import dissatisfied_users from "../../assets/svgs/light/users/dissatisfied.svg";
import neutral_users from "../../assets/svgs/light/users/neutral.svg";
import people_users_dark from "../../assets/svgs/dark/users/people.svg";
import profile_add_users_dark from "../../assets/svgs/dark/users/profile_add.svg";
import profile_edit_users_dark from "../../assets/svgs/dark/users/profile_edit.svg";
import local_users_dark from "../../assets/svgs/dark/users/local.svg";
import profile_users_dark from "../../assets/svgs/dark/users/profile.svg";
import hsbc_services_users_dark from "../../assets/svgs/dark/users/hsbc_services.svg";
import add_beneficiary_users_dark from "../../assets/svgs/dark/users/add_beneficiary.svg";
import beneficiary_users_dark from "../../assets/svgs/dark/users/beneficiary.svg";
import smiley_users_dark from "../../assets/svgs/dark/users/smiley.svg";
import dissatisfied_users_dark from "../../assets/svgs/dark/users/dissatisfied.svg";
import neutral_users_dark from "../../assets/svgs/dark/users/neutral.svg";

type IconProps = { [key: string]: FC<SvgProps> };

export const BankingSvgsLight: IconProps = {
  "1xpayments": _1xpayments,
  account_actions,
  account_add,
  account_info,
  account_linking,
  add_money,
  addbills,
  autopay,
  autoplay,
  baggage,
  "bills-history": bills_history,
  bills,
  bookmark,
  calendar_custom,
  calendar_today,
  calendar,
  card_add,
  card_international,
  card_lock,
  card_manage,
  card_onetime,
  card_scan,
  card_security,
  card_services,
  card_stop,
  card_temporary,
  card_visa,
  card_wireless,
  card,
  cash_back,
  contact_book,
  currency,
  digital_shop,
  document,
  donate_points,
  donation,
  driving_license,
  esal_payment,
  exchange,
  favorite_transfer,
  folder,
  future_transfers,
  govt_payment,
  graph,
  hash,
  history_international,
  home_loan,
  hsbc_global,
  iban,
  icsab,
  id_card,
  id,
  international,
  investments,
  ipo,
  key,
  language_ar,
  language_en,
  login_locked,
  login_settings,
  login,
  local,
  loyalty_offers,
  loyalty,
  make_transfer,
  manage_bills,
  map_atm,
  map_bank,
  media,
  mobile_profile,
  mobile_tick,
  mobile,
  moi_services,
  my_accounts,
  nearby,
  nfc,
  nodata,
  notepad,
  online_transfer,
  open_new,
  passport,
  payments,
  pending_request,
  personal_loan,
  pin,
  plan,
  points_breakdown,
  prepaid,
  qr_code,
  quick_transfer,
  redeem,
  refund,
  registration,
  request_pay,
  rtp,
  sab_products,
  sabbpay,
  sabbot,
  sadad,
  sabtag,
  security_settings,
  sentence,
  shopping,
  split_pay,
  split,
  statement,
  telecommunication,
  timer,
  traffic,
  tranfers,
  travel,
  verify,
  virtual_cards,
  voucher,
  wealth_mgmt,
  movies,
  beauty,
  kids,
  gaming,
  calculator,
  snowflake,
  leaf,
  watch,
  placeholder,
  household,
  alawwal_pay,
  dual_user,
  shield_lock,
  tag,
  card_info,
  transfers,
  growth,
  savings_jar,
  bank_vault,
  family,
  money_limit,
  "apply-finance": apply_finance,
};

export const BankingSvgsDark: IconProps = {
  "1xpayments": _1xpayments_dark,
  account_actions: account_actions_dark,
  account_add: account_add_dark,
  account_info: account_info_dark,
  account_linking: account_linking_dark,
  add_money: add_money_dark,
  addbills: addbills_dark,
  autopay: autopay_dark,
  autoplay: autoplay_dark,
  baggage: baggage_dark,
  "bills-history": bills_history_dark,
  bills: bills_dark,
  bookmark: bookmark_dark,
  calendar: calendar_dark,
  calendar_custom: calendar_custom_dark,
  calendar_today: calendar_today_dark,
  card: card_dark,
  card_add: card_add_dark,
  card_info: card_info_dark,
  card_international: card_international_dark,
  card_lock: card_lock_dark,
  card_manage: card_manage_dark,
  card_onetime: card_onetime_dark,
  card_scan: card_scan_dark,
  card_security: card_security_dark,
  card_services: card_services_dark,
  card_stop: card_stop_dark,
  card_temporary: card_temporary_dark,
  card_visa: card_visa_dark,
  card_wireless: card_wireless_dark,
  cash_back: cash_back_dark,
  contact_book: contact_book_dark,
  currency: currency_dark,
  digital_shop: digital_shop_dark,
  document: document_dark,
  donate_points: donate_points_dark,
  donation: donation_dark,
  driving_license: driving_license_dark,
  esal_payment: esal_payment_dark,
  exchange: exchange_dark,
  favorite_transfer: favorite_transfer_dark,
  folder: folder_dark,
  future_transfers: future_transfers_dark,
  govt_payment: govt_payment_dark,
  graph: graph_dark,
  hash: hash_dark,
  history_international: history_international_dark,
  home_loan: home_loan_dark,
  hsbc_global: hsbc_global_dark,
  iban: iban_dark,
  icsab: icsab_dark,
  id: id_dark,
  id_card: id_card_dark,
  international: international_dark,
  investments: investments_dark,
  ipo: ipo_dark,
  key: key_dark,
  language_ar: language_ar_dark,
  language_en: language_en_dark,
  login: login_dark,
  login_locked: login_locked_dark,
  login_settings: login_settings_dark,
  local: local_dark,
  loyalty: loyalty_dark,
  loyalty_offers: loyalty_offers_dark,
  make_transfer: make_transfer_dark,
  manage_bills: manage_bills_dark,
  map_atm: map_atm_dark,
  map_bank: map_bank_dark,
  media: media_dark,
  movies: movies_dark,
  mobile: mobile_dark,
  mobile_profile: mobile_profile_dark,
  mobile_tick: mobile_tick_dark,
  moi_services: moi_services_dark,
  my_accounts: my_accounts_dark,
  nearby: nearby_dark,
  nfc: nfc_dark,
  nodata: nodata_dark,
  notepad: notepad_dark,
  online_transfer: online_transfer_dark,
  open_new: open_new_dark,
  passport: passport_dark,
  payments: payments_dark,
  pending_request: pending_request_dark,
  personal_loan: personal_loan_dark,
  pin: pin_dark,
  plan: plan_dark,
  points_breakdown: points_breakdown_dark,
  prepaid: prepaid_dark,
  qr_code: qr_code_dark,
  quick_transfer: quick_transfer_dark,
  redeem: redeem_dark,
  refund: refund_dark,
  registration: registration_dark,
  request_pay: request_pay_dark,
  rtp: rtp_dark,
  sab_products: sab_products_dark,
  sabbpay: sabbpay_dark,
  sabbot: sabbot_dark,
  sadad: sadad_dark,
  sabtag: sabtag_dark,
  security_settings: security_settings_dark,
  sentence: sentence_dark,
  shopping: shopping_dark,
  split: split_dark,
  split_pay: split_pay_dark,
  statement: statement_dark,
  tag: tag_dark,
  telecommunication: telecommunication_dark,
  timer: timer_dark,
  traffic: traffic_dark,
  tranfers: tranfers_dark,
  travel: travel_dark,
  verify: verify_dark,
  virtual_cards: virtual_cards_dark,
  voucher: voucher_dark,
  wealth_mgmt: wealth_mgmt_dark,
  beauty: beauty_dark,
  kids: kids_dark,
  gaming: gaming_dark,
  calculator: calculator_dark,
  snowflake: snowflake_dark,
  leaf: leaf_dark,
  watch:watch_dark,
  placeholder: placeholder_dark,
  household: household_dark,
  alawwal_pay: alawwal_pay_dark,
  dual_user: dual_user_dark,
  shield_lock: shield_lock_dark,
  transfers: transfers_dark,
  growth: growth_dark,
  savings_jar: savings_jar_dark,
  bank_vault: bank_vault_dark,
  family: family_dark,
  money_limit: money_limitDark,
  "apply-finance": apply_financeDark,
};


export const FunctionalsSvgsLight: IconProps = {
  activate,
  add_1,
  add,
  appearence,
  arrange,
  attach,
  backspace,
  call,
  cancel,
  category,
  chat,
  copy,
  delete: deleteIcon,
  delink,
  discover,
  document_edit,
  download,
  drop,
  edit,
  face_id,
  filter,
  fingerprint,
  folder_add,
  help,
  history,
  home,
  info,
  limit,
  link,
  list,
  map_view,
  menu,
  minus,
  more,
  more_vert,
  money_limit,
  password_off,
  password,
  pdf,
  plus,
  power_off,
  progress_activity,
  sab360,
  search,
  services,
  settings,
  share,
  star,
  stacks,
  success,
  tick,
  "apply-finance": apply_finance,
  vertical_align_bottom,
  warning,
  customer_service,
  logout:exit,
  stack: stackLight,
  ellipsis,
  push_pin,
};

export const FunctionalsSvgsDark: IconProps = {
  activate: activateDark,
  add_1: add_1Dark,
  add: addDark,
  appearence: appearenceDark,
  arrange: arrangeDark,
  attach: attachDark,
  backspace: backspaceDark,
  call: callDark,
  cancel: cancelDark,
  category: categoryDark,
  chat: chatDark,
  copy: copyDark,
  delete: deleteDark,
  delink: delinkDark,
  discover: discoverDark,
  document_edit: document_editDark,
  download: downloadDark,
  drop: dropDark,
  edit: editDark,
  face_id: face_idDark,
  filter: filterDark,
  fingerprint: fingerprintDark,
  folder_add: folder_addDark,
  help: helpDark,
  history: historyDark,
  home: homeDark,
  info: infoDark,
  limit: limitDark,
  link: linkDark,
  list: listDark,
  map_view: map_viewDark,
  menu: menuDark,
  minus: minusDark,
  more: moreDark,
  more_vert: more_vertDark,
  money_limit: money_limitDark,
  password_off: password_offDark,
  password: passwordDark,
  pdf: pdfDark,
  plus: plusDark,
  power_off: power_offDark,
  progress_activity: progress_activityDark,
  sab360: sab360Dark,
  search: searchDark,
  services: servicesDark,
  settings: settingsDark,
  share: shareDark,
  star: starDark,
  stacks: stacksDark,
  success: successDark,
  tick: tickDark,
  "apply-finance": apply_financeDark,
  vertical_align_bottom: vertical_align_bottomDark,
  warning: warningDark,
  customer_service:customer_serviceDark,
  logout: exitDark,
  stack: stackDark,
  ellipsis: ellipsisDark,
  push_pin: push_pinDark,
};

export const NotificationsSvgsLight: IconProps = {
  block: blockLight,
  email: emailLight,
  message: messageLight,
  request_info: request_infoLight,
  review: reviewLight,
  send: sendLight,
  thumb_down: thumb_downLight,
  thumb_up: thumb_upLight,
};

export const NotificationsSvgsDark: IconProps = {
  block: blockDark,
  email: emailDark,
  message: messageDark,
  request_info: request_infoDark,
  review: reviewDark,
  send: sendDark,
  thumb_down: thumb_downDark,
  thumb_up: thumb_upDark,
};

export const ArrowSvgsLight: IconProps = {
  arrow_down: arrow_down_light,
  arrow_left: arrow_left_light,
  arrow_right: arrow_right_light,
  arrow_up: arrow_up_light,
  chevron_down: chevron_down_light,
  chevron_left: chevron_left_light,
  chevron_right: chevron_right_light,
  chevron_up: chevron_up_light,
  switch: switch_light,
  chevron_effect_down: chevron_effect_down_light,
  chevron_effect_left: chevron_effect_left_light,
  chevron_effect_right: chevron_effect_right_light,
  chevron_effect_up: chevron_effect_up_light,
  crossarrow_north_east: crossarrow_north_east_light,
  crossarrow_north_west: crossarrow_north_west_light,
  crossarrow_south_east: crossarrow_south_east_light,
  crossarrow_south_west: crossarrow_south_west_light,
  functional_down: functional_down_light,
  functional_left: functional_left_light,
  functional_right: functional_right_light,
  functional_up: functional_up_light,
  outline_close: outline_close_light,
  outline_inward_arrows: outline_inward_arrows_light,
  outline_navigate: outline_navigate_light,
  outline_refresh: outline_refresh_light,
};

export const ArrowSvgsDark: IconProps = {
  arrow_down: arrow_down_dark,
  arrow_left: arrow_left_dark,
  arrow_right: arrow_right_dark,
  arrow_up: arrow_up_dark,
  chevron_down: chevron_down_dark,
  chevron_left: chevron_left_dark,
  chevron_right: chevron_right_dark,
  chevron_up: chevron_up_dark,
  switch: switch_dark,
  chevron_effect_down: chevron_effect_down_dark,
  chevron_effect_left: chevron_effect_left_dark,
  chevron_effect_right: chevron_effect_right_dark,
  chevron_effect_up: chevron_effect_up_dark,
  crossarrow_north_east: crossarrow_north_east_dark,
  crossarrow_north_west: crossarrow_north_west_dark,
  crossarrow_south_east: crossarrow_south_east_dark,
  crossarrow_south_west: crossarrow_south_west_dark,
  functional_down: functional_down_dark,
  functional_left: functional_left_dark,
  functional_right: functional_right_dark,
  functional_up: functional_up_dark,
  outline_close: outline_close_dark,
  outline_inward_arrows: outline_inward_arrows_dark,
  outline_navigate: outline_navigate_dark,
  outline_refresh: outline_refresh_dark,
};

export const OthersSvgsLight: IconProps = {
  announcement: announcementLight,
  autopay: autopayLight,
  ecommerce: ecommerceLight,
  education: educationLight,
  food: foodLight,
  foryou: foryouLight,
  gift: giftLight,
  heart: heartLight,
  hospital: hospitalLight,
  house: houseLight,
  insight: insightLight,
  lounge: loungeLight,
  moon: moonLight,
  offer_new: offer_newLight,
  technology: technologyLight,
  transportation: transportationLight,
  vehicle: vehicleLight,
  welcome: welcomeLight,
  eSIM: esim,
  target: target,
  icsab_redeem_points: redeempoints,
  icsab_cash: icsabcash,
  activity: activity,
  points_summary: pointssummary,
  bag,
  lipstick,
  puzzle,
  appliances,
};

export const OthersSvgsDark: IconProps = {
  announcement: announcementDark,
  autopay: autopayDark,
  ecommerce: ecommerceDark,
  education: educationDark,
  food: foodDark,
  foryou: foryouDark,
  gift: giftDark,
  heart: heartDark,
  hospital: hospitalDark,
  house: houseDark,
  insight: insightDark,
  lounge: loungeDark,
  moon: moonDark,
  offer_new: offer_newDark,
  technology: technologyDark,
  transportation: transportationDark,
  vehicle: vehicleDark,
  welcome: welcomeDark,
  eSIM: esimDark,
  target: targetDark,
  icsab_redeem_points: redeempointsDark,
  icsab_cash: icsabcashDark,
  activity: activityDark,
  points_summary: pointssummaryDark,
  bag: bagDark,
  lipstick: lipstickDark,
  puzzle: puzzleDark,
  appliances: appliancesDark,
};

export const Sab360SvgsLight: IconProps = {
  activity: activitysab360,
  beauty: beautysab360,
  carbonfootprint: carbonfootprint,
  cash: cashsab360,
  education: educationsab360,
  eclipse: eclipsesab360,
  family: familysab360,
  fees: feessab360,
  filter: filtersab360,
  food: foodsab360,
  gift: giftsab360,
  health: healthsab360,
  home: homesab360,
  income: incomesab360,
  insurance: insurancesab360,
  investments: investmentssab360,
  leisure: leisuresab360,
  logoBrand: logoBrandsab360,
  medal: medalsab360,
  others: otherssab360,
  pin: pinsab360,
  pointsSummary: pointsSummarySab360,
  redeem: redeemsab360,
  shopping: shoppingsab360,
  transfers: transersab360,
  transport: transportsab360,
  travel: travelsab360,
};

export const Sab360SvgsDark: IconProps = {
  activity: activitysab360Dark,
  beauty: beautysab360Dark,
  carbonfootprint: carbonfootprintDark,
  cash: cashsab360Dark,
  education: educationsab360Dark,
  eclipse: eclipsesab360Dark,
  family: familysab360Dark,
  fees: feessab360Dark,
  filter: filtersab360Dark,
  food: foodsab360Dark,
  gift: giftsab360Dark,
  health: healthsab360Dark,
  home: homesab360Dark,
  income: incomesab360Dark,
  insurance: insurancesab360Dark,
  investments: investmentssab360Dark,
  leisure: leisuresab360Dark,
  logoBrand: logoBrandsab360Dark,
  medal: medalsab360Dark,
  others: otherssab360Dark,
  pin: pinsab360Dark,
  pointsSummary: pointsSummarySab360Dark,
  redeem: redeemsab360Dark,
  shopping: shoppingsab360Dark,
  transfers: transersab360Dark,
  transport: transportsab360Dark,
  travel: travelsab360Dark,
};

export const SocialSvgsLight: IconProps = {
  facebook: facebookLight,
  instagram: instagramLight,
  linkedin: linkedinLight,
  twitter: twitterLight,
  whatsapp: whatsappLight,
};

export const SocialSvgsDark: IconProps = {
  facebook: facebookDark,
  instagram: instagramDark,
  linkedin: linkedinDark,
  twitter: twitterDark,
  whatsapp: whatsappDark,
};

export const FilledSvgsLight: IconProps = {
  account_actions: account_actionsfilled,
  account_info: account_infofilled,
  activate: activatefilled,
  add: addfilled,
  announcement: announcementfilled,
  autopay: autopayfilled,
  baggage: baggagefilled,
  bookmark: bookmarkfilled,
  calendar: calendarfilled,
  calendar_custom: calendar_customfilled,
  calendar_today: calendar_todayfilled,
  call: callfilled,
  camera: camerafilled,
  cancel: cancelfilled,
  card: cardfilled,
  card_security: card_securityfilled,
  card_services: card_servicesfilled,
  card_stop: card_stopfilled,
  card_temporary: card_temporaryfilled,
  card_wireless: card_wirelessfilled,
  category: categoryfilled,
  chat: chatfilled,
  copy: copyfilled,
  check_circle: check_circlefilled,
  crown: crownfilled,
  currency: currencyfilled,
  delete: deletefilled,
  discover: discoverfilled,
  dissatisfied: dissatisfiedfilled,
  document: documentfilled,
  document_edit: document_editfilled,
  driving_license: driving_licensefilled,
  ecommerce: ecommercefilled,
  edit: editfilled,
  email: emailfilled,
  folder: folderfilled,
  foryou: foryoufilled,
  full: fullfilled,
  govt_payment: govt_paymentfilled,
  heart: heartfilled,
  home: homefilled,
  icsab: icsabfilled,
  id: idfilled,
  id_card: id_cardfilled,
  info: infofilled,
  insight: insightfilled,
  key: keyfilled,
  library: libraryfilled,
  limit: limitfilled,
  lounge: loungefilled,
  loyalty: loyaltyfilled,
  map_atm: map_atmfilled,
  map_bank: map_bankfilled,
  map_view: map_viewfilled,
  menu: menufilled,
  message: messagefilled,
  mobile: mobilefilled,
  my_accounts: my_accountsfilled,
  neutral: neutralfilled,
  nfc: nfcfilled,
  notepad: notepadfilled,
  offer_new: offer_newfilled,
  partial: partialfilled,
  payments: paymentsfilled,
  pdf: pdffilled,
  people: peoplefilled,
  pin: pinfilled,
  plan: planfilled,
  plane: planefilled,
  profile: profilefilled,
  redeem: redeemfilled,
  remove: removefilled,
  review: reviewfilled,
  sab360: sab360filled,
  sabtag: sabtagfilled,
  send: sendfilled,
  smiley: smileyfilled,
  star: starfilled,
  statement: statementfilled,
  success: successfilled,
  thumb_down: thumb_downfilled,
  thumb_up: thumb_upfilled,
  timer: timerfilled,
  traffic: trafficfilled,
  tranfers: tranfersfilled,
  travel: travelfilled,
  vehicle: vehiclefilled,
  verify: verifyfilled,
  virtual_cards: virtual_cardsfilled,
  warning: warningfilled,
  within_sab: within_sabfilled,
  voucher: voucherfilled,
  vector_logo: vector_logofilled,
  cash_back: cash_backfilled,
  bolt: bolt,
  offer: offerfilled,
  wallet: walletfilled,
  push_pin: push_pinfilled,
};

export const FilledSvgsDark: IconProps = {
  account_actions: account_actionsfilledDark,
  account_info: account_infofilledDark,
  activate: activatefilledDark,
  add: addfilledDark,
  announcement: announcementfilledDark,
  autopay: autopayfilledDark,
  baggage: baggagefilledDark,
  bookmark: bookmarkfilledDark,
  calendar: calendarfilledDark,
  calendar_custom: calendar_customfilledDark,
  calendar_today: calendar_todayfilledDark,
  call: callfilledDark,
  camera: camerafilledDark,
  cancel: cancelfilledDark,
  card: cardfilledDark,
  card_security: card_securityfilledDark,
  card_services: card_servicesfilledDark,
  card_stop: card_stopfilledDark,
  card_temporary: card_temporaryfilledDark,
  card_wireless: card_wirelessfilledDark,
  category: categoryfilledDark,
  chat: chatfilledDark,
  copy: copyfilledDark,
  check_circle: check_circlefilledDark,
  crown: crownfilledDark,
  currency: currencyfilledDark,
  delete: deletefilledDark,
  discover: discoverfilledDark,
  dissatisfied: dissatisfiedfilledDark,
  document: documentfilledDark,
  document_edit: document_editfilledDark,
  driving_license: driving_licensefilledDark,
  ecommerce: ecommercefilledDark,
  edit: editfilledDark,
  email: emailfilledDark,
  folder: folderfilledDark,
  foryou: foryoufilledDark,
  full: fullfilledDark,
  govt_payment: govt_paymentfilledDark,
  heart: heartfilledDark,
  home: homefilledDark,
  icsab: icsabfilledDark,
  id: idfilledDark,
  id_card: id_cardfilledDark,
  info: infofilledDark,
  insight: insightfilledDark,
  key: keyfilledDark,
  library: libraryfilledDark,
  limit: limitfilledDark,
  lounge: loungefilledDark,
  loyalty: loyaltyfilledDark,
  map_atm: map_atmfilledDark,
  map_bank: map_bankfilledDark,
  map_view: map_viewfilledDark,
  menu: menufilledDark,
  message: messagefilledDark,
  mobile: mobilefilledDark,
  my_accounts: my_accountsfilledDark,
  neutral: neutralfilledDark,
  nfc: nfcfilledDark,
  notepad: notepadfilledDark,
  offer_new: offer_newfilledDark,
  partial: partialfilledDark,
  payments: paymentsfilledDark,
  pdf: pdffilledDark,
  people: peoplefilledDark,
  pin: pinfilledDark,
  plan: planfilledDark,
  plane: planefilledDark,
  profile: profilefilledDark,
  redeem: redeemfilledDark,
  remove: removefilledDark,
  review: reviewfilledDark,
  sab360: sab360filledDark,
  sabtag: sabtagfilledDark,
  send: sendfilledDark,
  smiley: smileyfilledDark,
  star: starfilledDark,
  statement: statementfilledDark,
  success: successfilledDark,
  thumb_down: thumb_downfilledDark,
  thumb_up: thumb_upfilledDark,
  timer: timerfilledDark,
  traffic: trafficfilledDark,
  tranfers: tranfersfilledDark,
  travel: travelfilledDark,
  vehicle: vehiclefilledDark,
  verify: verifyfilledDark,
  virtual_cards: virtual_cardsfilledDark,
  warning: warningfilledDark,
  within_sab: within_sabfilledDark,
  voucher: voucherfilledDark,
  vector_logo: vector_logofilledDark,
  cash_back: cash_backfilledDark,
  bolt: boltDark,
  offer: offerfilledDark,
  wallet: walletfilledDark,
  push_pin: push_pinfilledDark,
};

export const UsersSvgsLight: IconProps = {
  people: people_users,
  profile_add: profile_add_users,
  profile_edit: profile_edit_users,
  local: local_users,
  profile: profile_users,
  hsbc_services: hsbc_services_users,
  add_beneficiary: add_beneficiary_users,
  beneficiary: beneficiary_users,
  smiley: smiley_users,
  dissatisfied: dissatisfied_users,
  neutral: neutral_users,
};

export const UsersSvgsDark: IconProps = {
  people: people_users_dark,
  profile_add: profile_add_users_dark,
  profile_edit: profile_edit_users_dark,
  local: local_users_dark,
  profile: profile_users_dark,
  hsbc_services: hsbc_services_users_dark,
  add_beneficiary: add_beneficiary_users_dark,
  beneficiary: beneficiary_users_dark,
  smiley: smiley_users_dark,
  dissatisfied: dissatisfied_users_dark,
  neutral: neutral_users_dark,
};

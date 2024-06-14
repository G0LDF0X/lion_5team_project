import "./chunk-WXXH56N5.js";

// node_modules/@portone/browser-sdk/dist/v2.js
var _a;
var promise = null;
var portone = {
  jsSdkUrl: (_a = void 0) !== null && _a !== void 0 ? _a : "https://cdn.portone.io/v2/browser-sdk.js"
};
function findScript() {
  return document.querySelector(`script[src="${portone.jsSdkUrl}"]`);
}
function injectScript() {
  const script = document.createElement("script");
  script.src = portone.jsSdkUrl;
  const headOrBody = document.head || document.body;
  if (!headOrBody)
    throw new Error("[PortOne] Expected document.body not to be null");
  return headOrBody.appendChild(script);
}
function loadScript() {
  if (promise != null) {
    return promise;
  }
  return promise = new Promise((resolve, reject) => {
    if (window.PortOne) {
      return resolve(window.PortOne);
    }
    try {
      const script = findScript() || injectScript();
      script.addEventListener("load", () => {
        if (window.PortOne) {
          return resolve(window.PortOne);
        }
        reject(new Error("[PortOne] Failed to load window.PortOne"));
      });
      script.addEventListener("error", () => {
        reject(new Error("[PortOne] Failed to load window.PortOne"));
      });
    } catch (error) {
      return reject(error);
    }
  });
}
function setPortOneJsSdkUrl(url) {
  return portone.jsSdkUrl = url;
}
function requestIdentityVerification(request) {
  return loadScript().then((sdk) => sdk.requestIdentityVerification(request));
}
function requestIssueBillingKeyAndPay(request) {
  return loadScript().then((sdk) => sdk.requestIssueBillingKeyAndPay(request));
}
function requestIssueBillingKey(request) {
  return loadScript().then((sdk) => sdk.requestIssueBillingKey(request));
}
function requestPayment(request) {
  return loadScript().then((sdk) => sdk.requestPayment(request));
}
function loadPaymentUI(request, callbacks) {
  return loadScript().then((sdk) => sdk.loadPaymentUI(request, callbacks));
}
function loadIssueBillingKeyUI(request, callbacks) {
  return loadScript().then((sdk) => sdk.loadIssueBillingKeyUI(request, callbacks));
}
function updateLoadPaymentUIRequest(request) {
  return loadScript().then((sdk) => sdk.updateLoadPaymentUIRequest(request));
}
function updateLoadIssueBillingKeyUIRequest(request) {
  return loadScript().then((sdk) => sdk.updateLoadIssueBillingKeyUIRequest(request));
}
var Bank = {
  BANK_OF_KOREA: "BANK_BANK_OF_KOREA",
  KOREA_DEVELOPMENT_BANK: "BANK_KOREA_DEVELOPMENT_BANK",
  INDUSTRIAL_BANK_OF_KOREA: "BANK_INDUSTRIAL_BANK_OF_KOREA",
  KOOKMIN_BANK: "BANK_KOOKMIN_BANK",
  SUHYUP_BANK: "BANK_SUHYUP_BANK",
  EXPORT_IMPORT_BANK_OF_KOREA: "BANK_EXPORT_IMPORT_BANK_OF_KOREA",
  NH_NONGHYUP_BANK: "BANK_NH_NONGHYUP_BANK",
  LOCAL_NONGHYUP: "BANK_LOCAL_NONGHYUP",
  WOORI_BANK: "BANK_WOORI_BANK",
  SC_BANK_KOREA: "BANK_SC_BANK_KOREA",
  CITI_BANK_KOREA: "BANK_CITI_BANK_KOREA",
  DAEGU_BANK: "BANK_DAEGU_BANK",
  BUSAN_BANK: "BANK_BUSAN_BANK",
  GWANGJU_BANK: "BANK_GWANGJU_BANK",
  JEJU_BANK: "BANK_JEJU_BANK",
  JEONBUK_BANK: "BANK_JEONBUK_BANK",
  KYONGNAM_BANK: "BANK_KYONGNAM_BANK",
  KFCC: "BANK_KFCC",
  SHINHYUP: "BANK_SHINHYUP",
  SAVINGS_BANK_KOREA: "BANK_SAVINGS_BANK_KOREA",
  MORGAN_STANLEY_BANK: "BANK_MORGAN_STANLEY_BANK",
  HSBC_BANK: "BANK_HSBC_BANK",
  DEUTSCHE_BANK: "BANK_DEUTSCHE_BANK",
  JP_MORGAN_CHASE_BANK: "BANK_JP_MORGAN_CHASE_BANK",
  MIZUHO_BANK: "BANK_MIZUHO_BANK",
  MUFG_BANK: "BANK_MUFG_BANK",
  BANK_OF_AMERICA_BANK: "BANK_BANK_OF_AMERICA_BANK",
  BNP_PARIBAS_BANK: "BANK_BNP_PARIBAS_BANK",
  ICBC: "BANK_ICBC",
  BANK_OF_CHINA: "BANK_BANK_OF_CHINA",
  NATIONAL_FORESTRY_COOPERATIVE_FEDERATION: "BANK_NATIONAL_FORESTRY_COOPERATIVE_FEDERATION",
  UNITED_OVERSEAS_BANK: "BANK_UNITED_OVERSEAS_BANK",
  BANK_OF_COMMUNICATIONS: "BANK_BANK_OF_COMMUNICATIONS",
  CHINA_CONSTRUCTION_BANK: "BANK_CHINA_CONSTRUCTION_BANK",
  EPOST: "BANK_EPOST",
  KODIT: "BANK_KODIT",
  KIBO: "BANK_KIBO",
  HANA_BANK: "BANK_HANA_BANK",
  SHINHAN_BANK: "BANK_SHINHAN_BANK",
  K_BANK: "BANK_K_BANK",
  KAKAO_BANK: "BANK_KAKAO_BANK",
  TOSS_BANK: "BANK_TOSS_BANK",
  KCIS: "BANK_KCIS",
  DAISHIN_SAVINGS_BANK: "BANK_DAISHIN_SAVINGS_BANK",
  SBI_SAVINGS_BANK: "BANK_SBI_SAVINGS_BANK",
  HK_SAVINGS_BANK: "BANK_HK_SAVINGS_BANK",
  WELCOME_SAVINGS_BANK: "BANK_WELCOME_SAVINGS_BANK",
  SHINHAN_SAVINGS_BANK: "BANK_SHINHAN_SAVINGS_BANK",
  // 증권사
  KYOBO_SECURITIES: "BANK_KYOBO_SECURITIES",
  DAISHIN_SECURITIES: "BANK_DAISHIN_SECURITIES",
  MERITZ_SECURITIES: "BANK_MERITZ_SECURITIES",
  MIRAE_ASSET_SECURITIES: "BANK_MIRAE_ASSET_SECURITIES",
  BOOKOOK_SECURITIES: "BANK_BOOKOOK_SECURITIES",
  SAMSUNG_SECURITIES: "BANK_SAMSUNG_SECURITIES",
  SHINYOUNG_SECURITIES: "BANK_SHINYOUNG_SECURITIES",
  SHINHAN_FINANCIAL_INVESTMENT: "BANK_SHINHAN_FINANCIAL_INVESTMENT",
  YUANTA_SECURITIES: "BANK_YUANTA_SECURITIES",
  EUGENE_INVESTMENT_SECURITIES: "BANK_EUGENE_INVESTMENT_SECURITIES",
  KAKAO_PAY_SECURITIES: "BANK_KAKAO_PAY_SECURITIES",
  TOSS_SECURITIES: "BANK_TOSS_SECURITIES",
  KOREA_FOSS_SECURITIES: "BANK_KOREA_FOSS_SECURITIES",
  HANA_FINANCIAL_INVESTMENT: "BANK_HANA_FINANCIAL_INVESTMENT",
  HI_INVESTMENT_SECURITIES: "BANK_HI_INVESTMENT_SECURITIES",
  KOREA_INVESTMENT_SECURITIES: "BANK_KOREA_INVESTMENT_SECURITIES",
  HANWHA_INVESTMENT_SECURITIES: "BANK_HANWHA_INVESTMENT_SECURITIES",
  HYUNDAI_MOTOR_SECURITIES: "BANK_HYUNDAI_MOTOR_SECURITIES",
  DB_FINANCIAL_INVESTMENT: "BANK_DB_FINANCIAL_INVESTMENT",
  KB_SECURITIES: "BANK_KB_SECURITIES",
  KTB_INVESTMENT_SECURITIES: "BANK_KTB_INVESTMENT_SECURITIES",
  NH_INVESTMENT_SECURITIES: "BANK_NH_INVESTMENT_SECURITIES",
  SK_SECURITIES: "BANK_SK_SECURITIES",
  SCI: "BANK_SGI",
  KIWOOM_SECURITIES: "BANK_KIWOOM_SECURITIES",
  EBEST_INVESTMENT_SECURITIES: "BANK_EBEST_INVESTMENT_SECURITIES",
  CAPE_INVESTMENT_CERTIFICATE: "BANK_CAPE_INVESTMENT_CERTIFICATE"
  // 케이프투자증권
};
var BillingKeyAndPayMethod = {
  MOBILE: "MOBILE"
  // 휴대폰
};
var BillingKeyMethod = {
  CARD: "CARD",
  MOBILE: "MOBILE",
  EASY_PAY: "EASY_PAY",
  PAYPAL: "PAYPAL"
  // 페이팔(RT)
};
var CardCompany = {
  KOREA_DEVELOPMENT_BANK: "CARD_COMPANY_KOREA_DEVELOPMENT_BANK",
  KFCC: "CARD_COMPANY_KFCC",
  SHINHYUP: "CARD_COMPANY_SHINHYUP",
  EPOST: "CARD_COMPANY_EPOST",
  SAVINGS_BANK_KOREA: "CARD_COMPANY_SAVINGS_BANK_KOREA",
  KAKAO_BANK: "CARD_COMPANY_KAKAO_BANK",
  WOORI_CARD: "CARD_COMPANY_WOORI_CARD",
  BC_CARD: "CARD_COMPANY_BC_CARD",
  GWANGJU_CARD: "CARD_COMPANY_GWANGJU_CARD",
  SAMSUNG_CARD: "CARD_COMPANY_SAMSUNG_CARD",
  SHINHAN_CARD: "CARD_COMPANY_SHINHAN_CARD",
  HYUNDAI_CARD: "CARD_COMPANY_HYUNDAI_CARD",
  LOTTE_CARD: "CARD_COMPANY_LOTTE_CARD",
  SUHYUP_CARD: "CARD_COMPANY_SUHYUP_CARD",
  CITI_CARD: "CARD_COMPANY_CITI_CARD",
  NH_CARD: "CARD_COMPANY_NH_CARD",
  JEONBUK_CARD: "CARD_COMPANY_JEONBUK_CARD",
  JEJU_CARD: "CARD_COMPANY_JEJU_CARD",
  HANA_CARD: "CARD_COMPANY_HANA_CARD",
  KOOKMIN_CARD: "CARD_COMPANY_KOOKMIN_CARD",
  K_BANK: "CARD_COMPANY_K_BANK",
  TOSS_BANK: "CARD_COMPANY_TOSS_BANK",
  MIRAE_ASSET_SECURITIES: "CARD_COMPANY_MIRAE_ASSET_SECURITIES"
};
var Carrier = {
  SKT: "CARRIER_SKT",
  KT: "CARRIER_KT",
  LGU: "CARRIER_LGU",
  HELLO: "CARRIER_HELLO",
  KCT: "CARRIER_KCT",
  SK7: "CARRIER_SK7"
};
var Country = {
  AF: "COUNTRY_AF",
  AX: "COUNTRY_AX",
  AL: "COUNTRY_AL",
  DZ: "COUNTRY_DZ",
  AS: "COUNTRY_AS",
  AD: "COUNTRY_AD",
  AO: "COUNTRY_AO",
  AI: "COUNTRY_AI",
  AQ: "COUNTRY_AQ",
  AG: "COUNTRY_AG",
  AR: "COUNTRY_AR",
  AM: "COUNTRY_AM",
  AW: "COUNTRY_AW",
  AU: "COUNTRY_AU",
  AT: "COUNTRY_AT",
  AZ: "COUNTRY_AZ",
  BH: "COUNTRY_BH",
  BS: "COUNTRY_BS",
  BD: "COUNTRY_BD",
  BB: "COUNTRY_BB",
  BY: "COUNTRY_BY",
  BE: "COUNTRY_BE",
  BZ: "COUNTRY_BZ",
  BJ: "COUNTRY_BJ",
  BM: "COUNTRY_BM",
  BT: "COUNTRY_BT",
  BO: "COUNTRY_BO",
  BQ: "COUNTRY_BQ",
  BA: "COUNTRY_BA",
  BW: "COUNTRY_BW",
  BV: "COUNTRY_BV",
  BR: "COUNTRY_BR",
  IO: "COUNTRY_IO",
  BN: "COUNTRY_BN",
  BG: "COUNTRY_BG",
  BF: "COUNTRY_BF",
  BI: "COUNTRY_BI",
  KH: "COUNTRY_KH",
  CM: "COUNTRY_CM",
  CA: "COUNTRY_CA",
  CV: "COUNTRY_CV",
  KY: "COUNTRY_KY",
  CF: "COUNTRY_CF",
  TD: "COUNTRY_TD",
  CL: "COUNTRY_CL",
  CN: "COUNTRY_CN",
  CX: "COUNTRY_CX",
  CC: "COUNTRY_CC",
  CO: "COUNTRY_CO",
  KM: "COUNTRY_KM",
  CG: "COUNTRY_CG",
  CD: "COUNTRY_CD",
  CK: "COUNTRY_CK",
  CR: "COUNTRY_CR",
  CI: "COUNTRY_CI",
  HR: "COUNTRY_HR",
  CU: "COUNTRY_CU",
  CW: "COUNTRY_CW",
  CY: "COUNTRY_CY",
  CZ: "COUNTRY_CZ",
  DK: "COUNTRY_DK",
  DJ: "COUNTRY_DJ",
  DM: "COUNTRY_DM",
  DO: "COUNTRY_DO",
  EC: "COUNTRY_EC",
  EG: "COUNTRY_EG",
  SV: "COUNTRY_SV",
  GQ: "COUNTRY_GQ",
  ER: "COUNTRY_ER",
  EE: "COUNTRY_EE",
  ET: "COUNTRY_ET",
  FK: "COUNTRY_FK",
  FO: "COUNTRY_FO",
  FJ: "COUNTRY_FJ",
  FI: "COUNTRY_FI",
  FR: "COUNTRY_FR",
  GF: "COUNTRY_GF",
  PF: "COUNTRY_PF",
  TF: "COUNTRY_TF",
  GA: "COUNTRY_GA",
  GM: "COUNTRY_GM",
  GE: "COUNTRY_GE",
  DE: "COUNTRY_DE",
  GH: "COUNTRY_GH",
  GI: "COUNTRY_GI",
  GR: "COUNTRY_GR",
  GL: "COUNTRY_GL",
  GD: "COUNTRY_GD",
  GP: "COUNTRY_GP",
  GU: "COUNTRY_GU",
  GT: "COUNTRY_GT",
  GG: "COUNTRY_GG",
  GN: "COUNTRY_GN",
  GW: "COUNTRY_GW",
  GY: "COUNTRY_GY",
  HT: "COUNTRY_HT",
  HM: "COUNTRY_HM",
  VA: "COUNTRY_VA",
  HN: "COUNTRY_HN",
  HK: "COUNTRY_HK",
  HU: "COUNTRY_HU",
  IS: "COUNTRY_IS",
  IN: "COUNTRY_IN",
  ID: "COUNTRY_ID",
  IR: "COUNTRY_IR",
  IQ: "COUNTRY_IQ",
  IE: "COUNTRY_IE",
  IM: "COUNTRY_IM",
  IL: "COUNTRY_IL",
  IT: "COUNTRY_IT",
  JM: "COUNTRY_JM",
  JP: "COUNTRY_JP",
  JE: "COUNTRY_JE",
  JO: "COUNTRY_JO",
  KZ: "COUNTRY_KZ",
  KE: "COUNTRY_KE",
  KI: "COUNTRY_KI",
  KP: "COUNTRY_KP",
  KR: "COUNTRY_KR",
  KW: "COUNTRY_KW",
  KG: "COUNTRY_KG",
  LA: "COUNTRY_LA",
  LV: "COUNTRY_LV",
  LB: "COUNTRY_LB",
  LS: "COUNTRY_LS",
  LR: "COUNTRY_LR",
  LY: "COUNTRY_LY",
  LI: "COUNTRY_LI",
  LT: "COUNTRY_LT",
  LU: "COUNTRY_LU",
  MO: "COUNTRY_MO",
  MK: "COUNTRY_MK",
  MG: "COUNTRY_MG",
  MW: "COUNTRY_MW",
  MY: "COUNTRY_MY",
  MV: "COUNTRY_MV",
  ML: "COUNTRY_ML",
  MT: "COUNTRY_MT",
  MH: "COUNTRY_MH",
  MQ: "COUNTRY_MQ",
  MR: "COUNTRY_MR",
  MU: "COUNTRY_MU",
  YT: "COUNTRY_YT",
  MX: "COUNTRY_MX",
  FM: "COUNTRY_FM",
  MD: "COUNTRY_MD",
  MC: "COUNTRY_MC",
  MN: "COUNTRY_MN",
  ME: "COUNTRY_ME",
  MS: "COUNTRY_MS",
  MA: "COUNTRY_MA",
  MZ: "COUNTRY_MZ",
  MM: "COUNTRY_MM",
  NA: "COUNTRY_NA",
  NR: "COUNTRY_NR",
  NP: "COUNTRY_NP",
  NL: "COUNTRY_NL",
  NC: "COUNTRY_NC",
  NZ: "COUNTRY_NZ",
  NI: "COUNTRY_NI",
  NE: "COUNTRY_NE",
  NG: "COUNTRY_NG",
  NU: "COUNTRY_NU",
  NF: "COUNTRY_NF",
  MP: "COUNTRY_MP",
  NO: "COUNTRY_NO",
  OM: "COUNTRY_OM",
  PK: "COUNTRY_PK",
  PW: "COUNTRY_PW",
  PS: "COUNTRY_PS",
  PA: "COUNTRY_PA",
  PG: "COUNTRY_PG",
  PY: "COUNTRY_PY",
  PE: "COUNTRY_PE",
  PH: "COUNTRY_PH",
  PN: "COUNTRY_PN",
  PL: "COUNTRY_PL",
  PT: "COUNTRY_PT",
  PR: "COUNTRY_PR",
  QA: "COUNTRY_QA",
  RE: "COUNTRY_RE",
  RO: "COUNTRY_RO",
  RU: "COUNTRY_RU",
  RW: "COUNTRY_RW",
  BL: "COUNTRY_BL",
  SH: "COUNTRY_SH",
  KN: "COUNTRY_KN",
  LC: "COUNTRY_LC",
  MF: "COUNTRY_MF",
  PM: "COUNTRY_PM",
  VC: "COUNTRY_VC",
  WS: "COUNTRY_WS",
  SM: "COUNTRY_SM",
  ST: "COUNTRY_ST",
  SA: "COUNTRY_SA",
  SN: "COUNTRY_SN",
  RS: "COUNTRY_RS",
  SC: "COUNTRY_SC",
  SL: "COUNTRY_SL",
  SG: "COUNTRY_SG",
  SX: "COUNTRY_SX",
  SK: "COUNTRY_SK",
  SI: "COUNTRY_SI",
  SB: "COUNTRY_SB",
  SO: "COUNTRY_SO",
  ZA: "COUNTRY_ZA",
  GS: "COUNTRY_GS",
  SS: "COUNTRY_SS",
  ES: "COUNTRY_ES",
  LK: "COUNTRY_LK",
  SD: "COUNTRY_SD",
  SR: "COUNTRY_SR",
  SJ: "COUNTRY_SJ",
  SZ: "COUNTRY_SZ",
  SE: "COUNTRY_SE",
  CH: "COUNTRY_CH",
  SY: "COUNTRY_SY",
  TW: "COUNTRY_TW",
  TJ: "COUNTRY_TJ",
  TZ: "COUNTRY_TZ",
  TH: "COUNTRY_TH",
  TL: "COUNTRY_TL",
  TG: "COUNTRY_TG",
  TK: "COUNTRY_TK",
  TO: "COUNTRY_TO",
  TT: "COUNTRY_TT",
  TN: "COUNTRY_TN",
  TR: "COUNTRY_TR",
  TM: "COUNTRY_TM",
  TC: "COUNTRY_TC",
  TV: "COUNTRY_TV",
  UG: "COUNTRY_UG",
  UA: "COUNTRY_UA",
  AE: "COUNTRY_AE",
  GB: "COUNTRY_GB",
  US: "COUNTRY_US",
  UM: "COUNTRY_UM",
  UY: "COUNTRY_UY",
  UZ: "COUNTRY_UZ",
  VU: "COUNTRY_VU",
  VE: "COUNTRY_VE",
  VN: "COUNTRY_VN",
  VG: "COUNTRY_VG",
  VI: "COUNTRY_VI",
  WF: "COUNTRY_WF",
  EH: "COUNTRY_EH",
  YE: "COUNTRY_YE",
  ZM: "COUNTRY_ZM",
  ZW: "COUNTRY_ZW"
  // Zimbabwe
};
var Currency = {
  KRW: "CURRENCY_KRW",
  USD: "CURRENCY_USD",
  EUR: "CURRENCY_EUR",
  JPY: "CURRENCY_JPY",
  CNY: "CURRENCY_CNY",
  VND: "CURRENCY_VND",
  THB: "CURRENCY_THB",
  SGD: "CURRENCY_SGD",
  AUD: "CURRENCY_AUD",
  HKD: "CURRENCY_HKD",
  AED: "CURRENCY_AED",
  AFN: "CURRENCY_AFN",
  ALL: "CURRENCY_ALL",
  AMD: "CURRENCY_AMD",
  ANG: "CURRENCY_ANG",
  AOA: "CURRENCY_AOA",
  ARS: "CURRENCY_ARS",
  AWG: "CURRENCY_AWG",
  AZN: "CURRENCY_AZN",
  BAM: "CURRENCY_BAM",
  BBD: "CURRENCY_BBD",
  BDT: "CURRENCY_BDT",
  BGN: "CURRENCY_BGN",
  BHD: "CURRENCY_BHD",
  BIF: "CURRENCY_BIF",
  BMD: "CURRENCY_BMD",
  BND: "CURRENCY_BND",
  BOB: "CURRENCY_BOB",
  BOV: "CURRENCY_BOV",
  BRL: "CURRENCY_BRL",
  BSD: "CURRENCY_BSD",
  BTN: "CURRENCY_BTN",
  BWP: "CURRENCY_BWP",
  BYN: "CURRENCY_BYN",
  BZD: "CURRENCY_BZD",
  CAD: "CURRENCY_CAD",
  CDF: "CURRENCY_CDF",
  CHE: "CURRENCY_CHE",
  CHF: "CURRENCY_CHF",
  CHW: "CURRENCY_CHW",
  CLF: "CURRENCY_CLF",
  CLP: "CURRENCY_CLP",
  COP: "CURRENCY_COP",
  COU: "CURRENCY_COU",
  CRC: "CURRENCY_CRC",
  CUC: "CURRENCY_CUC",
  CUP: "CURRENCY_CUP",
  CVE: "CURRENCY_CVE",
  CZK: "CURRENCY_CZK",
  DJF: "CURRENCY_DJF",
  DKK: "CURRENCY_DKK",
  DOP: "CURRENCY_DOP",
  DZD: "CURRENCY_DZD",
  EGP: "CURRENCY_EGP",
  ERN: "CURRENCY_ERN",
  ETB: "CURRENCY_ETB",
  FJD: "CURRENCY_FJD",
  FKP: "CURRENCY_FKP",
  GBP: "CURRENCY_GBP",
  GEL: "CURRENCY_GEL",
  GHS: "CURRENCY_GHS",
  GIP: "CURRENCY_GIP",
  GMD: "CURRENCY_GMD",
  GNF: "CURRENCY_GNF",
  GTQ: "CURRENCY_GTQ",
  GYD: "CURRENCY_GYD",
  HNL: "CURRENCY_HNL",
  HRK: "CURRENCY_HRK",
  HTG: "CURRENCY_HTG",
  HUF: "CURRENCY_HUF",
  IDR: "CURRENCY_IDR",
  ILS: "CURRENCY_ILS",
  INR: "CURRENCY_INR",
  IQD: "CURRENCY_IQD",
  IRR: "CURRENCY_IRR",
  ISK: "CURRENCY_ISK",
  JMD: "CURRENCY_JMD",
  JOD: "CURRENCY_JOD",
  KES: "CURRENCY_KES",
  KGS: "CURRENCY_KGS",
  KHR: "CURRENCY_KHR",
  KMF: "CURRENCY_KMF",
  KPW: "CURRENCY_KPW",
  KWD: "CURRENCY_KWD",
  KYD: "CURRENCY_KYD",
  KZT: "CURRENCY_KZT",
  LAK: "CURRENCY_LAK",
  LBP: "CURRENCY_LBP",
  LKR: "CURRENCY_LKR",
  LRD: "CURRENCY_LRD",
  LSL: "CURRENCY_LSL",
  LYD: "CURRENCY_LYD",
  MAD: "CURRENCY_MAD",
  MDL: "CURRENCY_MDL",
  MGA: "CURRENCY_MGA",
  MKD: "CURRENCY_MKD",
  MMK: "CURRENCY_MMK",
  MNT: "CURRENCY_MNT",
  MOP: "CURRENCY_MOP",
  MRU: "CURRENCY_MRU",
  MUR: "CURRENCY_MUR",
  MVR: "CURRENCY_MVR",
  MWK: "CURRENCY_MWK",
  MXN: "CURRENCY_MXN",
  MXV: "CURRENCY_MXV",
  MZN: "CURRENCY_MZN",
  NAD: "CURRENCY_NAD",
  NGN: "CURRENCY_NGN",
  NIO: "CURRENCY_NIO",
  NOK: "CURRENCY_NOK",
  NPR: "CURRENCY_NPR",
  NZD: "CURRENCY_NZD",
  OMR: "CURRENCY_OMR",
  PAB: "CURRENCY_PAB",
  PEN: "CURRENCY_PEN",
  PGK: "CURRENCY_PGK",
  PHP: "CURRENCY_PHP",
  PKR: "CURRENCY_PKR",
  PLN: "CURRENCY_PLN",
  PYG: "CURRENCY_PYG",
  QAR: "CURRENCY_QAR",
  RON: "CURRENCY_RON",
  RSD: "CURRENCY_RSD",
  RUB: "CURRENCY_RUB",
  RWF: "CURRENCY_RWF",
  SAR: "CURRENCY_SAR",
  SBD: "CURRENCY_SBD",
  SCR: "CURRENCY_SCR",
  SDG: "CURRENCY_SDG",
  SEK: "CURRENCY_SEK",
  SHP: "CURRENCY_SHP",
  SLE: "CURRENCY_SLE",
  SLL: "CURRENCY_SLL",
  SOS: "CURRENCY_SOS",
  SRD: "CURRENCY_SRD",
  SSP: "CURRENCY_SSP",
  STN: "CURRENCY_STN",
  SVC: "CURRENCY_SVC",
  SYP: "CURRENCY_SYP",
  SZL: "CURRENCY_SZL",
  TJS: "CURRENCY_TJS",
  TMT: "CURRENCY_TMT",
  TND: "CURRENCY_TND",
  TOP: "CURRENCY_TOP",
  TRY: "CURRENCY_TRY",
  TTD: "CURRENCY_TTD",
  TWD: "CURRENCY_TWD",
  TZS: "CURRENCY_TZS",
  UAH: "CURRENCY_UAH",
  UGX: "CURRENCY_UGX",
  USN: "CURRENCY_USN",
  UYI: "CURRENCY_UYI",
  UYU: "CURRENCY_UYU",
  UYW: "CURRENCY_UYW",
  UZS: "CURRENCY_UZS",
  VED: "CURRENCY_VED",
  VES: "CURRENCY_VES",
  VUV: "CURRENCY_VUV",
  WST: "CURRENCY_WST",
  XAF: "CURRENCY_XAF",
  XAG: "CURRENCY_XAG",
  XAU: "CURRENCY_XAU",
  XBA: "CURRENCY_XBA",
  XBB: "CURRENCY_XBB",
  XBC: "CURRENCY_XBC",
  XBD: "CURRENCY_XBD",
  XCD: "CURRENCY_XCD",
  XDR: "CURRENCY_XDR",
  XOF: "CURRENCY_XOF",
  XPD: "CURRENCY_XPD",
  XPF: "CURRENCY_XPF",
  XPT: "CURRENCY_XPT",
  XSU: "CURRENCY_XSU",
  XTS: "CURRENCY_XTS",
  XUA: "CURRENCY_XUA",
  XXX: "CURRENCY_XXX",
  YER: "CURRENCY_YER",
  ZAR: "CURRENCY_ZAR",
  ZMW: "CURRENCY_ZMW",
  ZWL: "CURRENCY_ZWL"
};
var EasyPayProvider = {
  PAYCO: "EASY_PAY_PROVIDER_PAYCO",
  SAMSUNGPAY: "EASY_PAY_PROVIDER_SAMSUNGPAY",
  SSGPAY: "EASY_PAY_PROVIDER_SSGPAY",
  KAKAOPAY: "EASY_PAY_PROVIDER_KAKAOPAY",
  NAVERPAY: "EASY_PAY_PROVIDER_NAVERPAY",
  CHAI: "EASY_PAY_PROVIDER_CHAI",
  LPAY: "EASY_PAY_PROVIDER_LPAY",
  KPAY: "EASY_PAY_PROVIDER_KPAY",
  TOSSPAY: "EASY_PAY_PROVIDER_TOSSPAY",
  LGPAY: "EASY_PAY_PROVIDER_LGPAY",
  APPLEPAY: "EASY_PAY_PROVIDER_APPLEPAY",
  PINPAY: "EASY_PAY_PROVIDER_PINPAY",
  SKPAY: "EASY_PAY_PROVIDER_SKPAY",
  TOSS_BRANDPAY: "EASY_PAY_PROVIDER_TOSS_BRANDPAY"
};
var Gender = {
  MALE: "GENDER_MALE",
  FEMALE: "GENDER_FEMALE",
  OTHER: "GENDER_OTHER"
};
var GiftCertificateType = {
  BOOKNLIFE: "GIFT_CERTIFICATE_TYPE_BOOKNLIFE",
  SMART_MUNSANG: "GIFT_CERTIFICATE_TYPE_SMART_MUNSANG",
  CULTURELAND: "GIFT_CERTIFICATE_TYPE_CULTURELAND",
  HAPPYMONEY: "GIFT_CERTIFICATE_TYPE_HAPPYMONEY",
  CULTURE_GIFT: "GIFT_CERTIFICATE_TYPE_CULTURE_GIFT"
};
var Locale = {
  KO_KR: "KO_KR",
  EN_US: "EN_US",
  ZH_CN: "ZH_CN"
  // 중국어
};
var PgProvider = {
  HTML5_INICIS: "PG_PROVIDER_HTML5_INICIS",
  PAYPAL: "PG_PROVIDER_PAYPAL",
  INICIS: "PG_PROVIDER_INICIS",
  DANAL: "PG_PROVIDER_DANAL",
  NICE: "PG_PROVIDER_NICE",
  DANAL_TPAY: "PG_PROVIDER_DANAL_TPAY",
  JTNET: "PG_PROVIDER_JTNET",
  UPLUS: "PG_PROVIDER_UPLUS",
  NAVERPAY: "PG_PROVIDER_NAVERPAY",
  KAKAO: "PG_PROVIDER_KAKAO",
  SETTLE: "PG_PROVIDER_SETTLE",
  KCP: "PG_PROVIDER_KCP",
  MOBILIANS: "PG_PROVIDER_MOBILIANS",
  KAKAOPAY: "PG_PROVIDER_KAKAOPAY",
  NAVERCO: "PG_PROVIDER_NAVERCO",
  SYRUP: "PG_PROVIDER_SYRUP",
  KICC: "PG_PROVIDER_KICC",
  EXIMBAY: "PG_PROVIDER_EXIMBAY",
  SMILEPAY: "PG_PROVIDER_SMILEPAY",
  PAYCO: "PG_PROVIDER_PAYCO",
  KCP_BILLING: "PG_PROVIDER_KCP_BILLING",
  ALIPAY: "PG_PROVIDER_ALIPAY",
  PAYPLE: "PG_PROVIDER_PAYPLE",
  CHAI: "PG_PROVIDER_CHAI",
  BLUEWALNUT: "PG_PROVIDER_BLUEWALNUT",
  SMARTRO: "PG_PROVIDER_SMARTRO",
  PAYMENTWALL: "PG_PROVIDER_PAYMENTWALL",
  TOSSPAYMENTS: "PG_PROVIDER_TOSSPAYMENTS",
  KCP_QUICK: "PG_PROVIDER_KCP_QUICK",
  DAOU: "PG_PROVIDER_DAOU",
  GALAXIA: "PG_PROVIDER_GALAXIA",
  TOSSPAY: "PG_PROVIDER_TOSSPAY",
  KCP_DIRECT: "PG_PROVIDER_KCP_DIRECT",
  SETTLE_ACC: "PG_PROVIDER_SETTLE_ACC",
  SETTLE_FIRM: "PG_PROVIDER_SETTLE_FIRM",
  INICIS_UNIFIED: "PG_PROVIDER_INICIS_UNIFIED",
  KSNET: "PG_PROVIDER_KSNET",
  PAYPAL_V2: "PG_PROVIDER_PAYPAL_V2",
  SMARTRO_V2: "PG_PROVIDER_SMARTRO_V2",
  NICE_V2: "PG_PROVIDER_NICE_V2",
  TOSS_BRANDPAY: "PG_PROVIDER_TOSS_BRANDPAY",
  WELCOME: "PG_PROVIDER_WELCOME",
  TOSSPAY_V2: "PG_PROVIDER_TOSSPAY_V2",
  INICIS_V2: "PG_PROVIDER_INICIS_V2",
  KPN: "PG_PROVIDER_KPN"
};
var TransactionType = {
  PAYMENT: "PAYMENT",
  ISSUE_BILLING_KEY: "ISSUE_BILLING_KEY",
  IDENTITY_VERIFICATION: "IDENTITY_VERIFICATION",
  ISSUE_BILLING_KEY_AND_PAY: "ISSUE_BILLING_KEY_AND_PAY"
};
var WindowType = {
  IFRAME: "IFRAME",
  POPUP: "POPUP",
  REDIRECTION: "REDIRECTION",
  UI: "UI"
};
var PaymentUIType = {
  PAYPAL_SPB: "PAYPAL_SPB"
};
var IssueBillingKeyUIType = {
  PAYPAL_RT: "PAYPAL_RT"
};
var index = Object.freeze({
  __proto__: null,
  Bank,
  BillingKeyAndPayMethod,
  BillingKeyMethod,
  CardCompany,
  Carrier,
  Country,
  Currency,
  EasyPayProvider,
  Gender,
  GiftCertificateType,
  IssueBillingKeyUIType,
  Locale,
  PaymentUIType,
  PgProvider,
  TransactionType,
  WindowType
});
function isIdentityVerificationError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "IdentityVerificationError";
}
var IdentityVerificationError = class extends Error {
  constructor({ code, message, identityVerificationId, identityVerificationTxId }) {
    super(message);
    this.__portOneErrorType = "IdentityVerificationError";
    this.transactionType = TransactionType.IDENTITY_VERIFICATION;
    this.code = code;
    this.message = message;
    this.identityVerificationId = identityVerificationId;
    this.identityVerificationTxId = identityVerificationTxId;
  }
};
function isIssueBillingKeyAndPayError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "IssueBillingKeyAndPayError";
}
var IssueBillingKeyAndPayError = class extends Error {
  constructor({ txId, paymentId, billingKey, code, message }) {
    super(message);
    this.__portOneErrorType = "IssueBillingKeyAndPayError";
    this.transactionType = TransactionType.ISSUE_BILLING_KEY_AND_PAY;
    this.txId = txId;
    this.paymentId = paymentId;
    this.billingKey = billingKey;
    this.code = code;
    this.message = message;
  }
};
function isIssueBillingKeyError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "IssueBillingKeyError";
}
var IssueBillingKeyError = class extends Error {
  constructor({ code, message, billingKey }) {
    super(message);
    this.__portOneErrorType = "IssueBillingKeyError";
    this.transactionType = TransactionType.ISSUE_BILLING_KEY;
    this.code = code;
    this.message = message;
    this.billingKey = billingKey;
  }
};
function isModuleError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "ModuleError";
}
var ModuleError = class extends Error {
  constructor({ code, message }) {
    super(message);
    this.__portOneErrorType = "ModuleError";
    this.code = code;
    this.message = message;
  }
};
function isPaymentError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "PaymentError";
}
var PaymentError = class extends Error {
  constructor({ code, message, txId, paymentId }) {
    super(message);
    this.__portOneErrorType = "PaymentError";
    this.transactionType = TransactionType.PAYMENT;
    this.code = code;
    this.message = message;
    this.txId = txId;
    this.paymentId = paymentId;
  }
};
function isLoadIssueBillingKeyUIError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "LoadIssueBillingKeyUIError";
}
var LoadIssueBillingKeyUIError = class extends Error {
  constructor({ code, message }) {
    super(message);
    this.__portOneErrorType = "LoadIssueBillingKeyUIError";
    this.transactionType = TransactionType.ISSUE_BILLING_KEY;
    this.code = code;
    this.message = message;
  }
};
function isLoadPaymentUIError(error) {
  return isPortOneError(error) && error.__portOneErrorType === "LoadPaymentUIError";
}
var LoadPaymentUIError = class extends Error {
  constructor({ code, message }) {
    super(message);
    this.__portOneErrorType = "LoadPaymentUIError";
    this.transactionType = TransactionType.PAYMENT;
    this.code = code;
    this.message = message;
  }
};
function isPortOneError(error) {
  return error != null && typeof error === "object" && "__portOneErrorType" in error && typeof error.__portOneErrorType === "string";
}
var PortOne = {
  requestIdentityVerification,
  requestIssueBillingKeyAndPay,
  requestIssueBillingKey,
  requestPayment,
  loadPaymentUI,
  loadIssueBillingKeyUI,
  updateLoadPaymentUIRequest,
  updateLoadIssueBillingKeyUIRequest
};
export {
  index as Entity,
  IdentityVerificationError,
  IssueBillingKeyAndPayError,
  IssueBillingKeyError,
  LoadIssueBillingKeyUIError,
  LoadPaymentUIError,
  ModuleError,
  PaymentError,
  setPortOneJsSdkUrl as __INTERNAL__setPortOneSdkUrl,
  PortOne as default,
  isIdentityVerificationError,
  isIssueBillingKeyAndPayError,
  isIssueBillingKeyError,
  isLoadIssueBillingKeyUIError,
  isLoadPaymentUIError,
  isModuleError,
  isPaymentError,
  isPortOneError,
  loadIssueBillingKeyUI,
  loadPaymentUI,
  requestIdentityVerification,
  requestIssueBillingKey,
  requestIssueBillingKeyAndPay,
  requestPayment,
  updateLoadIssueBillingKeyUIRequest,
  updateLoadPaymentUIRequest
};
//# sourceMappingURL=@portone_browser-sdk_v2.js.map

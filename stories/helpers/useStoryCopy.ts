import { useTranslation } from "react-i18next";
import en from "../../src/localization/locales/en";
import ar from "../../src/localization/locales/ar";

const enStories = en.stories;
const arStories = ar.stories;

/**
 * If Controls still hold the EN/AR sample default, swap in the live translation.
 * Custom control values are left alone.
 */
export function resolveStoryText(
  argValue: string | undefined,
  translated: string,
  enDefault: string,
  arDefault: string,
) {
  if (
    argValue == null ||
    argValue === "" ||
    argValue === enDefault ||
    argValue === arDefault
  ) {
    return translated;
  }
  return argValue;
}

/** Localized sample strings for Text / Title Storybook demos. */
export function useStoryCopy() {
  const { t, i18n } = useTranslation();

  const simpleText = t("stories.simpleText");
  const titleText = t("stories.titleText");
  const subtitleText = t("stories.subtitleText");
  const viewAll = t("stories.viewAll");
  const loremIpsum = t("stories.loremIpsum");
  const tooltipText = t("stories.tooltipText");
  const accountBalance = t("stories.accountBalance");
  const pageTitle = t("stories.pageTitle");
  const linkText = t("stories.linkText");

  return {
    locale: i18n.language,
    simpleText,
    titleText,
    subtitleText,
    viewAll,
    loremIpsum,
    tooltipText,
    accountBalance,
    pageTitle,
    linkText,
    /** Defaults used to detect unchanged Controls values */
    defaults: {
      en: enStories,
      ar: arStories,
    },
    resolveSimpleText: (v?: string) =>
      resolveStoryText(v, simpleText, enStories.simpleText, arStories.simpleText),
    resolveTitleText: (v?: string) =>
      resolveStoryText(v, titleText, enStories.titleText, arStories.titleText),
    resolveSubtitleText: (v?: string) =>
      resolveStoryText(
        v,
        subtitleText,
        enStories.subtitleText,
        arStories.subtitleText,
      ),
    resolveViewAll: (v?: string) =>
      resolveStoryText(v, viewAll, enStories.viewAll, arStories.viewAll),
    resolveLoremIpsum: (v?: string) =>
      resolveStoryText(v, loremIpsum, enStories.loremIpsum, arStories.loremIpsum),
    resolveTooltipText: (v?: string) =>
      resolveStoryText(
        v,
        tooltipText,
        enStories.tooltipText,
        arStories.tooltipText,
      ),
    resolveAccountBalance: (v?: string) =>
      resolveStoryText(
        v,
        accountBalance,
        enStories.accountBalance,
        arStories.accountBalance,
      ),
    resolvePageTitle: (v?: string) =>
      resolveStoryText(v, pageTitle, enStories.pageTitle, arStories.pageTitle),
    resolveLinkText: (v?: string) =>
      resolveStoryText(v, linkText, enStories.linkText, arStories.linkText),
  };
}

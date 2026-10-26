import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/banners/marketingBanner";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Banners/Marketing Banner",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

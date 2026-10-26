import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/banners/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Banners/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

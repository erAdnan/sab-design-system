import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/cards/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Cards/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

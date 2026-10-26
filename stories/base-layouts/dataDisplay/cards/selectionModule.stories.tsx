import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/cards/selectionModule";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Cards/Selection Module",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

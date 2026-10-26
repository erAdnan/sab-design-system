import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/productsCard";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Products Card",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

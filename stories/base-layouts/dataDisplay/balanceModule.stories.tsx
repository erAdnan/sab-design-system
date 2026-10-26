import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/balanceModule";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Balance Module",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/disclaimer";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Disclaimer",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

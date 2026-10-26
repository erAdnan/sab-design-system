import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/chips";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Chips",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

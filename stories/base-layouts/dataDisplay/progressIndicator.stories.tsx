import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/progressIndicator";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Progress Indicator",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

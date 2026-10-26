import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/tooltip";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Tooltip",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

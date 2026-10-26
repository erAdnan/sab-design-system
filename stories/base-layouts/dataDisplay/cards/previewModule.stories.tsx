import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/cards/previewModule";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Cards/Preview Module",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

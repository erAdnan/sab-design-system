import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/blocks/apply";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Blocks/Apply",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

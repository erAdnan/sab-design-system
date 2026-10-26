import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/blocks/button";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Blocks/Button",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

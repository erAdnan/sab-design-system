import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/blocks/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Blocks/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

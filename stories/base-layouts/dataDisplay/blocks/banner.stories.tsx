import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/blocks/banner";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Blocks/Banner",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

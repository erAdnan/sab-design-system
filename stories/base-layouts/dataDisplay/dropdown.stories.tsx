import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/dropdown";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Dropdown",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

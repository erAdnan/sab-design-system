import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/tabs";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Tabs",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

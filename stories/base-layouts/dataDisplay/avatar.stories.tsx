import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/avatar";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Avatar",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/widgets";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Widgets",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/emptyState";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Empty State",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

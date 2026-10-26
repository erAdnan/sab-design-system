import React from "react";
import Page from "../../../../src/modules/catalog/components/navigation/bottomNavigation";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Bottom Navigation",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

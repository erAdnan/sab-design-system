import React from "react";
import Page from "../../../../src/modules/catalog/components/navigation/index";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

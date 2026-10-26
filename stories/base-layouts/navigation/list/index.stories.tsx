import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/list/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/List",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/search";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Search",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

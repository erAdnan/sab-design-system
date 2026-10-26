import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/level2";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Level 2",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

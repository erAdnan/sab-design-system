import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/level1intermediate";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Level 1 - Intermediate",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/level1";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Level 1",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

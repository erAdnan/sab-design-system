import React from "react";
import Page from "../../../../../src/modules/catalog/components/layout/divider/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Divider",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

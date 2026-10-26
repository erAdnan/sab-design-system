import React from "react";
import Page from "../../../../src/modules/catalog/components/layout/index";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

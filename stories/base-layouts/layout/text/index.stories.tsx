import React from "react";
import Page from "../../../../../src/modules/catalog/components/layout/text/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Text/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../../src/modules/catalog/components/layout/text/title";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Text/Title",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../../src/modules/catalog/components/layout/text/text";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Text/Text",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

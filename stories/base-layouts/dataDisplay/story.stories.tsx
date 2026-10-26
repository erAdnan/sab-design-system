import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/story";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Story",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

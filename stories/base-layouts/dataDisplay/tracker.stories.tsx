import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/tracker";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Tracker",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

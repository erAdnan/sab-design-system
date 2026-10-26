import React from "react";
import Page from "../../../../src/modules/catalog/components/dataEntry/range";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Range",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

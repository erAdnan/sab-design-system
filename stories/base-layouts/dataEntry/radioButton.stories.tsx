import React from "react";
import Page from "../../../../src/modules/catalog/components/dataEntry/radioButton";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Radio Button",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

import React from "react";
import Page from "../../../../src/modules/catalog/components/dataEntry/toggle";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Toggle",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

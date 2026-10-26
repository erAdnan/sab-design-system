import React from "react";
import Page from "../../../../src/modules/catalog/components/dataEntry/attach";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Attach",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

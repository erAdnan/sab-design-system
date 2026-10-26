import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/blocks/beneficiary";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Blocks/Beneficiary",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

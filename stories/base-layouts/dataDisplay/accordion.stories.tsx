import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/accordion";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Accordion",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

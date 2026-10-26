import React from "react";
import Page from "../../../../../src/modules/catalog/components/layout/text/textTitleActions";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Layout/Text/Text Title Actions",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

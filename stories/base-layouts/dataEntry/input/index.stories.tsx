import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataEntry/input/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Input Field/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

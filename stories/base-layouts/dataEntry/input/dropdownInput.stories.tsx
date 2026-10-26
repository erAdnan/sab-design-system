import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataEntry/input/dropdownInput";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Input Field/Dropdown Input",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

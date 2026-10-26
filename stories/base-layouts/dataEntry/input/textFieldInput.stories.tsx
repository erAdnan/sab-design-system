import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataEntry/input/textFieldInput";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Entry/Input Field/Text Field Input",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

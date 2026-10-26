import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/buttons/buttonGroup";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Buttons/Button Group",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

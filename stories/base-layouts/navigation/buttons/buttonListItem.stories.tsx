import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/buttons/buttonListItem";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Buttons/Button List Item",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

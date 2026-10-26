import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/buttons/mainButton";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Buttons/Main Button",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

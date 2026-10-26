import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/buttons/index";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Buttons/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

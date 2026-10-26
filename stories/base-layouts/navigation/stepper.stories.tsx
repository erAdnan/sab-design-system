import React from "react";
import Page from "../../../../src/modules/catalog/components/navigation/stepper";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Stepper",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

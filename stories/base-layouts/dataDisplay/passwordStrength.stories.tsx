import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/passwordStrength";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Password Strength",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

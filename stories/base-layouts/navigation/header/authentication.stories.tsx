import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/header/authentication";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Header/Authentication",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

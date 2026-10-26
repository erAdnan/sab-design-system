import React from "react";
import Page from "../../../src/modules/catalog/components/index";
import { renderCatalogPage } from "./CatalogStoryHost";

export default {
  title: "Base Layouts/Overview",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

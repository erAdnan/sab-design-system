import React from "react";
import Page from "../../../../src/modules/catalog/components/dataDisplay/notifications";
import { renderCatalogPage } from "../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Notifications",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

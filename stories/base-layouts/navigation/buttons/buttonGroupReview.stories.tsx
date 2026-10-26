import React from "react";
import Page from "../../../../../src/modules/catalog/components/navigation/buttons/buttonGroupReview";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Navigation/Buttons/Button Group Review",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

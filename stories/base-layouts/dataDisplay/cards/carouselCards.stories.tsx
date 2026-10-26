import React from "react";
import Page from "../../../../../src/modules/catalog/components/dataDisplay/cards/carouselCards";
import { renderCatalogPage } from "../../CatalogStoryHost";

export default {
  title: "Base Layouts/Data Display/Cards/Carousel Cards",
  component: Page,
};

export const Default = {
  render: renderCatalogPage(Page),
};

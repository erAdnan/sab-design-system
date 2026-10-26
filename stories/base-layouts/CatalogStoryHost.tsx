import React, { ComponentType } from "react";
import { StyleSheet, View } from "react-native";
import { CatalogStorybookContext } from "../../../src/app/layouts/catalogStorybookContext";
import { mockNavigation } from "./mockNavigation";

type CatalogPageProps = {
  navigation?: typeof mockNavigation;
};

/**
 * Host for demo-app catalog pages in Base Layout Storybook stories.
 * Enables catalogStorybook mode (hide nav header, top-align content).
 */
export function CatalogStoryHost({
  Page,
}: {
  Page: ComponentType<CatalogPageProps>;
}) {
  return (
    <CatalogStorybookContext.Provider value={true}>
      <View style={styles.host}>
        <Page navigation={mockNavigation} />
      </View>
    </CatalogStorybookContext.Provider>
  );
}

export function renderCatalogPage(Page: ComponentType<CatalogPageProps>) {
  return () => <CatalogStoryHost Page={Page} />;
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "flex-start",
  },
});

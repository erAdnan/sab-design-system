import React from "react";
import { View } from "react-native";
import type { Decorator } from "@storybook/react";
import { ALL_VARIANTS_STORY_NAME } from "./allVariants";
import { resolveVariantSource, VariantCodePanel } from "./variantSource";

const isAllVariantsStory = (name: string) =>
  /^all\s?variants$/i.test(name) || name === ALL_VARIANTS_STORY_NAME;

const isDocsStory = (title: string) =>
  title.includes("/Docs/") || /\/Docs$/i.test(title);

/** CSF title or story id (Docs mode often omits `context.title`). */
const isFoundationsStory = (title: string, id: string) =>
  title === "Foundations" ||
  title.startsWith("Foundations/") ||
  id === "foundations" ||
  id.startsWith("foundations-");

/**
 * Adds Show/Hide code + Copy code under individual stories (Default, etc.).
 * Skips the All variants gallery (already has per-variant panels), Foundations
 * (including autodocs embeds), and Figma Docs pages.
 *
 * Opt out per story with `parameters: { hideStorySource: true }`.
 */
export const withStorySourcePanel: Decorator = (Story, context) => {
  const title = String(context.title ?? (context as any).kind ?? "");
  const id = String(context.id ?? "").toLowerCase();
  const name = String(context.name ?? "");

  if (
    isAllVariantsStory(name) ||
    isDocsStory(title) ||
    isFoundationsStory(title, id)
  ) {
    return <Story />;
  }
  if (context.parameters?.hideStorySource || context.parameters?.hideVariantSource) {
    return <Story />;
  }

  const component =
    context.component ??
    (context as any).parameters?.component ??
    (context as any).loaded?.component;

  const source = resolveVariantSource({
    name,
    story: {
      args: context.args,
      parameters: context.parameters,
    },
    meta: {
      component,
      args: {},
    },
    args: (context.args ?? {}) as Record<string, any>,
  });

  return (
    <View style={{ alignSelf: "stretch", width: "100%", maxWidth: "100%" }}>
      <Story />
      <View
        style={{
          width: "100%",
          maxWidth: 720,
          alignSelf: "center",
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 28,
        }}
      >
        <VariantCodePanel source={source} />
      </View>
    </View>
  );
};

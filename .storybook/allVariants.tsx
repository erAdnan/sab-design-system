import React from "react";
import { Text as RNText, View } from "react-native";
import { useTheme } from "../src/context/theme/themeContext";
import { deepTranslateArgs } from "../src/localization/tx";
import { MOBILE_CONTENT_WIDTH } from "./mobileContentFrame";

/**
 * "All variants" gallery for a stories file.
 *
 * Usage (at the bottom of `stories/<Component>.stories.tsx`):
 *
 *   import * as stories from "./Component.stories";
 *   import { createAllVariantsStory } from "../.storybook/allVariants";
 *   export const AllVariants = createAllVariantsStory(stories, ["Default", "Error", ...]);
 *
 * The second argument is only an ordering hint (source order); the gallery auto-discovers every
 * story export, so stories missing from the hint are still shown (at the end).
 *
 * The file imports itself, so the gallery automatically mirrors every sibling story export
 * (their `args` / `render` / per-story `decorators`) and never duplicates markup. Members of the
 * namespace are only read at render time, which keeps the circular import safe.
 *
 * Layout: a vertical, top-aligned stack capped at the mobile content width (343) and horizontally
 * centered, with a small label (story name) above each variant. The file's own decorators still
 * wrap the gallery (theme / locale / i18n come from the global preview decorator, untouched).
 */

export const ALL_VARIANTS_STORY_NAME = "All variants";
const ALL_VARIANTS_EXPORT = "AllVariants";

type AnyStory = {
  args?: Record<string, any>;
  render?: (args: any, context: any) => any;
  decorators?: any[];
  name?: string;
  storyName?: string;
  [key: string]: any;
};

type StoriesModule = { default: Record<string, any> } & Record<string, any>;

/** Optional per-file tweaks for galleries whose components need a different frame than the 343 default. */
export type AllVariantsOptions = {
  /** Story export names to leave out of the gallery (e.g. interactive scroll templates). */
  exclude?: string[];
  /** Gallery width cap (default: mobile content width, 343). Use the 375 frame for full-width bars like Header. */
  maxWidth?: number;
  /** Vertical gap between variants (default 24). */
  gap?: number;
  /** Rewrite a variant's resolved args before rendering (e.g. drop story-only positioning offsets). */
  mapArgs?: (args: Record<string, any>, name: string) => Record<string, any>;
  /** Extra style for each variant's wrapper (e.g. padding / separator). */
  itemStyle?: Record<string, any>;
};

const matchesFilter = (filter: unknown, name: string) => {
  if (filter instanceof RegExp) return filter.test(name);
  if (Array.isArray(filter)) return filter.includes(name);
  return false;
};

const isStoryExport = (value: unknown): value is AnyStory =>
  (typeof value === "object" && value !== null && !Array.isArray(value) && !React.isValidElement(value)) ||
  typeof value === "function";

/** Names of the sibling story exports that make up the gallery, in file order. */
const collectStoryNames = (module: StoriesModule, orderHint?: string[], exclude: string[] = []): string[] => {
  const meta = module.default ?? {};
  const names = Object.keys(module).filter((name) => {
    if (name === "default" || name === ALL_VARIANTS_EXPORT || name === "__namedExportsOrder") return false;
    if (exclude.includes(name)) return false;
    if (!isStoryExport(module[name])) return false;
    if (meta.includeStories && !matchesFilter(meta.includeStories, name)) return false;
    if (meta.excludeStories && matchesFilter(meta.excludeStories, name)) return false;
    return true;
  });
  // The bundler does not preserve source order on the namespace object, so order by (in priority):
  // the explicit hint passed by the stories file, then Storybook's `__namedExportsOrder`, then keys.
  const order: string[] = orderHint ?? (Array.isArray(module.__namedExportsOrder) ? module.__namedExportsOrder : []);
  const rank = (name: string) => {
    const i = order.indexOf(name);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  // Array#sort is stable: stories missing from the hint (e.g. added later) keep their relative order, at the end.
  return names.sort((a, b) => rank(a) - rank(b));
};

const isPlainObject = (value: unknown): value is Record<string, any> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/**
 * Mirrors storybook-addon-deep-controls (enabled globally in preview.jsx): stories declare flat dotted
 * args like `"linkButtonProps.size"`, which the addon expands into nested objects before rendering.
 * Individual stories get that from the addon's decorator; the gallery builds args itself, so expand here.
 */
const expandDottedArgs = (args: Record<string, any>): Record<string, any> => {
  const out: Record<string, any> = {};
  // Plain keys first so dotted keys refine (rather than get overwritten by) their parent objects.
  const entries = Object.entries(args);
  const ordered = [...entries.filter(([k]) => !k.includes(".")), ...entries.filter(([k]) => k.includes("."))];
  for (const [key, value] of ordered) {
    if (!key.includes(".")) {
      out[key] = isPlainObject(value) ? { ...value } : value;
      continue;
    }
    const path = key.split(".");
    let node = out;
    path.slice(0, -1).forEach((part) => {
      node[part] = isPlainObject(node[part]) ? { ...node[part] } : {};
      node = node[part];
    });
    node[path[path.length - 1]] = value;
  }
  return out;
};

const VariantLabel = ({ children }: { children: string }) => {
  const { theme } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 8,
      }}
    >
      <View
        style={{
          width: 3,
          height: 12,
          borderRadius: 1,
          backgroundColor: theme?.primarycolor3 ?? "#DB0011",
        }}
      />
      <RNText
        style={{
          fontSize: 11,
          lineHeight: 14,
          fontWeight: "600",
          letterSpacing: 0.3,
          textTransform: "uppercase",
          color: theme?.primarytextcolor2 ?? theme?.primarytxtclr ?? "#767676",
        }}
      >
        {children}
      </RNText>
    </View>
  );
};

/** Renders one sibling story exactly like Storybook would (render fn, else <component {...args} />). */
const Variant = ({
  story,
  meta,
  context,
  locale,
  name,
  mapArgs,
}: {
  story: AnyStory;
  meta: Record<string, any>;
  context: any;
  locale: string;
  name: string;
  mapArgs?: AllVariantsOptions["mapArgs"];
}) => {
  const resolvedArgs = deepTranslateArgs(
    expandDottedArgs({ ...(meta.args ?? {}), ...((story as any).args ?? {}) }),
    locale,
  );
  const args = mapArgs ? mapArgs(resolvedArgs, name) : resolvedArgs;
  const variantContext = { ...context, args };
  const render =
    typeof story === "function"
      ? (story as any)
      : (story.render ?? meta.render ?? undefined);

  // Called inside a component so renders that use hooks keep working.
  const renderVariant = () => {
    if (render) return render(args, variantContext);
    const Component = meta.component as React.ComponentType<any> | undefined;
    return Component ? <Component {...args} /> : null;
  };

  // Per-story decorators (meta/global ones already wrap the whole gallery).
  const decorators: any[] = typeof story === "function" ? ((story as any).decorators ?? []) : (story.decorators ?? []);
  const renderRef = React.useRef(renderVariant);
  renderRef.current = renderVariant;
  const Inner = React.useMemo(() => {
    let Current: React.ComponentType = () => <>{renderRef.current()}</>;
    for (const decorator of decorators) {
      const Wrapped: React.ComponentType = Current;
      Current = () => decorator(Wrapped, variantContext);
    }
    return Current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Inner />;
};

/**
 * Builds the `AllVariants` story for a stories module (pass `import * as stories from "./X.stories"`).
 * `order` is an optional list of export names in source order.
 */
export const createAllVariantsStory = (module: StoriesModule, order?: string[], options: AllVariantsOptions = {}) => ({
  name: ALL_VARIANTS_STORY_NAME,
  // Controls would only edit meta-level args that the gallery merges per variant; hide them.
  parameters: {
    controls: { disable: true },
    // The auto "Show code" JSX printer chokes on the (large) gallery tree; the story is a composition anyway.
    docs: { source: { type: "code", code: "// Gallery of every variant in this file (see .storybook/allVariants.tsx)" } },
  },
  render: (_args: any, context: any) => {
    const meta = module.default ?? {};
    const locale = context?.globals?.locale === "ar" ? "ar" : "en";
    const names = collectStoryNames(module, order, options.exclude);

    return (
      <View
        style={{
          width: "100%",
          maxWidth: options.maxWidth ?? MOBILE_CONTENT_WIDTH,
          paddingVertical: 8,
          gap: options.gap ?? 28,
          alignItems: "stretch",
        }}
      >
        {names.map((name) => {
          const story = module[name] as AnyStory;
          const label = (typeof story === "object" && (story.name ?? story.storyName)) || name;
          return (
            <View key={`${locale}-${name}`} style={[{ width: "100%" }, options.itemStyle]}>
              <VariantLabel>{label}</VariantLabel>
              <Variant
                story={story}
                meta={meta}
                context={context}
                locale={locale}
                name={name}
                mapArgs={options.mapArgs}
              />
            </View>
          );
        })}
      </View>
    );
  },
});

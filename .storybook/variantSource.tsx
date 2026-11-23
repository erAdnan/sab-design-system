import React, { useCallback, useMemo, useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  Text as RNText,
  View,
} from "react-native";
import { useTheme } from "../src/context/theme/themeContext";

const MONO =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';

const CODE_BG = "#1E1E1E";
const CODE_FG = "#D4D4D4";
const TOKEN = {
  tag: "#4EC9B0",
  attr: "#9CDCFE",
  string: "#CE9178",
  number: "#B5CEA8",
  punct: "#D4D4D4",
  comment: "#6A9955",
  keyword: "#C586C0",
};

export type VariantSourceResult = {
  code: string;
  /** When true, panel still shows code but it is an explanatory comment, not runnable JSX. */
  unavailable?: boolean;
  reason?: string;
};

const isPlainObject = (value: unknown): value is Record<string, any> => {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
};

/** Best-effort component tag name for JSX snippets. */
export const getComponentName = (component: unknown): string | null => {
  if (!component) return null;
  if (typeof component === "string") return component;
  if (typeof component === "function" || typeof component === "object") {
    const c = component as { displayName?: string; name?: string };
    const name = c.displayName || c.name;
    if (name && name !== "Component" && name !== "Anonymous") return name;
  }
  return null;
};

const indent = (level: number) => "  ".repeat(level);

const formatPrimitive = (value: unknown): string => {
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "bigint") return String(value);
  if (typeof value === "boolean") return value ? "true" : "false";
  if (value === null) return "null";
  return "undefined";
};

/**
 * Serialize a prop value into JSX expression text (without outer `{…}` for
 * strings that can be written as attributes).
 */
const serializeValue = (value: unknown, depth = 0): { jsx: string; asExpression: boolean } => {
  if (value === undefined) {
    return { jsx: "undefined", asExpression: true };
  }
  if (value === null || typeof value === "string" || typeof value === "number" || typeof value === "boolean" || typeof value === "bigint") {
    const prim = formatPrimitive(value);
    // Strings as attributes: title="Hello"; others as expressions: count={3}
    if (typeof value === "string") return { jsx: prim, asExpression: false };
    return { jsx: prim, asExpression: true };
  }
  if (typeof value === "function") {
    return { jsx: "() => {}", asExpression: true };
  }
  if (React.isValidElement(value)) {
    const type: any = value.type;
    const elName =
      (typeof type === "string" && type) ||
      type?.displayName ||
      type?.name ||
      "Element";
    return { jsx: `<${elName} />`, asExpression: true };
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return { jsx: "[]", asExpression: true };
    const items = value.map((v) => serializeValue(v, depth + 1).jsx);
    const multiline = items.join(", ").length > 48 || depth > 0;
    if (!multiline) return { jsx: `[${items.join(", ")}]`, asExpression: true };
    const body = items.map((i) => `${indent(depth + 1)}${i}`).join(",\n");
    return { jsx: `[\n${body}\n${indent(depth)}]`, asExpression: true };
  }
  if (isPlainObject(value)) {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (entries.length === 0) return { jsx: "{}", asExpression: true };
    const lines = entries.map(([k, v]) => {
      const key = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      const inner = serializeValue(v, depth + 1);
      return `${indent(depth + 1)}${key}: ${inner.jsx}`;
    });
    return {
      jsx: `{\n${lines.join(",\n")}\n${indent(depth)}}`,
      asExpression: true,
    };
  }
  return { jsx: "/* unsupported value */", asExpression: true };
};

/** Build `<Name … />` from resolved args. */
export const buildComponentJsx = (
  componentName: string,
  args: Record<string, any>,
): string => {
  const entries = Object.entries(args).filter(([, v]) => v !== undefined);
  if (entries.length === 0) return `<${componentName} />`;

  const props = entries.map(([key, value]) => {
    if (typeof value === "boolean") {
      return value ? `  ${key}` : `  ${key}={false}`;
    }
    const { jsx, asExpression } = serializeValue(value, 1);
    if (!asExpression) return `  ${key}=${jsx}`;
    // Multiline expressions keep braces with indented body
    if (jsx.includes("\n")) {
      return `  ${key}={${jsx}}`;
    }
    return `  ${key}={${jsx}}`;
  });

  return `<${componentName}\n${props.join("\n")}\n/>`;
};

/**
 * Resolve source for one All-variants gallery item.
 *
 * Priority:
 * 1. story.parameters.docs.source.code / allVariantsSource (explicit override)
 * 2. Component + args JSX when meta.component is known
 * 3. Unavailable comment with reason
 */
export const resolveVariantSource = ({
  name,
  story,
  meta,
  args,
}: {
  name: string;
  story: any;
  meta: Record<string, any>;
  args: Record<string, any>;
}): VariantSourceResult => {
  const explicit =
    story?.parameters?.allVariantsSource ??
    story?.parameters?.docs?.source?.code;
  if (typeof explicit === "string" && explicit.trim()) {
    return { code: explicit.trim() };
  }

  const componentName = getComponentName(meta.component);
  const hasCustomRender =
    typeof story === "function" ||
    typeof story?.render === "function" ||
    typeof meta.render === "function";

  // Pure custom gallery (e.g. Badge Catalogue) with no meaningful instance args
  const argKeys = Object.keys(args).filter((k) => args[k] !== undefined);
  const looksLikeCatalogue =
    /catalogue|catalog|allsizes|matrix/i.test(name) ||
    (hasCustomRender && argKeys.length === 0 && !componentName);

  if (looksLikeCatalogue && argKeys.length === 0) {
    return {
      code: [
        `// Code unavailable for “${name}”.`,
        `// Reason: this variant is a custom catalogue/matrix render, not a single`,
        `// component instance with args. Open the individual story file for the`,
        `// render implementation (search for export const ${name}).`,
      ].join("\n"),
      unavailable: true,
      reason: "custom catalogue render",
    };
  }

  if (!componentName) {
    return {
      code: [
        `// Code unavailable for “${name}”.`,
        `// Reason: this stories file has no meta.component, so JSX cannot be`,
        `// inferred from args. Set parameters.docs.source.code (or`,
        `// parameters.allVariantsSource) on the story to provide a snippet.`,
      ].join("\n"),
      unavailable: true,
      reason: "missing meta.component",
    };
  }

  const jsx = buildComponentJsx(componentName, args);
  if (hasCustomRender) {
    // Still show args-based usage — typical consumer API — with a short note.
    return {
      code: [
        `// Usage inferred from story args (custom render wraps this in the story).`,
        jsx,
      ].join("\n"),
    };
  }

  return { code: jsx };
};

/** Lightweight token coloring for the dark code block (web + RN Text). */
const HighlightedCode = ({ code }: { code: string }) => {
  const lines = code.split("\n");
  return (
    <View>
      {lines.map((line, lineIndex) => (
        <RNText
          key={`l-${lineIndex}`}
          style={{ fontFamily: MONO, fontSize: 12, lineHeight: 18 }}
        >
          {tokenizeLine(line).map((tok, i) => (
            <RNText key={i} style={{ color: tok.color, fontFamily: MONO, fontSize: 12 }}>
              {tok.text}
            </RNText>
          ))}
          {lineIndex < lines.length - 1 ? "\n" : null}
        </RNText>
      ))}
    </View>
  );
};

type Tok = { text: string; color: string };

const tokenizeLine = (line: string): Tok[] => {
  if (line.trimStart().startsWith("//")) {
    return [{ text: line, color: TOKEN.comment }];
  }
  const tokens: Tok[] = [];
  const re =
    /(\s+)|(\/\/.*$)|(<\/?[A-Za-z][\w.]*)|(\b(?:true|false|null|undefined)\b)|("[^"\\]*(?:\\.[^"\\]*)*"|'[^'\\]*(?:\\.[^'\\]*)*')|(\b\d+\b)|([{}()[\]=<>,/])|([A-Za-z_]\w*)|./g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) {
    const [text, ws, comment, tag, kw, str, num, punct, ident] = m;
    if (ws) tokens.push({ text, color: CODE_FG });
    else if (comment) tokens.push({ text, color: TOKEN.comment });
    else if (tag) tokens.push({ text, color: TOKEN.tag });
    else if (kw) tokens.push({ text, color: TOKEN.keyword });
    else if (str) tokens.push({ text, color: TOKEN.string });
    else if (num) tokens.push({ text, color: TOKEN.number });
    else if (punct) tokens.push({ text, color: TOKEN.punct });
    else if (ident) {
      // prop names before = look like attrs
      tokens.push({ text, color: TOKEN.attr });
    } else tokens.push({ text, color: CODE_FG });
  }
  return tokens.length ? tokens : [{ text: line, color: CODE_FG }];
};

const CodeIcon = ({ color }: { color: string }) => (
  <RNText style={{ color, fontFamily: MONO, fontSize: 13, fontWeight: "700" }}>{`</>`}</RNText>
);

const CopyIcon = ({ color }: { color: string }) => (
  <View style={{ width: 14, height: 14, position: "relative" }}>
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 3,
        width: 10,
        height: 10,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 2,
      }}
    />
    <View
      style={{
        position: "absolute",
        top: 3,
        left: 0,
        width: 10,
        height: 10,
        borderWidth: 1.5,
        borderColor: color,
        borderRadius: 2,
        backgroundColor: "#FFFFFF",
      }}
    />
  </View>
);

/**
 * Show / Hide code + Copy code panel under each All-variants item
 * (matches Storybook’s built-in source panel look from the design screenshot).
 */
export const VariantCodePanel = ({
  source,
}: {
  source: VariantSourceResult;
}) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const brandRed = theme?.primarycolor3 ?? "#DB0011";
  const muted = theme?.primarytextcolor2 ?? "#767676";

  const onCopy = useCallback(async () => {
    const text = source.code;
    try {
      if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else if (typeof document !== "undefined") {
        const el = document.createElement("textarea");
        el.value = text;
        el.setAttribute("readonly", "");
        el.style.position = "absolute";
        el.style.left = "-9999px";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [source.code]);

  const toggleLabel = open ? "Hide code" : "Show code";
  const toggleColor = open ? brandRed : muted;

  return (
    <View style={{ width: "100%", marginTop: 12 }}>
      {open ? (
        <View
          style={{
            backgroundColor: CODE_BG,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 14,
            marginBottom: 10,
            maxHeight: 320,
            // Web: CSS overflow so long JSX scrolls inside the panel.
            ...(Platform.OS === "web"
              ? ({ overflow: "auto" } as object)
              : null),
          }}
        >
          {Platform.OS === "web" ? (
            <HighlightedCode code={source.code} />
          ) : (
            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator>
              <ScrollView horizontal nestedScrollEnabled>
                <HighlightedCode code={source.code} />
              </ScrollView>
            </ScrollView>
          )}
        </View>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <Pressable
          onPress={() => setOpen((v) => !v)}
          accessibilityRole="button"
          accessibilityLabel={toggleLabel}
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <CodeIcon color={toggleColor} />
          <RNText style={{ color: toggleColor, fontSize: 13, fontWeight: "600" }}>
            {toggleLabel}
          </RNText>
        </Pressable>

        <Pressable
          onPress={onCopy}
          accessibilityRole="button"
          accessibilityLabel="Copy code"
          style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
        >
          <CopyIcon color={copied ? brandRed : muted} />
          <RNText
            style={{
              color: copied ? brandRed : muted,
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            {copied ? "Copied" : "Copy code"}
          </RNText>
        </Pressable>

        {source.unavailable ? (
          <RNText style={{ color: muted, fontSize: 11, flexShrink: 1 }}>
            {source.reason ? `Note: ${source.reason}` : null}
          </RNText>
        ) : null}
      </View>
    </View>
  );
};

/** Hook-friendly memo wrapper used by the gallery. */
export const useVariantSource = (
  name: string,
  story: any,
  meta: Record<string, any>,
  args: Record<string, any>,
) =>
  useMemo(
    () => resolveVariantSource({ name, story, meta, args }),
    [name, story, meta, args],
  );

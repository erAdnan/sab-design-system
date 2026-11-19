import React, { useEffect } from "react";
import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks";

const HIDE_FOUNDATIONS_CODE_CSS = `
  /* Foundations Docs: hide Storybook Show code / Copy code on Canvas blocks */
  .sbdocs-preview-actions,
  .docblock-code-toggle,
  button.docblock-code-toggle {
    display: none !important;
  }
`;

const isFoundationsDocs = (context: DocsContainerProps["context"]) => {
  const ctx = context as any;
  let storyTitle = "";
  let storyId = "";
  try {
    const story = typeof ctx?.storyById === "function" ? ctx.storyById() : null;
    storyTitle = String(story?.title ?? "");
    storyId = String(story?.id ?? "").toLowerCase();
  } catch {
    // Docs context may not have a primary story yet.
  }
  const title = String(
    storyTitle ||
      ctx?.attachedCSFFile?.meta?.title ||
      ctx?.preparedMeta?.title ||
      "",
  );
  const id = storyId;
  // Docs preview iframe: iframe.html?id=foundations-responsive-grid--docs
  const href =
    typeof window !== "undefined" ? String(window.location?.href ?? "") : "";
  return (
    title === "Foundations" ||
    title.startsWith("Foundations/") ||
    id.startsWith("foundations-") ||
    /[?&]id=foundations-/.test(href) ||
    /\/docs\/foundations-/.test(href)
  );
};

/**
 * Docs container that strips Show code / Copy code for Foundations only.
 * Complements parameters.docs.canvas.sourceState = "none" on Foundations metas.
 */
export const FoundationsDocsContainer = ({
  children,
  context,
  ...rest
}: DocsContainerProps) => {
  useEffect(() => {
    if (typeof document === "undefined" || !isFoundationsDocs(context)) {
      return undefined;
    }
    const style = document.createElement("style");
    style.setAttribute("data-sab-hide-foundations-code", "true");
    style.textContent = HIDE_FOUNDATIONS_CODE_CSS;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, [context]);

  return (
    <DocsContainer context={context} {...rest}>
      {children}
    </DocsContainer>
  );
};

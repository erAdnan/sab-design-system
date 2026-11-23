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
 * Docs container: Docs always stay light (Dark Mode is canvas-only), and
 * Foundations Docs also hide native Show code / Copy code.
 */
export const FoundationsDocsContainer = ({
  children,
  context,
  ...rest
}: DocsContainerProps) => {
  // Docs pages never use Dark Mode chrome — reset any leftover black body/html
  // from a previous story canvas visit.
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    const prevColor = document.body.style.color;
    document.body.style.backgroundColor = "";
    document.documentElement.style.backgroundColor = "";
    document.body.style.color = "";
    document.body.removeAttribute("data-sab-theme");
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
      document.body.style.color = prevColor;
    };
  }, []);

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

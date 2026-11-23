import type { Decorator } from "@storybook/react";
import {
  MOBILE_CONTENT_WIDTH,
  mobileContentDecorators,
  mobileWidthDecorator,
} from "./mobileContentFrame";

/** @deprecated Re-export of the shared mobile frame; prefer `mobileContentDecorators`. */
export const DISCLAIMER_CONTENT_WIDTH = MOBILE_CONTENT_WIDTH;

/** @deprecated Prefer `mobileContentDecorators`. */
export const disclaimerMobileWidthDecorator: Decorator = mobileWidthDecorator(MOBILE_CONTENT_WIDTH);

/** @deprecated Prefer `mobileContentDecorators`. */
export const disclaimerStoryDecorators: Decorator[] = mobileContentDecorators;

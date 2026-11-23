import type { Decorator } from "@storybook/react";
import {
  MOBILE_CONTENT_WIDTH,
  mobileContentDecorators,
  mobileWidthDecorator,
} from "./mobileContentFrame";

/** @deprecated Re-export of the shared mobile frame; prefer `mobileContentDecorators`. */
export const LIST_CONTENT_WIDTH = MOBILE_CONTENT_WIDTH;

/** @deprecated Prefer `mobileContentDecorators`. */
export const listMobileWidthDecorator: Decorator = mobileWidthDecorator(MOBILE_CONTENT_WIDTH);

/** @deprecated Prefer `mobileContentDecorators`. */
export const listStoryDecorators: Decorator[] = mobileContentDecorators;

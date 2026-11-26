import type { Decorator } from "@storybook/react-webpack5";
import {
  MOBILE_CONTENT_WIDTH,
  MOBILE_FRAME_WIDTH,
  mobileContentDecorators,
  mobileFrameDecorators,
} from "./mobileContentFrame";

/** Figma mobile frame width (Buttons page: Button Group / Button Group Review frames are 375). */
export const BUTTON_FRAME_WIDTH = MOBILE_FRAME_WIDTH;

/** Figma mobile content width (375 frame - 2 x 16 horizontal padding = 343). */
export const BUTTON_CONTENT_WIDTH = MOBILE_CONTENT_WIDTH;

/**
 * Full mobile frame (375). Use for bottom-sheet style components (ButtonGroupReview, ButtonGroup with
 * its own 16px side padding) that are full-bleed on device but must not stretch across a desktop canvas.
 */
export const buttonFrameStoryDecorators: Decorator[] = mobileFrameDecorators;

/**
 * Mobile content width (343). Use for components that are `width: 100%` of a padded screen
 * (ButtonGroup, standalone full-width buttons, list items, ...).
 */
export const buttonContentStoryDecorators: Decorator[] = mobileContentDecorators;

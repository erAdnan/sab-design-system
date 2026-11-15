/**
 * Storybook action spies (Actions panel) + interaction helpers (Interactions panel).
 * Prefer `fn()` from `storybook/test` over console.log / empty handlers.
 */
import { fn } from "storybook/test";

/** Shared press/change spies — reuse in meta.args so every story logs to Actions. */
export const createActionSpies = () => ({
  onButtonPress: fn().mockName("onButtonPress"),
  onPress: fn().mockName("onPress"),
  onChange: fn().mockName("onChange"),
  onSelect: fn().mockName("onSelect"),
  onClick: fn().mockName("onClick"),
  handleCheck: fn().mockName("handleCheck"),
  handleToggle: fn().mockName("handleToggle"),
  handleActionPress: fn().mockName("handleActionPress"),
  onIconPress: fn().mockName("onIconPress"),
  onFilterPress: fn().mockName("onFilterPress"),
});

/** One-off named spy (when a story needs an extra callback). */
export const spy = (name: string) => fn().mockName(name);

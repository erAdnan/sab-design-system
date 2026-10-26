/**
 * Connects design-system text-entry primitives to the nearest
 * KeyboardAwareScrollView. Bottom sheets should keep their own focus handling.
 */
import { createContext, useContext } from "react";
import type { TextInput } from "react-native";

export type KeyboardAwareInputFocusHandler = (input: TextInput | null) => void;

export const KeyboardAwareInputFocusContext =
  createContext<KeyboardAwareInputFocusHandler | null>(null);

export const useKeyboardAwareInputFocus =
  (): KeyboardAwareInputFocusHandler | null =>
    useContext(KeyboardAwareInputFocusContext);

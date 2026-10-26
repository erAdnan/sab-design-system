import { Keyboard, TextInput } from "react-native";

/**
 * Header back should not navigate while the user is typing.
 * Returns true when this press only closed the keyboard and cleared focus.
 */
export function holdBackForKeyboard(): boolean {
  const focused = TextInput.State.currentlyFocusedInput();
  const keyboardOpen = Keyboard.isVisible();
  if (focused == null && !keyboardOpen) return false;

  if (focused != null) {
    TextInput.State.blurTextInput(focused);
  }
  Keyboard.dismiss();
  return true;
}

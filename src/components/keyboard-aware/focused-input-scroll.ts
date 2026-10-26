export interface FocusedInputLayout {
  inputY: number;
  inputHeight: number;
  scrollY: number;
  scrollHeight: number;
  keyboardTop: number;
  footerHeight: number;
  gap: number;
  currentScrollOffset: number;
}

/** Returns the next offset only when the focused input is obscured. */
export const getFocusedInputScrollY = ({
  inputY,
  inputHeight,
  scrollY,
  scrollHeight,
  keyboardTop,
  footerHeight,
  gap,
  currentScrollOffset,
}: FocusedInputLayout): number | null => {
  const visibleBottom =
    Math.min(scrollY + scrollHeight, keyboardTop) - footerHeight - gap;
  const overlap = inputY + inputHeight - visibleBottom;

  return overlap > 0 ? Math.max(0, currentScrollOffset + overlap) : null;
};

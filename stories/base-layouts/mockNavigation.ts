/** No-op navigation for catalog screens rendered in Storybook. */
export const mockNavigation = {
  goBack: () => {},
  push: (_route?: string, _params?: unknown) => {},
  navigate: (_route?: string, _params?: unknown) => {},
  replace: (_route?: string, _params?: unknown) => {},
  pop: () => {},
  canGoBack: () => false,
  getParent: () => undefined,
  setOptions: () => {},
  addListener: () => () => {},
  dispatch: () => {},
  isFocused: () => true,
  getState: () => ({ routes: [], index: 0 }),
};

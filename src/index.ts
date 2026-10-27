/**
 * @sab-digital-bank/design-system public API.
 *
 * Prefer deep imports for tree-shaking in RN, e.g.:
 *   import { Button } from '@sab-digital-bank/design-system/components/button/Button'
 *   import { useTheme } from '@sab-digital-bank/design-system/context/theme/themeContext'
 *   import { spacingS } from '@sab-digital-bank/design-system/foundations'
 *
 * This barrel re-exports foundations + theme for app convenience.
 * Components are numerous — import them from their folders.
 */

export * from "./foundations";
export {
  ThemeProvider,
  ThemeContext,
  useTheme,
} from "./context/theme/themeContext";

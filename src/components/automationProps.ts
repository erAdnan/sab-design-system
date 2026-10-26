export interface AutomationProps {
  testID?: string;
  accessibilityLabel?: string;
}

export const getAutomationProps = (
  testID?: string,
  accessibilityLabel?: string,
  fallbackAccessibilityLabel?: string
) => ({
  ...(testID ? { testID } : {}),
  ...((accessibilityLabel ?? fallbackAccessibilityLabel)
    ? { accessibilityLabel: accessibilityLabel ?? fallbackAccessibilityLabel }
    : {}),
});

export const getNestedAutomationProps = (
  automationProps: AutomationProps | undefined,
  suffix: string,
  fallbackAccessibilityLabel?: string
) =>
  getAutomationProps(
    automationProps?.testID ? `${automationProps.testID}-${suffix}` : undefined,
    automationProps?.accessibilityLabel
      ? `${automationProps.accessibilityLabel}-${suffix}`
      : undefined,
    fallbackAccessibilityLabel
  );

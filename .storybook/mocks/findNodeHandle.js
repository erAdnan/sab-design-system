/**
 * react-native-web ≥0.20 throws on findNodeHandle. @gorhom/bottom-sheet v4 still
 * calls it for scrollable bookkeeping — return a stable handle instead of crashing.
 */
function findNodeHandle(componentOrHandle) {
  if (componentOrHandle == null) {
    return null;
  }
  if (typeof componentOrHandle === "number") {
    return componentOrHandle;
  }

  const node =
    componentOrHandle.current != null
      ? componentOrHandle.current
      : componentOrHandle;

  if (typeof Element !== "undefined" && node instanceof Element) {
    return node;
  }

  if (typeof node?.getScrollableNode === "function") {
    try {
      return node.getScrollableNode();
    } catch {
      // fall through
    }
  }

  if (typeof node?.getNativeScrollRef === "function") {
    try {
      const ref = node.getNativeScrollRef();
      return ref?.current ?? ref ?? 1;
    } catch {
      // fall through
    }
  }

  if (node && typeof node === "object") {
    if (node.__sbFindNodeHandleId == null) {
      node.__sbFindNodeHandleId = Math.floor(Math.random() * 1e9) + 1;
    }
    return node.__sbFindNodeHandleId;
  }

  return 1;
}

module.exports = findNodeHandle;
module.exports.default = findNodeHandle;

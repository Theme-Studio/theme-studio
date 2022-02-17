import type { NodeSize } from "@types";

/**
 * Returns whether the window object is ready to use
 * @returns boolean
 */
export function isBrowser(): boolean {
  return Boolean(
    typeof window !== "undefined" &&
      window.document &&
      window.document.createElement
  );
}

/**
 * Returns the pixels of the element
 * @param element HTMLElement
 * @param property string
 * @returns number
 */
export function getNodePx(element: HTMLElement, property: string): number {
  if (!isBrowser()) throw new Error("Browser is not available");
  const propertyValue: string = window
    .getComputedStyle(element)
    .getPropertyValue(property);

  if (!propertyValue.endsWith("px"))
    throw new Error("Property value is not in pixels");

  return parseFloat(propertyValue.replace("px", ""));
}

/**
 * Get the size of the node
 * @param node HTMLElement
 * @returns NodeSize
 */
export function getNodeSize(node: HTMLElement): NodeSize {
  return {
    width: getNodeWidth(node),
    height: getNodeHeight(node),
  };
}

/**
 * Get the height of the node
 * @param node HTMLElement
 * @returns number
 */
export function getNodeHeight(node: HTMLElement): number {
  const topBorder = getNodePx(node, "border-top-width");
  const bottomBorder = getNodePx(node, "border-bottom-width");
  return node.clientHeight + topBorder + bottomBorder;
}

/**
 * Get the width of the node
 * @param node HTMLElement
 * @returns number
 */
export function getNodeWidth(node: HTMLElement): number {
  const leftBorder = getNodePx(node, "border-left-width");
  const rightBorder = getNodePx(node, "border-right-width");
  return node.clientWidth + leftBorder + rightBorder;
}
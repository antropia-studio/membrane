export type DetoxId = string;
export type DetoxMatcher = Detox.NativeMatcher | DetoxId;

/**
 * Retrieves an element based on the given matcher.
 *
 * This function identifies a UI element on the screen either by its unique ID (if the matcher is a string)
 * or by using a custom DetoxMatcher object. The matcher determines how the target element is located.
 *
 * @param {DetoxMatcher|string} matcher - A string representing the ID of the element, or a DetoxMatcher defining the criteria to locate the element.
 * @returns The element matching the given matcher.
 */
export const getElement = (matcher: DetoxMatcher) => {
  if (typeof matcher === 'string') {
    return element(by.id(matcher));
  } else {
    return element(matcher);
  }
};

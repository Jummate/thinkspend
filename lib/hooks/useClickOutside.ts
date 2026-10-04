import { useEffect, useRef, type RefObject } from "react";

/**
 * Calls `handler` when a mousedown occurs outside every provided ref,
 * but only while `active` is true.
 *
 * Accepts a second ref because portaled content (e.g. DatePicker's
 * popover rendered into document.body) lives outside the trigger's
 * container in the DOM — a click inside the popover would otherwise
 * register as "outside" and close it.
 */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void,
  active: boolean,
  secondaryRef?: RefObject<HTMLElement | null>,
) {
  const handlerRef = useRef(handler);

  // Keep the ref pointing at the latest handler without re-running the
  // effect — callers can pass an inline arrow function without causing
  // the listener to detach/reattach on every render.
  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!active) return;

    function handleMouseDown(event: MouseEvent) {
      const target = event.target as Node;

      const insidePrimary = ref.current?.contains(target) ?? false;
      const insideSecondary = secondaryRef?.current?.contains(target) ?? false;

      if (!insidePrimary && !insideSecondary) {
        handlerRef.current();
      }
    }

    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [ref, secondaryRef, active]);
}
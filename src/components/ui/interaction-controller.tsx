"use client";

import { useEffect } from "react";

const MAGNETIC_SELECTOR = '[data-magnetic="true"]:not(:disabled)';
const MAX_OFFSET = 4;

function getMagneticTarget(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>(MAGNETIC_SELECTOR)
    : null;
}

export function InteractionController() {
  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let activeElement: HTMLElement | null = null;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let pointerListenersAttached = false;

    const reset = () => {
      if (!activeElement) return;

      activeElement.style.removeProperty("--magnetic-x");
      activeElement.style.removeProperty("--magnetic-y");
      activeElement.removeAttribute("data-magnetic-active");
      activeElement = null;
    };

    const update = () => {
      frame = 0;
      if (!activeElement || !finePointer.matches || reducedMotion.matches) {
        reset();
        return;
      }

      const bounds = activeElement.getBoundingClientRect();
      const x = ((pointerX - bounds.left) / bounds.width - 0.5) * MAX_OFFSET * 2;
      const y = ((pointerY - bounds.top) / bounds.height - 0.5) * MAX_OFFSET * 2;

      activeElement.style.setProperty(
        "--magnetic-x",
        `${Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, x)).toFixed(2)}px`,
      );
      activeElement.style.setProperty(
        "--magnetic-y",
        `${Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, y)).toFixed(2)}px`,
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer.matches || reducedMotion.matches) return;

      const nextElement = getMagneticTarget(event.target);
      if (nextElement !== activeElement) {
        reset();
        activeElement = nextElement;
        activeElement?.setAttribute("data-magnetic-active", "true");
      }

      if (!activeElement) return;
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (
        activeElement &&
        event.relatedTarget instanceof Node &&
        activeElement.contains(event.relatedTarget)
      ) {
        return;
      }

      if (getMagneticTarget(event.target) === activeElement) reset();
    };

    const syncPointerListeners = () => {
      window.cancelAnimationFrame(frame);
      frame = 0;
      reset();

      const shouldAttach = finePointer.matches && !reducedMotion.matches;
      if (shouldAttach && !pointerListenersAttached) {
        document.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        document.addEventListener("pointerout", handlePointerOut, {
          passive: true,
        });
        pointerListenersAttached = true;
      } else if (!shouldAttach && pointerListenersAttached) {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerout", handlePointerOut);
        pointerListenersAttached = false;
      }
    };

    syncPointerListeners();
    window.addEventListener("blur", reset);
    finePointer.addEventListener("change", syncPointerListeners);
    reducedMotion.addEventListener("change", syncPointerListeners);

    return () => {
      window.cancelAnimationFrame(frame);
      reset();
      if (pointerListenersAttached) {
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerout", handlePointerOut);
      }
      window.removeEventListener("blur", reset);
      finePointer.removeEventListener("change", syncPointerListeners);
      reducedMotion.removeEventListener("change", syncPointerListeners);
    };
  }, []);

  return null;
}

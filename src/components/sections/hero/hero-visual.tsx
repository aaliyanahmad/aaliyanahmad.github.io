"use client";

import { Component, useCallback, useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { GridFallback } from "./grid-fallback";
import type { GenerativeGridProps, GridMotion } from "./generative-grid-canvas";

class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function HeroVisual() {
  const visualRef = useRef<HTMLDivElement>(null);
  const motion = useRef<GridMotion>({ clientX: 0, clientY: 0, pointerActive: false, revision: 0, scroll: 0 });
  const [Scene, setScene] = useState<ComponentType<GenerativeGridProps> | null>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onFailure = useCallback(() => { setFailed(true); setReady(false); }, []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const visual = visualRef.current;
    const hero = visual?.closest("section");
    if (!visual || !hero) return;
    const desktop = window.matchMedia("(min-width: 1280px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    let disposed = false;
    let visible = false;
    let imported = false;
    let frame = 0;
    let idle: number | undefined;
    let webgl: boolean | undefined;

    const update = () => {
      frame = 0;
      if (disposed) return;
      const scroll = reduced.matches ? 0 : Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / hero.offsetHeight));
      motion.current.scroll = scroll;
      motion.current.revision++;
      visual.style.setProperty("--field-opacity", `${1 - scroll * 0.6}`);
      visual.style.setProperty("--field-x", `${scroll * 8}px`);
      visual.style.setProperty("--field-y", `${scroll * 14}px`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const canEnhance = () => {
      if (!desktop.matches || reduced.matches || failed) return false;
      if (webgl === undefined) {
        try {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true });
          webgl = Boolean(context);
          context?.getExtension("WEBGL_lose_context")?.loseContext();
        } catch { webgl = false; }
      }
      return webgl;
    };
    const reconcile = () => {
      const running = visible && !document.hidden && !reduced.matches;
      visual.dataset.active = String(running);
      setActive(running);
      if (!canEnhance()) {
        setScene(null);
        setReady(false);
        imported = false;
      } else if (running && !imported) {
        imported = true;
        // Capability checks precede import: smaller screens never fetch Three.js.
        import("./generative-grid-canvas").then((module) => {
          if (!disposed && canEnhance()) setScene(() => module.GenerativeGridCanvas);
        }).catch(() => { if (!disposed) onFailure(); });
      }
      schedule();
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || reduced.matches || !visible || document.hidden) return;
      motion.current.clientX = event.clientX;
      motion.current.clientY = event.clientY;
      motion.current.pointerActive = true;
      motion.current.revision++;
    };
    const reset = () => { motion.current.pointerActive = false; motion.current.revision++; };
    const scroll = () => { if (visible && !document.hidden && !reduced.matches) schedule(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; reconcile(); });
    // Let the heading paint first. All scene space is reserved in CSS.
    if ("requestIdleCallback" in window) idle = window.requestIdleCallback(() => observer.observe(hero), { timeout: 1800 });
    else observer.observe(hero);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", reset);
    window.addEventListener("scroll", scroll, { passive: true });
    desktop.addEventListener("change", reconcile);
    reduced.addEventListener("change", reconcile);
    fine.addEventListener("change", reset);
    document.addEventListener("visibilitychange", reconcile);
    return () => {
      disposed = true;
      if (idle !== undefined) window.cancelIdleCallback(idle);
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
      window.removeEventListener("scroll", scroll);
      desktop.removeEventListener("change", reconcile);
      reduced.removeEventListener("change", reconcile);
      fine.removeEventListener("change", reset);
      document.removeEventListener("visibilitychange", reconcile);
    };
  }, [failed, onFailure]);

  return (
    <div aria-hidden="true" className="hero-visual" ref={visualRef} data-enhanced={ready && !failed}>
      <div className="grid-atmosphere" />
      <div className="grid-stage">
        {Scene && !failed ? (
          <SceneBoundary onFailure={onFailure}>
            <Scene active={active} motionRef={motion} onFailure={onFailure} onReady={onReady} />
          </SceneBoundary>
        ) : null}
        <GridFallback />
      </div>
    </div>
  );
}

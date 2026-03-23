import { useEffect } from "react";

/**
 * Intercepts wheel events and lerps the scroll position toward the target.
 * The exponential decay (currentY += diff * factor each frame) gives the
 * "sliding on ice" feel — fast start, slow glide to a stop.
 *
 * Skipped on touch/pointer-coarse devices (they have native momentum already).
 */
export function useSmoothScroll(lerpFactor = 0.08) {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetY  = window.scrollY;
    let currentY = window.scrollY;
    let rafId    = 0;
    let running  = false;

    function tick() {
      const diff = targetY - currentY;

      if (Math.abs(diff) < 0.5) {
        currentY = targetY;
        window.scrollTo(0, currentY);
        running = false;
        return;
      }

      currentY += diff * lerpFactor;
      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(tick);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();

      // normalize deltaMode: 0=px, 1=lines (~40px), 2=page
      const multiplier =
        e.deltaMode === 2 ? window.innerHeight :
        e.deltaMode === 1 ? 40 : 1;

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      targetY = Math.max(0, Math.min(targetY + e.deltaY * multiplier, maxScroll));

      if (!running) {
        running = true;
        rafId = requestAnimationFrame(tick);
      }
    }

    // sync targetY if the page is scrolled by other means (anchor, keyboard)
    function onScroll() {
      if (!running) {
        targetY  = window.scrollY;
        currentY = window.scrollY;
      }
    }

    window.addEventListener("wheel",  onWheel,  { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true  });

    return () => {
      window.removeEventListener("wheel",  onWheel);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [lerpFactor]);
}

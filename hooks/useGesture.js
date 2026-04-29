"use client";
import { useEffect } from "react";
import { useRef } from "react";

/**
 * **Custom hook that detects swipe gestures**
 *
 * Prepared for mobile navigation
 * 
 * ---
 * @param {number} threshold - Minimum pixel distance required to count as a swipe
 * @param {(direction: "up" | "down" | "left" | "right" ) => void} onSwipe - Callback triggered when swipe is detected
 * @returns {void}
 * ---
 * @example
 * ```js
 *  useGesture(50, (direction) => {
      if (direction === "right") router.push("/notes-list");
    });
 */
//-------------------------------------------------------------------------------------------------------------------
export default function useGesture(threshold, onSwipe) {
  const startPos = useRef({ x: 0, y: 0, time: 0 });
  const hasSwiped = useRef(false);

  function handlePointerRelease(event) {
    hasSwiped.current = false;

    startPos.current = {
      x: event.clientX,
      y: event.clientY,
      time: performance.now(),
    };
  }

  function handlePointerMove(event) {
    if (hasSwiped.current) return;

    const now = performance.now();
    const dx = event.clientX - startPos.current.x;
    const dy = event.clientY - startPos.current.y;
    const dt = now - startPos.current.time;

    const vx = (dx / dt) * 10;
    const vy = (dy / dt) * 10;

    let direction = null;

    if (Math.abs(vx) > Math.abs(vy)) {
      if (Math.abs(vx) > threshold) {
        direction = vx > 0 ? "left" : "right";
      }
    } else {
      if (Math.abs(vy) > threshold) {
        direction = vy > 0 ? "up" : "down";
      }
    }

    if (direction) {
      onSwipe?.(direction);
      hasSwiped.current = true;
    }
  }

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerRelease);
    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointerdown", handlePointerRelease);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);
}

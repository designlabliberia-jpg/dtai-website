"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  angle: number;
  speed: number;
}

const LINK_DISTANCE = 160;
const NODE_COUNT_MIN = 8;
const NODE_COUNT_MAX = 16; // a professional, sparse amount — not a swarm
const NODE_DENSITY = 1 / 90000; // nodes per px² of viewport
const HEADING_DRIFT = 0.008; // how much a node's direction curves per frame

export function AmbientField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let running = true;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      const count = Math.max(
        NODE_COUNT_MIN,
        Math.min(NODE_COUNT_MAX, Math.round(width * height * NODE_DENSITY))
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        speed: 0.18 + Math.random() * 0.14,
      }));
    }

    function getZoneRects() {
      const zones = document.querySelectorAll("[data-ambient-zone]");
      return Array.from(zones).map((el) => el.getBoundingClientRect());
    }

    function step() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      const zoneRects = getZoneRects();

      // Clip all drawing to the current viewport position of dark
      // sections only — recalculated every frame so it correctly follows
      // them as the page scrolls, rather than being fixed to one spot.
      ctx!.save();
      ctx!.beginPath();
      for (const r of zoneRects) {
        ctx!.rect(r.left, r.top, r.width, r.height);
      }
      ctx!.clip();

      for (const n of nodes) {
        // Heading-based drift: the node's direction curves gradually
        // rather than the velocity itself getting random-walked. This is
        // the fix for the "vibrating in place" bug — nudging vx/vy
        // directly tends to cancel itself out (classic random-walk
        // behavior), while nudging the heading angle produces smooth,
        // clearly directional curving paths that actually travel.
        n.angle += (Math.random() - 0.5) * HEADING_DRIFT;
        n.x += Math.cos(n.angle) * n.speed;
        n.y += Math.sin(n.angle) * n.speed;

        // Soft wrap at edges — a node drifting off one side reappears on
        // the other, keeping motion continuous rather than bouncing.
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      ctx!.strokeStyle = "rgba(0, 166, 255, 0.09)";
      ctx!.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            ctx!.globalAlpha = 1 - dist / LINK_DISTANCE;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }
      ctx!.globalAlpha = 1;

      ctx!.fillStyle = "rgba(0, 166, 255, 0.3)";
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.restore();

      rafId = requestAnimationFrame(step);
    }

    resize();
    initNodes();

    if (!prefersReducedMotion) {
      rafId = requestAnimationFrame(step);
    } else {
      step();
      running = false;
    }

    function handleResize() {
      resize();
      initNodes();
    }
    function handleVisibility() {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(rafId);
      } else if (!prefersReducedMotion) {
        running = true;
        rafId = requestAnimationFrame(step);
      }
    }

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30"
    />
  );
}

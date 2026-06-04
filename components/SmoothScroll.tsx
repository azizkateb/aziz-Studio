"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (matchMedia("(pointer: coarse)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.8,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.005 - Math.pow(2, -12 * t)),
      wheelMultiplier: 1.0,
    });
    (window as any).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => { lenis.raf(time * 1000); };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    let t: number;
    const onResize = () => { clearTimeout(t); t = window.setTimeout(() => ScrollTrigger.refresh(), 200); };
    window.addEventListener("resize", onResize);

    return () => { gsap.ticker.remove(raf); window.removeEventListener("resize", onResize); lenis.destroy(); };
  }, []);
  return null;
}

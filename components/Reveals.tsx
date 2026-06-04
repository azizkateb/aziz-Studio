"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const EASE = "power4.out";

export default function Reveals() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (s: string) => gsap.utils.toArray(s) as HTMLElement[];

    const ctx = gsap.context(() => {
      if (reduce) {
        q("[data-reveal],[data-reveal-stagger],[data-mask],[data-lines]")
          .forEach((el) => gsap.set(el, { opacity: 1, clearProps: "all" }));
        return;
      }

      q("[data-reveal]").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.6, ease: EASE,
            delay: parseFloat(el.dataset.delay || "0"),
            scrollTrigger: { trigger: el, start: "top 82%" } });
      });

      q("[data-reveal-stagger]").forEach((wrap) => {
        gsap.fromTo(wrap.children,
          { opacity: 0, y: 70 },
          { opacity: 1, y: 0, duration: 1.4, ease: EASE, stagger: 0.15,
            scrollTrigger: { trigger: wrap, start: "top 78%" } });
      });

      q("[data-mask]").forEach((el) => {
        gsap.fromTo(el,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, duration: 1.8, ease: EASE,
            scrollTrigger: { trigger: el, start: "top 80%" } });
      });

      q("[data-lines]").forEach((el) => {
        gsap.set(el, { overflow: "hidden" });
        const lines = el.querySelectorAll(":scope > *");
        gsap.from(lines, {
          yPercent: 120, opacity: 0, duration: 1.5, ease: EASE, stagger: 0.15,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      q("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax || "0.2");
        gsap.to(el, {
          yPercent: -amt * 100, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      q("[data-zoom]").forEach((el) => {
        gsap.fromTo(el, { scale: 1.25 }, {
          scale: 1, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "top 30%", scrub: true },
        });
      });

      ScrollTrigger.refresh();
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    return () => { window.removeEventListener("load", onLoad); ctx.revert(); };
  }, []);

  return null;
}

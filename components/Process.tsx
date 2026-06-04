"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BASE = "https://cdn.prod.website-files.com/69b4c4d6440a41424df382bf/";
const STEPS = [
  {
    title: "Research",
    details:
      "Deep analysis clarifies context, audience, and ambition, forming a precise strategic foundation that start the project.",
    step: "Step one",
    poster: BASE + "69d50531f47f1484cdc56062_GettyImages-1318802161%20%281%29_poster.0000000.jpg",
    mp4:    BASE + "69d50531f47f1484cdc56062_GettyImages-1318802161%20%281%29_mp4.mp4",
    webm:   BASE + "69d50531f47f1484cdc56062_GettyImages-1318802161%20%281%29_webm.webm",
  },
  {
    title: "Design",
    details:
      "Concepts evolve into refined visual systems or style guide shaped by typography, proportion, and restraint.",
    step: "Step two",
    poster: BASE + "69d50530944647926066f9aa_0_Jar_Glass_1280x720_poster.0000000.jpg",
    mp4:    BASE + "69d50530944647926066f9aa_0_Jar_Glass_1280x720_mp4.mp4",
    webm:   BASE + "69d50530944647926066f9aa_0_Jar_Glass_1280x720_webm.webm",
  },
  {
    title: "Development",
    details:
      "Engineered with precision, each experience delivers the performance, stability, and lasting presence.",
    step: "Step three",
    poster: BASE + "69d50530f6211e3c0b62bb22_0_Cube_Glass_1280x720_poster.0000000.jpg",
    mp4:    BASE + "69d50530f6211e3c0b62bb22_0_Cube_Glass_1280x720_mp4.mp4",
    webm:   BASE + "69d50530f6211e3c0b62bb22_0_Cube_Glass_1280x720_webm.webm",
  },
];

export default function Process() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".process-card-wrap", {
        opacity: 0,
        y: 60,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" ref={root}>
      <div className="container">
        <div className="label" data-reveal><span className="lbl-arrow">&rarr;</span> Working Process</div>
        <h2 className="section-title" data-reveal data-delay="0.1">How we work</h2>

        <div className="process-grid-wrap">
          {STEPS.map((s) => (
            <div className="process-card-wrap" key={s.title}>
              <div className="process-card-icon-wrap">
                <video
                  className="process-card-icon"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={s.poster}
                >
                  <source src={s.mp4} type="video/mp4" />
                  <source src={s.webm} type="video/webm" />
                </video>
              </div>
              <div className="process-card-title">{s.title}</div>
              <p className="process-card-details">{s.details}</p>
              <div className="process-card-step">{s.step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

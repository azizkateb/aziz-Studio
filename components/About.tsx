'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const LINES = [
  'We transform vision into powerful',
  'brand presence by blending creative',
  'design, smart strategy, & data-driven',
  'marketing to scale your modern business.',
];

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray('.about-statement .word') as HTMLElement[];
      if (!words.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => '+=' + (words.length * (window.innerWidth < 640 ? 35 : 55) + window.innerHeight * 0.6),
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(words, { color: '#ffffff', ease: 'none', stagger: { each: 1, from: 'start' } });
    }, root);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    return () => { window.removeEventListener('load', onLoad); ctx.revert(); };
  }, []);

  return (
    <section className="about" id="about" ref={root}>
      <div className="container">
        <span className="label" data-reveal><span className="lbl-arrow">&rarr;</span> About Us</span>
        <h2 className="about-statement">
          {LINES.map((line, li) => (
            <span className="line" key={li}>
              {line.split(' ').map((w, wi) => (
                <span className="word" key={wi}>{w}&nbsp;</span>
              ))}
            </span>
          ))}
        </h2>
        <div className="about-grid">
          <img className="portrait" data-reveal src="/portrait1.png" alt="Studio" />
          <p data-reveal>Adox Studio is a multidisciplinary design practice based in Los Angeles. Since 2020 we have partnered with founders and brands to craft digital experiences that feel inevitable.</p>
          <p data-reveal>We sit at the intersection of art direction, motion, and engineering &mdash; shipping work that is as considered under the hood as it is on the surface.</p>
          <span className="copy" data-reveal>&copy;2026</span>
        </div>
        <div className="about-cta" data-reveal><a className="pill">Learn About Us <span className="arrow">&rarr;</span></a></div>
      </div>
    </section>
  );
}

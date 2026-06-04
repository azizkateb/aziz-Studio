'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

export default function Reel() {
  const [open, setOpen] = useState(false);
  const inner = useRef(null);
  const back = useRef(null);
  const thumb = useRef(null);

  useEffect(() => {
    if (open && back.current && inner.current) {
      gsap.fromTo(back.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(inner.current, { scale: 0.92, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power3.out' });
    }
  }, [open]);

  useEffect(() => {
    if (!thumb.current) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.reel', start: 'top top', end: '+=1200',
        scrub: 1, pin: true, anticipatePin: 1,
      },
    });
    tl.fromTo(thumb.current,
      { width: 340, height: 200, borderRadius: 12 },
      { width: () => window.innerWidth, height: () => window.innerHeight, borderRadius: 0, ease: 'none' }
    );
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    window.addEventListener('resize', refresh);
    const t = setTimeout(refresh, 600);
    return () => { tl.scrollTrigger?.kill(); tl.kill(); window.removeEventListener('load', refresh); window.removeEventListener('resize', refresh); clearTimeout(t); };
  }, []);

  return (
    <section className="reel">
      <div className="reel-thumb" ref={thumb}>
        <div className="reel-thumb-inner" onClick={() => setOpen(true)}>
          <img src="/red.jpg" alt="" />
          <div className="play">&#9654;</div>
        </div>
      </div>
      <div className="reel-row" data-reveal onClick={() => setOpen(true)}>
        <span className="word">Play</span>
        <span className="word">Reel</span>
      </div>
      {open && (
        <div className="lb" ref={back} onClick={() => setOpen(false)}>
          <div className="lb-close">&#10005;</div>
          <div className="lb-inner" ref={inner} onClick={(e) => e.stopPropagation()}>
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Reel" allow="autoplay; encrypted-media" allowFullScreen />
          </div>
        </div>
      )}
    </section>
  );
}

'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const CARDS = [
  { cls: 'c1', tint: 'orange', img: '/portrait1.png', q: 'Adox turned our vague ambition into a brand that finally feels like us.', n: 'Maya Chen', r: 'CEO, Nova', rot: -2 },
  { cls: 'c2', tint: 'blue', img: '/liam.png', q: 'The motion work alone doubled our landing page conversions.', n: 'Liam Ortiz', r: 'Founder, Pulse', rot: 0 },
  { cls: 'c3', tint: 'blue', img: '/portrait1.png', q: 'Fast, fearless, and obsessively detailed. The best studio we have hired.', n: 'Sara Idris', r: 'CMO, Orbit', rot: 1.5 },
  { cls: 'c4', tint: 'orange', img: '/tom.jpg', q: 'They treat engineering as a design material. Rare and brilliant.', n: 'Tom Reyes', r: 'CTO, Forge', rot: 1 },
  { cls: 'c5', tint: 'orange', img: '/portrait1.png', q: 'A studio that actually ships. Visionary work, zero drama.', n: 'Ada Flux', r: 'VP, Drift', rot: -1.5 },
];

export default function Testimonials() {
  const stage = useRef(null);

  useEffect(() => {
    if (!stage.current) return;
    const cards = stage.current.querySelectorAll('.tcard');
    const rots = CARDS.map((c) => c.rot);
    const ctx = gsap.fromTo(cards,
      { yPercent: 60, scale: 0.85, rotation: (i) => (i % 2 ? 15 : -15), opacity: 0 },
      {
        yPercent: 0, scale: 1, rotation: (i) => rots[i], opacity: 1,
        stagger: 0.13, duration: 0.65, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: stage.current, start: 'top 80%' },
      }
    );

    let dragEl = null;
    let offsetX = 0, offsetY = 0;
    let topZ = 100;

    const onStart = (e) => {
      dragEl = e.currentTarget;
      const rect = dragEl.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      gsap.set(dragEl, { zIndex: ++topZ, scale: 1.08, rotation: 0 });
    };

    const onMove = (e) => {
      if (!dragEl) return;
      e.preventDefault();
      const parentRect = stage.current.getBoundingClientRect();
      dragEl.style.left = (e.clientX - parentRect.left - offsetX) + 'px';
      dragEl.style.top = (e.clientY - parentRect.top - offsetY) + 'px';
    };

    const onEnd = () => {
      if (!dragEl) return;
      gsap.to(dragEl, { scale: 1, duration: 0.4, ease: 'power2.out' });
      dragEl = null;
    };

    cards.forEach((card) => {
      card.addEventListener('mousedown', onStart);
      card.addEventListener('touchstart', (e) => {
        const t = e.changedTouches[0];
        onStart({ currentTarget: e.currentTarget, clientX: t.clientX, clientY: t.clientY });
      }, { passive: true });
    });

    const onGlobalMove = (e) => {
      if (e.touches) {
        onMove({ clientX: e.touches[0].clientX, clientY: e.touches[0].clientY, preventDefault: () => e.preventDefault() });
      } else {
        onMove(e);
      }
    };
    const onGlobalEnd = () => onEnd();

    window.addEventListener('mousemove', onGlobalMove);
    window.addEventListener('mouseup', onGlobalEnd);
    window.addEventListener('touchmove', onGlobalMove, { passive: false });
    window.addEventListener('touchend', onGlobalEnd);

    return () => {
      ctx.scrollTrigger && ctx.scrollTrigger.kill();
      ctx.kill();
      cards.forEach((card) => {
        card.removeEventListener('mousedown', onStart);
      });
      window.removeEventListener('mousemove', onGlobalMove);
      window.removeEventListener('mouseup', onGlobalEnd);
      window.removeEventListener('touchmove', onGlobalMove);
      window.removeEventListener('touchend', onGlobalEnd);
    };
  }, []);

  return (
    <section className="testi" id="testimonials">
      <div className="container">
        <h2 className="section-title" data-reveal>Testimonials</h2>
        <div className="testi-stage" ref={stage}>
          {CARDS.map((t, i) => (
            <div className={'tcard ' + t.cls + ' ' + t.tint} key={i}>
              <img src={t.img} alt="" />
              <div className="tint" />
              <div className="qmark">&rdquo;</div>
              <div className="body">
                <div className="q">{t.q}</div>
                <div className="nm">{t.n}</div>
                <div className="ro">{t.r}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

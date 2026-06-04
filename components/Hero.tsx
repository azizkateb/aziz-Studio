'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Hero() {
  const [time, setTime] = useState('');
  const cover = useRef(null);
  const entered = useRef(false);

  useEffect(() => {
    const tick = () => {
      setTime(new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    gsap.set('.hero-image', { opacity: 0 });
    gsap.set('.hero-cover', { opacity: 0 });
    gsap.set('.hero-word', { yPercent: 100, opacity: 0 });
    gsap.set('.hero-meta > *', { opacity: 0, y: 30 });

    const onDone = () => {
      if (entered.current) return;
      entered.current = true;
      const tl = gsap.timeline();
      tl.to('.hero-image', { opacity: 1, duration: 1.4, ease: 'power3.out' }, 0);
      tl.to('.hero-cover', { opacity: 1, duration: 0.8, ease: 'power3.out' }, 0.15);
      tl.to('.hero-word', { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }, 0.3);
      tl.to('.hero-meta > *', { opacity: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.5);
    };

    if (document.readyState === 'complete' && !document.querySelector('.site-loader')) {
      onDone();
    } else {
      window.addEventListener('loader:done', onDone, { once: true });
    }

    return () => window.removeEventListener('loader:done', onDone);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const ST = {
        trigger: '.hero',
        start: 'top top',
        end: '+=100%',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      };

      gsap.to(cover.current, {
        yPercent: -100,
        ease: 'power2.inOut',
        scrollTrigger: ST,
      });

      gsap.fromTo('.hero-image',
        { scale: 1 },
        { scale: 1.08, ease: 'power1.out', scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=80%', scrub: 1 } }
      );

      gsap.to('.hero-logo, .hero-meta', {
        opacity: 0,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=80%', scrub: 1.2 },
      });
    });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener('load', onLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="top">
      <div className="hero-image" />
      <div className="hero-cover" ref={cover}>
        <h1 className="hero-logo">
          <span className="adox hero-word">Aziz</span>{' '}
          <span className="studio hero-word">Studio</span>
        </h1>
        <div className="hero-meta">
          <div className="col">Tunis, GF &rarr;<br />{time}</div>
          <div className="col">AI Automation<br />UI/UX Design<br />Web Development<br />Motion Design<br />Branding</div>
          <div className="desc">We integrate brand, experience, and technology to realize vision and achieve the greatest impact.</div>
          <div className="col copy">&copy;2020 &ndash; 2026</div>
        </div>
      </div>
    </section>
  );
}

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import MobileMenu from './MobileMenu';

function scrollToSection(href: string, e: React.MouseEvent) {
  if (href.startsWith('/#')) {
    e.preventDefault();
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      else el.scrollIntoView({ behavior: 'smooth' });
    }
  } else if (href === '/') {
    e.preventDefault();
    const lenis = (window as any).lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  }
}

export default function Nav({ active }: { active?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { href: '/#about', id: 'studio', label: 'Studio' },
    { href: '/#services', id: 'services', label: 'Services' },
    { href: '/#projects', id: 'projects', label: 'Projects' },
    { href: '/contact', id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    gsap.set('.nav .logo, .nav .links > *, .nav .burger', { opacity: 0, y: -20 });

    const onDone = () => {
      gsap.to('.nav .logo, .nav .burger', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
      gsap.to('.nav .links > *', { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', delay: 0.15 });
    };

    if (document.readyState === 'complete' && !document.querySelector('.site-loader')) {
      onDone();
    } else {
      window.addEventListener('loader:done', onDone, { once: true });
    }

    return () => window.removeEventListener('loader:done', onDone);
  }, []);

  return (
    <nav className="nav loaded">
      <Link href="/" className="logo" onClick={(e) => scrollToSection('/', e)}>Aziz&reg;</Link>
      <div className="links">
        {links.map((l) => (
          <Link key={l.id} href={l.href} className={active === l.id ? 'active' : ''} onClick={(e) => scrollToSection(l.href, e)}>
            <span className="cube">
              <span className="cube-front">{l.label}</span>
              <span className="cube-back">{l.label}</span>
            </span>
          </Link>
        ))}
      </div>
      <div className="burger" onClick={() => setMenuOpen(true)}>&#8801;</div>
      {menuOpen && <MobileMenu close={() => setMenuOpen(false)} />}
    </nav>
  );
}

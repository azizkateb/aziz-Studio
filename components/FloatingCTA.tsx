'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm({ key }) {
  const [state, handleSubmit] = useForm('mojzvdrl');
  const successRef = useRef(null);

  useEffect(() => {
    if (!state.succeeded || !successRef.current) return;
    const els = successRef.current.querySelectorAll('[data-anim]');
    gsap.fromTo(els,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, ease: 'power3.out' }
    );
    gsap.fromTo(successRef.current.querySelector('[data-anim="icon"]'),
      { scale: 0, rotate: -30 },
      { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' }
    );
  }, [state.succeeded]);

  if (state.succeeded) {
    return (
      <div className="cta-modal-success" ref={successRef}>
        <div className="cta-modal-success-icon" data-anim="icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h4 data-anim>Message Sent!</h4>
        <p data-anim>We&rsquo;ll get back to you within 24h.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Your Name" required />
      <ValidationError field="name" errors={state.errors} />
      <input type="email" name="email" placeholder="Your Email" required />
      <ValidationError field="email" errors={state.errors} />
      <textarea name="message" rows="4" placeholder="Tell us about your project..." required></textarea>
      <ValidationError field="message" errors={state.errors} />
      <button type="submit" className="cta-modal-send" disabled={state.submitting}>
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default function FloatingCTA() {
  const ref = useRef(null);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.fromTo(ref.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.9, ease: 'power3.out' }
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#clients',
          start: 'top bottom',
          end: 'top 20%',
          scrub: 1.2,
          toggleActions: 'play none play reverse',
        },
      });
      tl.to(ref.current, {
        y: 60,
        opacity: 0,
        scale: 0.85,
        duration: 1,
        ease: 'power3.inOut',
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    gsap.set(overlayRef.current, { display: 'flex' });
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'power3.out' }
    );
  }, [open]);

  const openModal = () => {
    setFormKey(k => k + 1);
    setOpen(true);
  };

  const close = () => {
    if (!overlayRef.current) return;
    gsap.to(modalRef.current, {
      opacity: 0, scale: 0.85, y: 20, duration: 0.25, ease: 'power2.in',
    });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        gsap.set(overlayRef.current, { display: 'none' });
        setOpen(false);
      }
    });
  };

  return (
    <>
      <div className="floating-cta" ref={ref}>
        <img className="av" src="/roger.jpg" alt="Studio director" />
        <div className="info">
          <div className="l">Let&rsquo;s Talk</div>
          <div className="n">Rogers West</div>
          <div className="r">Studio Director</div>
        </div>
        <button className="go" onClick={openModal}>&rarr;</button>
      </div>

      <div className="cta-overlay" ref={overlayRef} onClick={close}>
        <div className="cta-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
          <button className="cta-modal-close" onClick={close}>×</button>
          <h3>Let&rsquo;s Talk</h3>
          <p className="cta-modal-sub">We&rsquo;ll get back within 24h</p>
          <ContactForm key={formKey} />
        </div>
      </div>
    </>
  );
}

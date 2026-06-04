'use client';

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2 data-reveal>Project<br />In Brain?</h2>
        <div className="cta-row">
          <span className="label" data-reveal><span className="lbl-arrow">&rarr;</span> Let&rsquo;s Talk</span>
          <div data-reveal-stagger>
            <p>Let&rsquo;s build something that outlasts the trend cycle. Tell us what you&rsquo;re making and we&rsquo;ll tell you how we&rsquo;d make it unforgettable.</p>
            <a className="pill">Start A Project <span className="arrow">&rarr;</span></a>
          </div>
          <span className="label" data-reveal>&copy;2020 &ndash; 2026</span>
        </div>
      </div>
    </section>
  );
}

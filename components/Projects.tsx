'use client';

const DATA = [
  { n: 'Ember Eye', y: '2025', tags: 'Product Design + Branding', region: 'UK', img: '/eye.png' },
  { n: 'Lumen', y: '2024', tags: 'Web Development + Motion', region: 'USA', img: '/lumen.png' },
  { n: 'Vega', y: '2024', tags: 'Art Direction + 3D', region: 'IND', img: '/vegajpg.jpg' },
  { n: 'Halo', y: '2023', tags: 'UI/UX + No-Code', region: 'SG', img: '/halo.jpg' },
];

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="container">
        <div className="head">
          <span className="label" data-reveal><span className="lbl-arrow">&rarr;</span> Our Curated Works</span>
          <span className="label" data-reveal data-delay="0.1">&copy;2020&ndash;2026</span>
        </div>
        <div className="big-title" data-reveal data-delay="0.15">Projects [04]</div>
        {DATA.map((p, i) => (
          <div className="proj-entry" key={i}>
            <div className="proj-info" data-reveal data-delay="0.05">
              <div className="top">&rarr;</div>
              <div className="pname"><span>{p.n}</span><span className="year">{p.y}</span></div>
              <div className="tags">{p.tags}</div>
              <div className="foot"><span>&rarr;</span><span>{p.region}</span></div>
            </div>
            <div className="proj-img" data-mask>
              <img src={p.img} alt={p.n} sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

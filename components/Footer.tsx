'use client';

const NAV = [
  ['Home', '01'], ['About', '02'], ['Contact', '03'], ['Projects', '04'], ['Blogs', '05'],
];
const SOCIAL = ['IG', 'X', 'FB', 'IN', 'BE'];
const UTILS = ['License', 'Password', 'Changelog', 'Style Guide', 'Error'];

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="foot-top" data-reveal>
          <div className="foot-contact">
            <div className="logo">Aziz&reg;</div>
            <div className="big">Let&rsquo;s work together!</div>
            <a className="big ul-link" href="mailto:azizkateb69@gmail.com">azizkateb69@gmail.com</a>
            <div className="ph">+216 (25) 285-181</div>
            <div className="addr">1245 Sunset Blvd, Los Angeles, CA<br />Made with intent &mdash; 2020&ndash;2026</div>
          </div>
          <div className="foot-nav">
            {NAV.map((n, i) => (
              <a key={i}><span>&rarr; {n[0]}</span><span className="idx">{n[1]}</span></a>
            ))}
          </div>
        </div>
        <div className="foot-bottom" data-reveal>
          <div className="socials">{SOCIAL.map((s, i) => (<a key={i}>[{s}]</a>))}</div>
          <div className="utils">{UTILS.map((u, i) => (<span key={i}>{u}</span>))}</div>
        </div>
      </div>
    </footer>
  );
}

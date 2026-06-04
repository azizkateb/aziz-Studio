'use client';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import FloatingCTA from '../../components/FloatingCTA';

const SOCIAL = ['Instagram', 'LinkedIn', 'Twitter (X)', 'Dribbble', 'Behance'];

export default function Contact() {
  return (
    <>
      <Nav active="contact" />
      <section className="contact-wrap">
        <div className="container">
          <h1 className="hero-logo">
            <span className="adox">Adox</span>{' '}<span className="studio">Studio</span>
          </h1>
          <div className="crumb">Home &rarr; Contact</div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="row">
                <div className="k">Email</div>
                <a className="v ul-link" href="mailto:hello@adoxstudio.com">HELLO@ADOXSTUDIO.COM</a>
              </div>
              <div className="row">
                <div className="k">Phone</div>
                <div className="v">+1 (310) 555-0142</div>
              </div>
              <div className="row social">
                <div className="k">Social</div>
                {SOCIAL.map((s, i) => (<a key={i} className="ul-link">{s}</a>))}
              </div>
            </div>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field"><input type="text" placeholder="FULL NAME \u2191" /></div>
              <div className="field"><input type="email" placeholder="enter your mail" /></div>
              <div className="field">
                <select defaultValue="">
                  <option value="" disabled>SELECT THE SERVICE</option>
                  <option>UI/UX Design</option>
                  <option>Branding</option>
                  <option>Web Development</option>
                  <option>Motion Design</option>
                  <option>AI Automation</option>
                </select>
              </div>
              <div className="field"><textarea rows={4} placeholder="DESCRIPTION" /></div>
              <button type="submit" className="pill">Send Message <span className="arrow">&rarr;</span></button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
      <FloatingCTA />
    </>
  );
}

'use client';

const BRAND_LOGOS = [
  '/brand1.svg',
  '/brand2.svg',
  '/brand3.svg',
  '/brand4.svg',
  '/brand5.svg',
  '/brand6.svg',
  '/brand7.svg',
  '/brand8.svg',
  '/brand9.svg',
  '/brand10.svg',
];

export default function Brands() {
  return (
    <section className="brands" id="clients">
      <div className="container">
        <div className="brand-wrapper">
          <div className="brand-top-wrap" data-reveal-stagger>
            <div className="section-sub-title">
              <img
                className="style-arrow"
                loading="lazy"
                src="https://cdn.prod.website-files.com/69b4c4d6440a41424df382bf/69ca38194a253e661d71869e_Style%20Arrow.svg"
                alt="Style Arrow"
              />
              <div className="style-single-title">Brands That Believe us</div>
            </div>
            <div className="inner-year-text">40+ partners</div>
            <div className="inner-center">
              <div className="inner-year-text">[Over 5 years]</div>
            </div>
          </div>
          <div className="brand-wrap">
            <div className="brand-grid-wrap" data-reveal-stagger>
              {BRAND_LOGOS.map((src, i) => (
                  <div
                    className="brand-card"
                    key={i}
                  >
                  <img
                    className={'brand-card-icon no-invert'}
                    loading="lazy"
                    src={src}
                    alt="Brand Card Icon"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

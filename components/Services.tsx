"use client";
import { useEffect, useRef } from "react";

const COL1 = [
  { name: 'UI/UX Design', n: '01', img: '/ui.png' },
  { name: 'Branding', n: '03', img: '/branding.png' },
  { name: 'Web Development', n: '05', img: '/web.png' },
  { name: 'Social Media', n: '07', img: '/social.png' },
];
const COL2 = [
  { name: 'Art Direction', n: '02', img: '/artjpg.jpg' },
  { name: 'Motion Design', n: '04', img: '/motiondesign.jpg' },
  { name: 'No-Code', n: '06', img: '/nocode.png' },
  { name: 'AI Automation', n: '08', img: '/AI-Automation.png' },
];

export default function Services() {
  const floatRef = useRef(null);
  const imgRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const float = floatRef.current;
    const img = imgRef.current;
    const grid = gridRef.current;
    if (!float || !img || !grid) return;

    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const st = {
      mx: window.innerWidth / 2, my: window.innerHeight / 2,
      x: window.innerWidth / 2, y: window.innerHeight / 2,
      scale: 1, target: 1, rot: 0, trot: 0, prevX: window.innerWidth / 2,
    };
    let raf;

    const onMove = (e) => {
      st.mx = e.clientX; st.my = e.clientY;
      st.trot = Math.max(-14, Math.min(14, (e.clientX - st.prevX) * 0.5));
      st.prevX = e.clientX;
    };

    const loop = () => {
      st.x += (st.mx - st.x) * 0.06;
      st.y += (st.my - st.y) * 0.06;
      st.scale += (st.target - st.scale) * 0.08;
      st.rot += (st.trot - st.rot) * 0.1;
      st.trot += (0 - st.trot) * 0.08;
      float.style.transform =
        `translate(${st.x}px, ${st.y}px) translate(-50%, -50%) rotate(${st.rot}deg) scale(${st.scale})`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      const item = e.target.closest(".svc-item");
      if (!item || !grid.contains(item)) return;
      img.src = item.dataset.img;
      float.style.setProperty('--echo-img', `url('${item.dataset.img}')`);
      st.scale = 1.2;
      st.target = 1;
      float.style.filter = "blur(8px)";
      float.classList.remove("echo-done");
      float.classList.add("is-visible");
      setTimeout(() => { float.style.filter = "blur(0px)"; }, 200);
      setTimeout(() => { float.classList.add("echo-done"); }, 500);
    };

    const onLeave = () => {
      float.classList.remove("is-visible", "echo-done");
    };

    window.addEventListener("mousemove", onMove);
    grid.addEventListener("mouseover", onOver);
    grid.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      grid.removeEventListener("mouseover", onOver);
      grid.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const item = (s) => (
    <div className="svc-item" key={s.n} data-img={s.img}>
      <span className="num">[ {s.n} ]</span>
      <span className="name">{s.name}</span>
    </div>
  );

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="head">
          <span className="label" data-reveal><span className="lbl-arrow">&rarr;</span> Service We Provide</span>
          <span className="label" data-reveal data-delay="0.1">[ Capabilities ]</span>
        </div>
        <div className="svc-grid" ref={gridRef}>
          <div className="svc-col" data-reveal-stagger>{COL1.map(item)}</div>
          <div className="svc-divider" />
          <div className="svc-col" data-reveal-stagger>{COL2.map(item)}</div>
        </div>
      </div>
      <div className="svc-float" ref={floatRef}><img ref={imgRef} alt="" /></div>
    </section>
  );
}

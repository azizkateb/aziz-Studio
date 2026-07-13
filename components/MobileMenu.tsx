"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

function scrollToSection(href: string, e: React.MouseEvent) {
  if (href.startsWith("/#")) {
    e.preventDefault();
    const id = href.slice(2);
    const el = document.getElementById(id);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1.4 });
      else el.scrollIntoView({ behavior: "smooth" });
    }
  }
}

export default function MobileMenu({ close }: { close: () => void }) {
  const links = [
    { href: "/#about", label: "Studio" },
    { href: "/#services", label: "Services" },
    { href: "/#projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close]);

  return (
    <div
      className="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
      onClick={close}
    >
      <button
        className="mobile-menu-close"
        type="button"
        aria-label="Close menu"
        onClick={close}
      >
        ×
      </button>
      <div
        className="mobile-menu-inner"
        onClick={(event) => event.stopPropagation()}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="mobile-menu-link"
            onClick={(e) => {
              scrollToSection(l.href, e);
              close();
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

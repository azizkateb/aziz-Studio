'use client';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Nav from '../components/Nav';
import FloatingCTA from '../components/FloatingCTA';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import About from '../components/About';
import Projects from '../components/Projects';
import Services from '../components/Services';
import Process from '../components/Process';
import Reel from '../components/Reel';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Brands />
      <About />
      <Projects />
      <Services />
      <Process />
      <Reel />
      <Testimonials />
      <CTA />
      <Footer />
      <FloatingCTA />
    </>
  );
}

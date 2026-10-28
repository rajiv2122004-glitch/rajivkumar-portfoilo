import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Journey } from './components/Journey';
import { EducationCertifications } from './components/EducationCertifications';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(true);

  // Respect system prefers-reduced-motion setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setMotionEnabled(false);
    }

    const handler = (e: MediaQueryListEvent) => {
      setMotionEnabled(!e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const toggleMotion = () => {
    setMotionEnabled((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      <Header motionEnabled={motionEnabled} toggleMotion={toggleMotion} />
      <main className="flex-1">
        <Hero motionEnabled={motionEnabled} />
        <About />
        <Skills />
        <Projects />
        <Journey />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

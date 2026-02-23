import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './HeroSection';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  useEffect(() => {
    // Smooth scroll behavior
    gsap.registerPlugin(ScrollTrigger);
    
    // Set up smooth scrolling
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 0
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main className="relative">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="py-8 px-6 bg-card/20 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 JavaScript Developer Portfolio. Built with React, Three.js, and GSAP.
          </p>
        </div>
      </footer>
    </main>
  );
}
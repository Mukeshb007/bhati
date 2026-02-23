import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set([titleRef.current, subtitleRef.current, badgesRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.5")
      .to(badgesRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.2");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      <ThreeBackground />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent"
        >
          Mukesh Bhati
        </h1>
        
        <p 
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
        >
          Full-Stack Developer specializing in <span className="text-primary font-semibold">Web Development</span>, 
          <span className="text-accent font-semibold"> ERP Systems</span>, 
          <span className="text-tech-cyan font-semibold"> Data Analytics</span>, and 
          <span className="text-tech-green font-semibold"> AI Agents</span>
        </p>

        <div ref={badgesRef} className="flex flex-wrap justify-center gap-3 mb-8">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
            JavaScript Expert
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-accent/10 text-accent border-accent/20">
            React & Node.js
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20">
            Data Analytics
          </Badge>
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-tech-green/10 text-tech-green border-tech-green/20">
            AI Development and Automation
          </Badge>
        </div>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 px-8"
            onClick={() => scrollToSection('projects')}
          >
            View My Work
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-border hover:bg-secondary/50 px-8"
            onClick={() => scrollToSection('contact')}
          >
            Get In Touch
          </Button>
        </div>

        <div className="flex justify-center gap-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
             className="text-muted-foreground hover:text-primary transition-colors duration-300">
            <Github size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             className="text-muted-foreground hover:text-accent transition-colors duration-300">
            <Linkedin size={24} />
          </a>
          <a href="mailto:developer@example.com"
             className="text-muted-foreground hover:text-tech-cyan transition-colors duration-300">
            <Mail size={24} />
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown 
          size={32} 
          className="text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={() => scrollToSection('about')}
        />
      </div>
    </section>
  );
}
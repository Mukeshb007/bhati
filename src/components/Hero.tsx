import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import TypingEffect from './TypingEffect';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(nameRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
      
      gsap.fromTo(".hero-content > *:not(h1)", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, delay: 0.5, ease: "power2.out" }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      id="hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center hero-content">
          <motion.h1 
            ref={nameRef}
            className="text-6xl md:text-8xl font-bold mb-6 hero-glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Mukesh Bhati
            </span>
          </motion.h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-muted-foreground">
            Admin Head (ERP, Data & Academic Ops)
          </h2>

          <div className="text-xl md:text-2xl mb-8 text-foreground/80 h-16 flex items-center justify-center">
            <TypingEffect 
              texts={[
                "JavaScript Enthusiast",
                "Data Analytics Expert", 
                "Automation Specialist",
                "Power BI Developer",
                "ERP Systems Admin"
              ]}
              className="text-primary font-medium"
            />
          </div>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            7+ years of experience in ERP systems, data analytics, and automation. 
            Passionate about creating efficient solutions with modern technologies.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary">
              <Mail className="w-5 h-5 mr-2" />
              mukeshbhati@example.com
            </Button>
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary">
              <Phone className="w-5 h-5 mr-2" />
              +91 98765 43210
            </Button>
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary">
              <MapPin className="w-5 h-5 mr-2" />
              Rajasthan, India
            </Button>
            <Button variant="outline" size="lg" className="glass-card border-primary/30 hover:border-primary">
              <Globe className="w-5 h-5 mr-2" />
              mukeshbhati.dev
            </Button>
          </div>

          <motion.div
            className="animate-float"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 mx-auto border-2 border-primary rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
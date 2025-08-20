import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".about-content", 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative"
      id="about"
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto about-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              About Me
            </span>
          </h2>

          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl leading-relaxed text-foreground/90 mb-6">
                As an Admin Head at Vivekananda Global University, I've spent over 7 years 
                transforming complex data challenges into streamlined solutions. My passion 
                lies at the intersection of technology and efficiency, where I craft 
                automation workflows that save countless hours and deliver actionable insights.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                From building sophisticated ERP systems to creating dynamic Power BI dashboards, 
                I believe in the power of JavaScript and modern web technologies to solve 
                real-world problems. My expertise spans across Google Apps Script automation, 
                n8n workflows, and Zapier integrations, always with a focus on creating 
                scalable and maintainable solutions.
              </p>

              <p className="text-lg leading-relaxed text-muted-foreground">
                When I'm not diving deep into data analytics or optimizing automated processes, 
                you'll find me exploring the latest JavaScript frameworks, contributing to 
                open-source projects, or mentoring junior developers in the art of clean, 
                efficient code.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">7+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">∞</div>
                <div className="text-muted-foreground">Lines of Code</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
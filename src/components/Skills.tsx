import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Zap, 
  BarChart3, 
  Settings, 
  Globe,
  Bot,
  FileSpreadsheet
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'JavaScript', icon: Code2, level: 95 },
  { name: 'Power BI', icon: BarChart3, level: 90 },
  { name: 'Google Apps Script', icon: FileSpreadsheet, level: 85 },
  { name: 'ERP Systems', icon: Database, level: 92 },
  { name: 'Data Analytics', icon: BarChart3, level: 88 },
  { name: 'n8n Automation', icon: Bot, level: 80 },
  { name: 'Zapier', icon: Zap, level: 85 },
  { name: 'Web Development', icon: Globe, level: 87 }
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".skill-card", 
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate skill bars
      gsap.fromTo(".skill-bar", 
        { width: "0%" },
        { 
          width: (i, el) => el.getAttribute('data-level') + '%',
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
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
      id="skills"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card glass-card p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <skill.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {skill.name}
                  </h3>
                  
                  <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="skill-bar absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      data-level={skill.level}
                    ></div>
                  </div>
                  
                  <div className="mt-2 text-sm text-muted-foreground">
                    {skill.level}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
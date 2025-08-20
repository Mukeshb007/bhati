import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Building2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    period: "2017 - Present",
    title: "Admin Head (ERP, Data & Academic Ops)",
    company: "Vivekananda Global University",
    location: "Rajasthan, India",
    highlights: [
      "Led digital transformation initiatives, implementing comprehensive ERP systems serving 10,000+ students",
      "Designed and deployed automated workflows reducing manual processes by 80% using n8n and Google Apps Script",
      "Created dynamic Power BI dashboards providing real-time insights to university leadership",
      "Managed academic operations data architecture, ensuring 99.9% system uptime",
      "Mentored a team of 15+ technical staff in modern development practices and automation tools"
    ]
  },
  {
    period: "2015 - 2017", 
    title: "Data Analyst & Systems Administrator",
    company: "Educational Solutions Pvt Ltd",
    location: "Rajasthan, India",
    highlights: [
      "Developed custom reporting solutions using JavaScript and SQL for educational institutions",
      "Implemented data validation and cleaning processes improving data accuracy by 95%",
      "Created automated backup and recovery systems for critical academic databases",
      "Built web-based dashboards for student performance tracking and analysis"
    ]
  }
];

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".timeline-item", 
        { x: -50, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Animate timeline line
      gsap.fromTo(".timeline-line", 
        { height: "0%" },
        { 
          height: "100%",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 30%",
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
      id="experience"
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
              Professional Experience
            </span>
          </h2>

          <div className="max-w-4xl mx-auto relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 w-0.5 bg-primary/30 timeline-line-container">
              <div className="timeline-line w-full bg-gradient-to-b from-primary to-accent"></div>
            </div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  className="timeline-item relative pl-20"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 w-5 h-5 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg"></div>

                  <div className="glass-card p-8 rounded-xl">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-foreground mb-2">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{exp.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold mt-2 md:mt-0">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
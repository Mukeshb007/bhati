import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Code, Database, Brain, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code,
    color: "text-primary",
    skills: [
      { name: "JavaScript/TypeScript", level: 95 },
      { name: "React.js", level: 90 },
      { name: "Vue.js", level: 85 },
      { name: "HTML/CSS", level: 92 },
      { name: "Three.js", level: 80 },
      { name: "GSAP", level: 85 }
    ]
  },
  {
    title: "Backend & ERP",
    icon: Settings,
    color: "text-accent",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Python", level: 82 },
      { name: "SAP Development", level: 75 },
      { name: "REST APIs", level: 90 },
      { name: "Microservices", level: 78 },
      { name: "Cloud Platforms", level: 80 }
    ]
  },
  {
    title: "Data Analytics",
    icon: Database,
    color: "text-tech-cyan",
    skills: [
      { name: "SQL/NoSQL", level: 85 },
      { name: "D3.js", level: 82 },
      { name: "Power BI", level: 78 },
      { name: "Tableau", level: 75 },
      { name: "ETL Processes", level: 80 },
      { name: "Data Visualization", level: 88 }
    ]
  },
  {
    title: "AI & Automation",
    icon: Brain,
    color: "text-tech-green",
    skills: [
      { name: "Machine Learning", level: 75 },
      { name: "AI Agents", level: 82 },
      { name: "Natural Language Processing", level: 78 },
      { name: "Automation Scripts", level: 85 },
      { name: "OpenAI Integration", level: 80 },
      { name: "LangChain", level: 76 }
    ]
  }
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
          }
        }
      );

      // Cards animation
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            }
          }
        );
      }

      // Progress bars animation
      skillCategories.forEach((category, categoryIndex) => {
        category.skills.forEach((skill, skillIndex) => {
          const progressBar = document.querySelector(`[data-skill="${categoryIndex}-${skillIndex}"]`);
          if (progressBar) {
            gsap.fromTo(progressBar,
              { width: "0%" },
              {
                width: `${skill.level}%`,
                duration: 1.5,
                ease: "power2.out",
                delay: categoryIndex * 0.2 + skillIndex * 0.1,
                scrollTrigger: {
                  trigger: progressBar,
                  start: "top 90%",
                }
              }
            );
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-primary bg-clip-text text-transparent"
        >
          Skills & Expertise
        </h2>
        
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={category.title} className="bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-tech transition-all duration-300">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <IconComponent className={`h-6 w-6 ${category.color}`} />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-card-foreground">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              categoryIndex === 0 ? 'bg-gradient-primary' :
                              categoryIndex === 1 ? 'bg-accent' :
                              categoryIndex === 2 ? 'bg-tech-cyan' :
                              'bg-tech-green'
                            }`}
                            data-skill={`${categoryIndex}-${skillIndex}`}
                            style={{ width: '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
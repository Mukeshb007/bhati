import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Zap, BarChart3, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "University ERP System",
    description: "Comprehensive ERP solution managing student data, academic records, and administrative processes with automated workflows.",
    category: "ERP",
    icon: BarChart3,
    tags: ["JavaScript", "Power BI", "Data Analytics"],
    featured: true
  },
  {
    title: "Automated Report Generator",
    description: "Smart reporting system using Google Apps Script to generate dynamic reports from multiple data sources automatically.",
    category: "Automation", 
    icon: Zap,
    tags: ["Apps Script", "Automation", "Data Processing"],
    featured: true
  },
  {
    title: "Student Analytics Dashboard",
    description: "Interactive Power BI dashboard providing insights into student performance, attendance patterns, and academic trends.",
    category: "Analytics",
    icon: BarChart3,
    tags: ["Power BI", "Data Visualization", "Analytics"],
    featured: false
  },
  {
    title: "n8n Workflow Automation",
    description: "Complex workflow automation connecting various university systems, reducing manual work by 80%.",
    category: "Automation",
    icon: Bot,
    tags: ["n8n", "Workflow", "Integration"],
    featured: false
  },
  {
    title: "Academic Performance Predictor",
    description: "AI-powered system using historical data to predict student performance and identify at-risk students early.",
    category: "AI",
    icon: Bot,
    tags: ["Machine Learning", "Predictive Analytics", "JavaScript"],
    featured: true
  },
  {
    title: "Zapier Integration Hub",
    description: "Centralized integration platform connecting university systems with external tools for seamless data flow.",
    category: "Automation",
    icon: Zap,
    tags: ["Zapier", "API Integration", "Automation"],
    featured: false
  }
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".project-card", 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Automation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Analytics': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'AI': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'ERP': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative"
      id="projects"
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
              Featured Projects
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className={`project-card glass-card p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${project.featured ? 'lg:col-span-1 md:col-span-1' : ''}`}
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary/20 text-primary border-primary/30">
                      Featured
                    </Badge>
                  </div>
                )}

                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                    <project.icon className="w-7 h-7 text-primary" />
                  </div>

                  <Badge className={`mb-3 ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </Badge>

                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-primary/30 text-primary/80"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-primary/30 hover:border-primary hover:bg-primary/10"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
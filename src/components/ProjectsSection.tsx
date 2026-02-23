import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, BarChart3, Brain, Settings } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Enterprise ERP Dashboard",
    description: "A comprehensive ERP system dashboard with real-time analytics, inventory management, and financial reporting built with React and Node.js.",
    technologies: ["React", "Node.js", "PostgreSQL", "Chart.js", "Material-UI"],
    category: "ERP",
    icon: Settings,
    color: "text-accent",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI-Powered Data Analytics Platform",
    description: "Machine learning platform for predictive analytics with automated insights generation and interactive visualizations using Python and D3.js.",
    technologies: ["Python", "TensorFlow", "D3.js", "FastAPI", "Redis"],
    category: "Data Analytics",
    icon: BarChart3,
    color: "text-tech-cyan",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Intelligent Customer Service Agent",
    description: "AI chatbot with natural language processing capabilities, sentiment analysis, and automated ticket routing for customer support.",
    technologies: ["OpenAI", "LangChain", "React", "Express", "MongoDB"],
    category: "AI Agent",
    icon: Brain,
    color: "text-tech-green",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Real-time Trading Dashboard",
    description: "Financial trading platform with real-time market data, technical indicators, and automated trading strategies using WebSockets.",
    technologies: ["Vue.js", "Node.js", "WebSocket", "TradingView", "MySQL"],
    category: "Web Development",
    icon: BarChart3,
    color: "text-primary",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Supply Chain Management System",
    description: "End-to-end supply chain tracking system with IoT integration, predictive maintenance, and automated reporting.",
    technologies: ["React", "Python", "IoT", "AWS", "PostgreSQL"],
    category: "ERP",
    icon: Settings,
    color: "text-accent",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "Content Generation AI Assistant",
    description: "AI-powered content creation tool with template generation, SEO optimization, and multi-language support for marketing teams.",
    technologies: ["Next.js", "OpenAI", "Prisma", "TypeScript", "Tailwind"],
    category: "AI Agent",
    icon: Brain,
    color: "text-tech-green",
    image: "/api/placeholder/600/400",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

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

      // Projects animation
      const projectCards = projectsRef.current?.children;
      if (projectCards) {
        gsap.fromTo(projectCards,
          { opacity: 0, y: 80, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: projectsRef.current,
              start: "top 80%",
            }
          }
        );
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-primary bg-clip-text text-transparent"
        >
          Featured Projects
        </h2>
        
        <div ref={projectsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <Card 
                key={project.title} 
                className="group bg-card/50 backdrop-blur-sm border-border/50 shadow-card hover:shadow-tech transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <IconComponent className={`h-6 w-6 ${project.color}`} />
                    <Badge 
                      variant="secondary" 
                      className={`px-2 py-1 text-xs ${
                        project.category === 'ERP' ? 'bg-accent/10 text-accent border-accent/20' :
                        project.category === 'Data Analytics' ? 'bg-tech-cyan/10 text-tech-cyan border-tech-cyan/20' :
                        project.category === 'AI Agent' ? 'bg-tech-green/10 text-tech-green border-tech-green/20' :
                        'bg-primary/10 text-primary border-primary/20'
                      }`}
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="outline" 
                          className="text-xs bg-secondary/50 border-border/50 hover:bg-secondary transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-3 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1 bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300"
                        asChild
                      >
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-border hover:bg-secondary/50"
                        asChild
                      >
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
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
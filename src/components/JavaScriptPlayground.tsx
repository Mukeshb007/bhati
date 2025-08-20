import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Copy, Play, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const codeSnippets = [
  {
    title: "Data Processing Magic",
    code: `// Transform and analyze student data
const analyzePerformance = (students) => {
  return students
    .filter(s => s.attendance > 75)
    .map(s => ({
      ...s,
      grade: calculateGrade(s.scores),
      trend: analyzeTrend(s.history)
    }))
    .sort((a, b) => b.grade - a.grade);
};

console.log("✨ Data insights generated!");`
  },
  {
    title: "Automation Workflow",
    code: `// n8n workflow automation
const automateReports = async () => {
  const data = await fetchAcademicData();
  
  const report = {
    summary: generateSummary(data),
    charts: createVisualizations(data),
    insights: extractInsights(data)
  };
  
  await sendToStakeholders(report);
  return "📊 Reports automated successfully!";
};`
  },
  {
    title: "Power BI Integration",
    code: `// Dynamic dashboard updates
const updateDashboard = (metrics) => {
  const powerBI = new PowerBIClient();
  
  return powerBI.datasets.update({
    studentMetrics: metrics.students,
    performanceKPIs: metrics.kpis,
    trendAnalysis: metrics.trends
  }).then(() => {
    console.log("🚀 Dashboard refreshed!");
  });
};`
  }
];

export default function JavaScriptPlayground() {
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".playground-content", 
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeSnippet].code);
      toast({
        title: "Code Copied!",
        description: "The code snippet has been copied to your clipboard.",
      });
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Unable to copy code to clipboard.",
        variant: "destructive"
      });
    }
  };

  const runCode = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      toast({
        title: "Code Executed!",
        description: "✨ The magic happens in production systems!",
      });
    }, 2000);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative"
      id="playground"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="playground-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JavaScript Playground
            </span>
          </h2>
          
          <div className="text-center mb-16">
            <p className="text-xl text-muted-foreground mb-4">
              Where code meets creativity and automation comes to life
            </p>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Heart className="w-5 h-5 fill-current animate-pulse" />
              <span className="font-medium">Made with JavaScript Love</span>
              <Heart className="w-5 h-5 fill-current animate-pulse" />
            </div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {codeSnippets.map((snippet, index) => (
                <Button
                  key={index}
                  variant={activeSnippet === index ? "default" : "outline"}
                  className={`p-4 h-auto text-left justify-start ${
                    activeSnippet === index 
                      ? "bg-primary text-primary-foreground" 
                      : "glass-card border-primary/30 hover:border-primary"
                  }`}
                  onClick={() => setActiveSnippet(index)}
                >
                  <div>
                    <div className="font-semibold">{snippet.title}</div>
                    <div className="text-sm opacity-80 mt-1">
                      Click to view code
                    </div>
                  </div>
                </Button>
              ))}
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              {/* Code editor header */}
              <div className="bg-secondary/50 px-6 py-4 border-b border-primary/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    {codeSnippets[activeSnippet].title.toLowerCase().replace(/\s+/g, '-')}.js
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="border-primary/30 hover:border-primary"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button
                    size="sm"
                    onClick={runCode}
                    disabled={isRunning}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                </div>
              </div>

              {/* Code content */}
              <div className="p-6 bg-secondary/20">
                <pre className="text-sm font-mono leading-relaxed text-foreground overflow-x-auto">
                  <code>{codeSnippets[activeSnippet].code}</code>
                </pre>
              </div>

              {/* Output area */}
              <div className="bg-secondary/30 px-6 py-4 border-t border-primary/20">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Output:</span>
                  {isRunning ? (
                    <span className="text-primary animate-pulse">Executing...</span>
                  ) : (
                    <span className="text-green-400">Ready to run</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                These snippets represent real-world solutions I've built for automation, 
                data processing, and system integration at Vivekananda Global University.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-primary font-medium">💡 Pro Tip:</span>
                <span className="text-sm text-muted-foreground">
                  Clean code is the foundation of scalable automation
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
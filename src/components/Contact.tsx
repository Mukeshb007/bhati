import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Globe, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact-card", 
        { y: 50, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Me",
      description: "Let's discuss your next project",
      action: "mukeshbhati@example.com",
      href: "mailto:mukeshbhati@example.com",
      color: "from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30"
    },
    {
      icon: Phone,
      title: "Call Me",
      description: "Available for urgent consultations",
      action: "+91 98765 43210",
      href: "tel:+919876543210",
      color: "from-green-500/20 to-green-600/20 hover:from-green-500/30 hover:to-green-600/30"
    },
    {
      icon: Globe,
      title: "Visit Website",
      description: "Explore my complete portfolio",
      action: "mukeshbhati.dev",
      href: "https://mukeshbhati.dev",
      color: "from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30"
    },
    {
      icon: MessageCircle,
      title: "LinkedIn",
      description: "Connect with me professionally",
      action: "Connect on LinkedIn",
      href: "https://linkedin.com/in/mukeshbhati",
      color: "from-cyan-500/20 to-cyan-600/20 hover:from-cyan-500/30 hover:to-cyan-600/30"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 relative"
      id="contact"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          
          <p className="text-xl text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Ready to transform your data challenges into automated solutions? 
            Let's discuss how we can work together.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-card glass-card p-6 rounded-xl hover:border-primary/50 transition-all duration-300 group block"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center transition-all duration-300`}>
                    <method.icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  
                  <div className="text-sm font-medium text-primary">
                    {method.action}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="glass-card p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                Ready to Start Your Next Project?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you need ERP system optimization, data analytics solutions, 
                or workflow automation, I'm here to help transform your ideas into reality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg"
                  asChild
                >
                  <a href="mailto:mukeshbhati@example.com">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </a>
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 px-8 py-3 text-lg"
                  asChild
                >
                  <a href="tel:+919876543210">
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Call
                  </a>
                </Button>
              </div>
              
              <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <span className="text-primary font-medium">Response Time:</span> 
                  I typically respond within 24 hours during business days
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
import { motion } from 'framer-motion';
import { Heart, Code, Zap } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 relative border-t border-primary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mukesh Bhati
              </span>
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Crafting efficient solutions with modern technology. 
              Passionate about JavaScript, automation, and data analytics.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Code className="w-4 h-4 text-primary" />
              <span>Built with React</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap className="w-4 h-4 text-primary" />
              <span>Three.js</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Heart className="w-4 h-4 text-primary fill-current" />
              <span>GSAP</span>
            </div>
          </div>

          <div className="border-t border-primary/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-muted-foreground">
                © {currentYear} Mukesh Bhati. All rights reserved.
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
                <span>and lots of</span>
                <Code className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
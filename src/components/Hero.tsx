import { Button } from "@/components/ui/button";
import { FileText, Presentation, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  onSelectType: (type: 'word' | 'powerpoint') => void;
}

export const Hero = ({ onSelectType }: HeroProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-glow opacity-60" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-8 border border-primary/30 glow-primary">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">AI-Powered Document Generation</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-6 leading-tight">
            Meet{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Astra
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Your intelligent assistant for creating professional business documents and presentations.
            Generate structured content in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          <Button
            onClick={() => onSelectType('word')}
            variant="outline"
            className="group h-auto py-8 px-8 glass hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-elegant hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 glow-primary">
                <FileText className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Word Document</h3>
                <p className="text-sm text-muted-foreground">Create structured reports, proposals, and documentation</p>
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onSelectType('powerpoint')}
            variant="outline"
            className="group h-auto py-8 px-8 glass hover:bg-secondary/10 hover:border-secondary/50 transition-all duration-300 hover:shadow-elegant hover:scale-[1.02]"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-all duration-300">
                <Presentation className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">PowerPoint Deck</h3>
                <p className="text-sm text-muted-foreground">Build engaging presentations with slide-by-slide content</p>
              </div>
            </div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 pt-12 border-t border-border/50"
        >
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="glass p-6 rounded-2xl hover:border-primary/50 transition-all duration-300">
              <h4 className="font-semibold mb-2 text-primary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary glow-primary" />
                Follow Your Outline
              </h4>
              <p className="text-sm text-muted-foreground">Create your structure and Astra generates content that matches exactly</p>
            </div>
            <div className="glass p-6 rounded-2xl hover:border-accent/50 transition-all duration-300">
              <h4 className="font-semibold mb-2 text-accent flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent glow-accent" />
                Refine Easily
              </h4>
              <p className="text-sm text-muted-foreground">Edit any section with simple instructions—shorten, formalize, or rewrite</p>
            </div>
            <div className="glass p-6 rounded-2xl hover:border-secondary/50 transition-all duration-300">
              <h4 className="font-semibold mb-2 text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Export Ready
              </h4>
              <p className="text-sm text-muted-foreground">Get professional, polished content ready for your business documents</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

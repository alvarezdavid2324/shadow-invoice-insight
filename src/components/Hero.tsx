import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import InvoiceExtractor from "./InvoiceExtractor";
import logo from "@/assets/shadowrez-logo.png";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan/10 blur-[120px] pointer-events-none" />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/5 text-xs text-cyan font-mono mb-6">
            <Zap className="w-3 h-3" />
            AI-powered AP automation
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] mb-6">
            <span className="text-foreground">Automate the </span>
            <span className="text-gradient-cyan">shadows.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Shadowrez AI reads every invoice — handwritten, scanned, or PDF — and pipes
            clean, structured data straight into your accounting system. Built for auto shops,
            ready for any business.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button variant="hero" size="lg" className="group">
              Start free trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outlineGlow" size="lg">
              Watch 60s demo
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground font-mono">
            <span>✓ 99.4% accuracy</span>
            <span>✓ 14-day trial</span>
            <span>✓ No card required</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          id="how"
        >
          <InvoiceExtractor />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-card border border-cyan/30 p-12 md:p-20 text-center shadow-elevated">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan/10 blur-[100px]" />

          <div className="relative">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              Stop typing invoices.<br />
              <span className="text-gradient-cyan">Start closing books.</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Join the shops saving 20+ hours every month. Free 14-day trial.
              No credit card. Live in under 10 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button variant="hero" size="lg" className="group">
                Start free trial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outlineGlow" size="lg">Talk to sales</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

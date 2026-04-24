import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "$49",
    period: "/mo",
    description: "Get extracting in minutes. Perfect for solo shops & small teams.",
    features: [
      "Email forwarding for invoices",
      "Manual file uploads (PDF, image, scan)",
      "Up to 200 extractions / month",
      "$0.50 per invoice overage after 200",
      "CSV export",
      "Standard support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/mo",
    description: "Everything automated. The full Shadowrez engine, end to end.",
    features: [
      "Everything in Starter",
      "SMS / texting invoice intake",
      "QuickBooks integration",
      "Email automation for invoice scanning",
      "Tekmetric & accounting sync",
      "Up to 500 extractions / month",
      "$0.35 per invoice overage after 500",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Tailored to your operation — multi-location, custom integrations, SLAs.",
    features: [
      "Everything in Pro",
      "Custom integrations & API access",
      "Dedicated onboarding",
      "Multi-location & team roles",
      "SOC 2 / security review support",
      "99.9% uptime SLA",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan/5 blur-[120px] pointer-events-none" />

      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan/30 bg-cyan/5 text-xs text-cyan font-mono mb-6">
            Pricing
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Plans that scale with your <span className="text-gradient-cyan">shadows</span>.
          </h2>
          <p className="text-muted-foreground text-lg">
            Start small, automate everything, or build something custom. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "border-2 border-cyan bg-gradient-to-b from-cyan/10 to-surface-elevated/40 shadow-glow"
                  : "border border-border bg-surface-elevated/40"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-cyan text-primary-foreground text-xs font-mono font-semibold">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl md:text-5xl font-bold tracking-tighter">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-muted-foreground font-mono text-sm">
                      {plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-cyan/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-cyan" strokeWidth={3} />
                    </div>
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "outlineGlow"}
                size="lg"
                className="w-full"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

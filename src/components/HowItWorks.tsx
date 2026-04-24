import { Upload, ScanLine, Database } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: Upload,
    n: "01",
    title: "Drop the invoice",
    desc: "Email, scan, snap a photo, or sync your inbox. Any format — PDF, image, even crumpled paper from the shop floor.",
  },
  {
    icon: ScanLine,
    n: "02",
    title: "AI reads everything",
    desc: "Vendors, line items, totals, PO numbers, tax — extracted in seconds with 99.4% accuracy. Even handwriting.",
  },
  {
    icon: Database,
    n: "03",
    title: "Sync & approve",
    desc: "Clean structured data flows into QuickBooks, Xero, NetSuite, or your custom shop management system. One click.",
  },
];

const HowItWorks = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan font-mono mb-3">How it works</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            From paper chaos to <span className="text-gradient-cyan">clean data</span> in seconds.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gradient-card border border-border hover:border-cyan/40 transition-all duration-500"
            >
              <div className="absolute top-6 right-6 text-5xl font-bold text-cyan/10 font-mono group-hover:text-cyan/20 transition-colors">
                {s.n}
              </div>
              <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center mb-6 group-hover:bg-cyan/20 group-hover:shadow-glow-soft transition-all">
                <s.icon className="w-5 h-5 text-cyan" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { Clock, Shield, GitMerge, Brain, FileSearch, Workflow } from "lucide-react";

const features = [
  { icon: Brain, title: "Trained on real invoices", desc: "Not generic OCR. Tuned on millions of AP documents from real shops." },
  { icon: Clock, title: "12 seconds per invoice", desc: "From upload to ledger entry. Replace hours of manual data entry every week." },
  { icon: GitMerge, title: "Sync with anything", desc: "QuickBooks, Xero, NetSuite, Sage, Tekmetric, Mitchell 1, Shop-Ware, and more." },
  { icon: FileSearch, title: "Line-item intelligence", desc: "Matches parts to your catalog. Flags duplicates, price changes, and overcharges." },
  { icon: Workflow, title: "Approval workflows", desc: "Route invoices to the right manager based on vendor, amount, or category." },
  { icon: Shield, title: "SOC 2 compliant", desc: "Bank-grade encryption. Your data stays yours — never used to train models." },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan font-mono mb-3">Capabilities</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Everything your AP team <span className="text-gradient-cyan">needs.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-8 bg-background hover:bg-surface-elevated transition-colors duration-500"
            >
              <f.icon className="w-6 h-6 text-cyan mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold mb-2 text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

import { motion } from "framer-motion";
import { CheckCircle2, FileText, Sparkles } from "lucide-react";

const fields = [
  { label: "Vendor", value: "AutoZone Pro #4421", delay: 0.6 },
  { label: "Invoice #", value: "INV-2024-08812", delay: 0.85 },
  { label: "Date", value: "Apr 18, 2026", delay: 1.1 },
  { label: "PO Number", value: "PO-9921-AUTO", delay: 1.35 },
  { label: "Subtotal", value: "$1,284.50", delay: 1.6 },
  { label: "Tax", value: "$102.76", delay: 1.85 },
  { label: "Total", value: "$1,387.26", delay: 2.1, highlight: true },
];

const lineItems = [
  ["Brake Pads — Ceramic Front", "4", "$89.99", "$359.96"],
  ["Synthetic Oil 5W-30 (5qt)", "6", "$42.50", "$255.00"],
  ["Air Filter — OEM", "8", "$18.75", "$150.00"],
  ["Spark Plugs Iridium", "16", "$13.25", "$212.00"],
];

const InvoiceExtractor = () => {
  return (
    <div className="relative grid md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
      {/* Invoice card */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-px rounded-2xl bg-gradient-cyan opacity-20 blur-xl" />
        <div className="relative rounded-2xl bg-gradient-card border border-border overflow-hidden shadow-elevated">
          <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/60">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <FileText className="w-3.5 h-3.5 text-cyan" />
              invoice_4421.pdf
            </div>
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <span className="w-2 h-2 rounded-full bg-cyan/60" />
            </div>
          </div>

          <div className="relative p-6 bg-[hsl(195_50%_5%)] min-h-[460px] overflow-hidden">
            {/* Scanning line */}
            <div className="absolute inset-x-0 top-0 h-full pointer-events-none overflow-hidden">
              <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-cyan/20 to-transparent animate-scan" />
            </div>

            <div className="relative">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="text-cyan font-semibold tracking-wide">AutoZone Pro</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-1">
                    1240 Industrial Blvd<br />Phoenix, AZ 85034
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">INVOICE</div>
                  <div className="font-mono text-sm text-foreground/90">INV-2024-08812</div>
                </div>
              </div>

              <div className="space-y-1 font-mono text-[11px]">
                <div className="grid grid-cols-[1fr_40px_70px_70px] gap-2 text-cyan/70 pb-2 border-b border-border/60">
                  <span>DESCRIPTION</span>
                  <span className="text-right">QTY</span>
                  <span className="text-right">PRICE</span>
                  <span className="text-right">TOTAL</span>
                </div>
                {lineItems.map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_40px_70px_70px] gap-2 py-1.5 text-muted-foreground border-b border-border/30">
                    <span className="text-foreground/80 truncate">{row[0]}</span>
                    <span className="text-right">{row[1]}</span>
                    <span className="text-right">{row[2]}</span>
                    <span className="text-right text-foreground/90">{row[3]}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 ml-auto w-48 space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-muted-foreground"><span>Subtotal</span><span>$1,284.50</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Tax (8%)</span><span>$102.76</span></div>
                <div className="flex justify-between pt-1 border-t border-border/60 text-cyan font-semibold"><span>Total</span><span>$1,387.26</span></div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-12 h-12 rounded-full bg-gradient-cyan flex items-center justify-center shadow-glow animate-pulse-glow">
          <Sparkles className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Extracted data */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative rounded-2xl bg-gradient-card border border-cyan/20 overflow-hidden shadow-elevated"
      >
        <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface/60">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            shadowrez.extract()
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">JSON · 99.4% confidence</span>
        </div>
        <div className="p-6 space-y-3">
          {fields.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: f.delay }}
              className={`flex items-center justify-between px-4 py-3 rounded-lg border ${
                f.highlight
                  ? "bg-cyan/10 border-cyan/40 shadow-glow-soft"
                  : "bg-surface border-border"
              }`}
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className={`w-4 h-4 ${f.highlight ? "text-cyan" : "text-cyan/70"}`} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-mono">{f.label}</span>
              </div>
              <span className={`font-mono text-sm ${f.highlight ? "text-cyan font-semibold" : "text-foreground/90"}`}>
                {f.value}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default InvoiceExtractor;

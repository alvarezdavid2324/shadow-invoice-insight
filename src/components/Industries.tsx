import { Wrench, Building2, Truck, Stethoscope, UtensilsCrossed, Hammer } from "lucide-react";
import { motion } from "framer-motion";

const industries = [
  { icon: Wrench, name: "Auto Shops", featured: true, desc: "Parts invoices, vendor catalogs, warranty claims — built around how shops actually work." },
  { icon: Truck, name: "Fleet & Logistics", desc: "Fuel cards, maintenance, tolls, lease invoices." },
  { icon: Building2, name: "Real Estate", desc: "Vendor bills, utilities, contractor invoices across properties." },
  { icon: Hammer, name: "Construction", desc: "Subcontractors, materials, equipment rental." },
  { icon: UtensilsCrossed, name: "Restaurants", desc: "Food distributors, alcohol, recurring vendor bills." },
  { icon: Stethoscope, name: "Healthcare", desc: "Medical supplies, lab work, equipment leasing." },
];

const Industries = () => {
  return (
    <section id="industries" className="py-24 relative">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan font-mono mb-3">Industries</div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Specialized for <span className="text-gradient-cyan">auto shops.</span><br />
            Ready for everything else.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            We obsess over the messy reality of auto parts invoices — multi-vendor catalogs,
            cores, returns, and warranty credits. The same engine handles any industry.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={`relative p-6 rounded-xl border transition-all duration-300 ${
                ind.featured
                  ? "bg-cyan/5 border-cyan/40 shadow-glow-soft"
                  : "bg-surface border-border hover:border-cyan/30 hover:bg-surface-elevated"
              }`}
            >
              {ind.featured && (
                <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider text-cyan bg-cyan/10 px-2 py-0.5 rounded-full border border-cyan/30">
                  Specialty
                </span>
              )}
              <ind.icon className={`w-6 h-6 mb-4 ${ind.featured ? "text-cyan" : "text-muted-foreground"}`} />
              <h3 className="font-semibold mb-2">{ind.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;

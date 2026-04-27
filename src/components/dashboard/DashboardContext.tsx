import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { generateMockInvoices, Invoice } from "@/lib/mockInvoices";
import { PlanTier } from "@/components/dashboard/PlanUsage";

interface Ctx {
  invoices: Invoice[];
  addInvoice: (inv: Invoice) => void;
  plan: PlanTier;
  setPlan: (p: PlanTier) => void;
  stats: {
    count: number;
    total: number;
    review: number;
    processing: number;
  };
}

const DashboardContext = createContext<Ctx | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => generateMockInvoices(218));
  const [plan, setPlan] = useState<PlanTier>("starter");

  const stats = useMemo(() => {
    const total = invoices.reduce((s, i) => s + i.total, 0);
    return {
      count: invoices.length,
      total,
      review: invoices.filter((i) => i.status === "review").length,
      processing: invoices.filter((i) => i.status === "processing").length,
    };
  }, [invoices]);

  const addInvoice = (inv: Invoice) => setInvoices((prev) => [inv, ...prev]);

  return (
    <DashboardContext.Provider value={{ invoices, addInvoice, plan, setPlan, stats }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

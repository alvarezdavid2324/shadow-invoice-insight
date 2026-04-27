import { useDashboard } from "@/components/dashboard/DashboardContext";
import InvoiceTable from "@/components/dashboard/InvoiceTable";

const Invoices = () => {
  const { invoices } = useDashboard();
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Full history of every invoice we've extracted for you.
        </p>
      </div>
      <InvoiceTable invoices={invoices} />
    </div>
  );
};

export default Invoices;

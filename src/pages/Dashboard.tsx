import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/shadowrez-logo.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateMockInvoices, Invoice } from "@/lib/mockInvoices";
import PlanUsage, { PlanTier } from "@/components/dashboard/PlanUsage";
import UploadZone from "@/components/dashboard/UploadZone";
import InvoiceTable from "@/components/dashboard/InvoiceTable";
import { ArrowLeft, FileCheck2, Clock, AlertCircle, DollarSign } from "lucide-react";

const Dashboard = () => {
  const [invoices, setInvoices] = useState<Invoice[]>(() => generateMockInvoices(218));
  const [plan, setPlan] = useState<PlanTier>("starter");

  const stats = useMemo(() => {
    const total = invoices.reduce((s, i) => s + i.total, 0);
    const review = invoices.filter((i) => i.status === "review").length;
    const processing = invoices.filter((i) => i.status === "processing").length;
    return { total, review, processing, count: invoices.length };
  }, [invoices]);

  const handleExtracted = (inv: Invoice) => setInvoices((prev) => [inv, ...prev]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={logo}
                alt="Shadowrez AI"
                className="h-8 w-auto object-contain drop-shadow-[0_0_12px_hsl(var(--cyan)/0.4)]"
              />
              <span className="font-semibold tracking-tight">
                Shadowrez<span className="text-cyan"> AI</span>
              </span>
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm font-medium">Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <Select value={plan} onValueChange={(v) => setPlan(v as PlanTier)}>
              <SelectTrigger className="w-[170px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter — $49/mo</SelectItem>
                <SelectItem value="pro">Pro — $149/mo</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Back to site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground mt-1">
            Drop invoices, review extracted data, and push to your accounting tools.
          </p>
        </div>

        {/* Stat strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={<FileCheck2 className="h-4 w-4" />}
            label="Invoices this month"
            value={stats.count.toLocaleString()}
          />
          <StatCard
            icon={<DollarSign className="h-4 w-4" />}
            label="Total processed value"
            value={`$${stats.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          />
          <StatCard
            icon={<AlertCircle className="h-4 w-4" />}
            label="Needs review"
            value={stats.review.toString()}
            accent={stats.review > 0}
          />
          <StatCard icon={<Clock className="h-4 w-4" />} label="In processing" value={stats.processing.toString()} />
        </div>

        {/* Upload + plan */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <UploadZone onExtracted={handleExtracted} />
          </div>
          <PlanUsage plan={plan} used={stats.count} />
        </div>

        {/* Table */}
        <InvoiceTable invoices={invoices} />
      </main>
    </div>
  );
};

const StatCard = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) => (
  <Card className="bg-gradient-card border-border/60">
    <CardContent className="p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className={accent ? "text-yellow-400" : "text-cyan"}>{icon}</span>
        {label}
      </div>
      <div className="mt-2 text-2xl font-semibold font-mono">{value}</div>
    </CardContent>
  </Card>
);

export default Dashboard;

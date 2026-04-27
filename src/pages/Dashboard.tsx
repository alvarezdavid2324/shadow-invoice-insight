import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FileCheck2, DollarSign, AlertCircle, Clock, Search, UploadCloud, TrendingUp, TrendingDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import InvoiceTable from "@/components/dashboard/InvoiceTable";

const Dashboard = () => {
  const { invoices, stats, plan } = useDashboard();

  const planCfg = {
    starter: { name: "Starter", limit: 200, price: "$49/mo" },
    pro: { name: "Pro", limit: 500, price: "$149/mo" },
    enterprise: { name: "Enterprise", limit: Infinity, price: "Custom" },
  }[plan];
  const limit = planCfg.limit === Infinity ? 0 : planCfg.limit;
  const usagePct = limit ? Math.min(100, (stats.count / limit) * 100) : 0;
  const totalK = stats.total >= 1000 ? `$${(stats.total / 1000).toFixed(1)}k` : `$${stats.total.toFixed(0)}`;

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back,<span className="text-cyan"> Jartiza</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Drop invoices, review extracted data, and push to your accounting tools.
          </p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search invoices, vendors, dates…" className="pl-9" />
          </div>
          <Button asChild variant="default" className="bg-gradient-cyan text-primary-foreground hover:opacity-90">
            <Link to="/dashboard/upload">
              <UploadCloud className="h-4 w-4" /> Upload Invoice
            </Link>
          </Button>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Invoices · this month"
          value={stats.count.toLocaleString()}
          trend={{ dir: "down", text: "1 from last month" }}
        />
        <StatCard
          label="Total extracted"
          value={totalK}
          subtext="Across all sources"
          icon={<DollarSign className="h-4 w-4" />}
        />
        <StatCard
          label="Needs review"
          value={stats.review.toString()}
          icon={<AlertCircle className="h-4 w-4" />}
          accent={stats.review > 0}
        />
        <UsageCard
          name={planCfg.name}
          price={planCfg.price}
          used={stats.count}
          limit={planCfg.limit}
          pct={usagePct}
        />
      </div>

      {/* Charts */}
      <DashboardCharts invoices={invoices} />

      {/* Table */}
      <InvoiceTable invoices={invoices} />
    </div>
  );
};

const StatCard = ({
  label,
  value,
  subtext,
  trend,
  icon,
  accent,
}: {
  label: string;
  value: string;
  subtext?: string;
  trend?: { dir: "up" | "down"; text: string };
  icon?: React.ReactNode;
  accent?: boolean;
}) => (
  <Card className="bg-gradient-card border-border/60">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">{label}</span>
        {icon && <span className={accent ? "text-yellow-400" : "text-cyan"}>{icon}</span>}
      </div>
      <div className="mt-3 text-3xl font-semibold font-mono">{value}</div>
      {trend && (
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          {trend.dir === "up" ? (
            <TrendingUp className="h-3 w-3 text-green-400" />
          ) : (
            <TrendingDown className="h-3 w-3 text-muted-foreground" />
          )}
          <span>{trend.text}</span>
        </div>
      )}
      {subtext && <div className="mt-2 text-xs text-muted-foreground">{subtext}</div>}
    </CardContent>
  </Card>
);

const UsageCard = ({
  name,
  price,
  used,
  limit,
  pct,
}: {
  name: string;
  price: string;
  used: number;
  limit: number;
  pct: number;
}) => (
  <Card className="bg-gradient-card border-border/60">
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Monthly usage</span>
        <Badge variant="outline" className="border-cyan/40 text-cyan h-6">
          {name} — {price}
        </Badge>
      </div>
      <div className="mt-3 text-2xl font-semibold font-mono">
        {used}
        <span className="text-muted-foreground text-base"> / {limit === Infinity ? "∞" : limit}</span>
      </div>
      <div className="text-xs text-muted-foreground mb-2">invoices processed</div>
      <Progress value={pct} className="h-1.5" />
    </CardContent>
  </Card>
);

export default Dashboard;

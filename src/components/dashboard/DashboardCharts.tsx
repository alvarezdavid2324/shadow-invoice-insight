import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { Invoice, getVolumeByMonth, getSpendByVendor } from "@/lib/mockInvoices";

interface Props {
  invoices: Invoice[];
}

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  fontSize: 12,
  color: "hsl(var(--foreground))",
};

export const DashboardCharts = ({ invoices }: Props) => {
  const volume = getVolumeByMonth(invoices);
  const spend = getSpendByVendor(invoices, 5);

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <Card className="bg-gradient-card border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Invoice Volume</CardTitle>
          <p className="text-xs text-muted-foreground">Monthly processed count</p>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={volume} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(var(--cyan))", strokeOpacity: 0.2 }} />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--cyan))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--cyan))" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/60">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Spend by Vendor</CardTitle>
          <p className="text-xs text-muted-foreground">Top 5 by total spend</p>
        </CardHeader>
        <CardContent className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spend} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
              <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="vendor"
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={0}
                tickFormatter={(v: string) => (v.length > 14 ? v.slice(0, 12) + "…" : v)}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Total"]}
                cursor={{ fill: "hsl(var(--cyan) / 0.08)" }}
              />
              <Bar dataKey="total" fill="hsl(var(--cyan))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardCharts;

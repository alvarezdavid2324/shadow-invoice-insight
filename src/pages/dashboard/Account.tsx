import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import type { PlanTier } from "@/components/dashboard/PlanUsage";

const Account = () => {
  const { plan, setPlan } = useDashboard();
  return (
    <div className="space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account</h1>
        <p className="text-muted-foreground mt-1 text-sm">Demo account — Jartiza Alvarez</p>
      </div>
      <Card className="bg-gradient-card border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">Switch plan to preview overage behavior.</p>
          <Select value={plan} onValueChange={(v) => setPlan(v as PlanTier)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="starter">Starter — $49/mo</SelectItem>
              <SelectItem value="pro">Pro — $149/mo</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
};

export default Account;

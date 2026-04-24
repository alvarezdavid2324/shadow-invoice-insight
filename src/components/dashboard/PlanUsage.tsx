import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, TrendingUp } from "lucide-react";

export type PlanTier = "starter" | "pro" | "enterprise";

interface Props {
  plan: PlanTier;
  used: number;
}

const PLAN_CONFIG: Record<PlanTier, { name: string; included: number; overage: number; price: string }> = {
  starter: { name: "Starter", included: 200, overage: 0.5, price: "$49/mo" },
  pro: { name: "Pro", included: 500, overage: 0.35, price: "$149/mo" },
  enterprise: { name: "Enterprise", included: Infinity, overage: 0, price: "Custom" },
};

const PlanUsage = ({ plan, used }: Props) => {
  const cfg = PLAN_CONFIG[plan];
  const isUnlimited = cfg.included === Infinity;
  const pct = isUnlimited ? 0 : Math.min(100, (used / cfg.included) * 100);
  const overageCount = isUnlimited ? 0 : Math.max(0, used - cfg.included);
  const overageCost = +(overageCount * cfg.overage).toFixed(2);
  const warn = !isUnlimited && pct >= 80;
  const over = overageCount > 0;

  return (
    <Card className="bg-gradient-card border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-cyan" />
            Monthly usage
          </CardTitle>
          <Badge variant="outline" className="border-cyan/40 text-cyan">
            {cfg.name} · {cfg.price}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <span className="font-mono text-2xl font-semibold">
              {used.toLocaleString()}
              <span className="text-muted-foreground text-base">
                {" "}
                / {isUnlimited ? "∞" : cfg.included.toLocaleString()}
              </span>
            </span>
            <span className="text-xs text-muted-foreground">invoices processed</span>
          </div>
          {!isUnlimited && <Progress value={pct} className={over ? "[&>div]:bg-destructive" : ""} />}
        </div>

        {over && (
          <div className="flex items-start gap-2 p-3 rounded-md bg-destructive/10 border border-destructive/30">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
            <div className="text-sm">
              <div className="font-medium text-foreground">Overage in effect</div>
              <div className="text-muted-foreground">
                {overageCount} extra invoices × ${cfg.overage.toFixed(2)} ={" "}
                <span className="text-destructive font-mono font-semibold">${overageCost.toFixed(2)}</span> this period
              </div>
            </div>
          </div>
        )}

        {warn && !over && (
          <div className="flex items-start gap-2 p-3 rounded-md bg-cyan/5 border border-cyan/30">
            <AlertTriangle className="h-4 w-4 text-cyan mt-0.5 shrink-0" />
            <div className="text-sm text-muted-foreground">
              You're nearing your plan limit. Overages bill at ${cfg.overage.toFixed(2)} per invoice.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlanUsage;

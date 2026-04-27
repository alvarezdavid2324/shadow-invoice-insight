import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Inbox = () => (
  <div className="space-y-6 max-w-[900px] mx-auto">
    <div className="flex items-center gap-3">
      <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
      <Badge variant="outline" className="border-cyan/40 text-cyan">PRO</Badge>
    </div>
    <Card className="bg-gradient-card border-border/60">
      <CardHeader>
        <CardTitle className="text-base">Email + SMS forwarding</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Forward vendor invoices to <span className="font-mono text-cyan">invoices@shadowrez.ai</span> and we'll
          extract them automatically. Available on Pro.
        </p>
      </CardContent>
    </Card>
  </div>
);

export default Inbox;

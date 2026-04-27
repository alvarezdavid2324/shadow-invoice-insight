import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Settings = () => (
  <div className="space-y-6 max-w-[900px] mx-auto">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground mt-1 text-sm">Workspace preferences.</p>
    </div>
    <Card className="bg-gradient-card border-border/60">
      <CardHeader>
        <CardTitle className="text-base">Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Settings UI coming soon.</p>
      </CardContent>
    </Card>
  </div>
);

export default Settings;

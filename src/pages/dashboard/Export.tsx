import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet } from "lucide-react";
import { useDashboard } from "@/components/dashboard/DashboardContext";
import { invoicesToCSV, downloadFile } from "@/lib/mockInvoices";
import { toast } from "sonner";

const ExportPage = () => {
  const { invoices } = useDashboard();

  const exportCSV = () => {
    downloadFile(`invoices-${new Date().toISOString().slice(0, 10)}.csv`, invoicesToCSV(invoices));
    toast.success(`Exported ${invoices.length} invoices to CSV`);
  };

  const sendToQuickBooks = () => {
    toast.success(`Queued ${invoices.length} invoices for QuickBooks`);
  };

  return (
    <div className="space-y-6 max-w-[900px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Export</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Send extracted data to your accounting tools or download it.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="bg-gradient-card border-border/60">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Download className="h-4 w-4 text-cyan" /> CSV export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Download all {invoices.length} invoices as a single CSV file.
            </p>
            <Button onClick={exportCSV} className="bg-gradient-cyan text-primary-foreground">
              Download CSV
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-border/60">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-cyan" /> QuickBooks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Push invoices straight into your QuickBooks Online account.
            </p>
            <Button onClick={sendToQuickBooks} variant="outline">
              Send to QuickBooks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExportPage;

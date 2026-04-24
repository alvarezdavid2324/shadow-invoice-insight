import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Invoice, InvoiceStatus, invoicesToCSV, downloadFile } from "@/lib/mockInvoices";
import { Download, Search, FileSpreadsheet, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Props {
  invoices: Invoice[];
}

const statusColor: Record<InvoiceStatus, string> = {
  extracted: "bg-cyan/15 text-cyan border-cyan/30",
  processing: "bg-muted text-muted-foreground border-border",
  review: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  exported: "bg-green-500/15 text-green-400 border-green-500/30",
};

const sourceLabel: Record<Invoice["source"], string> = {
  upload: "Upload",
  email: "Email",
  text: "SMS",
  quickbooks: "QuickBooks",
};

const InvoiceTable = ({ invoices }: Props) => {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [source, setSource] = useState<string>("all");

  const filtered = useMemo(() => {
    return invoices.filter((i) => {
      const matchesQ =
        !query ||
        i.vendor.toLowerCase().includes(query.toLowerCase()) ||
        i.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
        i.id.toLowerCase().includes(query.toLowerCase());
      const matchesS = status === "all" || i.status === status;
      const matchesSrc = source === "all" || i.source === source;
      return matchesQ && matchesS && matchesSrc;
    });
  }, [invoices, query, status, source]);

  const exportCSV = () => {
    downloadFile(`invoices-${new Date().toISOString().slice(0, 10)}.csv`, invoicesToCSV(filtered));
    toast.success(`Exported ${filtered.length} invoices to CSV`);
  };

  const sendToQuickBooks = () => {
    toast.success(`Queued ${filtered.length} invoices for QuickBooks`, {
      description: "Sync will complete in the background.",
    });
  };

  return (
    <Card className="bg-gradient-card border-border/60">
      <CardHeader className="pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold">Invoice history</CardTitle>
          <div className="flex gap-2">
            <Button variant="outlineGlow" size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4" /> CSV
            </Button>
            <Button variant="outlineGlow" size="sm" onClick={sendToQuickBooks}>
              <FileSpreadsheet className="h-4 w-4" /> Send to QuickBooks
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search vendor, invoice #…"
              className="pl-9"
            />
          </div>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="extracted">Extracted</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="review">Needs review</SelectItem>
              <SelectItem value="exported">Exported</SelectItem>
            </SelectContent>
          </Select>
          <Select value={source} onValueChange={setSource}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All sources</SelectItem>
              <SelectItem value="upload">Upload</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="text">SMS</SelectItem>
              <SelectItem value="quickbooks">QuickBooks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md border border-border/60 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Invoice</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                    No invoices match your filters
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((inv) => (
                  <TableRow key={inv.id} className="cursor-pointer">
                    <TableCell className="font-mono text-xs">{inv.invoiceNumber}</TableCell>
                    <TableCell className="font-medium">{inv.vendor}</TableCell>
                    <TableCell className="text-muted-foreground">{inv.date.slice(0, 10)}</TableCell>
                    <TableCell className="text-muted-foreground">{sourceLabel[inv.source]}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColor[inv.status]}>
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-mono text-xs text-muted-foreground">
                      {inv.confidence}%
                    </TableCell>
                    <TableCell className="text-right font-mono font-semibold">
                      ${inv.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="mt-3 text-xs text-muted-foreground">
          Showing {filtered.length} of {invoices.length} invoices
        </div>
      </CardContent>
    </Card>
  );
};

export default InvoiceTable;

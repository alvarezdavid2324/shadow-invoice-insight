import { useCallback, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { Invoice } from "@/lib/mockInvoices";
import { toast } from "sonner";

interface Props {
  onExtracted: (invoice: Invoice) => void;
}

const VENDORS = ["Northwind Logistics", "Bluefin Hardware", "Apex Cleaning Services", "Quartz Plumbing"];

const fakeExtract = (file: File): Promise<Invoice> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const vendor = VENDORS[Math.floor(Math.random() * VENDORS.length)];
      const lineItems = Array.from({ length: 1 + Math.floor(Math.random() * 3) }).map((_, j) => {
        const qty = 1 + Math.floor(Math.random() * 6);
        const unit = +(20 + Math.random() * 250).toFixed(2);
        return {
          description: ["Materials", "Labor", "Delivery", "Service fee"][j % 4],
          quantity: qty,
          unitPrice: unit,
          amount: +(qty * unit).toFixed(2),
        };
      });
      const total = +lineItems.reduce((s, l) => s + l.amount, 0).toFixed(2);
      resolve({
        id: `INV-${Date.now().toString().slice(-6)}`,
        vendor,
        invoiceNumber: `${vendor.split(" ")[0].toUpperCase()}-${Math.floor(2400 + Math.random() * 100)}`,
        date: new Date().toISOString(),
        dueDate: new Date(Date.now() + 30 * 86400000).toISOString(),
        total,
        currency: "USD",
        status: "extracted",
        source: "upload",
        fileName: file.name,
        lineItems,
        confidence: 90 + Math.floor(Math.random() * 10),
      });
    }, 1400);
  });

const UploadZone = ({ onExtracted }: Props) => {
  const [dragOver, setDragOver] = useState(false);
  const [progress, setProgress] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;
      setBusy(true);
      setDone(null);
      setProgress(0);
      const interval = setInterval(() => setProgress((p) => Math.min(p + 8, 90)), 100);
      for (const file of Array.from(files)) {
        const inv = await fakeExtract(file);
        onExtracted(inv);
        toast.success(`Extracted ${file.name}`, {
          description: `${inv.vendor} · $${inv.total.toFixed(2)} · ${inv.confidence}% confidence`,
        });
      }
      clearInterval(interval);
      setProgress(100);
      setDone(`${files.length} file${files.length > 1 ? "s" : ""} processed`);
      setTimeout(() => {
        setBusy(false);
        setProgress(0);
      }, 800);
    },
    [onExtracted],
  );

  return (
    <Card className="bg-gradient-card border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold flex items-center gap-2">
          <UploadCloud className="h-4 w-4 text-cyan" />
          Upload invoices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            handleFiles(e.dataTransfer.files);
          }}
          onClick={() => inputRef.current?.click()}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-all ${
            dragOver ? "border-cyan bg-cyan/5" : "border-border hover:border-cyan/50 hover:bg-cyan/5"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          {busy ? (
            <div className="space-y-3">
              <Loader2 className="h-8 w-8 mx-auto text-cyan animate-spin" />
              <div className="text-sm text-muted-foreground">Extracting fields with OCR + AI…</div>
              <Progress value={progress} className="max-w-xs mx-auto" />
            </div>
          ) : done ? (
            <div className="space-y-2">
              <CheckCircle2 className="h-8 w-8 mx-auto text-cyan" />
              <div className="text-sm font-medium">{done}</div>
              <div className="text-xs text-muted-foreground">Drop more files anytime</div>
            </div>
          ) : (
            <div className="space-y-2">
              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
              <div className="text-sm font-medium">Drop PDFs or images here</div>
              <div className="text-xs text-muted-foreground">or click to browse · PDF, PNG, JPG up to 20 MB</div>
              <Button variant="outlineGlow" size="sm" className="mt-3">
                Choose files
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadZone;

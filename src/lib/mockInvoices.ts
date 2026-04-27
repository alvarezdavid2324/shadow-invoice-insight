export type InvoiceStatus = "extracted" | "processing" | "review" | "exported";

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  vendor: string;
  invoiceNumber: string;
  date: string; // ISO
  dueDate: string;
  total: number;
  currency: string;
  status: InvoiceStatus;
  source: "upload" | "email" | "text" | "quickbooks";
  fileName: string;
  lineItems: LineItem[];
  confidence: number; // 0-100
}

const VENDORS = [
  "Acme Supplies Co.",
  "Northwind Logistics",
  "Bluefin Hardware",
  "Cedar & Pine Lumber",
  "Apex Cleaning Services",
  "Ironclad Welding",
  "Harborlight Electric",
  "Summit Roofing LLC",
  "Quartz Plumbing",
  "Granite State Concrete",
  "Vertex Office Goods",
  "Beacon Print Shop",
];

const SOURCES: Invoice["source"][] = ["upload", "email", "text", "quickbooks"];
const STATUSES: InvoiceStatus[] = ["extracted", "processing", "review", "exported"];

const rand = (seed: number) => {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export const generateMockInvoices = (count = 24): Invoice[] => {
  const invoices: Invoice[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const r = rand(i + 1);
    const vendor = VENDORS[Math.floor(r * VENDORS.length)];
    const daysAgo = Math.floor(rand(i + 50) * 28);
    const date = new Date(now - daysAgo * 86400000);
    const due = new Date(date.getTime() + 30 * 86400000);
    const lineCount = 1 + Math.floor(rand(i + 100) * 4);
    const lineItems: LineItem[] = Array.from({ length: lineCount }).map((_, j) => {
      const qty = 1 + Math.floor(rand(i * 10 + j) * 9);
      const unit = +(15 + rand(i * 7 + j) * 380).toFixed(2);
      return {
        description: ["Materials", "Labor", "Service fee", "Equipment rental", "Delivery"][j % 5],
        quantity: qty,
        unitPrice: unit,
        amount: +(qty * unit).toFixed(2),
      };
    });
    const total = +lineItems.reduce((s, l) => s + l.amount, 0).toFixed(2);
    invoices.push({
      id: `INV-${(1000 + i).toString()}`,
      vendor,
      invoiceNumber: `${vendor.split(" ")[0].toUpperCase()}-${2400 + i}`,
      date: date.toISOString(),
      dueDate: due.toISOString(),
      total,
      currency: "USD",
      status: STATUSES[Math.floor(rand(i + 200) * STATUSES.length)],
      source: SOURCES[Math.floor(rand(i + 300) * SOURCES.length)],
      fileName: `invoice_${1000 + i}.pdf`,
      lineItems,
      confidence: 88 + Math.floor(rand(i + 400) * 12),
    });
  }
  return invoices.sort((a, b) => +new Date(b.date) - +new Date(a.date));
};

export const invoicesToCSV = (invoices: Invoice[]): string => {
  const headers = [
    "Invoice ID",
    "Vendor",
    "Invoice Number",
    "Date",
    "Due Date",
    "Total",
    "Currency",
    "Status",
    "Source",
    "Confidence",
  ];
  const rows = invoices.map((i) =>
    [
      i.id,
      `"${i.vendor}"`,
      i.invoiceNumber,
      i.date.slice(0, 10),
      i.dueDate.slice(0, 10),
      i.total.toFixed(2),
      i.currency,
      i.status,
      i.source,
      i.confidence,
    ].join(","),
  );
  return [headers.join(","), ...rows].join("\n");
};

export const getVolumeByMonth = (invoices: Invoice[]) => {
  const map = new Map<string, number>();
  invoices.forEach((i) => {
    const d = new Date(i.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, (map.get(key) ?? 0) + 1);
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => {
      const [y, m] = k.split("-");
      const label = new Date(Number(y), Number(m) - 1, 1).toLocaleDateString(undefined, {
        month: "short",
        year: "2-digit",
      });
      return { month: label, volume: v };
    });
};

export const getSpendByVendor = (invoices: Invoice[], topN = 5) => {
  const map = new Map<string, number>();
  invoices.forEach((i) => map.set(i.vendor, (map.get(i.vendor) ?? 0) + i.total));
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([vendor, total]) => ({ vendor, total: +total.toFixed(2) }));
};

export const downloadFile = (filename: string, content: string, mime = "text/csv") => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

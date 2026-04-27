import { useDashboard } from "@/components/dashboard/DashboardContext";
import UploadZone from "@/components/dashboard/UploadZone";
import PlanUsage from "@/components/dashboard/PlanUsage";

const UploadPage = () => {
  const { addInvoice, plan, stats } = useDashboard();
  return (
    <div className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Upload</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Drop PDFs or images and we'll extract the fields in seconds.
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <UploadZone onExtracted={addInvoice} />
        </div>
        <PlanUsage plan={plan} used={stats.count} />
      </div>
    </div>
  );
};

export default UploadPage;

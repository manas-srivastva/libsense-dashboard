import { Library } from "lucide-react";

const DashboardHeader = () => (
  <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-xl">
    <div className="flex h-16 items-center justify-between px-6">
      <div className="flex items-center gap-3">
        <Library className="h-6 w-6 text-foreground" />
        <h1 className="text-lg font-semibold tracking-tight text-foreground">
          LibSense
        </h1>
        <span className="hidden sm:inline text-sm text-muted-foreground font-medium">
          Real-Time Occupancy
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-full bg-status-available-bg px-3 py-1.5">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-pulse-live absolute inline-flex h-full w-full rounded-full bg-status-available opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-status-available" />
        </span>
        <span className="text-xs font-semibold text-status-available">Live</span>
      </div>
    </div>
  </header>
);

export default DashboardHeader;

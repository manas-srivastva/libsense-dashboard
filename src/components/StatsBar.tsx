import { Armchair, CheckCircle, Briefcase } from "lucide-react";
import type { Seat } from "@/lib/mockData";

interface StatsBarProps {
  seats: Seat[];
}

const StatsBar = ({ seats }: StatsBarProps) => {
  const total = seats.length;
  const available = seats.filter((s) => s.status === "available").length;
  const reserved = seats.filter((s) => s.status === "reserved").length;
  const occupied = seats.filter((s) => s.status === "occupied").length;
  const busyPercent = Math.round(((occupied + reserved) / total) * 100);

  const stats = [
    { label: "Total Seats", value: total, icon: Armchair, color: "text-foreground" },
    { label: "Available", value: available, icon: CheckCircle, color: "text-status-available" },
    { label: "Bag Only", value: reserved, icon: Briefcase, color: "text-status-reserved" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="glass-card-elevated p-4 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
            <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
          </div>
          <span className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.value}</span>
        </div>
      ))}
      <div className="glass-card-elevated p-4 flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Busy-ness Meter</span>
        <div className="flex items-end gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">{busyPercent}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out"
            style={{
              width: `${busyPercent}%`,
              background:
                busyPercent > 80
                  ? "hsl(var(--status-occupied))"
                  : busyPercent > 50
                  ? "hsl(var(--status-reserved))"
                  : "hsl(var(--status-available))",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;

import { Layers, BookOpen, Users, Monitor, VolumeX } from "lucide-react";
import { zones } from "@/lib/mockData";

interface ZoneFilterProps {
  active: string;
  onChange: (zone: string) => void;
}

const iconMap: Record<string, typeof Layers> = {
  "Zone A": BookOpen,
  "Zone B": Users,
  "Zone C": Monitor,
  "Quiet Zone": VolumeX,
};

const ZoneFilter = ({ active, onChange }: ZoneFilterProps) => (
  <div className="glass-card-elevated p-4 flex flex-col gap-1">
    <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-2">
      Zones
    </span>
    <button
      onClick={() => onChange("all")}
      className={`
        flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300
        ${active === "all"
          ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }
      `}
    >
      <Layers className="h-4 w-4" />
      All Zones
    </button>
    {zones.map((zone) => {
      const isActive = active === zone.id;
      const Icon = iconMap[zone.id] || BookOpen;
      return (
        <button
          key={zone.id}
          onClick={() => onChange(zone.id)}
          className={`
            flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-300
            ${isActive
              ? "bg-primary text-primary-foreground shadow-sm scale-[1.02]"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
          `}
        >
          <Icon className="h-4 w-4" />
          <div className="flex flex-col items-start">
            <span>{zone.label}</span>
            {!isActive && (
              <span className="text-[10px] text-muted-foreground/70">{zone.description}</span>
            )}
          </div>
        </button>
      );
    })}
  </div>
);

export default ZoneFilter;

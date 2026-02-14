import { Building2, VolumeX, Layers } from "lucide-react";

interface FloorFilterProps {
  active: string;
  onChange: (floor: string) => void;
}

const floors = [
  { id: "all", label: "All Floors", icon: Layers },
  { id: "Floor 1", label: "Floor 1", icon: Building2 },
  { id: "Floor 2", label: "Floor 2", icon: Building2 },
  { id: "Quiet Zones", label: "Quiet Zones", icon: VolumeX },
];

const FloorFilter = ({ active, onChange }: FloorFilterProps) => (
  <div className="glass-card-elevated p-4 flex flex-col gap-1">
    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
      Filters
    </span>
    {floors.map((floor) => {
      const isActive = active === floor.id;
      return (
        <button
          key={floor.id}
          onClick={() => onChange(floor.id)}
          className={`
            flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
            ${isActive
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }
          `}
        >
          <floor.icon className="h-4 w-4" />
          {floor.label}
        </button>
      );
    })}
  </div>
);

export default FloorFilter;

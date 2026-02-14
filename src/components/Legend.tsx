import { Check, User, Briefcase } from "lucide-react";

const items = [
  { label: "Available", icon: Check, dotClass: "bg-status-available" },
  { label: "Occupied", icon: User, dotClass: "bg-status-occupied" },
  { label: "Bag Detected", icon: Briefcase, dotClass: "bg-status-reserved" },
];

const Legend = () => (
  <div className="flex flex-wrap gap-4">
    {items.map((item) => (
      <div key={item.label} className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${item.dotClass}`} />
        <span className="text-xs text-muted-foreground font-medium">{item.label}</span>
      </div>
    ))}
  </div>
);

export default Legend;

import { useRef, useEffect } from "react";
import { Check, User, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Seat } from "@/lib/mockData";

interface CubicleCardProps {
  seat: Seat;
  highlighted?: boolean;
}

const statusConfig = {
  available: {
    bg: "bg-status-available-bg",
    border: "border-status-available/30",
    wallColor: "bg-status-available/20",
    icon: Check,
    iconColor: "text-status-available",
    label: "Available",
  },
  occupied: {
    bg: "bg-status-occupied-bg",
    border: "border-status-occupied/30",
    wallColor: "bg-status-occupied/20",
    icon: User,
    iconColor: "text-status-occupied",
    label: "Occupied",
  },
  reserved: {
    bg: "bg-status-reserved-bg",
    border: "border-status-reserved/30",
    wallColor: "bg-status-reserved/20",
    icon: Briefcase,
    iconColor: "text-status-reserved",
    label: "Bag Detected",
  },
};

const CubicleCard = ({ seat, highlighted = false }: CubicleCardProps) => {
  const config = statusConfig[seat.status];
  const Icon = config.icon;
  const prevStatus = useRef(seat.status);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevStatus.current !== seat.status && cardRef.current) {
      cardRef.current.classList.add("seat-flip");
      const timer = setTimeout(() => cardRef.current?.classList.remove("seat-flip"), 500);
      prevStatus.current = seat.status;
      return () => clearTimeout(timer);
    }
  }, [seat.status]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={cardRef}
          className={`
            relative flex flex-col rounded-xl border-2 overflow-hidden cursor-pointer
            transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-lg
            ${config.border} ${config.bg}
            ${highlighted ? "ring-2 ring-primary ring-offset-2 scale-[1.05] z-10" : ""}
          `}
        >
          {/* Cubicle walls (top + left side indicator) */}
          <div className={`h-1.5 w-full ${config.wallColor}`} />
          <div className="flex items-stretch">
            <div className={`w-1.5 ${config.wallColor}`} />
            {/* Desk area */}
            <div className="flex-1 flex flex-col items-center justify-center gap-2 p-3 py-4">
              {/* Desk surface */}
              <div className="w-full h-1 rounded-full bg-border/60 mb-1" />
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
              <span className="text-[10px] font-semibold text-muted-foreground">
                {seat.id.split("-").pop()}
              </span>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="glass-card-elevated border-border/50 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">Cubicle {seat.id}</span>
          <span className="text-[10px] text-muted-foreground capitalize">
            Status: {config.label}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Updated: {seat.lastUpdated}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CubicleCard;

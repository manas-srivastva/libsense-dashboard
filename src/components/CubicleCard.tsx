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
    wallBorder: "border-status-available/50",
    wallBg: "bg-status-available/15",
    icon: Check,
    iconColor: "text-status-available",
    label: "Available",
  },
  occupied: {
    bg: "bg-status-occupied-bg",
    wallBorder: "border-status-occupied/50",
    wallBg: "bg-status-occupied/15",
    icon: User,
    iconColor: "text-status-occupied",
    label: "Occupied",
  },
  reserved: {
    bg: "bg-status-reserved-bg",
    wallBorder: "border-status-reserved/50",
    wallBg: "bg-status-reserved/15",
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
        {/* Outer cubicle boundary — thick walls */}
        <div
          ref={cardRef}
          className={`
            relative cursor-pointer transition-all duration-300 ease-out
            hover:scale-[1.03] hover:shadow-md
            ${highlighted ? "ring-2 ring-primary ring-offset-2 scale-[1.04] z-10" : ""}
          `}
        >
          {/* Floor-plan cubicle: U-shape walls */}
          <div
            className={`
              relative rounded-lg border-2 ${config.wallBorder}
              ${config.wallBg} p-[3px]
            `}
          >
            {/* Open side indicator (bottom open = entrance) */}
            <div
              className={`
                rounded-md ${config.bg} border border-border/20
                flex flex-col items-center justify-center gap-1.5
                px-2 py-3
              `}
            >
              {/* Desk surface line */}
              <div className="w-full h-0.5 rounded-full bg-border/50" />

              {/* Status icon */}
              <Icon className={`h-3.5 w-3.5 ${config.iconColor}`} />

              {/* Seat ID */}
              <span className="text-[8px] font-bold text-muted-foreground leading-none tracking-wide">
                {seat.id.split("-").pop()}
              </span>
            </div>

            {/* Entrance gap at bottom — open side of cubicle */}
            <div
              className={`
                absolute -bottom-[2px] left-1/2 -translate-x-1/2
                w-1/3 h-[3px] bg-card
              `}
            />
          </div>

          {/* Chair dot below entrance */}
          <div className="flex justify-center mt-1">
            <div className={`w-3 h-1.5 rounded-full border ${config.wallBorder} ${config.wallBg}`} />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="glass-card-elevated border-border/50 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">Cubicle {seat.id}</span>
          <span className="text-[10px] text-muted-foreground">Status: {config.label}</span>
          <span className="text-[10px] text-muted-foreground">Updated: {seat.lastUpdated}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default CubicleCard;

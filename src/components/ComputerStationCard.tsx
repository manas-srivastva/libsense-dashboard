import { useRef, useEffect } from "react";
import { Monitor, User, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Seat } from "@/lib/mockData";

interface ComputerStationCardProps {
  seat: Seat;
  highlighted?: boolean;
}

const statusConfig = {
  available: {
    bg: "bg-status-available-bg",
    screenBg: "bg-status-available/15",
    screenBorder: "border-status-available/40",
    monitorColor: "text-status-available",
    userColor: "",
    label: "Available",
  },
  occupied: {
    bg: "bg-status-occupied-bg",
    screenBg: "bg-status-occupied/10",
    screenBorder: "border-status-occupied/40",
    monitorColor: "text-status-occupied",
    userColor: "text-status-occupied",
    label: "In Use",
  },
  reserved: {
    bg: "bg-status-reserved-bg",
    screenBg: "bg-status-reserved/10",
    screenBorder: "border-status-reserved/40",
    monitorColor: "text-status-reserved",
    userColor: "text-status-reserved",
    label: "Bag Detected",
  },
};

const ComputerStationCard = ({ seat, highlighted = false }: ComputerStationCardProps) => {
  const config = statusConfig[seat.status];
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
            relative flex flex-col items-center justify-center gap-2 p-4 py-5
            transition-all duration-300 ease-out cursor-pointer
            hover:bg-accent/50
            ${config.bg}
            ${highlighted ? "ring-inset ring-2 ring-primary z-10" : ""}
          `}
        >
          {/* Monitor representation */}
          <div className={`relative flex items-center justify-center w-12 h-8 rounded-md border-2 ${config.screenBorder} ${config.screenBg}`}>
            <Monitor className={`h-4 w-4 ${config.monitorColor}`} />
            {seat.status === "occupied" && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-status-occupied animate-pulse" />
            )}
          </div>
          {/* Monitor stand */}
          <div className="flex flex-col items-center gap-0">
            <div className="w-2 h-2 bg-border rounded-sm" />
            <div className="w-6 h-0.5 bg-border rounded-full" />
          </div>
          {/* Seat indicator */}
          <div className="flex items-center gap-1.5">
            {seat.status === "occupied" ? (
              <User className="h-3 w-3 text-status-occupied" />
            ) : seat.status === "reserved" ? (
              <Briefcase className="h-3 w-3 text-status-reserved" />
            ) : null}
            <span className="text-[10px] font-semibold text-muted-foreground">
              {seat.id.split("-").pop()}
            </span>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent className="glass-card-elevated border-border/50 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">Station {seat.id}</span>
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

export default ComputerStationCard;

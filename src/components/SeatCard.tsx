import { Check, User, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Seat } from "@/lib/mockData";

interface SeatCardProps {
  seat: Seat;
}

const statusConfig = {
  available: {
    bg: "bg-status-available-bg",
    border: "border-status-available/30",
    icon: Check,
    iconColor: "text-status-available",
  },
  occupied: {
    bg: "bg-status-occupied-bg",
    border: "border-status-occupied/30",
    icon: User,
    iconColor: "text-status-occupied",
  },
  reserved: {
    bg: "bg-status-reserved-bg",
    border: "border-status-reserved/30",
    icon: Briefcase,
    iconColor: "text-status-reserved",
  },
};

const SeatCard = ({ seat }: SeatCardProps) => {
  const config = statusConfig[seat.status];
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className={`
            relative flex flex-col items-center justify-center gap-1 
            rounded-xl border p-3 transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-md cursor-pointer
            ${config.bg} ${config.border}
          `}
        >
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
          <span className="text-[10px] font-medium text-muted-foreground">
            {seat.id.split("-").pop()}
          </span>
        </button>
      </TooltipTrigger>
      <TooltipContent className="glass-card-elevated border-border/50 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">Seat {seat.id}</span>
          <span className="text-[10px] text-muted-foreground capitalize">
            Status: {seat.status}
          </span>
          <span className="text-[10px] text-muted-foreground">
            Updated: {seat.lastUpdated}
          </span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export default SeatCard;

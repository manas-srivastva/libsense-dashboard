import { useRef, useEffect } from "react";
import { Check, User, Briefcase } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Seat } from "@/lib/mockData";

interface BenchRowProps {
  seats: Seat[];
  rowIndex: number;
  searchQuery?: string;
}

const statusConfig = {
  available: {
    bg: "bg-status-available-bg hover:bg-status-available/25",
    icon: Check,
    iconColor: "text-status-available",
    label: "Available",
  },
  occupied: {
    bg: "bg-status-occupied-bg hover:bg-status-occupied/25",
    icon: User,
    iconColor: "text-status-occupied",
    label: "Occupied",
  },
  reserved: {
    bg: "bg-status-reserved-bg hover:bg-status-reserved/25",
    icon: Briefcase,
    iconColor: "text-status-reserved",
    label: "Bag Detected",
  },
};

const BenchSeat = ({
  seat,
  highlighted,
  isLast,
  flip,
}: {
  seat: Seat;
  highlighted: boolean;
  isLast: boolean;
  flip?: boolean;
}) => {
  const config = statusConfig[seat.status];
  const Icon = config.icon;
  const prevStatus = useRef(seat.status);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prevStatus.current !== seat.status && ref.current) {
      ref.current.classList.add("seat-flip");
      const timer = setTimeout(() => ref.current?.classList.remove("seat-flip"), 500);
      prevStatus.current = seat.status;
      return () => clearTimeout(timer);
    }
  }, [seat.status]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          ref={ref}
          className={`
            flex-1 flex flex-col items-center justify-center gap-1 py-3 px-1
            cursor-pointer transition-all duration-300
            ${config.bg}
            ${!isLast ? "border-r border-border/40" : ""}
            ${highlighted ? "ring-inset ring-2 ring-primary z-10" : ""}
            ${flip ? "flex-col-reverse" : ""}
          `}
        >
          <Icon className={`h-3.5 w-3.5 ${config.iconColor}`} />
          <span className="text-[9px] font-semibold text-muted-foreground leading-none">
            {seat.id.split("-").pop()}
          </span>
        </div>
      </TooltipTrigger>
      <TooltipContent className="glass-card-elevated border-border/50 p-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold text-foreground">Seat {seat.id}</span>
          <span className="text-[10px] text-muted-foreground">{config.label}</span>
          <span className="text-[10px] text-muted-foreground">Updated: {seat.lastUpdated}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

const BenchRow = ({ seats, rowIndex, searchQuery = "" }: BenchRowProps) => {
  const highlight = (seat: Seat) =>
    !!searchQuery && seat.id.toLowerCase().includes(searchQuery.toLowerCase());

  // Split seats in half — top row and bottom row
  const half = Math.ceil(seats.length / 2);
  const topSeats = seats.slice(0, half);
  const bottomSeats = seats.slice(half);

  return (
    <div className="flex flex-col gap-0">
      {/* Table label */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[10px] font-semibold text-muted-foreground/70 uppercase tracking-wider">
          Table {rowIndex + 1}
        </span>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      {/* Top row of seats (facing down toward table) */}
      <div className="flex rounded-t-xl border border-b-0 border-border/40 overflow-hidden shadow-sm">
        {topSeats.map((seat, i) => (
          <BenchSeat
            key={seat.id}
            seat={seat}
            highlighted={highlight(seat)}
            isLast={i === topSeats.length - 1}
            flip={false}
          />
        ))}
      </div>

      {/* Table surface */}
      <div className="h-4 bg-border/25 border-x border-border/40 flex items-center justify-center">
        <div className="h-px w-[90%] bg-border/40" />
      </div>

      {/* Bottom row of seats (facing up toward table) */}
      <div className="flex rounded-b-xl border border-t-0 border-border/40 overflow-hidden shadow-sm">
        {bottomSeats.map((seat, i) => (
          <BenchSeat
            key={seat.id}
            seat={seat}
            highlighted={highlight(seat)}
            isLast={i === bottomSeats.length - 1}
            flip={true}
          />
        ))}
      </div>

      {/* Table legs */}
      <div className="flex justify-between px-6 mt-0.5">
        <div className="w-1 h-2 bg-border/40 rounded-b" />
        <div className="w-1 h-2 bg-border/40 rounded-b" />
      </div>
    </div>
  );
};

export default BenchRow;

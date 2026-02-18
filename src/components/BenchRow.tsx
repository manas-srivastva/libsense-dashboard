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
    bg: "bg-status-available-bg hover:bg-status-available/20",
    border: "border-status-available/30",
    icon: Check,
    iconColor: "text-status-available",
    label: "Available",
  },
  occupied: {
    bg: "bg-status-occupied-bg hover:bg-status-occupied/20",
    border: "border-status-occupied/30",
    icon: User,
    iconColor: "text-status-occupied",
    label: "Occupied",
  },
  reserved: {
    bg: "bg-status-reserved-bg hover:bg-status-reserved/20",
    border: "border-status-reserved/30",
    icon: Briefcase,
    iconColor: "text-status-reserved",
    label: "Bag Detected",
  },
};

const BenchSeat = ({
  seat,
  highlighted,
  isFirst,
  isLast,
}: {
  seat: Seat;
  highlighted: boolean;
  isFirst: boolean;
  isLast: boolean;
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
            flex-1 flex flex-col items-center justify-center gap-1.5 py-4 px-2
            cursor-pointer transition-all duration-300
            ${config.bg}
            ${!isLast ? "border-r border-border/40" : ""}
            ${highlighted ? "ring-inset ring-2 ring-primary z-10" : ""}
          `}
        >
          <Icon className={`h-4 w-4 ${config.iconColor}`} />
          <span className="text-[10px] font-semibold text-muted-foreground">
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

  return (
    <div className="flex flex-col gap-0">
      {/* Table surface */}
      <div className="h-2 rounded-t-xl bg-border/40 border border-border/30 border-b-0 mx-1" />
      <div className="flex rounded-b-xl border border-border/40 overflow-hidden shadow-sm">
        {seats.map((seat, i) => (
          <BenchSeat
            key={seat.id}
            seat={seat}
            highlighted={highlight(seat)}
            isFirst={i === 0}
            isLast={i === seats.length - 1}
          />
        ))}
      </div>
      <div className="flex justify-between px-4">
        <div className="w-0.5 h-2 bg-border/50 rounded-b" />
        <div className="w-0.5 h-2 bg-border/50 rounded-b" />
      </div>
      <p className="text-[10px] text-muted-foreground/60 text-center mt-0.5">Table {rowIndex + 1}</p>
    </div>
  );
};

export default BenchRow;

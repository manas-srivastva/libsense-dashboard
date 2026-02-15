import SeatCard from "./SeatCard";
import type { Seat } from "@/lib/mockData";

interface SeatGridProps {
  seats: Seat[];
  activeZone: string;
  searchQuery?: string;
}

const SeatGrid = ({ seats, activeZone, searchQuery = "" }: SeatGridProps) => {
  const filtered = seats.filter((s) => {
    if (activeZone === "all") return true;
    return s.zone === activeZone;
  });

  // Group by zone
  const grouped = filtered.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.zone]) acc[seat.zone] = [];
    acc[seat.zone].push(seat);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-8">
      {Object.entries(grouped).map(([zone, zoneSeats], groupIdx) => (
        <div
          key={zone}
          className="animate-fade-in"
          style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-sm font-semibold text-foreground">{zone}</h3>
            <span className="text-[10px] text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
              {zoneSeats.length} seats
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2.5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">
            {zoneSeats.map((seat, i) => (
              <div
                key={seat.id}
                className="animate-scale-in"
                style={{ animationDelay: `${groupIdx * 80 + i * 20}ms`, animationFillMode: "both" }}
              >
                <SeatCard
                  seat={seat}
                  highlighted={!!searchQuery && seat.id.toLowerCase().includes(searchQuery.toLowerCase())}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;

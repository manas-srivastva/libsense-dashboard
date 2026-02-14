import SeatCard from "./SeatCard";
import type { Seat } from "@/lib/mockData";

interface SeatGridProps {
  seats: Seat[];
  activeZone: string;
}

const SeatGrid = ({ seats, activeZone }: SeatGridProps) => {
  const filtered = seats.filter((s) => {
    if (activeZone === "all") return true;
    if (activeZone === "Quiet Zones") return s.floor === "Quiet Zones";
    return s.floor === activeZone;
  });

  // Group by zone
  const grouped = filtered.reduce<Record<string, Seat[]>>((acc, seat) => {
    const key = `${seat.floor} · Zone ${seat.zone}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(seat);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      {Object.entries(grouped).map(([zone, zoneSeats]) => (
        <div key={zone}>
          <h3 className="mb-3 text-sm font-semibold text-foreground">{zone}</h3>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8">
            {zoneSeats.map((seat) => (
              <SeatCard key={seat.id} seat={seat} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SeatGrid;

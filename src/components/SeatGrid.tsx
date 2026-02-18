import SeatCard from "./SeatCard";
import CubicleCard from "./CubicleCard";
import ComputerStationCard from "./ComputerStationCard";
import BenchRow from "./BenchRow";
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

  const grouped = filtered.reduce<Record<string, Seat[]>>((acc, seat) => {
    if (!acc[seat.zone]) acc[seat.zone] = [];
    acc[seat.zone].push(seat);
    return acc;
  }, {});

  const renderZone = (zone: string, zoneSeats: Seat[], groupIdx: number) => {
    const highlight = (seat: Seat) =>
      !!searchQuery && seat.id.toLowerCase().includes(searchQuery.toLowerCase());

    if (zone === "Zone A") {
      // Cubicles: 1 seat each in individual partitioned boxes
      return (
        <div
          key={zone}
          className="animate-fade-in"
          style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
        >
          <ZoneHeader zone={zone} count={zoneSeats.length} subtitle="Private cubicles · 1 seat each" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {zoneSeats.map((seat, i) => (
              <div
                key={seat.id}
                className="animate-scale-in"
                style={{ animationDelay: `${groupIdx * 80 + i * 25}ms`, animationFillMode: "both" }}
              >
                <CubicleCard seat={seat} highlighted={highlight(seat)} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (zone === "Zone B") {
      // Long bench tables: groups of 6 seats in a row
      const rowSize = 6;
      const rows: Seat[][] = [];
      for (let i = 0; i < zoneSeats.length; i += rowSize) {
        rows.push(zoneSeats.slice(i, i + rowSize));
      }
      return (
        <div
          key={zone}
          className="animate-fade-in"
          style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
        >
          <ZoneHeader zone={zone} count={zoneSeats.length} subtitle="Long shared tables · 6 seats per table" />
          <div className="flex flex-col gap-5">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="animate-scale-in"
                style={{ animationDelay: `${groupIdx * 80 + rowIdx * 60}ms`, animationFillMode: "both" }}
              >
                <BenchRow seats={row} rowIndex={rowIdx} searchQuery={searchQuery} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (zone === "Zone C") {
      // Computer stations: each seat is a station with a divider
      const stationsPerRow = 4;
      const rows: Seat[][] = [];
      for (let i = 0; i < zoneSeats.length; i += stationsPerRow) {
        rows.push(zoneSeats.slice(i, i + stationsPerRow));
      }
      return (
        <div
          key={zone}
          className="animate-fade-in"
          style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
        >
          <ZoneHeader zone={zone} count={zoneSeats.length} subtitle="Computer stations · divided desks" />
          <div className="flex flex-col gap-4">
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className="animate-scale-in flex gap-0 rounded-2xl border border-border/50 overflow-hidden bg-secondary/30"
                style={{ animationDelay: `${groupIdx * 80 + rowIdx * 60}ms`, animationFillMode: "both" }}
              >
                {row.map((seat, i) => (
                  <div
                    key={seat.id}
                    className={`flex-1 ${i < row.length - 1 ? "border-r border-border/60" : ""}`}
                  >
                    <ComputerStationCard seat={seat} highlighted={highlight(seat)} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Quiet Zone: standard grid
    return (
      <div
        key={zone}
        className="animate-fade-in"
        style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
      >
        <ZoneHeader zone={zone} count={zoneSeats.length} subtitle="Silent study · no talking" />
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 md:grid-cols-6">
          {zoneSeats.map((seat, i) => (
            <div
              key={seat.id}
              className="animate-scale-in"
              style={{ animationDelay: `${groupIdx * 80 + i * 20}ms`, animationFillMode: "both" }}
            >
              <SeatCard
                seat={seat}
                highlighted={highlight(seat)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-10">
      {Object.entries(grouped).map(([zone, zoneSeats], groupIdx) =>
        renderZone(zone, zoneSeats, groupIdx)
      )}
    </div>
  );
};

const ZoneHeader = ({
  zone,
  count,
  subtitle,
}: {
  zone: string;
  count: number;
  subtitle: string;
}) => (
  <div className="flex flex-col gap-0.5 mb-4">
    <div className="flex items-center gap-2">
      <h3 className="text-sm font-semibold text-foreground">{zone}</h3>
      <span className="text-[10px] text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
        {count} seats
      </span>
    </div>
    <p className="text-[11px] text-muted-foreground">{subtitle}</p>
  </div>
);

export default SeatGrid;

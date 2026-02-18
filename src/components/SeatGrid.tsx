import SeatCard from "./SeatCard";
import CubicleCard from "./CubicleCard";
import ComputerStationCard from "./ComputerStationCard";
import BenchRow from "./BenchRow";
import Bookshelf from "./Bookshelf";
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

  const highlight = (seat: Seat) =>
    !!searchQuery && seat.id.toLowerCase().includes(searchQuery.toLowerCase());

  const renderZoneContent = (zone: string, zoneSeats: Seat[], groupIdx: number) => {
    if (zone === "Zone A") {
      return (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4">
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
      );
    }

    if (zone === "Zone B") {
      const rowSize = 6;
      const rows: Seat[][] = [];
      for (let i = 0; i < zoneSeats.length; i += rowSize) {
        rows.push(zoneSeats.slice(i, i + rowSize));
      }
      return (
        <div className="flex flex-col gap-4">
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
      );
    }

    if (zone === "Zone C") {
      const stationsPerRow = 4;
      const rows: Seat[][] = [];
      for (let i = 0; i < zoneSeats.length; i += stationsPerRow) {
        rows.push(zoneSeats.slice(i, i + stationsPerRow));
      }
      return (
        <div className="flex flex-col gap-3">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="animate-scale-in flex gap-0 rounded-xl border border-border/50 overflow-hidden bg-secondary/30"
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
      );
    }

    // Quiet Zone
    return (
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
        {zoneSeats.map((seat, i) => (
          <div
            key={seat.id}
            className="animate-scale-in"
            style={{ animationDelay: `${groupIdx * 80 + i * 20}ms`, animationFillMode: "both" }}
          >
            <SeatCard seat={seat} highlighted={highlight(seat)} />
          </div>
        ))}
      </div>
    );
  };

  const entries = Object.entries(grouped);

  // When showing all zones, pair them side-by-side with bookshelves between
  if (activeZone === "all" && entries.length > 0) {
    // Split into pairs: [Zone A + Zone B] | [Zone C + Quiet Zone]
    const pairs: Array<[string, Seat[]][]> = [];
    for (let i = 0; i < entries.length; i += 2) {
      pairs.push(entries.slice(i, i + 2) as [string, Seat[]][]);
    }

    return (
      <div className="flex flex-col gap-6">
        {pairs.map((pair, pairIdx) => (
          <div key={pairIdx} className="flex flex-col gap-4">
            {/* Two-column zone row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl border border-border/40 overflow-hidden">
              {pair.map(([zone, zoneSeats], colIdx) => {
                const globalIdx = pairIdx * 2 + colIdx;
                const subtitles: Record<string, string> = {
                  "Zone A": "Private cubicles · 1 seat each",
                  "Zone B": "Long shared tables · 6 seats/table",
                  "Zone C": "Computer stations · divided desks",
                  "Quiet Zone": "Silent study · no talking",
                };
                return (
                  <div
                    key={zone}
                    className={`p-4 animate-fade-in ${colIdx === 0 && pair.length > 1 ? "lg:border-r border-border/40" : ""}`}
                    style={{ animationDelay: `${globalIdx * 80}ms`, animationFillMode: "both" }}
                  >
                    <ZoneHeader zone={zone} count={zoneSeats.length} subtitle={subtitles[zone] ?? ""} />
                    {renderZoneContent(zone, zoneSeats, globalIdx)}
                  </div>
                );
              })}
            </div>

            {/* Bookshelf divider between pairs */}
            {pairIdx < pairs.length - 1 && (
              <Bookshelf seed={pairIdx} label="Bookshelf" />
            )}
          </div>
        ))}
      </div>
    );
  }

  // Single zone filter view
  return (
    <div className="flex flex-col gap-8">
      {entries.map(([zone, zoneSeats], groupIdx) => {
        const subtitles: Record<string, string> = {
          "Zone A": "Private cubicles · 1 seat each",
          "Zone B": "Long shared tables · 6 seats/table",
          "Zone C": "Computer stations · divided desks",
          "Quiet Zone": "Silent study · no talking",
        };
        return (
          <div
            key={zone}
            className="animate-fade-in"
            style={{ animationDelay: `${groupIdx * 80}ms`, animationFillMode: "both" }}
          >
            <ZoneHeader zone={zone} count={zoneSeats.length} subtitle={subtitles[zone] ?? ""} />
            {renderZoneContent(zone, zoneSeats, groupIdx)}
          </div>
        );
      })}
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
  <div className="flex flex-col gap-0.5 mb-3">
    <div className="flex items-center gap-2">
      <h3 className="text-xs font-semibold text-foreground">{zone}</h3>
      <span className="text-[9px] text-muted-foreground bg-secondary rounded-full px-1.5 py-0.5">
        {count} seats
      </span>
    </div>
    <p className="text-[10px] text-muted-foreground">{subtitle}</p>
  </div>
);

export default SeatGrid;

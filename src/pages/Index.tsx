import { useState, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { allSeats, simulateUpdate } from "@/lib/mockData";
import DashboardHeader from "@/components/DashboardHeader";
import StatsBar from "@/components/StatsBar";
import SeatGrid from "@/components/SeatGrid";
import FloorFilter from "@/components/FloorFilter";
import Legend from "@/components/Legend";

const Index = () => {
  const [seats, setSeats] = useState(allSeats);
  const [activeFloor, setActiveFloor] = useState("all");

  const handleSimulate = useCallback(() => {
    setSeats((prev) => simulateUpdate(prev));
  }, []);

  const filteredForStats = activeFloor === "all"
    ? seats
    : activeFloor === "Quiet Zones"
    ? seats.filter((s) => s.floor === "Quiet Zones")
    : seats.filter((s) => s.floor === activeFloor);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <StatsBar seats={filteredForStats} />

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-56 shrink-0 flex flex-col gap-4">
            <FloorFilter active={activeFloor} onChange={setActiveFloor} />

            <button
              onClick={handleSimulate}
              className="glass-card-elevated flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-accent transition-colors duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Simulate Update
            </button>

            <div className="glass-card-elevated p-4 lg:block hidden">
              <Legend />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 glass-card-elevated p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Seat Map</h2>
              <div className="lg:hidden">
                <Legend />
              </div>
            </div>
            <SeatGrid seats={seats} activeZone={activeFloor} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;

import { useState, useCallback } from "react";
import { RefreshCw, Search } from "lucide-react";
import { allSeats, simulateUpdate } from "@/lib/mockData";
import DashboardHeader from "@/components/DashboardHeader";
import StatsBar from "@/components/StatsBar";
import SeatGrid from "@/components/SeatGrid";
import ZoneFilter from "@/components/FloorFilter";
import Legend from "@/components/Legend";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [seats, setSeats] = useState(allSeats);
  const [activeZone, setActiveZone] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSimulate = useCallback(() => {
    setSeats((prev) => simulateUpdate(prev));
  }, []);

  const filteredForStats = activeZone === "all"
    ? seats
    : seats.filter((s) => s.zone === activeZone);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <StatsBar seats={filteredForStats} />

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full lg:w-60 shrink-0 flex flex-col gap-4 animate-fade-in">
            <ZoneFilter active={activeZone} onChange={setActiveZone} />

            <button
              onClick={handleSimulate}
              className="glass-card-elevated flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-primary hover:bg-accent active:scale-[0.98] transition-all duration-200"
            >
              <RefreshCw className="h-4 w-4" />
              Simulate Update
            </button>

            <div className="glass-card-elevated p-4 lg:block hidden">
              <Legend />
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1 glass-card-elevated p-6">
            <div className="flex flex-col gap-4 mb-5 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-semibold text-foreground">Seat Map</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search seat ID…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-8 w-44 pl-8 text-xs"
                  />
                </div>
                <div className="lg:hidden">
                  <Legend />
                </div>
              </div>
            </div>
            <SeatGrid seats={seats} activeZone={activeZone} searchQuery={searchQuery} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;

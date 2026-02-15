export type SeatStatus = "available" | "occupied" | "reserved";

export interface Seat {
  id: string;
  status: SeatStatus;
  lastUpdated: string;
  zone: string;
}

const statuses: SeatStatus[] = ["available", "occupied", "reserved"];

function randomStatus(): SeatStatus {
  const r = Math.random();
  if (r < 0.3) return "available";
  if (r < 0.8) return "occupied";
  return "reserved";
}

function generateSeats(zone: string, prefix: string, count: number): Seat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, "0")}`,
    status: randomStatus(),
    lastUpdated: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    zone,
  }));
}

export const zones = [
  { id: "Zone A", label: "Zone A", description: "Open study area" },
  { id: "Zone B", label: "Zone B", description: "Group collaboration" },
  { id: "Zone C", label: "Zone C", description: "Computer stations" },
  { id: "Quiet Zone", label: "Quiet Zone", description: "Silent study" },
];

export const allSeats: Seat[] = [
  ...generateSeats("Zone A", "A", 24),
  ...generateSeats("Zone B", "B", 20),
  ...generateSeats("Zone C", "C", 18),
  ...generateSeats("Quiet Zone", "Q", 12),
];

export function simulateUpdate(seats: Seat[]): Seat[] {
  const updated = [...seats];
  const count = Math.floor(Math.random() * 6) + 3;
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * updated.length);
    const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
    updated[idx] = {
      ...updated[idx],
      status: newStatus,
      lastUpdated: new Date().toLocaleTimeString(),
    };
  }
  return updated;
}

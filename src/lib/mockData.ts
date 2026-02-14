export type SeatStatus = "available" | "occupied" | "reserved";

export interface Seat {
  id: string;
  status: SeatStatus;
  lastUpdated: string;
  zone: string;
  floor: string;
}

const statuses: SeatStatus[] = ["available", "occupied", "reserved"];

function randomStatus(): SeatStatus {
  const r = Math.random();
  if (r < 0.3) return "available";
  if (r < 0.8) return "occupied";
  return "reserved";
}

function generateSeats(zone: string, floor: string, count: number): Seat[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `${floor}-${zone}-${String(i + 1).padStart(2, "0")}`,
    status: randomStatus(),
    lastUpdated: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
    zone,
    floor,
  }));
}

export const allSeats: Seat[] = [
  ...generateSeats("A", "Floor 1", 24),
  ...generateSeats("B", "Floor 1", 20),
  ...generateSeats("A", "Floor 2", 18),
  ...generateSeats("B", "Floor 2", 16),
  ...generateSeats("Quiet", "Quiet Zones", 12),
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

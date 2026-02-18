const BOOK_COLORS = [
  "bg-red-300/70",
  "bg-amber-300/70",
  "bg-green-300/70",
  "bg-blue-300/70",
  "bg-purple-300/70",
  "bg-pink-300/70",
  "bg-teal-300/70",
  "bg-orange-300/70",
  "bg-yellow-300/70",
  "bg-cyan-300/70",
  "bg-indigo-300/70",
  "bg-lime-300/70",
];

const BOOK_WIDTHS = ["w-3", "w-2.5", "w-4", "w-2", "w-3.5", "w-2", "w-3", "w-4", "w-2.5", "w-3", "w-2", "w-3.5"];

interface BookshelfProps {
  seed?: number;
  label?: string;
}

const Bookshelf = ({ seed = 0, label = "Bookshelf" }: BookshelfProps) => {
  // Deterministic pseudo-random based on seed
  const books = Array.from({ length: 18 }, (_, i) => ({
    color: BOOK_COLORS[(i + seed * 3) % BOOK_COLORS.length],
    width: BOOK_WIDTHS[(i + seed * 5) % BOOK_WIDTHS.length],
    height: 28 + ((i * 7 + seed * 11) % 16), // 28–43px range
  }));

  return (
    <div className="relative flex flex-col items-stretch my-1">
      {/* Label */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex-1 h-px bg-border/30" />
        <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground/50 px-2">
          {label}
        </span>
        <div className="flex-1 h-px bg-border/30" />
      </div>

      {/* Shelf unit */}
      <div className="relative rounded-lg border border-border/40 bg-secondary/20 px-3 py-2 overflow-hidden">
        {/* Back panel texture */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 8px, hsl(var(--border)) 8px, hsl(var(--border)) 8.5px)",
          }}
        />

        {/* Books row */}
        <div className="relative flex items-end gap-0.5 h-11 overflow-hidden">
          {books.map((book, i) => (
            <div
              key={i}
              className={`${book.color} ${book.width} rounded-t-sm border border-white/20 flex-shrink-0 transition-none`}
              style={{ height: `${book.height}px` }}
            />
          ))}
          {/* Extra filler books to fill width */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`fill-${i}`}
              className={`${BOOK_COLORS[(i + seed * 2) % BOOK_COLORS.length]} w-3 rounded-t-sm border border-white/20 flex-shrink-0`}
              style={{ height: `${28 + ((i * 13 + seed * 7) % 16)}px` }}
            />
          ))}
        </div>

        {/* Shelf plank */}
        <div className="h-2 bg-amber-800/40 border border-amber-900/20 rounded-sm mt-0" />
      </div>
    </div>
  );
};

export default Bookshelf;

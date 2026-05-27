import type { Metadata } from "next";
import Link from "next/link";
import type { TableStatus, GameType } from "../../lib/types";

export const metadata: Metadata = { title: "Tables — SnookX Management" };

/* ── Mock data ──────────────────────────────────────────────────────────────── */
interface MockTable {
  id: string;
  tableNumber: string;
  tableName: string;
  gameType: GameType;
  pricePerHour: number;
  status: TableStatus;
  customer?: string;
  since?: string;
  sessionsToday: number;
  earningsToday: number;
}

const tables: MockTable[] = [
  { id: "1",  tableNumber: "T-01", tableName: "Championship 1",  gameType: "SNOOKER",   pricePerHour: 120, status: "OCCUPIED",  customer: "Rahul M.",  since: "2h 14m", sessionsToday: 4, earningsToday: 620 },
  { id: "2",  tableNumber: "T-02", tableName: "Championship 2",  gameType: "SNOOKER",   pricePerHour: 120, status: "OCCUPIED",  customer: "Amit K.",   since: "0h 45m", sessionsToday: 3, earningsToday: 480 },
  { id: "3",  tableNumber: "T-03", tableName: "Pro Snooker 3",   gameType: "SNOOKER",   pricePerHour: 100, status: "AVAILABLE", sessionsToday: 5, earningsToday: 700 },
  { id: "4",  tableNumber: "T-04", tableName: "Pro Snooker 4",   gameType: "SNOOKER",   pricePerHour: 100, status: "OCCUPIED",  customer: "Vishal P.", since: "1h 30m", sessionsToday: 2, earningsToday: 380 },
  { id: "5",  tableNumber: "T-05", tableName: "English Pool 1",  gameType: "POOL",      pricePerHour: 80,  status: "AVAILABLE", sessionsToday: 6, earningsToday: 540 },
  { id: "6",  tableNumber: "T-06", tableName: "English Pool 2",  gameType: "POOL",      pricePerHour: 80,  status: "OCCUPIED",  customer: "Karan S.",  since: "0h 20m", sessionsToday: 4, earningsToday: 390 },
  { id: "7",  tableNumber: "T-07", tableName: "American Pool 1", gameType: "POOL",      pricePerHour: 90,  status: "AVAILABLE", sessionsToday: 3, earningsToday: 320 },
  { id: "8",  tableNumber: "T-08", tableName: "American Pool 2", gameType: "POOL",      pricePerHour: 90,  status: "OCCUPIED",  customer: "Rohan D.",  since: "1h 05m", sessionsToday: 5, earningsToday: 510 },
  { id: "9",  tableNumber: "T-09", tableName: "Billiards 1",     gameType: "BILLIARDS", pricePerHour: 70,  status: "AVAILABLE", sessionsToday: 2, earningsToday: 180 },
  { id: "10", tableNumber: "T-10", tableName: "Billiards 2",     gameType: "BILLIARDS", pricePerHour: 70,  status: "OCCUPIED",  customer: "Priya V.",  since: "3h 00m", sessionsToday: 3, earningsToday: 280 },
  { id: "11", tableNumber: "T-11", tableName: "VIP Snooker 1",   gameType: "SNOOKER",   pricePerHour: 160, status: "AVAILABLE", sessionsToday: 2, earningsToday: 400 },
  { id: "12", tableNumber: "T-12", tableName: "VIP Snooker 2",   gameType: "SNOOKER",   pricePerHour: 160, status: "OCCUPIED",  customer: "Dev N.",    since: "0h 55m", sessionsToday: 1, earningsToday: 220 },
];

const occupied  = tables.filter((t) => t.status === "OCCUPIED").length;
const available = tables.filter((t) => t.status === "AVAILABLE").length;

const gameTypeLabel: Record<GameType, string> = {
  SNOOKER:   "Snooker",
  POOL:      "Pool",
  BILLIARDS: "Billiards",
};

const gameTypeBadge: Record<GameType, string> = {
  SNOOKER:   "bg-green-900/30  border-green-800/40  text-green-400",
  POOL:      "bg-blue-900/30   border-blue-800/40   text-blue-400",
  BILLIARDS: "bg-purple-900/30 border-purple-800/40 text-purple-400",
};

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function TablesPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Game Tables</h2>
          <p className="text-sm text-slate-500 mt-0.5">Monitor and manage all tables in real-time.</p>
        </div>
        {/* Add table button (UI only) */}
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-700 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
          </svg>
          Add Table
        </button>
      </div>

      {/* Summary chips */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1520]/70 border border-[#1e3048]">
          <span className="w-2 h-2 rounded-full bg-slate-500"/>
          <span className="text-sm text-slate-400">Total: <span className="text-slate-200 font-semibold">{tables.length}</span></span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-900/20 border border-green-800/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
          <span className="text-sm text-green-400">Occupied: <span className="font-semibold">{occupied}</span></span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d1520]/70 border border-[#1e3048]">
          <span className="w-2 h-2 rounded-full bg-slate-400"/>
          <span className="text-sm text-slate-400">Available: <span className="text-slate-200 font-semibold">{available}</span></span>
        </div>
      </div>

      {/* Tables grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Link
            key={table.id}
            href={`/manage/tables/${table.id}`}
            className={`group rounded-2xl border p-5 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-black/30 ${
              table.status === "OCCUPIED"
                ? "bg-green-900/10 border-green-800/40 hover:border-green-700/60"
                : "bg-[#0d1520]/70 border-[#1e3048] hover:border-[#2a4060]"
            }`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 tracking-wider">{table.tableNumber}</span>
                <p className="font-semibold text-slate-200 mt-0.5 leading-tight">{table.tableName}</p>
              </div>
              <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                table.status === "OCCUPIED" ? "bg-green-400 animate-pulse" : "bg-slate-600"
              }`}/>
            </div>

            {/* Game type badge */}
            <span className={`self-start px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${gameTypeBadge[table.gameType]}`}>
              {gameTypeLabel[table.gameType]}
            </span>

            {/* Session info */}
            <div className="text-sm">
              {table.status === "OCCUPIED" ? (
                <>
                  <p className="text-green-400 font-medium truncate">{table.customer}</p>
                  <p className="text-slate-500 text-xs mt-0.5">Active · {table.since}</p>
                </>
              ) : (
                <p className="text-slate-600 text-xs">No active session</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#1e3048]">
              <span className="text-xs text-slate-600">₹{table.pricePerHour}/hr</span>
              <span className="text-xs text-slate-500">{table.sessionsToday} sessions today</span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}

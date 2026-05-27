import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { TableStatus, GameType, PaymentMethod } from "../../../lib/types";

export const metadata: Metadata = { title: "Table Detail — SnookX Management" };

/* ── Mock data ──────────────────────────────────────────────────────────────── */
interface MockSession {
  id: string;
  customer: string;
  phone: string;
  start: string;
  end: string;
  duration: string;
  amount: number;
  method: PaymentMethod;
  date: string;
}

interface MockTableDetail {
  id: string;
  tableNumber: string;
  tableName: string;
  gameType: GameType;
  pricePerHour: number;
  status: TableStatus;
  customer?: string;
  customerPhone?: string;
  since?: string;
  durationMin?: number;
  estimatedBill?: number;
  isActive: boolean;
  createdAt: string;
  sessions: MockSession[];
}

const tableData: Record<string, MockTableDetail> = {
  "1": {
    id: "1", tableNumber: "T-01", tableName: "Championship 1", gameType: "SNOOKER",
    pricePerHour: 120, status: "OCCUPIED", customer: "Rahul M.", customerPhone: "+91 98765 43210",
    since: "2:14 PM", durationMin: 134, estimatedBill: 268, isActive: true, createdAt: "2025-01-10",
    sessions: [
      { id: "s1", customer: "Rahul M.",  phone: "+91 98765 43210", start: "12:00 PM", end: "2:00 PM",  duration: "2h 00m", amount: 240, method: "CASH",   date: "Today" },
      { id: "s2", customer: "Suresh B.", phone: "+91 87654 32109", start: "10:00 AM", end: "11:30 AM", duration: "1h 30m", amount: 180, method: "ONLINE", date: "Today" },
      { id: "s3", customer: "Ajay K.",   phone: "+91 76543 21098", start: "3:00 PM",  end: "5:00 PM",  duration: "2h 00m", amount: 240, method: "CASH",   date: "Yesterday" },
      { id: "s4", customer: "Nikhil P.", phone: "+91 65432 10987", start: "1:00 PM",  end: "3:30 PM",  duration: "2h 30m", amount: 300, method: "CASH",   date: "26 May" },
      { id: "s5", customer: "Vishal D.", phone: "+91 54321 09876", start: "11:00 AM", end: "1:00 PM",  duration: "2h 00m", amount: 240, method: "ONLINE", date: "25 May" },
    ],
  },
  "2": {
    id: "2", tableNumber: "T-02", tableName: "Championship 2", gameType: "SNOOKER",
    pricePerHour: 120, status: "OCCUPIED", customer: "Amit K.", customerPhone: "+91 91234 56789",
    since: "3:43 PM", durationMin: 45, estimatedBill: 90, isActive: true, createdAt: "2025-01-10",
    sessions: [
      { id: "s1", customer: "Amit K.",   phone: "+91 91234 56789", start: "3:43 PM", end: "—",       duration: "Active",  amount: 0,   method: "CASH",   date: "Today" },
      { id: "s2", customer: "Pooja S.",  phone: "+91 80123 45678", start: "1:00 PM", end: "3:00 PM", duration: "2h 00m", amount: 240, method: "ONLINE", date: "Today" },
    ],
  },
};

// For IDs not in our mock, generate a minimal stub so every link works
function getTable(id: string): MockTableDetail {
  if (tableData[id]) return tableData[id];
  const num = parseInt(id, 10);
  if (isNaN(num) || num < 1 || num > 12) notFound();
  return {
    id,
    tableNumber: `T-${String(num).padStart(2, "0")}`,
    tableName: `Table ${num}`,
    gameType: num % 3 === 0 ? "BILLIARDS" : num % 2 === 0 ? "POOL" : "SNOOKER",
    pricePerHour: 100,
    status: "AVAILABLE",
    isActive: true,
    createdAt: "2025-01-10",
    sessions: [],
  };
}

const gameTypeBadge: Record<GameType, string> = {
  SNOOKER:   "bg-green-900/30  border-green-800/40  text-green-400",
  POOL:      "bg-blue-900/30   border-blue-800/40   text-blue-400",
  BILLIARDS: "bg-purple-900/30 border-purple-800/40 text-purple-400",
};

/* ── Component ──────────────────────────────────────────────────────────────── */
export default async function TableDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const table = getTable(id);

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Back link */}
      <Link
        href="/manage/tables"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Tables
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-bold text-slate-100">{table.tableName}</h2>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${gameTypeBadge[table.gameType]}`}>
              {table.gameType}
            </span>
            <span className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              table.status === "OCCUPIED"
                ? "bg-green-900/30 border-green-800/40 text-green-400"
                : "bg-[#1e3048]/40 border-[#1e3048] text-slate-500"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${table.status === "OCCUPIED" ? "bg-green-400 animate-pulse" : "bg-slate-600"}`}/>
              {table.status === "OCCUPIED" ? "Occupied" : "Available"}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-1">{table.tableNumber} · ₹{table.pricePerHour}/hr · Since {table.createdAt}</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-2 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-[#1e3048] transition-all">
            Edit
          </button>
          {table.status === "AVAILABLE" && (
            <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-green-700 hover:bg-green-600 text-white transition-colors">
              Start Session
            </button>
          )}
          {table.status === "OCCUPIED" && (
            <button className="px-4 py-2 rounded-xl text-sm font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-colors">
              Complete &amp; Bill
            </button>
          )}
        </div>
      </div>

      {/* Active session card */}
      {table.status === "OCCUPIED" && table.customer && (
        <div className="bg-green-900/15 border border-green-800/40 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
            <h3 className="font-semibold text-green-300">Active Session</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Customer</p>
              <p className="text-slate-200 font-medium">{table.customer}</p>
              <p className="text-xs text-slate-500 mt-0.5">{table.customerPhone}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Started</p>
              <p className="text-slate-200 font-medium">{table.since}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Duration</p>
              <p className="text-slate-200 font-medium">{table.durationMin} min</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 uppercase tracking-wider mb-1">Est. Bill</p>
              <p className="text-2xl font-bold text-green-400">₹{table.estimatedBill}</p>
            </div>
          </div>
        </div>
      )}

      {/* Session history */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl p-5">
        <h3 className="font-semibold text-slate-200 mb-4">Session History</h3>
        {table.sessions.length === 0 ? (
          <p className="text-slate-600 text-sm py-4 text-center">No sessions recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e3048]">
                  {["Date", "Customer", "Time", "Duration", "Method", "Amount"].map((h) => (
                    <th key={h} className="text-left pb-3 pr-4 text-xs font-semibold uppercase tracking-widest text-slate-600 last:text-right last:pr-0">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2a3a]">
                {table.sessions.map((s) => (
                  <tr key={s.id} className="hover:bg-white/2 transition-colors">
                    <td className="py-3 pr-4 text-slate-500 text-xs whitespace-nowrap">{s.date}</td>
                    <td className="py-3 pr-4">
                      <p className="text-slate-300 font-medium">{s.customer}</p>
                      <p className="text-slate-600 text-xs">{s.phone}</p>
                    </td>
                    <td className="py-3 pr-4 text-slate-400 text-xs whitespace-nowrap">{s.start} – {s.end}</td>
                    <td className="py-3 pr-4 text-slate-400 text-xs">{s.duration}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                        s.method === "CASH"
                          ? "bg-amber-900/30 border-amber-800/40 text-amber-400"
                          : "bg-blue-900/30 border-blue-800/40 text-blue-400"
                      }`}>
                        {s.method}
                      </span>
                    </td>
                    <td className="py-3 text-right font-semibold text-green-400">
                      {s.amount > 0 ? `₹${s.amount}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

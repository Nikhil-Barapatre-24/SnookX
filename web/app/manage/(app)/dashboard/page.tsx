import type { Metadata } from "next";
import type { TableStatus, GameType, PaymentMethod } from "../../lib/types";

export const metadata: Metadata = { title: "Dashboard — SnookX Management" };

/* ── Mock data ──────────────────────────────────────────────────────────────── */
const statCards = [
  {
    label: "Today's Earnings",
    value: "₹4,850",
    sub: "+12% vs yesterday",
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: "green",
  },
  {
    label: "Monthly Earnings",
    value: "₹1,12,400",
    sub: "+8% vs last month",
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
    ),
    color: "amber",
  },
  {
    label: "Tables Active",
    value: "7 / 12",
    sub: "5 available right now",
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
      </svg>
    ),
    color: "blue",
  },
  {
    label: "Sessions Today",
    value: "23",
    sub: "Avg. 68 min / session",
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
  green:  { bg: "bg-green-900/20",  border: "border-green-800/30",  text: "text-green-300",  icon: "text-green-400"  },
  amber:  { bg: "bg-amber-900/20",  border: "border-amber-800/30",  text: "text-amber-300",  icon: "text-amber-400"  },
  blue:   { bg: "bg-blue-900/20",   border: "border-blue-800/30",   text: "text-blue-300",   icon: "text-blue-400"   },
  purple: { bg: "bg-purple-900/20", border: "border-purple-800/30", text: "text-purple-300", icon: "text-purple-400" },
};

interface MockTable { id: string; number: string; name: string; type: GameType; status: TableStatus; since?: string; customer?: string }
const tables: MockTable[] = [
  { id: "1",  number: "T-01", name: "Championship 1",  type: "SNOOKER", status: "OCCUPIED", since: "2h 14m", customer: "Rahul M." },
  { id: "2",  number: "T-02", name: "Championship 2",  type: "SNOOKER", status: "OCCUPIED", since: "0h 45m", customer: "Amit K." },
  { id: "3",  number: "T-03", name: "Pro Snooker 3",   type: "SNOOKER", status: "AVAILABLE" },
  { id: "4",  number: "T-04", name: "Pro Snooker 4",   type: "SNOOKER", status: "OCCUPIED", since: "1h 30m", customer: "Vishal P." },
  { id: "5",  number: "T-05", name: "English Pool 1",  type: "POOL",    status: "AVAILABLE" },
  { id: "6",  number: "T-06", name: "English Pool 2",  type: "POOL",    status: "OCCUPIED", since: "0h 20m", customer: "Karan S." },
  { id: "7",  number: "T-07", name: "American Pool 1", type: "POOL",    status: "AVAILABLE" },
  { id: "8",  number: "T-08", name: "American Pool 2", type: "POOL",    status: "OCCUPIED", since: "1h 05m", customer: "Rohan D." },
  { id: "9",  number: "T-09", name: "Billiards 1",     type: "BILLIARDS", status: "AVAILABLE" },
  { id: "10", number: "T-10", name: "Billiards 2",     type: "BILLIARDS", status: "OCCUPIED", since: "3h 00m", customer: "Priya V." },
  { id: "11", number: "T-11", name: "VIP Snooker 1",   type: "SNOOKER", status: "AVAILABLE" },
  { id: "12", number: "T-12", name: "VIP Snooker 2",   type: "SNOOKER", status: "OCCUPIED", since: "0h 55m", customer: "Dev N." },
];

interface MockTx { id: string; txId: string; table: string; customer: string; amount: number; method: PaymentMethod; time: string }
const recentTx: MockTx[] = [
  { id: "1", txId: "TXN-20250527-001", table: "T-03", customer: "Suresh B.",  amount: 280, method: "CASH",   time: "Just now"  },
  { id: "2", txId: "TXN-20250527-002", table: "T-07", customer: "Ajay M.",    amount: 420, method: "ONLINE", time: "12 min ago" },
  { id: "3", txId: "TXN-20250527-003", table: "T-02", customer: "Nikhil R.",  amount: 350, method: "CASH",   time: "28 min ago" },
  { id: "4", txId: "TXN-20250527-004", table: "T-11", customer: "Pooja S.",   amount: 560, method: "ONLINE", time: "1h 02m ago" },
  { id: "5", txId: "TXN-20250527-005", table: "T-05", customer: "Ganesh K.", amount: 210, method: "CASH",   time: "1h 45m ago" },
];

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Good afternoon 👋</h2>
        <p className="text-sm text-slate-500 mt-0.5">Here's what's happening at SnookX today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const c = colorMap[card.color];
          return (
            <div
              key={card.label}
              className={`rounded-2xl border p-5 ${c.bg} ${c.border} flex flex-col gap-3`}
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{card.label}</p>
                <span className={c.icon}>{card.icon}</span>
              </div>
              <p className={`text-2xl font-bold ${c.text}`}>{card.value}</p>
              <p className="text-xs text-slate-600">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Table grid + Recent transactions */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Live table status */}
        <div className="xl:col-span-2 bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200">Live Table Status</h3>
            <a href="/manage/tables" className="text-xs text-green-400 hover:text-green-300 transition-colors">
              View all →
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tables.map((t) => (
              <div
                key={t.id}
                className={`rounded-xl border p-3 transition-all ${
                  t.status === "OCCUPIED"
                    ? "bg-green-900/20 border-green-800/40"
                    : "bg-[#060a0e]/60 border-[#1e3048]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-300">{t.number}</span>
                  <span className={`w-2 h-2 rounded-full ${t.status === "OCCUPIED" ? "bg-green-400 animate-pulse" : "bg-slate-600"}`}/>
                </div>
                <p className="text-[11px] text-slate-500 truncate mb-1">{t.name}</p>
                {t.status === "OCCUPIED" ? (
                  <>
                    <p className="text-[11px] text-green-400 font-medium truncate">{t.customer}</p>
                    <p className="text-[10px] text-slate-600 mt-0.5">{t.since}</p>
                  </>
                ) : (
                  <p className="text-[11px] text-slate-600">Available</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-200">Recent Transactions</h3>
            <a href="/manage/finance" className="text-xs text-green-400 hover:text-green-300 transition-colors">
              View all →
            </a>
          </div>
          <div className="flex-1 space-y-3">
            {recentTx.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 p-3 rounded-xl bg-[#060a0e]/50 border border-[#1e3048]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  tx.method === "CASH"
                    ? "bg-amber-900/30 text-amber-400 border border-amber-800/40"
                    : "bg-blue-900/30 text-blue-400 border border-blue-800/40"
                }`}>
                  {tx.method === "CASH" ? "₹" : "↗"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-300 truncate">{tx.customer}</p>
                  <p className="text-[11px] text-slate-600">{tx.table} · {tx.time}</p>
                </div>
                <span className="text-sm font-semibold text-green-400">₹{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick occupancy bar */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-200">Occupancy</h3>
          <span className="text-sm text-slate-400">
            <span className="text-green-400 font-bold">7</span> / 12 tables occupied
          </span>
        </div>
        <div className="w-full h-3 bg-[#1e3048] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full transition-all"
            style={{ width: `${(7 / 12) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-600">
          <span>0%</span>
          <span className="text-green-400 font-medium">58% occupied</span>
          <span>100%</span>
        </div>
      </div>

    </div>
  );
}

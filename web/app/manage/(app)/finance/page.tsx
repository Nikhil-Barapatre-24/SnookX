import type { Metadata } from "next";
import Link from "next/link";
import type { FinancePaymentMethod, PaymentStatus } from "../../lib/types";

export const metadata: Metadata = { title: "Finance — SnookX Management" };

/* ── Mock data ──────────────────────────────────────────────────────────────── */
interface MockTransaction {
  id: string;
  txId: string;
  customer: string;
  phone: string;
  table: string;
  date: string;
  duration: string;
  expected: number;
  actual: number;
  method: FinancePaymentMethod;
  status: PaymentStatus;
}

const transactions: MockTransaction[] = [
  { id: "1",  txId: "TXN-20250527-001", customer: "Rahul M.",   phone: "+91 98765 43210", table: "T-01", date: "27 May 2025", duration: "2h 14m", expected: 268, actual: 280,  method: "CASH",   status: "COMPLETED" },
  { id: "2",  txId: "TXN-20250527-002", customer: "Amit K.",    phone: "+91 91234 56789", table: "T-02", date: "27 May 2025", duration: "1h 30m", expected: 180, actual: 200,  method: "ONLINE", status: "COMPLETED" },
  { id: "3",  txId: "TXN-20250527-003", customer: "Vishal P.",  phone: "+91 87654 32109", table: "T-04", date: "27 May 2025", duration: "0h 45m", expected: 75,  actual: 75,   method: "CASH",   status: "COMPLETED" },
  { id: "4",  txId: "TXN-20250527-004", customer: "Karan S.",   phone: "+91 76543 21098", table: "T-06", date: "27 May 2025", duration: "1h 00m", expected: 80,  actual: 80,   method: "CASH",   status: "COMPLETED" },
  { id: "5",  txId: "TXN-20250527-005", customer: "Rohan D.",   phone: "+91 65432 10987", table: "T-08", date: "27 May 2025", duration: "2h 30m", expected: 225, actual: 250,  method: "ONLINE", status: "COMPLETED" },
  { id: "6",  txId: "TXN-20250527-006", customer: "Priya V.",   phone: "+91 54321 09876", table: "T-10", date: "27 May 2025", duration: "0h 30m", expected: 35,  actual: 30,   method: "CASH",   status: "PARTIAL"   },
  { id: "7",  txId: "TXN-20250527-007", customer: "Dev N.",     phone: "+91 43210 98765", table: "T-12", date: "27 May 2025", duration: "1h 15m", expected: 200, actual: 200,  method: "CARD",   status: "COMPLETED" },
  { id: "8",  txId: "TXN-20250526-008", customer: "Suresh B.",  phone: "+91 32109 87654", table: "T-03", date: "26 May 2025", duration: "3h 00m", expected: 300, actual: 300,  method: "CASH",   status: "COMPLETED" },
  { id: "9",  txId: "TXN-20250526-009", customer: "Pooja S.",   phone: "+91 21098 76543", table: "T-11", date: "26 May 2025", duration: "1h 45m", expected: 280, actual: 280,  method: "ONLINE", status: "COMPLETED" },
  { id: "10", txId: "TXN-20250526-010", customer: "Ganesh K.",  phone: "+91 10987 65432", table: "T-05", date: "26 May 2025", duration: "0h 50m", expected: 67,  actual: 0,    method: "CASH",   status: "PENDING"   },
];

const statusStyle: Record<PaymentStatus, string> = {
  COMPLETED: "bg-green-900/30  border-green-800/40  text-green-400",
  PENDING:   "bg-amber-900/30  border-amber-800/40  text-amber-400",
  PARTIAL:   "bg-orange-900/30 border-orange-800/40 text-orange-400",
  REFUNDED:  "bg-red-900/30    border-red-800/40    text-red-400",
};

const methodStyle: Record<FinancePaymentMethod, string> = {
  CASH:   "bg-amber-900/20  text-amber-400",
  ONLINE: "bg-blue-900/20   text-blue-400",
  CARD:   "bg-purple-900/20 text-purple-400",
  WALLET: "bg-teal-900/20   text-teal-400",
};

const todayTotal  = transactions.filter((t) => t.date === "27 May 2025").reduce((s, t) => s + t.actual, 0);
const monthTotal  = transactions.reduce((s, t) => s + t.actual, 0);
const pending     = transactions.filter((t) => t.status === "PENDING" || t.status === "PARTIAL").length;

/* ── Component ──────────────────────────────────────────────────────────────── */
export default function FinancePage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-100">Finance</h2>
        <p className="text-sm text-slate-500 mt-0.5">Track all transactions and earnings.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-900/15 border border-green-800/30 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Today's Earnings</p>
          <p className="text-3xl font-bold text-green-400">₹{todayTotal.toLocaleString("en-IN")}</p>
          <p className="text-xs text-slate-600 mt-1">{transactions.filter((t) => t.date === "27 May 2025").length} transactions</p>
        </div>
        <div className="bg-amber-900/15 border border-amber-800/30 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">This Period</p>
          <p className="text-3xl font-bold text-amber-400">₹{monthTotal.toLocaleString("en-IN")}</p>
          <p className="text-xs text-slate-600 mt-1">{transactions.length} transactions shown</p>
        </div>
        <div className="bg-orange-900/15 border border-orange-800/30 rounded-2xl p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Pending / Partial</p>
          <p className="text-3xl font-bold text-orange-400">{pending}</p>
          <p className="text-xs text-slate-600 mt-1">Require attention</p>
        </div>
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex-1 min-w-[200px] relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Search customer, table, TX ID…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#0d1520]/70 border border-[#1e3048] text-slate-300 placeholder-slate-600 text-sm focus:outline-none focus:border-green-700/50 focus:ring-1 focus:ring-green-700/30 transition-all"
            readOnly
          />
        </div>
        <select className="px-3 py-2.5 rounded-xl bg-[#0d1520]/70 border border-[#1e3048] text-slate-400 text-sm focus:outline-none transition-all">
          <option value="">All Statuses</option>
          <option value="COMPLETED">Completed</option>
          <option value="PENDING">Pending</option>
          <option value="PARTIAL">Partial</option>
        </select>
        <select className="px-3 py-2.5 rounded-xl bg-[#0d1520]/70 border border-[#1e3048] text-slate-400 text-sm focus:outline-none transition-all">
          <option value="">All Methods</option>
          <option value="CASH">Cash</option>
          <option value="ONLINE">Online</option>
          <option value="CARD">Card</option>
        </select>
      </div>

      {/* Transactions table */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-[#1e3048]">
              <tr>
                {["TX ID", "Customer", "Table", "Date", "Duration", "Expected", "Received", "Method", "Status", ""].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-widest text-slate-600 whitespace-nowrap last:text-right">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2a3a]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-white/2 transition-colors group">
                  <td className="px-4 py-3.5 font-mono text-xs text-slate-500 whitespace-nowrap">{tx.txId}</td>
                  <td className="px-4 py-3.5">
                    <p className="text-slate-300 font-medium whitespace-nowrap">{tx.customer}</p>
                    <p className="text-slate-600 text-xs">{tx.phone}</p>
                  </td>
                  <td className="px-4 py-3.5 text-slate-400 font-medium">{tx.table}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs whitespace-nowrap">{tx.date}</td>
                  <td className="px-4 py-3.5 text-slate-500 text-xs">{tx.duration}</td>
                  <td className="px-4 py-3.5 text-slate-400">₹{tx.expected}</td>
                  <td className="px-4 py-3.5 font-semibold text-green-400">
                    {tx.actual > 0 ? `₹${tx.actual}` : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${methodStyle[tx.method]}`}>
                      {tx.method}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyle[tx.status]}`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <Link
                      href={`/manage/finance/${tx.id}`}
                      className="text-xs text-slate-600 hover:text-green-400 transition-colors group-hover:text-slate-400"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination stub */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#1e3048]">
          <span className="text-xs text-slate-600">Showing 1–10 of 10 results</span>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 rounded-lg text-xs text-slate-600 border border-[#1e3048] disabled:opacity-40" disabled>
              ← Prev
            </button>
            <button className="px-3 py-1.5 rounded-lg text-xs text-slate-600 border border-[#1e3048] disabled:opacity-40" disabled>
              Next →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

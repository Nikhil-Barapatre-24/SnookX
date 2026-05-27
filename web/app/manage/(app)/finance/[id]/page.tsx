import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { FinancePaymentMethod, PaymentStatus } from "../../../lib/types";

export const metadata: Metadata = { title: "Transaction Detail — SnookX Management" };

/* ── Mock data ──────────────────────────────────────────────────────────────── */
interface MockTransaction {
  id: string;
  txId: string;
  customer: string;
  phone: string;
  table: string;
  tableId: string;
  gameType: string;
  date: string;
  start: string;
  end: string;
  duration: string;
  pricePerHour: number;
  expected: number;
  actual: number;
  difference: number;
  method: FinancePaymentMethod;
  status: PaymentStatus;
  reference: string | null;
  notes: string | null;
  createdAt: string;
}

const txData: Record<string, MockTransaction> = {
  "1": {
    id: "1", txId: "TXN-20250527-001",
    customer: "Rahul M.", phone: "+91 98765 43210",
    table: "T-01", tableId: "1", gameType: "Snooker",
    date: "27 May 2025", start: "2:00 PM", end: "4:14 PM", duration: "2h 14m",
    pricePerHour: 120, expected: 268, actual: 280, difference: 12,
    method: "CASH", status: "COMPLETED",
    reference: null, notes: "Regular customer. Gave ₹12 extra.",
    createdAt: "27 May 2025, 4:14 PM",
  },
  "6": {
    id: "6", txId: "TXN-20250527-006",
    customer: "Priya V.", phone: "+91 54321 09876",
    table: "T-10", tableId: "10", gameType: "Billiards",
    date: "27 May 2025", start: "5:30 PM", end: "6:00 PM", duration: "0h 30m",
    pricePerHour: 70, expected: 35, actual: 30, difference: -5,
    method: "CASH", status: "PARTIAL",
    reference: null, notes: "Short ₹5. Will settle next visit.",
    createdAt: "27 May 2025, 6:00 PM",
  },
  "10": {
    id: "10", txId: "TXN-20250526-010",
    customer: "Ganesh K.", phone: "+91 10987 65432",
    table: "T-05", tableId: "5", gameType: "Pool",
    date: "26 May 2025", start: "7:00 PM", end: "7:50 PM", duration: "0h 50m",
    pricePerHour: 80, expected: 67, actual: 0, difference: -67,
    method: "CASH", status: "PENDING",
    reference: null, notes: "Customer left. Follow up required.",
    createdAt: "26 May 2025, 7:50 PM",
  },
};

function getTransaction(id: string): MockTransaction {
  if (txData[id]) return txData[id];
  const num = parseInt(id, 10);
  if (isNaN(num) || num < 1 || num > 10) notFound();
  // Generic stub for IDs 2-5, 7-9
  return {
    id,
    txId: `TXN-20250527-00${id}`,
    customer: "Customer", phone: "+91 00000 00000",
    table: "T-01", tableId: "1", gameType: "Snooker",
    date: "27 May 2025", start: "12:00 PM", end: "2:00 PM", duration: "2h 00m",
    pricePerHour: 120, expected: 240, actual: 240, difference: 0,
    method: "CASH", status: "COMPLETED",
    reference: null, notes: null,
    createdAt: "27 May 2025, 2:00 PM",
  };
}

const statusStyle: Record<PaymentStatus, { bg: string; border: string; text: string }> = {
  COMPLETED: { bg: "bg-green-900/20",  border: "border-green-800/40",  text: "text-green-400"  },
  PENDING:   { bg: "bg-amber-900/20",  border: "border-amber-800/40",  text: "text-amber-400"  },
  PARTIAL:   { bg: "bg-orange-900/20", border: "border-orange-800/40", text: "text-orange-400" },
  REFUNDED:  { bg: "bg-red-900/20",    border: "border-red-800/40",    text: "text-red-400"    },
};

/* ── Component ──────────────────────────────────────────────────────────────── */
export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tx = getTransaction(id);
  const ss = statusStyle[tx.status];

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Back */}
      <Link
        href="/manage/finance"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
        </svg>
        Back to Finance
      </Link>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-100">{tx.txId}</h2>
          <p className="text-slate-500 text-sm mt-0.5">Created {tx.createdAt}</p>
        </div>
        <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${ss.bg} ${ss.border} ${ss.text}`}>
          <span className={`w-1.5 h-1.5 rounded-full bg-current`}/>
          {tx.status}
        </span>
      </div>

      {/* Main detail card */}
      <div className="bg-[#0d1520]/70 border border-[#1e3048] rounded-2xl overflow-hidden">

        {/* Section: Session */}
        <div className="p-5 border-b border-[#1e3048]">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">Session Info</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
            <div>
              <p className="text-xs text-slate-600 mb-1">Table</p>
              <Link href={`/manage/tables/${tx.tableId}`} className="text-slate-200 font-medium hover:text-green-400 transition-colors">
                {tx.table}
              </Link>
              <p className="text-xs text-slate-500">{tx.gameType}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Date</p>
              <p className="text-slate-200 font-medium">{tx.date}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Duration</p>
              <p className="text-slate-200 font-medium">{tx.duration}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Start Time</p>
              <p className="text-slate-200">{tx.start}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">End Time</p>
              <p className="text-slate-200">{tx.end}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600 mb-1">Rate</p>
              <p className="text-slate-200">₹{tx.pricePerHour}/hr</p>
            </div>
          </div>
        </div>

        {/* Section: Customer */}
        <div className="p-5 border-b border-[#1e3048]">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">Customer</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1e3048] flex items-center justify-center text-slate-300 font-bold text-sm flex-shrink-0">
              {tx.customer[0]}
            </div>
            <div>
              <p className="text-slate-200 font-semibold">{tx.customer}</p>
              <p className="text-slate-500 text-sm">{tx.phone}</p>
            </div>
          </div>
        </div>

        {/* Section: Payment */}
        <div className="p-5 border-b border-[#1e3048]">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-4">Payment Breakdown</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Expected Amount</span>
              <span className="text-slate-300">₹{tx.expected}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Received Amount</span>
              <span className={tx.actual >= tx.expected ? "text-green-400 font-semibold" : "text-orange-400 font-semibold"}>
                ₹{tx.actual}
              </span>
            </div>
            <div className="border-t border-[#1e3048] pt-3 flex justify-between text-sm font-semibold">
              <span className="text-slate-400">Difference</span>
              <span className={tx.difference >= 0 ? "text-green-400" : "text-red-400"}>
                {tx.difference >= 0 ? `+₹${tx.difference}` : `-₹${Math.abs(tx.difference)}`}
              </span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-slate-600">Payment Method:</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1e3048] text-slate-300 border border-[#2a3f55]">
              {tx.method}
            </span>
            {tx.reference && (
              <span className="text-xs text-slate-600">Ref: <span className="text-slate-400">{tx.reference}</span></span>
            )}
          </div>
        </div>

        {/* Notes */}
        {tx.notes && (
          <div className="p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-2">Notes</p>
            <p className="text-sm text-slate-400">{tx.notes}</p>
          </div>
        )}
      </div>

      {/* Actions */}
      {tx.status !== "COMPLETED" && (
        <div className="flex gap-3">
          <button className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-green-700 hover:bg-green-600 text-white transition-colors">
            Mark as Completed
          </button>
          <button className="px-5 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-[#1e3048] transition-all">
            Edit
          </button>
        </div>
      )}

    </div>
  );
}

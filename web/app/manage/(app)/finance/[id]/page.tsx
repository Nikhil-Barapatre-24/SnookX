import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { FinancePaymentMethod, PaymentStatus } from "../../../lib/types";

export const metadata: Metadata = { title: "Transaction Detail — SnookX Management" };

interface MockTransaction {
  id: string; txId: string; customer: string; phone: string;
  table: string; tableId: string; gameType: string;
  date: string; start: string; end: string; duration: string;
  pricePerHour: number; expected: number; actual: number; difference: number;
  method: FinancePaymentMethod; status: PaymentStatus;
  reference: string | null; notes: string | null; createdAt: string;
}

const txData: Record<string, MockTransaction> = {
  "1": {
    id: "1", txId: "TXN-20250527-001", customer: "Rahul M.", phone: "+91 98765 43210",
    table: "T-01", tableId: "1", gameType: "Snooker",
    date: "27 May 2025", start: "2:00 PM", end: "4:14 PM", duration: "2h 14m",
    pricePerHour: 120, expected: 268, actual: 280, difference: 12,
    method: "CASH", status: "COMPLETED", reference: null,
    notes: "Regular customer. Gave ₹12 extra.", createdAt: "27 May 2025, 4:14 PM",
  },
  "6": {
    id: "6", txId: "TXN-20250527-006", customer: "Priya V.", phone: "+91 54321 09876",
    table: "T-10", tableId: "10", gameType: "Billiards",
    date: "27 May 2025", start: "5:30 PM", end: "6:00 PM", duration: "0h 30m",
    pricePerHour: 70, expected: 35, actual: 30, difference: -5,
    method: "CASH", status: "PARTIAL", reference: null,
    notes: "Short ₹5. Will settle next visit.", createdAt: "27 May 2025, 6:00 PM",
  },
  "10": {
    id: "10", txId: "TXN-20250526-010", customer: "Ganesh K.", phone: "+91 10987 65432",
    table: "T-05", tableId: "5", gameType: "Pool",
    date: "26 May 2025", start: "7:00 PM", end: "7:50 PM", duration: "0h 50m",
    pricePerHour: 80, expected: 67, actual: 0, difference: -67,
    method: "CASH", status: "PENDING", reference: null,
    notes: "Customer left. Follow up required.", createdAt: "26 May 2025, 7:50 PM",
  },
};

function getTransaction(id: string): MockTransaction {
  if (txData[id]) return txData[id];
  const num = parseInt(id, 10);
  if (isNaN(num) || num < 1 || num > 10) notFound();
  return {
    id, txId: `TXN-20250527-00${id}`, customer: "Customer", phone: "+91 00000 00000",
    table: "T-01", tableId: "1", gameType: "Snooker",
    date: "27 May 2025", start: "12:00 PM", end: "2:00 PM", duration: "2h 00m",
    pricePerHour: 120, expected: 240, actual: 240, difference: 0,
    method: "CASH", status: "COMPLETED", reference: null, notes: null,
    createdAt: "27 May 2025, 2:00 PM",
  };
}

const statusBadge: Record<PaymentStatus, "success" | "warning" | "danger" | "info"> = {
  COMPLETED: "success", PENDING: "warning", PARTIAL: "danger", REFUNDED: "info",
};
const methodBadge: Record<FinancePaymentMethod, "warning" | "info" | "purple" | "success"> = {
  CASH: "warning", ONLINE: "info", CARD: "purple", WALLET: "success",
};

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground font-medium">{value}</span>
    </div>
  );
}

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tx = getTransaction(id);

  return (
    <div className="space-y-6 max-w-2xl">

      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
        <Link href="/manage/finance">
          <ArrowLeft className="w-4 h-4" />
          Back to Finance
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground font-mono">{tx.txId}</h2>
          <p className="text-muted-foreground text-sm mt-0.5">Created {tx.createdAt}</p>
        </div>
        <Badge variant={statusBadge[tx.status]} className="text-sm px-3 py-1">
          {tx.status}
        </Badge>
      </div>

      {/* Session info */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Session Info</CardTitle></CardHeader>
        <CardContent className="pt-0 space-y-0 divide-y divide-border">
          <InfoRow label="Table" value={
            <Link href={`/manage/tables/${tx.tableId}`} className="text-primary hover:underline">
              {tx.table}
            </Link>
          } />
          <InfoRow label="Game" value={tx.gameType} />
          <InfoRow label="Date" value={tx.date} />
          <InfoRow label="Duration" value={tx.duration} />
          <InfoRow label="Time" value={`${tx.start} – ${tx.end}`} />
          <InfoRow label="Rate" value={`₹${tx.pricePerHour}/hr`} />
        </CardContent>
      </Card>

      {/* Customer */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Customer</CardTitle></CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground flex-shrink-0">
              {tx.customer[0]}
            </div>
            <div>
              <p className="text-foreground font-semibold">{tx.customer}</p>
              <p className="text-muted-foreground text-sm">{tx.phone}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment breakdown */}
      <Card>
        <CardHeader><CardTitle className="text-sm">Payment Breakdown</CardTitle></CardHeader>
        <CardContent className="pt-0 space-y-0">
          <div className="divide-y divide-border">
            <InfoRow label="Expected Amount" value={`₹${tx.expected}`} />
            <InfoRow label="Received Amount" value={
              <span className={tx.actual >= tx.expected ? "text-green-600 dark:text-green-400 font-bold" : "text-orange-600 dark:text-orange-400 font-bold"}>
                ₹{tx.actual}
              </span>
            } />
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center py-1 text-sm font-semibold">
            <span className="text-muted-foreground">Difference</span>
            <span className={tx.difference >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500"}>
              {tx.difference >= 0 ? `+₹${tx.difference}` : `-₹${Math.abs(tx.difference)}`}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
            <span className="text-xs text-muted-foreground">Payment Method:</span>
            <Badge variant={methodBadge[tx.method]}>{tx.method}</Badge>
            {tx.reference && (
              <span className="text-xs text-muted-foreground">Ref: {tx.reference}</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      {tx.notes && (
        <Card>
          <CardHeader><CardTitle className="text-sm">Notes</CardTitle></CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground">{tx.notes}</p>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      {tx.status !== "COMPLETED" && (
        <div className="flex gap-3">
          <Button>Mark as Completed</Button>
          <Button variant="outline">Edit</Button>
        </div>
      )}

    </div>
  );
}

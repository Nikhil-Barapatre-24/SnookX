import type { Metadata } from "next";
import Link from "next/link";
import { TrendingUp, AlertTriangle, ReceiptText } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import type { FinancePaymentMethod, PaymentStatus } from "../../lib/types";

export const metadata: Metadata = { title: "Finance — SnookX Management" };

interface MockTransaction {
  id: string; txId: string; customer: string; phone: string; table: string;
  date: string; duration: string; expected: number; actual: number;
  method: FinancePaymentMethod; status: PaymentStatus;
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
  { id: "10", txId: "TXN-20250526-010", customer: "Ganesh K.", phone: "+91 10987 65432", table: "T-05", date: "26 May 2025", duration: "0h 50m", expected: 67,  actual: 0,    method: "CASH",   status: "PENDING"   },
];

const statusBadge: Record<PaymentStatus, "success" | "warning" | "danger" | "info"> = {
  COMPLETED: "success",
  PENDING:   "warning",
  PARTIAL:   "danger",
  REFUNDED:  "info",
};

const methodBadge: Record<FinancePaymentMethod, "warning" | "info" | "purple" | "success"> = {
  CASH:   "warning",
  ONLINE: "info",
  CARD:   "purple",
  WALLET: "success",
};

const todayTotal = transactions.filter((t) => t.date === "27 May 2025").reduce((s, t) => s + t.actual, 0);
const allTotal   = transactions.reduce((s, t) => s + t.actual, 0);
const pendingCt  = transactions.filter((t) => t.status === "PENDING" || t.status === "PARTIAL").length;

export default function FinancePage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Finance</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Track all transactions and earnings.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-green-500/20 bg-green-500/5">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Today's Earnings</CardDescription>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              ₹{todayTotal.toLocaleString("en-IN")}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {transactions.filter((t) => t.date === "27 May 2025").length} transactions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>This Period</CardDescription>
              <ReceiptText className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">₹{allTotal.toLocaleString("en-IN")}</p>
            <p className="text-xs text-muted-foreground mt-1">{transactions.length} transactions shown</p>
          </CardContent>
        </Card>

        <Card className={pendingCt > 0 ? "border-orange-500/20 bg-orange-500/5" : ""}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Pending / Partial</CardDescription>
              <AlertTriangle className={`w-4 h-4 ${pendingCt > 0 ? "text-orange-500" : "text-muted-foreground"}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${pendingCt > 0 ? "text-orange-600 dark:text-orange-400" : "text-foreground"}`}>
              {pendingCt}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z"/>
          </svg>
          <Input placeholder="Search customer, table, TX ID…" className="pl-9 bg-card" readOnly />
        </div>
        <Select>
          <SelectTrigger className="w-40 bg-card">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="PARTIAL">Partial</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-36 bg-card">
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="CASH">Cash</SelectItem>
            <SelectItem value="ONLINE">Online</SelectItem>
            <SelectItem value="CARD">Card</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>TX ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Table</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Expected</TableHead>
              <TableHead>Received</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((tx) => (
              <TableRow key={tx.id}>
                <TableCell className="font-mono text-xs text-muted-foreground whitespace-nowrap">{tx.txId}</TableCell>
                <TableCell>
                  <p className="text-foreground font-medium whitespace-nowrap">{tx.customer}</p>
                  <p className="text-muted-foreground text-xs">{tx.phone}</p>
                </TableCell>
                <TableCell className="font-medium">{tx.table}</TableCell>
                <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{tx.date}</TableCell>
                <TableCell className="text-muted-foreground text-xs">{tx.duration}</TableCell>
                <TableCell className="text-muted-foreground">₹{tx.expected}</TableCell>
                <TableCell className="font-semibold text-green-600 dark:text-green-400">
                  {tx.actual > 0 ? `₹${tx.actual}` : <span className="text-muted-foreground">—</span>}
                </TableCell>
                <TableCell><Badge variant={methodBadge[tx.method]}>{tx.method}</Badge></TableCell>
                <TableCell><Badge variant={statusBadge[tx.status]}>{tx.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" asChild className="h-7 text-xs text-muted-foreground">
                    <Link href={`/manage/finance/${tx.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination stub */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-border">
          <span className="text-xs text-muted-foreground">Showing 1–10 of 10 results</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled className="h-7 text-xs">← Prev</Button>
            <Button variant="outline" size="sm" disabled className="h-7 text-xs">Next →</Button>
          </div>
        </div>
      </Card>

    </div>
  );
}

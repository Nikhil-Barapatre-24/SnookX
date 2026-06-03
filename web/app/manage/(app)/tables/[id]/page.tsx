import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  Card, CardContent, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { TableStatus, GameType, PaymentMethod } from "../../../lib/types";

export const metadata: Metadata = { title: "Table Detail — SnookX Management" };

interface MockSession {
  id: string; customer: string; phone: string; start: string; end: string;
  duration: string; amount: number; method: PaymentMethod; date: string;
}

interface MockTableDetail {
  id: string; tableNumber: string; tableName: string; gameType: GameType;
  pricePerHour: number; status: TableStatus; customer?: string; customerPhone?: string;
  since?: string; durationMin?: number; estimatedBill?: number;
  isActive: boolean; createdAt: string; sessions: MockSession[];
}

const tableData: Record<string, MockTableDetail> = {
  "1": {
    id: "1", tableNumber: "T-01", tableName: "Championship 1", gameType: "SNOOKER",
    pricePerHour: 120, status: "OCCUPIED", customer: "Rahul M.", customerPhone: "+91 98765 43210",
    since: "2:14 PM", durationMin: 134, estimatedBill: 268, isActive: true, createdAt: "2025-01-10",
    sessions: [
      { id: "s1", customer: "Rahul M.",  phone: "+91 98765 43210", start: "12:00 PM", end: "2:00 PM",  duration: "2h 00m", amount: 240, method: "CASH",   date: "Today"     },
      { id: "s2", customer: "Suresh B.", phone: "+91 87654 32109", start: "10:00 AM", end: "11:30 AM", duration: "1h 30m", amount: 180, method: "ONLINE", date: "Today"     },
      { id: "s3", customer: "Ajay K.",   phone: "+91 76543 21098", start: "3:00 PM",  end: "5:00 PM",  duration: "2h 00m", amount: 240, method: "CASH",   date: "Yesterday" },
      { id: "s4", customer: "Nikhil P.", phone: "+91 65432 10987", start: "1:00 PM",  end: "3:30 PM",  duration: "2h 30m", amount: 300, method: "CASH",   date: "26 May"    },
    ],
  },
  "2": {
    id: "2", tableNumber: "T-02", tableName: "Championship 2", gameType: "SNOOKER",
    pricePerHour: 120, status: "OCCUPIED", customer: "Amit K.", customerPhone: "+91 91234 56789",
    since: "3:43 PM", durationMin: 45, estimatedBill: 90, isActive: true, createdAt: "2025-01-10",
    sessions: [
      { id: "s1", customer: "Pooja S.", phone: "+91 80123 45678", start: "1:00 PM", end: "3:00 PM", duration: "2h 00m", amount: 240, method: "ONLINE", date: "Today" },
    ],
  },
};

function getTable(id: string): MockTableDetail {
  if (tableData[id]) return tableData[id];
  const num = parseInt(id, 10);
  if (isNaN(num) || num < 1 || num > 12) notFound();
  return {
    id, tableNumber: `T-${String(num).padStart(2, "0")}`, tableName: `Table ${num}`,
    gameType: num % 3 === 0 ? "BILLIARDS" : num % 2 === 0 ? "POOL" : "SNOOKER",
    pricePerHour: 100, status: "AVAILABLE", isActive: true, createdAt: "2025-01-10", sessions: [],
  };
}

const gameTypeBadge: Record<GameType, "success" | "info" | "purple"> = {
  SNOOKER: "success", POOL: "info", BILLIARDS: "purple",
};

export default async function TableDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const table = getTable(id);

  return (
    <div className="space-y-6 max-w-4xl">

      {/* Back */}
      <Button variant="ghost" size="sm" asChild className="text-muted-foreground -ml-2">
        <Link href="/manage/tables">
          <ArrowLeft className="w-4 h-4" />
          Back to Tables
        </Link>
      </Button>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-foreground">{table.tableName}</h2>
            <Badge variant={gameTypeBadge[table.gameType]}>{table.gameType}</Badge>
            <Badge variant={table.status === "OCCUPIED" ? "success" : "muted"}>
              <span className={`w-1.5 h-1.5 rounded-full bg-current mr-1 ${table.status === "OCCUPIED" ? "animate-pulse" : ""}`} />
              {table.status === "OCCUPIED" ? "Occupied" : "Available"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">
            {table.tableNumber} · ₹{table.pricePerHour}/hr · Since {table.createdAt}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          {table.status === "AVAILABLE" && <Button size="sm">Start Session</Button>}
          {table.status === "OCCUPIED" && (
            <Button size="sm" variant="secondary">Complete &amp; Bill</Button>
          )}
        </div>
      </div>

      {/* Active session */}
      {table.status === "OCCUPIED" && table.customer && (
        <Card className="border-green-500/30 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Session
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
                <p className="text-foreground font-medium">{table.customer}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{table.customerPhone}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Started</p>
                <p className="text-foreground font-medium">{table.since}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Duration</p>
                <p className="text-foreground font-medium">{table.durationMin} min</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est. Bill</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{table.estimatedBill}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session history */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Session History</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {table.sessions.length === 0 ? (
            <p className="text-muted-foreground text-sm py-8 text-center">No sessions recorded yet.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {table.sessions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{s.date}</TableCell>
                    <TableCell>
                      <p className="text-foreground font-medium">{s.customer}</p>
                      <p className="text-muted-foreground text-xs">{s.phone}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs whitespace-nowrap">{s.start} – {s.end}</TableCell>
                    <TableCell className="text-muted-foreground text-xs">{s.duration}</TableCell>
                    <TableCell>
                      <Badge variant={s.method === "CASH" ? "warning" : "info"}>
                        {s.method}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">
                      {s.amount > 0 ? `₹${s.amount}` : "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

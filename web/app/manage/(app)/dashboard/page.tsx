import type { Metadata } from "next";
import Link from "next/link";
import {
  TrendingUp,
  BarChart2,
  Table2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getSession } from "../../lib/session";
import type { TableStatus, GameType, PaymentMethod } from "../../lib/types";

export const metadata: Metadata = { title: "Dashboard — SnookX Management" };

/* ── Mock data ────────────────────────────────────────────────────────── */
interface MockTable { id: string; number: string; name: string; type: GameType; status: TableStatus; since?: string; customer?: string }
const tables: MockTable[] = [
  { id: "1",  number: "T-01", name: "Championship 1",  type: "SNOOKER",   status: "OCCUPIED",  since: "2h 14m", customer: "Rahul M." },
  { id: "2",  number: "T-02", name: "Championship 2",  type: "SNOOKER",   status: "OCCUPIED",  since: "0h 45m", customer: "Amit K." },
  { id: "3",  number: "T-03", name: "Pro Snooker 3",   type: "SNOOKER",   status: "AVAILABLE" },
  { id: "4",  number: "T-04", name: "Pro Snooker 4",   type: "SNOOKER",   status: "OCCUPIED",  since: "1h 30m", customer: "Vishal P." },
  { id: "5",  number: "T-05", name: "English Pool 1",  type: "POOL",      status: "AVAILABLE" },
  { id: "6",  number: "T-06", name: "English Pool 2",  type: "POOL",      status: "OCCUPIED",  since: "0h 20m", customer: "Karan S." },
  { id: "7",  number: "T-07", name: "American Pool 1", type: "POOL",      status: "AVAILABLE" },
  { id: "8",  number: "T-08", name: "American Pool 2", type: "POOL",      status: "OCCUPIED",  since: "1h 05m", customer: "Rohan D." },
  { id: "9",  number: "T-09", name: "Billiards 1",     type: "BILLIARDS", status: "AVAILABLE" },
  { id: "10", number: "T-10", name: "Billiards 2",     type: "BILLIARDS", status: "OCCUPIED",  since: "3h 00m", customer: "Priya V." },
  { id: "11", number: "T-11", name: "VIP Snooker 1",   type: "SNOOKER",   status: "AVAILABLE" },
  { id: "12", number: "T-12", name: "VIP Snooker 2",   type: "SNOOKER",   status: "OCCUPIED",  since: "0h 55m", customer: "Dev N." },
];

interface MockTx { id: string; txId: string; table: string; customer: string; amount: number; method: PaymentMethod; time: string }
const recentTx: MockTx[] = [
  { id: "1", txId: "TXN-001", table: "T-03", customer: "Suresh B.",  amount: 280, method: "CASH",   time: "Just now"   },
  { id: "2", txId: "TXN-002", table: "T-07", customer: "Ajay M.",    amount: 420, method: "ONLINE", time: "12 min ago" },
  { id: "3", txId: "TXN-003", table: "T-02", customer: "Nikhil R.",  amount: 350, method: "CASH",   time: "28 min ago" },
  { id: "4", txId: "TXN-004", table: "T-11", customer: "Pooja S.",   amount: 560, method: "ONLINE", time: "1h ago"     },
  { id: "5", txId: "TXN-005", table: "T-05", customer: "Ganesh K.", amount: 210, method: "CASH",   time: "1h 45m ago" },
];

const occupied  = tables.filter((t) => t.status === "OCCUPIED").length;
const available = tables.length - occupied;

/* ── Component ──────────────────────────────────────────────────────────── */
export default async function DashboardPage() {
  const session = await getSession();
  const isOwner = session?.role === "OWNER";

  return (
    <div className="space-y-6">

      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-foreground">Good afternoon 👋</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Here's what's happening at SnookX today.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        {/* Today Earnings — OWNER only */}
        {isOwner && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Today's Earnings</CardDescription>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹4,850</p>
              <p className="text-xs text-muted-foreground mt-1">+12% vs yesterday</p>
            </CardContent>
          </Card>
        )}

        {/* Monthly Earnings — OWNER only */}
        {isOwner && (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardDescription>Monthly Earnings</CardDescription>
                <BarChart2 className="w-4 h-4 text-amber-500" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">₹1,12,400</p>
              <p className="text-xs text-muted-foreground mt-1">+8% vs last month</p>
            </CardContent>
          </Card>
        )}

        {/* Tables Active — all roles */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Tables Active</CardDescription>
              <Table2 className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {occupied} <span className="text-muted-foreground font-normal text-lg">/ {tables.length}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{available} available right now</p>
          </CardContent>
        </Card>

        {/* Sessions Today — all roles */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardDescription>Sessions Today</CardDescription>
              <Clock className="w-4 h-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">23</p>
            <p className="text-xs text-muted-foreground mt-1">Avg. 68 min / session</p>
          </CardContent>
        </Card>
      </div>

      {/* Table grid + Recent tx */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Live table status */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Live Table Status</CardTitle>
              <Link
                href="/manage/tables"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {tables.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-xl border p-3 transition-all ${
                    t.status === "OCCUPIED"
                      ? "bg-green-500/10 border-green-500/20"
                      : "bg-muted/50 border-border"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{t.number}</span>
                    <span className={`w-2 h-2 rounded-full ${
                      t.status === "OCCUPIED" ? "bg-green-500 animate-pulse" : "bg-muted-foreground/40"
                    }`} />
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate mb-1">{t.name}</p>
                  {t.status === "OCCUPIED" ? (
                    <>
                      <p className="text-[11px] text-green-600 dark:text-green-400 font-medium truncate">{t.customer}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t.since}</p>
                    </>
                  ) : (
                    <p className="text-[11px] text-muted-foreground/60">Available</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent transactions */}
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Recent Transactions</CardTitle>
              <Link
                href="/manage/finance"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="flex-1 space-y-2">
            {recentTx.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  tx.method === "CASH"
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                    : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                }`}>
                  {tx.method === "CASH" ? "₹" : "↗"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{tx.customer}</p>
                  <p className="text-[11px] text-muted-foreground">{tx.table} · {tx.time}</p>
                </div>
                <span className="text-sm font-semibold text-green-600 dark:text-green-400">₹{tx.amount}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Occupancy bar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Occupancy</CardTitle>
            <span className="text-sm text-muted-foreground">
              <span className="text-green-600 dark:text-green-400 font-bold">{occupied}</span> / {tables.length} tables occupied
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-700 to-green-500 rounded-full transition-all"
              style={{ width: `${(occupied / tables.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {Math.round((occupied / tables.length) * 100)}% occupied
            </span>
            <span>100%</span>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}

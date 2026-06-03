import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { TableStatus, GameType } from "../../lib/types";

export const metadata: Metadata = { title: "Tables — SnookX Management" };

interface MockTable {
  id: string; tableNumber: string; tableName: string; gameType: GameType;
  pricePerHour: number; status: TableStatus; customer?: string; since?: string;
  sessionsToday: number;
}

const tables: MockTable[] = [
  { id: "1",  tableNumber: "T-01", tableName: "Championship 1",  gameType: "SNOOKER",   pricePerHour: 120, status: "OCCUPIED",  customer: "Rahul M.",  since: "2h 14m", sessionsToday: 4 },
  { id: "2",  tableNumber: "T-02", tableName: "Championship 2",  gameType: "SNOOKER",   pricePerHour: 120, status: "OCCUPIED",  customer: "Amit K.",   since: "0h 45m", sessionsToday: 3 },
  { id: "3",  tableNumber: "T-03", tableName: "Pro Snooker 3",   gameType: "SNOOKER",   pricePerHour: 100, status: "AVAILABLE", sessionsToday: 5 },
  { id: "4",  tableNumber: "T-04", tableName: "Pro Snooker 4",   gameType: "SNOOKER",   pricePerHour: 100, status: "OCCUPIED",  customer: "Vishal P.", since: "1h 30m", sessionsToday: 2 },
  { id: "5",  tableNumber: "T-05", tableName: "English Pool 1",  gameType: "POOL",      pricePerHour: 80,  status: "AVAILABLE", sessionsToday: 6 },
  { id: "6",  tableNumber: "T-06", tableName: "English Pool 2",  gameType: "POOL",      pricePerHour: 80,  status: "OCCUPIED",  customer: "Karan S.",  since: "0h 20m", sessionsToday: 4 },
  { id: "7",  tableNumber: "T-07", tableName: "American Pool 1", gameType: "POOL",      pricePerHour: 90,  status: "AVAILABLE", sessionsToday: 3 },
  { id: "8",  tableNumber: "T-08", tableName: "American Pool 2", gameType: "POOL",      pricePerHour: 90,  status: "OCCUPIED",  customer: "Rohan D.",  since: "1h 05m", sessionsToday: 5 },
  { id: "9",  tableNumber: "T-09", tableName: "Billiards 1",     gameType: "BILLIARDS", pricePerHour: 70,  status: "AVAILABLE", sessionsToday: 2 },
  { id: "10", tableNumber: "T-10", tableName: "Billiards 2",     gameType: "BILLIARDS", pricePerHour: 70,  status: "OCCUPIED",  customer: "Priya V.",  since: "3h 00m", sessionsToday: 3 },
  { id: "11", tableNumber: "T-11", tableName: "VIP Snooker 1",   gameType: "SNOOKER",   pricePerHour: 160, status: "AVAILABLE", sessionsToday: 2 },
  { id: "12", tableNumber: "T-12", tableName: "VIP Snooker 2",   gameType: "SNOOKER",   pricePerHour: 160, status: "OCCUPIED",  customer: "Dev N.",    since: "0h 55m", sessionsToday: 1 },
];

const occupied  = tables.filter((t) => t.status === "OCCUPIED").length;
const available = tables.length - occupied;

const gameTypeBadge: Record<GameType, "success" | "info" | "purple"> = {
  SNOOKER:   "success",
  POOL:      "info",
  BILLIARDS: "purple",
};

export default function TablesPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Game Tables</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Monitor and manage all tables in real-time.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4" />
          Add Table
        </Button>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          Total: <span className="font-semibold text-foreground">{tables.length}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-green-500/20 bg-green-500/10 text-sm text-green-600 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Occupied: <span className="font-semibold">{occupied}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-muted-foreground/40" />
          Available: <span className="font-semibold text-foreground">{available}</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tables.map((table) => (
          <Link key={table.id} href={`/manage/tables/${table.id}`}>
            <Card className={`h-full transition-all hover:scale-[1.02] hover:shadow-md cursor-pointer ${
              table.status === "OCCUPIED"
                ? "border-green-500/30 bg-green-500/5"
                : ""
            }`}>
              <CardContent className="pt-5 space-y-3">
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-muted-foreground tracking-wider">{table.tableNumber}</span>
                    <p className="font-semibold text-foreground mt-0.5 leading-tight">{table.tableName}</p>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${
                    table.status === "OCCUPIED" ? "bg-green-500 animate-pulse" : "bg-muted-foreground/30"
                  }`} />
                </div>

                <Badge variant={gameTypeBadge[table.gameType]}>{table.gameType}</Badge>

                {/* Session info */}
                <div className="text-sm min-h-[2.5rem]">
                  {table.status === "OCCUPIED" ? (
                    <>
                      <p className="text-green-600 dark:text-green-400 font-medium truncate">{table.customer}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Active · {table.since}</p>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground">No active session</p>
                  )}
                </div>
              </CardContent>

              <Separator />

              <CardFooter className="py-3 px-5 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">₹{table.pricePerHour}/hr</span>
                <span className="text-xs text-muted-foreground">{table.sessionsToday} sessions today</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>

    </div>
  );
}

// ── Enums (mirror backend) ───────────────────────────────────────────────────
export type UserRole            = "OWNER" | "USER";
export type TableStatus         = "AVAILABLE" | "OCCUPIED";
export type GameType            = "SNOOKER" | "POOL" | "BILLIARDS";
export type PaymentMethod       = "CASH" | "ONLINE";
export type FinancePaymentMethod = "CASH" | "ONLINE" | "CARD" | "WALLET";
export type PaymentStatus       = "COMPLETED" | "PENDING" | "PARTIAL" | "REFUNDED";

// ── Auth ─────────────────────────────────────────────────────────────────────
export interface AuthResponse {
  userId: string;
  role: UserRole;
  accessToken: string;
  accessTokenExpiresAt: string;   // ISO LocalDateTime from backend
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

export interface AuthSession {
  userId: string;
  role: UserRole;
}

// ── Table ────────────────────────────────────────────────────────────────────
export interface TableResponse {
  id: string;
  tableNumber: string;
  tableName: string | null;
  gameType: GameType;
  pricePerHour: number;
  status: TableStatus;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface CurrentBillResponse {
  sessionId: string;
  tableId: string;
  tableNumber: string;
  tableName: string | null;
  startTime: string;          // ISO Instant
  pricePerHour: number;
  calculatedAmount: number;
  durationMinutes: number;
  customerName: string | null;
  customerPhone: string | null;
}

export interface PaymentCompletionResponse {
  sessionId: string;
  tableId: string;
  tableNumber: string;
  tableName: string | null;
  startTime: string;
  endTime: string;
  calculatedAmount: number;
  receivedAmount: number;
  difference: number;
  paymentMethod: PaymentMethod;
  durationMinutes: number;
  customerName: string | null;
  customerPhone: string | null;
}

// ── Finance ──────────────────────────────────────────────────────────────────
export interface TransactionResponse {
  id: string;
  transactionId: string;
  customerName: string;
  customerPhone: string;
  tableId: string;
  tableNumber: string;
  tableName: string;
  sessionId: string | null;
  startTime: string;
  endTime: string;
  durationMinutes: number;
  pricePerHour: number;
  expectedAmount: number;
  actualAmount: number;
  difference: number;
  paymentMethod: FinancePaymentMethod;
  paymentStatus: PaymentStatus;
  transactionDate: string;    // ISO LocalDate (YYYY-MM-DD)
  referenceNumber: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface EarningsResponse {
  todayEarnings: number;
  monthlyEarnings: number;
  yearlyEarnings: number;
  allTimeEarnings: number;
}

export interface PagedResponse<T> {
  content: T[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

// ── Server-action return types ────────────────────────────────────────────────
export type ActionError = { error: string };

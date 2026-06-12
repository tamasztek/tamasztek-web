// Az adományozási flow típusai – ld. ../docs/api-contract.md

// A Barion redirect után a visszaigazoló oldal innen olvassa a tranzakció azonosítóját.
export const DONATION_TX_STORAGE_KEY = "tamasztek.donation.transactionPublicId";

export interface SupportTier {
  publicId: string;
  amount: number;
  currency: string;
  description: string;
}

export interface StartDonationRequest {
  // projectPublicId opcionális: null/hiányzó = általános adomány
  projectPublicId?: string | null;
  supportTierPublicId?: string | null;
  donorName?: string | null;
  donorEmail: string;
  amount: number;
  currency?: string;
}

export interface StartDonationResponse {
  paymentUrl: string;
  transactionPublicId: string;
}

export type TransactionStatus =
  | "INITIATED"
  | "AUTHORIZED"
  | "COMPLETED"
  | "FAILED"
  | "TIMEOUT";

export type DonationStatus =
  | "PENDING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED";

export interface PaymentStatus {
  transactionPublicId: string;
  transactionStatus: TransactionStatus;
  donationStatus: DonationStatus;
  createdAt: string;
  paidAt: string | null;
}

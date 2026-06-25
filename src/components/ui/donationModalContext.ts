import { createContext, useContext } from "react";

export interface DonationModalContextValue {
  openDonationModal: () => void;
}

export const DonationModalContext =
  createContext<DonationModalContextValue | null>(null);

export function useDonationModal(): DonationModalContextValue {
  const ctx = useContext(DonationModalContext);
  if (!ctx) {
    throw new Error(
      "useDonationModal csak DonationModalProvider-en belül használható.",
    );
  }
  return ctx;
}

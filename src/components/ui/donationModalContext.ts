import { createContext, useContext } from "react";

// Opcionális projekt-kontextus: ha meg van adva, az adomány a projekthez kötve indul,
// és a modal a projekt saját támogatási összegeit tölti be.
export interface DonationProjectContext {
  projectPublicId: string;
  projectTitle?: string;
}

export interface DonationModalContextValue {
  openDonationModal: (project?: DonationProjectContext) => void;
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

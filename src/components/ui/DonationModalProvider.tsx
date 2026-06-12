import { useCallback, useMemo, useState, type ReactNode } from "react";
import DonationModal from "./DonationModal";
import { DonationModalContext } from "./donationModalContext";

interface DonationModalProviderProps {
  children: ReactNode;
}

// Globális adomány-modal: bárhonnan megnyitható az openDonationModal() hívással.
function DonationModalProvider({ children }: DonationModalProviderProps) {
  const [open, setOpen] = useState(false);

  const openDonationModal = useCallback(() => setOpen(true), []);
  const closeDonationModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openDonationModal }), [openDonationModal]);

  return (
    <DonationModalContext.Provider value={value}>
      {children}
      {open && <DonationModal onClose={closeDonationModal} />}
    </DonationModalContext.Provider>
  );
}

export default DonationModalProvider;

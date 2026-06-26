import { useCallback, useMemo, useState, type ReactNode } from "react";
import DonationModal from "./DonationModal";
import {
  DonationModalContext,
  type DonationProjectContext,
} from "./donationModalContext";

interface DonationModalProviderProps {
  children: ReactNode;
}

// Globális adomány-modal: bárhonnan megnyitható az openDonationModal() hívással.
// Opcionálisan átadható egy projekt-kontextus, ekkor az adomány a projekthez kötve indul.
function DonationModalProvider({ children }: DonationModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<DonationProjectContext | null>(null);

  const openDonationModal = useCallback((p?: DonationProjectContext) => {
    setProject(p ?? null);
    setOpen(true);
  }, []);
  const closeDonationModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openDonationModal }), [openDonationModal]);

  return (
    <DonationModalContext.Provider value={value}>
      {children}
      {open && <DonationModal project={project} onClose={closeDonationModal} />}
    </DonationModalContext.Provider>
  );
}

export default DonationModalProvider;

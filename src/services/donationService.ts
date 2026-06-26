import type {
  PaymentStatus,
  StartDonationRequest,
  StartDonationResponse,
  SupportTier,
} from "../types/donation";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Az általános (projekthez nem kötött) támogatási összegek a modalhoz.
export async function fetchGeneralSupportTiers(): Promise<SupportTier[]> {
  const res = await fetch(`${API_BASE}/web/support-tiers/general`);
  if (!res.ok) {
    throw new Error("Nem sikerült betölteni a támogatási összegeket.");
  }
  return res.json();
}

// Egy adott projekthez tartozó támogatási összegek.
export async function fetchProjectSupportTiers(
  projectPublicId: string,
): Promise<SupportTier[]> {
  const res = await fetch(
    `${API_BASE}/web/support-tiers/project/${projectPublicId}`,
  );
  if (!res.ok) {
    throw new Error("Nem sikerült betölteni a támogatási összegeket.");
  }
  return res.json();
}

// Adományfizetés kezdeményezése – a válasz paymentUrl-jére kell átirányítani (Barion).
export async function startDonation(
  payload: StartDonationRequest,
): Promise<StartDonationResponse> {
  const res = await fetch(`${API_BASE}/web/donations/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    // A backend 400 esetén { error: "<mező> ..." } formában válaszol
    let message = "Nem sikerült elindítani a fizetést. Kérjük, próbáld újra.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* nem JSON válasz – marad az általános üzenet */
    }
    throw new Error(message);
  }

  return res.json();
}

// Egy tranzakció státusza – a visszaigazoló képernyő ezt pollozza.
export async function fetchPaymentStatus(
  transactionPublicId: string,
): Promise<PaymentStatus> {
  const res = await fetch(
    `${API_BASE}/web/payments/${transactionPublicId}/status`,
  );
  if (!res.ok) {
    throw new Error("Nem sikerült lekérdezni a fizetés állapotát.");
  }
  return res.json();
}

import { useEffect, useState } from "react";
import {
  fetchGeneralSupportTiers,
  startDonation,
} from "../../services/donationService";
import {
  DONATION_TX_STORAGE_KEY,
  type SupportTier,
} from "../../types/donation";
import Toast, { type ToastData } from "./Toast";
import BarionPaymentBadge from "./BarionPaymentBadge";
import "./DonationModal.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface DonationModalProps {
  onClose: () => void;
}

type FieldErrors = {
  amount?: string;
  donorEmail?: string;
};

function formatHuf(amount: number): string {
  return `${amount.toLocaleString("hu-HU")} Ft`;
}

// A komponens csak nyitott állapotban van mountolva (ld. DonationModalProvider),
// így minden megnyitáskor friss állapottal indul – nincs szükség reset-effektre.
function DonationModal({ onClose }: DonationModalProps) {
  const [tiers, setTiers] = useState<SupportTier[]>([]);
  const [tiersLoading, setTiersLoading] = useState(true);

  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  // Escape bezárás
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  // Tierek betöltése mountkor (a setState csak async callbackben fut)
  useEffect(() => {
    let active = true;
    fetchGeneralSupportTiers()
      .then((data) => {
        if (active) setTiers(data);
      })
      .catch(() => {
        // A modal egyedi összeggel így is használható, csak a presetek hiányoznak
        if (active) setTiers([]);
      })
      .finally(() => {
        if (active) setTiersLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  // A kiválasztott tier összege vagy az egyedi összeg
  const selectedTier = tiers.find((t) => t.publicId === selectedTierId) ?? null;
  const effectiveAmount = selectedTier
    ? selectedTier.amount
    : Number.parseInt(customAmount, 10) || 0;

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (effectiveAmount <= 0) next.amount = "Adj meg egy összeget.";
    if (!donorEmail.trim()) next.donorEmail = "Add meg az e-mail címed.";
    else if (!EMAIL_REGEX.test(donorEmail.trim()))
      next.donorEmail = "Érvényes e-mail címet adj meg.";
    return next;
  };

  const errors: FieldErrors = submitted ? validate() : {};

  const selectTier = (tierId: string) => {
    setSelectedTierId(tierId);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (value: string) => {
    // csak számjegyek
    setCustomAmount(value.replace(/\D/g, ""));
    setSelectedTierId(null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(validate()).length > 0) return;

    setSubmitting(true);
    try {
      const res = await startDonation({
        projectPublicId: null,
        supportTierPublicId: selectedTier ? selectedTier.publicId : null,
        donorName: donorName.trim() || null,
        donorEmail: donorEmail.trim(),
        amount: effectiveAmount,
      });
      // a visszaigazoló oldal ezt olvassa a Barion redirect után
      sessionStorage.setItem(
        DONATION_TX_STORAGE_KEY,
        res.transactionPublicId,
      );
      window.location.assign(res.paymentUrl);
    } catch (err) {
      setSubmitting(false);
      setToast({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Nem sikerült elindítani a fizetést. Kérjük, próbáld újra.",
      });
    }
  };

  return (
    <div className="donation-modal__overlay" onClick={onClose}>
      <div
        className="donation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="donation-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="donation-modal__close"
          aria-label="Bezárás"
          onClick={onClose}
        >
          ×
        </button>

        <h2 id="donation-modal-title" className="donation-modal__title">
          Adományozok
        </h2>
        <p className="donation-modal__lead">
          Köszönjük, hogy támogatod az egyesület munkáját! Válassz egy összeget,
          vagy adj meg sajátot.
        </p>

        <form className="donation-modal__form" onSubmit={handleSubmit} noValidate>
          <div className="donation-modal__field">
            <span className="donation-modal__label">Összeg</span>

            {tiersLoading ? (
              <p className="donation-modal__loading">Összegek betöltése…</p>
            ) : (
              tiers.length > 0 && (
                <div className="donation-modal__tiers">
                  {tiers.map((tier) => (
                    <button
                      key={tier.publicId}
                      type="button"
                      className={`donation-modal__tier${
                        selectedTierId === tier.publicId
                          ? " donation-modal__tier--active"
                          : ""
                      }`}
                      onClick={() => selectTier(tier.publicId)}
                    >
                      <span className="donation-modal__tier-amount">
                        {formatHuf(tier.amount)}
                      </span>
                      <span className="donation-modal__tier-desc">
                        {tier.description}
                      </span>
                    </button>
                  ))}
                </div>
              )
            )}

            <div className="donation-modal__custom">
              <input
                className={`donation-modal__input donation-modal__input--amount${
                  errors.amount ? " donation-modal__input--error" : ""
                }`}
                type="text"
                inputMode="numeric"
                name="customAmount"
                placeholder="Egyedi összeg"
                value={customAmount}
                onChange={(e) => handleCustomAmountChange(e.target.value)}
              />
              <span className="donation-modal__custom-suffix">Ft</span>
            </div>
            {errors.amount && (
              <span className="donation-modal__fielderror">
                {errors.amount}
              </span>
            )}
          </div>

          <label className="donation-modal__field">
            <span className="donation-modal__label">Név (opcionális)</span>
            <input
              className="donation-modal__input"
              type="text"
              name="donorName"
              placeholder="Neved"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </label>

          <label className="donation-modal__field">
            <span className="donation-modal__label">
              E-mail cím
              <span className="donation-modal__required" aria-hidden="true">
                *
              </span>
            </span>
            <input
              required
              aria-required="true"
              className={`donation-modal__input${
                errors.donorEmail ? " donation-modal__input--error" : ""
              }`}
              type="email"
              name="donorEmail"
              placeholder="E-mail cím"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
            />
            {errors.donorEmail && (
              <span className="donation-modal__fielderror">
                {errors.donorEmail}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="donation-modal__submit"
            disabled={submitting}
          >
            {submitting
              ? "Átirányítás…"
              : effectiveAmount > 0
                ? `Adományozok ${formatHuf(effectiveAmount)}`
                : "Adományozok"}
          </button>
          <p className="donation-modal__note">
            A fizetés a Barion biztonságos felületén történik.
          </p>
          <BarionPaymentBadge className="barion-badge--modal" showNote={false} />
        </form>
      </div>

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  );
}

export default DonationModal;

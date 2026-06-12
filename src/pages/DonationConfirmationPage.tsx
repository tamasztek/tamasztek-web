import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import Seo from "../components/Seo";
import { fetchPaymentStatus } from "../services/donationService";
import { DONATION_TX_STORAGE_KEY } from "../types/donation";
import "../styles/renewd-tokens.css";
import "./DonationConfirmationPage.css";

type View = "loading" | "success" | "failed" | "timeout" | "missing";

const POLL_INTERVAL_MS = 3000;
const MAX_ATTEMPTS = 20; // ~60 másodperc

function DonationConfirmationPage() {
  // A tranzakció meglétét már az induló állapotban eldöntjük, így nincs
  // szinkron setState az effektben (react-hooks/set-state-in-effect).
  const [view, setView] = useState<View>(() =>
    sessionStorage.getItem(DONATION_TX_STORAGE_KEY) ? "loading" : "missing",
  );

  useEffect(() => {
    const transactionPublicId = sessionStorage.getItem(
      DONATION_TX_STORAGE_KEY,
    );
    if (!transactionPublicId) return;

    let active = true;
    let attempts = 0;
    let timer: number;

    const clearStored = () =>
      sessionStorage.removeItem(DONATION_TX_STORAGE_KEY);

    const poll = async () => {
      attempts += 1;
      try {
        const status = await fetchPaymentStatus(transactionPublicId);
        if (!active) return;

        if (status.donationStatus === "COMPLETED") {
          clearStored();
          setView("success");
          return;
        }
        if (
          status.donationStatus === "FAILED" ||
          status.donationStatus === "CANCELLED" ||
          status.transactionStatus === "FAILED" ||
          status.transactionStatus === "TIMEOUT"
        ) {
          clearStored();
          setView("failed");
          return;
        }
      } catch {
        // átmeneti hiba – próbálkozunk tovább a limitig
      }

      if (!active) return;
      if (attempts >= MAX_ATTEMPTS) {
        setView("timeout");
        return;
      }
      timer = window.setTimeout(poll, POLL_INTERVAL_MS);
    };

    poll();

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="donation-confirm">
      <Seo
        title="Adományozás visszaigazolás"
        description="A Támaszték Egyesület felé indított adomány állapota."
        path="/adomanyozas/visszajelzes"
      />
      <NavbarRenewd />
      <main className="donation-confirm__main">
        <div className="donation-confirm__content">
          {view === "loading" && (
            <>
              <div
                className="donation-confirm__spinner"
                aria-hidden="true"
              />
              <h1 className="donation-confirm__title">
                Fizetés ellenőrzése…
              </h1>
              <p className="donation-confirm__text">
                Kérjük, várj, amíg visszaigazoljuk az adományod. Ez néhány
                másodpercet vehet igénybe.
              </p>
            </>
          )}

          {view === "success" && (
            <>
              <span
                className="donation-confirm__icon donation-confirm__icon--success"
                aria-hidden="true"
              >
                ✓
              </span>
              <h1 className="donation-confirm__title">Köszönjük az adományod!</h1>
              <p className="donation-confirm__text">
                Az adományod megérkezett. A visszaigazolást elküldtük az általad
                megadott e-mail címre.
              </p>
            </>
          )}

          {view === "failed" && (
            <>
              <span
                className="donation-confirm__icon donation-confirm__icon--failed"
                aria-hidden="true"
              >
                ×
              </span>
              <h1 className="donation-confirm__title">A fizetés nem sikerült</h1>
              <p className="donation-confirm__text">
                Az adományozás megszakadt vagy nem sikerült. Kérjük, próbáld
                újra – ha a probléma továbbra is fennáll, vedd fel velünk a
                kapcsolatot.
              </p>
            </>
          )}

          {view === "timeout" && (
            <>
              <span
                className="donation-confirm__icon donation-confirm__icon--pending"
                aria-hidden="true"
              >
                …
              </span>
              <h1 className="donation-confirm__title">
                A visszaigazolás folyamatban
              </h1>
              <p className="donation-confirm__text">
                A fizetésed feldolgozása még tart. Amint elkészül, e-mailben
                értesítünk a visszaigazolásról.
              </p>
            </>
          )}

          {view === "missing" && (
            <>
              <h1 className="donation-confirm__title">
                Nincs folyamatban lévő adomány
              </h1>
              <p className="donation-confirm__text">
                Nem találtunk hozzád köthető fizetési tranzakciót. Ha
                adományozni szeretnél, indítsd el a főoldalról.
              </p>
            </>
          )}

          <Link to="/" className="donation-confirm__back">
            Vissza a főoldalra
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DonationConfirmationPage;

// Barion fizetési-logó sáv. A Barion elfogadóhely-követelménye szerint az elfogadott
// fizetési módok logóit (Barion, Visa, Mastercard, Maestro, stb.) változatlan formában
// fel kell tüntetni a főoldalon ÉS a fizetési oldalon. A kép a Barion hivatalos,
// módosítatlan kártyasávja (src/assets/barion/barion-card-strip-intl.svg).

import cardStrip from "../../assets/barion/barion-card-strip-intl.svg";
import "./BarionPaymentBadge.css";

interface BarionPaymentBadgeProps {
  /** Extra osztály a konténerre (pl. footer vs. modal elhelyezéshez). */
  className?: string;
  /** Megjelenjen-e a "Barion Payment Zrt." szöveges megjegyzés. */
  showNote?: boolean;
}

function BarionPaymentBadge({
  className = "",
  showNote = true,
}: BarionPaymentBadgeProps) {
  return (
    <div className={`barion-badge ${className}`.trim()}>
      <img
        src={cardStrip}
        alt="Elfogadott fizetési módok: Barion, Mastercard, Maestro, Visa"
        className="barion-badge__strip"
        loading="lazy"
      />
      {showNote && (
        <p className="barion-badge__note">
          A bankkártyás fizetést a{" "}
          <a
            href="https://www.barion.com/hu/adatvedelmi-tajekoztato/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Barion Payment Zrt.
          </a>{" "}
          biztosítja.
        </p>
      )}
    </div>
  );
}

export default BarionPaymentBadge;

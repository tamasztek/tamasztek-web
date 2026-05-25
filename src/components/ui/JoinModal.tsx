import { useEffect } from "react";
import "./JoinModal.css";

const CONTACT_EMAIL = "tamasztekegyesulet@gmail.com";

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
}

function JoinModal({ open, onClose }: JoinModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="join-modal__overlay" onClick={onClose}>
      <div
        className="join-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="join-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="join-modal__close"
          aria-label="Bezárás"
          onClick={onClose}
        >
          ×
        </button>
        <p id="join-modal-title" className="join-modal__lead">
          Örülünk, hogy csatlakozni szeretne egyesületünkhöz vagy
          programjainkhoz.
        </p>
        <p className="join-modal__text">
          Kérjük írjon nekünk egy üzenetet az alábbi e-mail címre:
        </p>
        <a className="join-modal__email" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </div>
  );
}

export default JoinModal;

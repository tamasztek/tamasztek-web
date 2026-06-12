import { useEffect } from "react";
import "./Toast.css";

export type ToastType = "success" | "error";

export interface ToastData {
  type: ToastType;
  message: string;
}

interface ToastProps {
  toast: ToastData;
  onClose: () => void;
  duration?: number;
}

function Toast({ toast, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [toast, onClose, duration]);

  return (
    <div className="toast-stack">
      <div
        className={`toast toast--${toast.type}`}
        role="status"
        aria-live="polite"
      >
        <span className="toast__icon" aria-hidden="true">
          {toast.type === "success" ? "✓" : "!"}
        </span>
        <p className="toast__message">{toast.message}</p>
        <button
          type="button"
          className="toast__close"
          aria-label="Bezárás"
          onClick={onClose}
        >
          ×
        </button>
      </div>
    </div>
  );
}

export default Toast;

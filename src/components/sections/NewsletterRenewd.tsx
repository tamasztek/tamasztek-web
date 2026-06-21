import { useState } from "react";
import { subscribeToNewsletter } from "../../services/newsletterService";
import Toast, { type ToastData } from "../ui/Toast";
import "./NewsletterRenewd.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  email?: string;
  gdpr?: string;
};

function NewsletterRenewd() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!email.trim()) next.email = "Add meg az e-mail címed.";
    else if (!EMAIL_REGEX.test(email.trim()))
      next.email = "Érvényes e-mail címet adj meg.";
    if (!gdprAccepted) next.gdpr = "Fogadd el az adatkezelési tájékoztatót.";
    return next;
  };

  // Az első küldési kísérlet után minden rendernél újravalidálunk.
  const errors: FieldErrors = submitted ? validate() : {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(validate()).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await subscribeToNewsletter(email.trim(), name.trim() || undefined);
      setToast({
        type: "success",
        message:
          "Köszönjük! A feliratkozás megerősítéséhez kattints a kiküldött e-mailben lévő linkre.",
      });
      setEmail("");
      setName("");
      setGdprAccepted(false);
      setSubmitted(false);
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Nem sikerült a feliratkozás. Kérjük, próbáld újra.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="home-renewd__newsletter" id="hirlevel">
      <div className="home-renewd__section-inner">
        <div className="home-renewd__newsletter-card">
          <div className="home-renewd__newsletter-intro">
            <h2 className="home-renewd__newsletter-title">
              Iratkozz fel hírlevelünkre!
            </h2>
            <p className="home-renewd__newsletter-lead">
              Értesülj elsőként programjainkról, híreinkről és arról, hogyan
              segíthetsz.
            </p>
          </div>

          <form
            className="home-renewd__newsletter-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="home-renewd__newsletter-fields">
              <label className="home-renewd__newsletter-field">
                <span className="home-renewd__newsletter-label">Név</span>
                <input
                  className="home-renewd__newsletter-input"
                  type="text"
                  name="name"
                  placeholder="Neved (opcionális)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label className="home-renewd__newsletter-field">
                <span className="home-renewd__newsletter-label">E-mail cím</span>
                <input
                  className={`home-renewd__newsletter-input${errors.email ? " home-renewd__newsletter-input--error" : ""}`}
                  type="email"
                  name="email"
                  placeholder="E-mail cím"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <span className="home-renewd__newsletter-fielderror">
                    {errors.email}
                  </span>
                )}
              </label>
            </div>

            <div className="home-renewd__newsletter-field home-renewd__newsletter-field--gdpr">
              <label className="home-renewd__newsletter-gdpr">
                <input
                  type="checkbox"
                  checked={gdprAccepted}
                  onChange={(e) => setGdprAccepted(e.target.checked)}
                />
                <span>
                  Elolvastam és elfogadom az{" "}
                  <a
                    className="home-renewd__newsletter-gdpr-link"
                    href="/adatvedelem"
                  >
                    adatkezelési tájékoztatót.
                  </a>
                </span>
              </label>
              {errors.gdpr && (
                <span className="home-renewd__newsletter-fielderror">
                  {errors.gdpr}
                </span>
              )}
            </div>

            <button
              className="home-renewd__newsletter-submit"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Feliratkozás…" : "Feliratkozom"}
            </button>
          </form>
        </div>
      </div>

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </section>
  );
}

export default NewsletterRenewd;

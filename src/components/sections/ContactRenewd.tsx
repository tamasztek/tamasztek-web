import { useState } from "react";
import { sendContactMessage } from "../../services/contactService";
import Toast, { type ToastData } from "../ui/Toast";
import kapcsolatImage from "../../assets/renewd/kapcsolat.png";
import "./ContactRenewd.css";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FieldErrors = {
  senderName?: string;
  senderEmail?: string;
  subject?: string;
  body?: string;
  gdpr?: string;
};

function ContactRenewd() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!senderName.trim()) next.senderName = "Add meg a teljes neved.";
    if (!senderEmail.trim()) next.senderEmail = "Add meg az e-mail címed.";
    else if (!EMAIL_REGEX.test(senderEmail.trim()))
      next.senderEmail = "Érvényes e-mail címet adj meg.";
    if (!subject.trim()) next.subject = "Add meg az üzenet tárgyát.";
    if (!body.trim()) next.body = "Írd meg az üzeneted.";
    if (!gdprAccepted) next.gdpr = "Fogadd el az adatkezelési tájékoztatót.";
    return next;
  };

  // Az első küldési kísérlet után minden rendernél (azaz minden gépelésre)
  // újravalidálunk – a hibák render közben származtatottak, nem state-ben élnek.
  const errors: FieldErrors = submitted ? validate() : {};

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(validate()).length > 0) {
      return;
    }

    setSubmitting(true);
    try {
      await sendContactMessage({
        senderName: senderName.trim(),
        senderEmail: senderEmail.trim(),
        subject: subject.trim(),
        body: body.trim(),
      });
      setToast({
        type: "success",
        message: "Köszönjük, üzeneted megérkezett! Hamarosan válaszolunk.",
      });
      setSenderName("");
      setSenderEmail("");
      setSubject("");
      setBody("");
      setGdprAccepted(false);
      setSubmitted(false);
    } catch (err) {
      setToast({
        type: "error",
        message:
          err instanceof Error
            ? err.message
            : "Nem sikerült elküldeni az üzenetet. Kérjük, próbáld újra.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="home-renewd__contact" id="kapcsolat">
      <div className="home-renewd__section-inner">
        <div className="home-renewd__contact-grid">
          <div className="home-renewd__contact-aside">
            <img
              className="home-renewd__contact-image"
              src={kapcsolatImage}
              alt="Mosolygó önkéntesek csoportja"
            />
            <p className="home-renewd__contact-lead">
              Gyere, vegyél részt programjainkon, vagy legyél önkéntesünk!
            </p>
          </div>

          <div className="home-renewd__contact-main">
            <h2 className="home-renewd__contact-title">Írj nekünk!</h2>

            <form
              className="home-renewd__contact-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <label className="home-renewd__contact-field">
                <span className="home-renewd__contact-label">Teljes név</span>
                <input
                  className={`home-renewd__contact-input${errors.senderName ? " home-renewd__contact-input--error" : ""}`}
                  type="text"
                  name="senderName"
                  placeholder="Teljes név"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
                {errors.senderName && (
                  <span className="home-renewd__contact-fielderror">
                    {errors.senderName}
                  </span>
                )}
              </label>

              <label className="home-renewd__contact-field">
                <span className="home-renewd__contact-label">E-mail cím</span>
                <input
                  className={`home-renewd__contact-input${errors.senderEmail ? " home-renewd__contact-input--error" : ""}`}
                  type="email"
                  name="senderEmail"
                  placeholder="E-mail cím"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
                {errors.senderEmail && (
                  <span className="home-renewd__contact-fielderror">
                    {errors.senderEmail}
                  </span>
                )}
              </label>

              <label className="home-renewd__contact-field">
                <span className="home-renewd__contact-label">Tárgy</span>
                <input
                  className={`home-renewd__contact-input${errors.subject ? " home-renewd__contact-input--error" : ""}`}
                  type="text"
                  name="subject"
                  placeholder="Tárgy"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                {errors.subject && (
                  <span className="home-renewd__contact-fielderror">
                    {errors.subject}
                  </span>
                )}
              </label>

              <label className="home-renewd__contact-field">
                <span className="home-renewd__contact-label">Üzenet</span>
                <textarea
                  className={`home-renewd__contact-input home-renewd__contact-textarea${errors.body ? " home-renewd__contact-input--error" : ""}`}
                  name="body"
                  placeholder="Üzenet"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                {errors.body && (
                  <span className="home-renewd__contact-fielderror">
                    {errors.body}
                  </span>
                )}
              </label>

              <div className="home-renewd__contact-field home-renewd__contact-field--gdpr">
                <label className="home-renewd__contact-gdpr">
                  <input
                    type="checkbox"
                    checked={gdprAccepted}
                    onChange={(e) => setGdprAccepted(e.target.checked)}
                  />
                  <span>
                    Elolvastam és elfogadom az{" "}
                    <a
                      className="home-renewd__contact-gdpr-link"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      adatkezelési tájékoztatót.
                    </a>
                  </span>
                </label>
                {errors.gdpr && (
                  <span className="home-renewd__contact-fielderror">
                    {errors.gdpr}
                  </span>
                )}
              </div>

              <button
                className="home-renewd__contact-submit"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Küldés…" : "Küldés"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </section>
  );
}

export default ContactRenewd;

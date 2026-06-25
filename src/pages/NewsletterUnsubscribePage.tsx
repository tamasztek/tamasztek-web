import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import { unsubscribeFromNewsletter } from "../services/newsletterService";
import "../styles/renewd-tokens.css";
import "./NewsletterStatusPage.css";

type Status = "confirm" | "loading" | "success" | "error";

function NewsletterUnsubscribePage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>(token ? "confirm" : "error");
  const [message, setMessage] = useState(
    token ? "" : "Hiányzó leiratkozó token.",
  );

  const handleUnsubscribe = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      await unsubscribeFromNewsletter(token);
      setStatus("success");
      setMessage("Sikeresen leiratkoztál a hírlevélről.");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "A leiratkozó link érvénytelen.",
      );
    }
  };

  return (
    <div className="home-renewd">
      <NavbarRenewd />
      <main>
        <section className="newsletter-status">
          <div className="newsletter-status__card">
            {status === "confirm" && (
              <>
                <h1 className="newsletter-status__title">
                  Leiratkozás a hírlevélről
                </h1>
                <p className="newsletter-status__text">
                  Biztosan le szeretnél iratkozni a Tamaszték Egyesület
                  hírleveléről?
                </p>
                <button
                  className="newsletter-status__button"
                  type="button"
                  onClick={handleUnsubscribe}
                >
                  Igen, leiratkozom
                </button>
                <Link className="newsletter-status__link" to="/">
                  Mégsem, vissza a főoldalra
                </Link>
              </>
            )}
            {status === "loading" && (
              <p className="newsletter-status__text">Leiratkozás folyamatban…</p>
            )}
            {(status === "success" || status === "error") && (
              <>
                <h1 className="newsletter-status__title">
                  {status === "success"
                    ? "Leiratkoztál"
                    : "Hoppá, valami nem stimmel"}
                </h1>
                <p className="newsletter-status__text">{message}</p>
                <Link className="newsletter-status__button" to="/">
                  Vissza a főoldalra
                </Link>
              </>
            )}
          </div>
        </section>
      </main>
      <FooterRenewd />
    </div>
  );
}

export default NewsletterUnsubscribePage;

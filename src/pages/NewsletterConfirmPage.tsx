import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import { confirmNewsletter } from "../services/newsletterService";
import "../styles/renewd-tokens.css";
import "./NewsletterStatusPage.css";

type Status = "loading" | "success" | "error";

function NewsletterConfirmPage() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [status, setStatus] = useState<Status>(token ? "loading" : "error");
  const [message, setMessage] = useState(
    token ? "" : "Hiányzó megerősítő token.",
  );
  const ran = useRef(false);

  useEffect(() => {
    if (!token || ran.current) return;
    ran.current = true;

    confirmNewsletter(token)
      .then(() => {
        setStatus("success");
        setMessage("Köszönjük! A hírlevél-feliratkozásodat megerősítetted.");
      })
      .catch((err: unknown) => {
        setStatus("error");
        setMessage(
          err instanceof Error
            ? err.message
            : "A megerősítő link érvénytelen vagy lejárt.",
        );
      });
  }, [token]);

  return (
    <div className="home-renewd">
      <NavbarRenewd />
      <main>
        <section className="newsletter-status">
          <div className="newsletter-status__card">
            {status === "loading" && (
              <p className="newsletter-status__text">Megerősítés folyamatban…</p>
            )}
            {status !== "loading" && (
              <>
                <h1 className="newsletter-status__title">
                  {status === "success"
                    ? "Sikeres megerősítés"
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

export default NewsletterConfirmPage;

import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import "../styles/renewd-tokens.css";
import "./DonatePage.css";

const CONTACT_EMAIL = "tamasztekegyesulet@gmail.com";

function DonatePage() {
  return (
    <div className="donate-page">
      <NavbarRenewd />
      <main className="donate-page__main">
        <div className="donate-page__content">
          <p className="donate-page__lead">
            Köszönjük, hogy támogatni szeretné egyesületünket.
          </p>
          <p className="donate-page__text">
            Az oldal még nem tartalmaz fizetési funkciót, de hamarosan az is
            megvalósul!
          </p>
          <p className="donate-page__text">
            Kérjük, addig is vegye fel velünk a kapcsolatot az alábbi e-mail
            címen:
          </p>
          <a className="donate-page__email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
          <Link to="/" className="donate-page__back">
            Vissza a főoldalra
          </Link>
        </div>
      </main>
    </div>
  );
}

export default DonatePage;

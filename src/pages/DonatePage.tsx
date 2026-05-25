import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import Seo from "../components/Seo";
import "../styles/renewd-tokens.css";
import "./DonatePage.css";

const CONTACT_EMAIL = "tamasztekegyesulet@gmail.com";

function DonatePage() {
  return (
    <div className="donate-page">
      <Seo
        title="Adományozás"
        description="Támogassa a Támaszték Egyesület munkáját adományával. Vegye fel velünk a kapcsolatot, és segítsen, hogy összefoghassunk az emberekért és a teremtett világért."
        path="/adomanyozas"
      />
      <NavbarRenewd />
      <main className="donate-page__main">
        <div className="donate-page__content">
          <h1 className="donate-page__title">Adományozás</h1>
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

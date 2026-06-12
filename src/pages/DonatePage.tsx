import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import Seo from "../components/Seo";
import { useDonationModal } from "../components/ui/donationModalContext";
import arrowIcon from "../assets/renewd/arrow-icon.svg";
import "../styles/renewd-tokens.css";
import "./DonatePage.css";

const CONTACT_EMAIL = "tamasztekegyesulet@gmail.com";

function DonatePage() {
  const { openDonationModal } = useDonationModal();
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
            Adományával hozzájárul ahhoz, hogy még több közösség és program
            születhessen. A fizetés a Barion biztonságos felületén keresztül
            történik.
          </p>
          <button
            type="button"
            className="donate-page__cta"
            onClick={openDonationModal}
          >
            <span>Adományozok</span>
            <img src={arrowIcon} alt="" className="donate-page__cta-arrow" />
          </button>
          <p className="donate-page__text donate-page__text--small">
            Kérdése van? Vegye fel velünk a kapcsolatot:
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

import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import "../styles/renewd-tokens.css";
import "./NotFoundPage.css";

function NotFoundPage() {
  return (
    <div className="notfound-page">
      <NavbarRenewd />
      <main className="notfound-page__main">
        <div className="notfound-page__content">
          <p className="notfound-page__code">404</p>
          <p className="notfound-page__lead">Ez az oldal nem található.</p>
          <p className="notfound-page__text">
            Lehet, hogy elköltözött, vagy sosem létezett. De ne aggódjon, a
            főoldalon minden a helyén van!
          </p>
          <Link to="/" className="notfound-page__back">
            Vissza a főoldalra
          </Link>
        </div>
      </main>
    </div>
  );
}

export default NotFoundPage;

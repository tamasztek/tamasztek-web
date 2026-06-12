import NavbarRenewd from "../components/layout/NavbarRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import Seo from "../components/Seo";
import { openCookiePreferences } from "../consent/initConsent";
import "../styles/renewd-tokens.css";
import "./CookiePolicyPage.css";

function CookiePolicyPage() {
  return (
    <div className="cookie-policy-page">
      <Seo title="Sütitájékoztató" path="/adatvedelem" />
      <NavbarRenewd />
      <main className="cookie-policy-page__main">
        <div className="cookie-policy-page__content">
          <h1 className="cookie-policy-page__title">Sütitájékoztató</h1>
          <p className="cookie-policy-page__intro">
            Ez a tájékoztató összefoglalja, milyen sütiket és hasonló technológiákat
            használ a Támaszték Egyesület weboldala, és milyen célból. A nem feltétlenül
            szükséges sütik csak az előzetes hozzájárulásoddal töltődnek be.
          </p>

          <section className="cookie-policy-page__section">
            <h2>Feltétlenül szükséges</h2>
            <p>
              Az oldal alapvető működéséhez nélkülözhetetlen technológiák. Ide tartozik a
              hozzájárulási beállításod tárolása (a böngésződ helyi tárolójában), valamint
              az anonim, <strong>cookieless</strong> látogatottság-mérés (Umami), amely
              nem gyűjt személyes adatot és nem alkalmas egyedi azonosításra. Ezek nem
              kapcsolhatók ki.
            </p>
          </section>

          <section className="cookie-policy-page__section">
            <h2>Fizetésvédelem – Barion Pixel</h2>
            <p>
              Az adományozáshoz a <strong>Barion</strong> biztonságos kártyás
              fizetési szolgáltatását használjuk. A Barion Pixel a csalásszűrést és az
              erős ügyfél-hitelesítés (SCA) alóli mentességet szolgálja, ami
              gördülékenyebbé teszi a fizetést. Ez a süti viselkedési adatot gyűjthet,
              ezért csak a hozzájárulásoddal töltődik be.
            </p>
            <p>
              Ha nem járulsz hozzá, továbbra is tudsz adományozni – a fizetés során
              azonban előfordulhat néhány extra hitelesítési lépés. A Barion
              adatkezeléséről a{" "}
              <a
                href="https://www.barion.com/hu/altalanos-szerzodesi-feltetelek/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Barion weboldalán
              </a>{" "}
              olvashatsz.
            </p>
          </section>

          <section className="cookie-policy-page__section">
            <h2>Hozzájárulásod módosítása</h2>
            <p>
              A süti beállításaidat bármikor megváltoztathatod vagy visszavonhatod.
            </p>
            <button
              type="button"
              className="cookie-policy-page__manage-btn"
              onClick={openCookiePreferences}
            >
              Süti beállítások megnyitása
            </button>
          </section>
        </div>
      </main>
      <FooterRenewd />
    </div>
  );
}

export default CookiePolicyPage;

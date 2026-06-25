import { Link } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import Seo from "../components/Seo";
import { openCookiePreferences } from "../consent/initConsent";
import "../styles/renewd-tokens.css";
import "./PrivacyPolicyPage.css";

/** Kiemelt placeholder – ide a felhasználó tölt majd valós adatot. */
function Ph({ children }: { children: React.ReactNode }) {
  return <mark className="privacy-policy-page__placeholder">{children}</mark>;
}

function PrivacyPolicyPage() {
  return (
    <div className="privacy-policy-page">
      <Seo title="Adatkezelési tájékoztató" path="/adatvedelem" />
      <NavbarRenewd />
      <main className="privacy-policy-page__main">
        <div className="privacy-policy-page__content">
          <h1 className="privacy-policy-page__title">Adatkezelési tájékoztató</h1>
          <p className="privacy-policy-page__intro">
            Ez a tájékoztató a Támaszték Egyesület weboldalán keresztül megvalósuló
            személyesadat-kezelésekről nyújt tájékoztatást az Európai Parlament és a Tanács
            (EU) 2016/679 rendelete (GDPR), valamint az információs önrendelkezési jogról és
            az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) alapján.
          </p>
          <p className="privacy-policy-page__updated">
            Hatályos: <Ph>[dátum, pl. 2026.&nbsp;01.&nbsp;01.]</Ph>
          </p>

          {/* 1. Az adatkezelő */}
          <section className="privacy-policy-page__section">
            <h2>1. Az adatkezelő</h2>
            <ul>
              <li>
                <strong>Megnevezés:</strong> Támaszték Egyesület
              </li>
              <li>
                <strong>Székhely:</strong> <Ph>[székhely teljes címe]</Ph>
              </li>
              <li>
                <strong>Nyilvántartási / bírósági szám:</strong>{" "}
                <Ph>[egyesület nyilvántartási száma]</Ph>
              </li>
              <li>
                <strong>Adószám:</strong> 19290285105
              </li>
              <li>
                <strong>Képviselő:</strong> <Ph>[képviselő neve]</Ph>
              </li>
              <li>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:tamasztekegyesulet@gmail.com">
                  tamasztekegyesulet@gmail.com
                </a>
              </li>
              <li>
                <strong>Telefon:</strong> <Ph>[telefonszám, ha van]</Ph>
              </li>
            </ul>
            <p>
              Az egyesület nem nevezett ki adatvédelmi tisztviselőt (DPO), mert ezt
              jogszabály nem írja elő számára.
            </p>
          </section>

          {/* 2. Alapelvek és jogszabályi háttér */}
          <section className="privacy-policy-page__section">
            <h2>2. A tájékoztató célja és a jogszabályi háttér</h2>
            <p>
              Személyes adataidat tisztességesen és átláthatóan, célhoz kötötten, a
              szükséges mértékre korlátozva, biztonságosan kezeljük. Adatkezelésünk a GDPR
              és az Infotv. rendelkezésein alapul. Az alábbiakban tevékenységenként
              ismertetjük, milyen adatot, milyen célból, milyen jogalapon és meddig kezelünk.
            </p>
          </section>

          {/* 3. Az egyes adatkezelések */}
          <section className="privacy-policy-page__section">
            <h2>3. Az egyes adatkezelések</h2>

            <h3>3.1. Kapcsolatfelvétel (kapcsolati űrlap)</h3>
            <ul>
              <li>
                <strong>Kezelt adatok:</strong> név, e-mail-cím, az üzenet tartalma.
              </li>
              <li>
                <strong>Az adatkezelés célja:</strong> a megkeresésed megválaszolása,
                kapcsolattartás.
              </li>
              <li>
                <strong>Jogalap:</strong> a hozzájárulásod (GDPR 6. cikk (1) a) pont).
              </li>
              <li>
                <strong>Megőrzési idő:</strong>{" "}
                <Ph>[pl. az ügy lezárását követő 1 év]</Ph>.
              </li>
            </ul>

            <h3>3.2. Hírlevél</h3>
            <ul>
              <li>
                <strong>Kezelt adatok:</strong> e-mail-cím (megerősítéses, „double opt-in”
                feliratkozás).
              </li>
              <li>
                <strong>Az adatkezelés célja:</strong> az egyesület híreiről, eseményeiről
                szóló tájékoztatás küldése.
              </li>
              <li>
                <strong>Jogalap:</strong> a hozzájárulásod (GDPR 6. cikk (1) a) pont).
              </li>
              <li>
                <strong>Megőrzési idő:</strong> a hozzájárulásod visszavonásáig
                (leiratkozásig). Minden hírlevélben elérhető a leiratkozás lehetősége.
              </li>
            </ul>

            <h3>3.3. Adományozás (online bankkártyás fizetés)</h3>
            <ul>
              <li>
                <strong>Kezelt adatok:</strong>{" "}
                <Ph>[az adományozási űrlap által gyűjtött adatok – pl. név, e-mail-cím, az adomány összege]</Ph>
                . A bankkártya adatait <strong>nem</strong> ismerjük meg, azokat közvetlenül
                a fizetési szolgáltató kezeli.
              </li>
              <li>
                <strong>Az adatkezelés célja:</strong> az adomány fogadása, a tranzakció
                lebonyolítása, valamint a számviteli kötelezettségek teljesítése.
              </li>
              <li>
                <strong>Jogalap:</strong> szerződés teljesítése (GDPR 6. cikk (1) b) pont),
                a számviteli bizonylatok tekintetében jogi kötelezettség teljesítése (GDPR
                6. cikk (1) c) pont).
              </li>
              <li>
                <strong>Megőrzési idő:</strong> a számvitelről szóló 2000. évi C. törvény
                alapján a számviteli bizonylatokat 8 évig őrizzük meg.
              </li>
            </ul>

            <h3>3.4. Látogatottság-mérés (Umami)</h3>
            <p>
              Weboldalunk anonim, <strong>cookieless</strong> látogatottság-mérést használ
              (Umami). Ez nem gyűjt személyes adatot és nem alkalmas egyedi azonosításra,
              ezért e körben személyesadat-kezelés nem valósul meg.
            </p>

            <h3>3.5. Sütik (cookie-k)</h3>
            <p>
              A weboldal sütijeiről és hasonló technológiáiról külön dokumentum, a{" "}
              <Link to="/sutitajekoztato">Sütitájékoztató</Link> rendelkezik. A nem
              feltétlenül szükséges sütik csak az előzetes hozzájárulásoddal töltődnek be, és
              beállításaidat bármikor módosíthatod:
            </p>
            <button
              type="button"
              className="privacy-policy-page__manage-btn"
              onClick={openCookiePreferences}
            >
              Süti beállítások megnyitása
            </button>
          </section>

          {/* 4. Adatfeldolgozók */}
          <section className="privacy-policy-page__section">
            <h2>4. Adatfeldolgozók és címzettek</h2>
            <p>
              Adataid kezeléséhez az alábbi szolgáltatókat vesszük igénybe. Az adatfeldolgozók
              az adatokat kizárólag az utasításaink szerint, a megjelölt célból kezelik.
            </p>
            <ul>
              <li>
                <strong>Barion Payment Zrt.</strong> – online bankkártyás fizetés
                lebonyolítása. A Barion a Magyar Nemzeti Bank felügyelete alatt álló intézmény
                (engedélyszám: H-EN-I-1064/2013). Részletek a{" "}
                <a
                  href="https://www.barion.com/hu/adatvedelmi-tajekoztato/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Barion adatkezelési tájékoztatójában
                </a>
                .
              </li>
              <li>
                <strong>Tárhely-/hostingszolgáltató:</strong>{" "}
                <Ph>[szolgáltató neve, székhelye, ország]</Ph> – a weboldal és adatainak
                tárolása.
              </li>
              <li>
                <strong>Hírlevél-/e-mail-szolgáltató:</strong>{" "}
                <Ph>[szolgáltató neve, ha külső rendszert használtok]</Ph> – a hírlevelek
                kiküldése.
              </li>
              <li>
                <strong>Umami:</strong> saját üzemeltetésű, anonim látogatottság-mérés
                (külső adatfeldolgozó nélkül).
              </li>
            </ul>
          </section>

          {/* 5. Harmadik ország */}
          <section className="privacy-policy-page__section">
            <h2>5. Adattovábbítás harmadik országba</h2>
            <p>
              <Ph>
                [Ha nincs EU-n kívüli adattovábbítás: „Személyes adataidat nem továbbítjuk az
                Európai Gazdasági Térségen kívülre.” Ha van, itt kell megnevezni a célországot
                és a garanciákat (pl. megfelelőségi határozat, általános szerződési feltételek).]
              </Ph>
            </p>
          </section>

          {/* 6. Adatbiztonság */}
          <section className="privacy-policy-page__section">
            <h2>6. Adatbiztonság</h2>
            <p>
              Megfelelő technikai és szervezési intézkedéseket alkalmazunk az adatok
              védelmére a jogosulatlan hozzáférés, megváltoztatás, továbbítás,
              nyilvánosságra hozatal, törlés vagy megsemmisülés ellen. A weboldal titkosított
              (HTTPS) kapcsolaton érhető el.
            </p>
          </section>

          {/* 7. Érintetti jogok */}
          <section className="privacy-policy-page__section">
            <h2>7. Az érintett jogai</h2>
            <p>A vonatkozó jogszabályok alapján az alábbi jogok illetnek meg:</p>
            <ul>
              <li>tájékoztatáshoz és hozzáféréshez való jog;</li>
              <li>helyesbítéshez való jog;</li>
              <li>törléshez való jog („az elfeledtetéshez való jog”);</li>
              <li>az adatkezelés korlátozásához való jog;</li>
              <li>adathordozhatósághoz való jog;</li>
              <li>tiltakozáshoz való jog;</li>
              <li>
                a hozzájáruláson alapuló adatkezelés esetén a hozzájárulás bármikori,
                díjmentes visszavonásához való jog (ez nem érinti a visszavonás előtti
                adatkezelés jogszerűségét).
              </li>
            </ul>
            <p>
              Jogaid gyakorlására vonatkozó kérelmedet a{" "}
              <a href="mailto:tamasztekegyesulet@gmail.com">
                tamasztekegyesulet@gmail.com
              </a>{" "}
              címen jelezheted. Kérelmedre indokolatlan késedelem nélkül, de legkésőbb egy
              hónapon belül válaszolunk.
            </p>
          </section>

          {/* 8. Jogorvoslat */}
          <section className="privacy-policy-page__section">
            <h2>8. Jogorvoslati lehetőségek</h2>
            <p>
              Ha úgy ítéled meg, hogy adatkezelésünk sérti a jogszabályokat, panaszt tehetsz
              a felügyeleti hatóságnál:
            </p>
            <ul>
              <li>
                <strong>
                  Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH)
                </strong>
              </li>
              <li>Cím: 1055 Budapest, Falk Miksa utca 9–11.</li>
              <li>Levelezési cím: 1363 Budapest, Pf. 9.</li>
              <li>
                E-mail:{" "}
                <a href="mailto:ugyfelszolgalat@naih.hu">ugyfelszolgalat@naih.hu</a>
              </li>
              <li>
                Honlap:{" "}
                <a href="https://naih.hu" target="_blank" rel="noopener noreferrer">
                  naih.hu
                </a>
              </li>
            </ul>
            <p>
              Jogaid megsértése esetén bírósághoz is fordulhatsz; a per a lakóhelyed vagy
              tartózkodási helyed szerinti törvényszék előtt is megindítható.
            </p>
          </section>

          {/* 9. Hatály és módosítás */}
          <section className="privacy-policy-page__section">
            <h2>9. A tájékoztató hatálya és módosítása</h2>
            <p>
              Jelen tájékoztató <Ph>[dátum]</Ph> napjától hatályos. Az egyesület fenntartja a
              jogot, hogy a tájékoztatót egyoldalúan módosítsa; a mindenkor hatályos változat
              ezen az oldalon érhető el.
            </p>
          </section>
        </div>
      </main>
      <FooterRenewd />
    </div>
  );
}

export default PrivacyPolicyPage;

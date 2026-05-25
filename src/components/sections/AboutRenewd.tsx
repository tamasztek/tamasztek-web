import profilePhoto from "../../assets/renewd/profile.png";
import "./AboutRenewd.css";

function AboutRenewd() {
  return (
    <section className="home-renewd__about" id="about">
      <div className="home-renewd__section-inner">
        <div className="home-renewd__about-profile">
          <div
            className="home-renewd__profile"
            style={{
              backgroundImage: `url(${profilePhoto})`,
            }}
          />
          <div className="home-renewd__profile-caption">
            <p className="home-renewd__profile-name">Debreceni Zoltán</p>
            <p className="home-renewd__profile-role">egyesületi elnök</p>
          </div>
        </div>

        <h2 className="home-renewd__about-title">Kik vagyunk mi?</h2>
        <div className="home-renewd__about-text">
          <p className="home-renewd__about-paragraph">
            A Covid–19 időszaka sokunk számára fájdalmasan megmutatta, milyen
            törékennyé válhatnak az emberi kapcsolatok. Bezárultak az ajtók,
            elcsendesedtek a közösségi terek, egyre több ember maradt magára
            félelmekkel, bizonytalansággal és kimondatlan terhekkel. Akkor
            kezdtük igazán érezni, mennyire szükségünk van egymásra:
            beszélgetésekre, közösségekre, kapaszkodókra, emberi jelenlétre.
          </p>

          <p className="home-renewd__about-paragraph">
            Ebben az időszakban láttuk meg a lehetőséget a Gyökerek és Szárnyak
            Alapítvány Kisváros programjában, amelynek támogatásával elindult
            szervezetünk fejlődése és közösségépítő munkája. A program szakmai
            segítséget, bátorítást és új szemléletet adott ahhoz, hogy a bennünk
            megszülető gondolatokból valódi civil közösség formálódhasson.
          </p>

          <p className="home-renewd__about-paragraph">
            A TámaszTÉK Egyesület egy olyan civil közösség, amely a
            közösségépítés, az emberi kapcsolatok erősítése és a keresztény
            értékek továbbadása mentén jött létre. Célunk, hogy a
            Kárpát-medencében élő gyermekek, családok, idősek és nehéz helyzetben
            élők számára valódi közösségi kapaszkodókat teremtsünk.
          </p>

          <p className="home-renewd__about-paragraph">
            Hiszünk abban, hogy a társadalmi érzékenység, a szociális
            segítségnyújtás és a közösségi jelenlét képes reményt adni ott is,
            ahol sokszor már csak a magány és a bezárkózás maradna.
            Programjainkkal támogatjuk a gyermekeket, a fiatalokat, a családokat
            és az időseket, miközben fontosnak tartjuk az önkéntesség, az
            összefogás és az emberi méltóság erősítését.
          </p>

          <p className="home-renewd__about-paragraph">
            Kiemelten fontos számunkra a teremtésvédelem és a klímatudatos
            szemlélet formálása is. Közösségi kertjeinkkel, faültetéseinkkel,
            környezetvédelmi programjainkkal és fenntarthatósági
            kezdeményezéseinkkel szeretnénk élhetőbb, zöldebb és felelősebb jövőt
            építeni a következő generációk számára.
          </p>

          <p className="home-renewd__about-paragraph">
            Az elmúlt években táborokat, közösségi programokat, lelki alkalmakat,
            kulturális eseményeket, érzékenyítő és családtámogató
            kezdeményezéseket valósítottunk meg, sok önkéntes és támogató
            segítségével. Külön öröm számunkra, hogy egyre több ember kapcsolódik
            hozzánk, és együtt tapasztalhatjuk meg: a közösség valóban képes
            életeket formálni.
          </p>

          <p className="home-renewd__about-paragraph">
            A jövőben is szeretnénk fontos ügyek mellé állni, támogatni a helyi
            közösségeket, hidakat építeni generációk és emberek között, és
            megmutatni, hogy egy civil közösség szakmaisággal, odafigyeléssel és
            szívvel is tud értéket teremteni.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutRenewd;

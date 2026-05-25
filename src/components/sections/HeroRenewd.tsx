import { useState } from "react";
import { Link } from "react-router-dom";
import heroVillage from "../../assets/renewd/hero_image.webp";
import heroVillageMobile from "../../assets/renewd/hero_image_mobile.webp";
import heroHandwriteArrow from "../../assets/renewd/arrow-downward_2.svg";
import arrowIcon from "../../assets/renewd/arrow-icon.svg";
import handshakeIcon from "../../assets/renewd/handshake-icon.png";
import JoinModal from "../ui/JoinModal";
import "./HeroRenewd.css";

function HeroRenewd() {
  const [joinOpen, setJoinOpen] = useState(false);

  const scrollToNews = () => {
    document
      .getElementById("news")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="home-renewd__hero">
      <div className="home-renewd__section-inner">
        <picture className="home-renewd__hero-illu">
          <source media="(max-width: 768px)" srcSet={heroVillageMobile} />
          <img src={heroVillage} alt="Támaszték falu illusztráció" />
        </picture>

        <div className="home-renewd__hero-content">
          <div className="home-renewd__hero-text">
            <h1 className="home-renewd__hero-title">Támaszték Egyesület</h1>
            <h2 className="home-renewd__hero-subtitle">
              Hit. Közösség. Cselekvés.
            </h2>
            <p className="home-renewd__hero-lead">
              Összefogunk az emberekért
              <br />
              és a teremtett világért.
            </p>
          </div>

          <div className="home-renewd__hero-actions">
            <Link to="/adomanyozas" className="hr-btn hr-btn--donate hr-btn--lg">
              <span>Adományozok</span>
              <img src={arrowIcon} alt="" className="hr-btn__arrow" />
            </Link>
            <button
              type="button"
              className="hr-btn hr-btn--join hr-btn--lg"
              onClick={() => setJoinOpen(true)}
            >
              <span className="hr-btn__inner">
                <img src={handshakeIcon} alt="" className="hr-btn__icon" />
                <span>Csatlakozom</span>
              </span>
              <img src={arrowIcon} alt="" className="hr-btn__arrow" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="home-renewd__hero-handwrite"
          onClick={scrollToNews}
        >
          Nézd meg aktuális híreinket!
        </button>
        <img
          src={heroHandwriteArrow}
          alt=""
          className="home-renewd__hero-handwrite-arrow"
          onClick={scrollToNews}
        />
      </div>

      <JoinModal open={joinOpen} onClose={() => setJoinOpen(false)} />
    </section>
  );
}

export default HeroRenewd;

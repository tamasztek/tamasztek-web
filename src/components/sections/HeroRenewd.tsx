import heroVillage from "../../assets/renewd/hero_image.png";
import heroVillageMobile from "../../assets/renewd/hero_image_mobile.png";
import heroHandwriteArrow from "../../assets/renewd/arrow_downward.svg";
import arrowIcon from "../../assets/renewd/arrow-icon.svg";
import handshakeIcon from "../../assets/renewd/handshake-icon.png";
import "./HeroRenewd.css";

function HeroRenewd() {
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
            <a href="#donate" className="hr-btn hr-btn--donate hr-btn--lg">
              <span>Adományozok</span>
              <img src={arrowIcon} alt="" className="hr-btn__arrow" />
            </a>
            <a href="#join" className="hr-btn hr-btn--join hr-btn--lg">
              <span className="hr-btn__inner">
                <img src={handshakeIcon} alt="" className="hr-btn__icon" />
                <span>Csatlakozom</span>
              </span>
              <img src={arrowIcon} alt="" className="hr-btn__arrow" />
            </a>
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
    </section>
  );
}

export default HeroRenewd;

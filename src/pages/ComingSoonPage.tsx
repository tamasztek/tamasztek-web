import heroBg from "../assets/hero_3.png";
import mobileHeroBg from "../assets/cropped_mobile.png";
import mobileHeroBgWebp from "../assets/cropped_mobile.webp";
import logo from "../assets/logo.png";
import "./ComingSoonPage.css";

const ComingSoonPage: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-bg">
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet={mobileHeroBgWebp}
            type="image/webp"
          />
          <source media="(max-width: 768px)" srcSet={mobileHeroBg} />
          {/*<source srcSet={heroBgWebp} type="image/webp" />*/}
          <img src={heroBg} alt="" aria-hidden="true" fetchPriority="high" />
        </picture>
      </div>

      <nav className="coming-soon-nav" aria-label="Főnavigáció">
        <div className="coming-soon-nav__brand">
            <img src={logo} alt="TámaszTÉK Egyesület" className="coming-soon-nav__logo" />
          </div>
      </nav>

      <main className="coming-soon-main">
        <div className="coming-soon-content">
          <h1 className="coming-soon-title">
            Hamarosan
            <br />
            <span className="coming-soon-title--accent">találkozunk!</span>
          </h1>
          <p className="coming-soon-subtitle">
            Dolgozunk az oldalon — nemsokára minden elérhető lesz.
          </p>
        </div>
      </main>
    </div>
  );
};

export default ComingSoonPage;

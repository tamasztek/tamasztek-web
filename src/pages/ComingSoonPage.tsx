import heroBg from "../assets/hero.png";
import mobileHeroBg from "../assets/mobile_hero.png";
import "./ComingSoonPage.css";

const ComingSoonPage: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-bg">
        <picture>
          <source media="(max-width: 768px)" srcSet={mobileHeroBg} />
          <img src={heroBg} alt="" aria-hidden="true" />
        </picture>
      </div>

      <nav className="coming-soon-nav" aria-label="Főnavigáció">
        <div className="coming-soon-nav__brand">TámaszTÉK Egyesület</div>
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

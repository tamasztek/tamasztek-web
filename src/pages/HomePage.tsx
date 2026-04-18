import Navbar from "../components/layout/Navbar";
import Button from "../components/ui/Button";
import { HandshakeIcon, ChevronRightIcon } from "../components/ui/icons";
import heroBg from "../assets/background_1.png";
import "./HomePage.css";

const HomePage: React.FC = () => {
  return (
    <div className="home-page" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Desktop: <img> drives natural page height → full image, scrollable */}
      <img src={heroBg} alt="" className="home-page__bg" aria-hidden="true" />

      {/* All content overlays on top of the background image */}
      <div className="home-page__overlay">
        <Navbar />

        <section className="home-hero" aria-label="Főoldal hero">
          <div className="home-hero__container">
            <div className="home-hero__content">
              <h1 className="home-hero__title">Hit. Közösség. Cselekvés.</h1>
              <p className="home-hero__subtitle">
                Összefogunk az emberekért és a teremtett világért.
              </p>
              <div className="home-hero__actions">
                <Button variant="donate">
                  Adományozok <span className="btn__chevron"><ChevronRightIcon /></span>
                </Button>
                <Button variant="join">
                  <HandshakeIcon /> Csatlakozom <span className="btn__chevron"><ChevronRightIcon /></span>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;

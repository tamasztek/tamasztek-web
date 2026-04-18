import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import Button from "../ui/Button";
import "./Navbar.css";
import { ChevronRightIcon } from "../ui/icons";

const NAV_LINKS = [
  "Bemutatkozás",
  "Hírek",
  "Projektek",
  "Önkéntesség",
] as const;

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar${scrolled || mobileOpen ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <a
          href="/"
          className="navbar__brand"
          aria-label="TämaszTÉK Egyesület – Főoldal"
        >
          <img src={logo} alt="" className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">TámaszTÉK</span>
            <span className="navbar__brand-sub">Egyesület</span>
          </div>
        </a>

        <nav className="navbar__links" aria-label="Főnavigáció">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className={`navbar__link${link === "Önkéntesség" ? " navbar__link--active" : ""}`}
            >
              {link}
            </a>
          ))}
        </nav>

        <Button variant="donate" className="navbar__cta">
          Adományozok <span className="btn__chevron"><ChevronRightIcon /></span>
        </Button>

        <button
          className={`navbar__hamburger${mobileOpen ? " navbar__hamburger--open" : ""}`}
          aria-label={mobileOpen ? "Menü bezárása" : "Menü megnyitása"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <nav
        className={`navbar__mobile-menu${mobileOpen ? " navbar__mobile-menu--open" : ""}`}
        aria-label="Mobil navigáció"
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className={`navbar__mobile-link${link === "Önkéntesség" ? " navbar__mobile-link--active" : ""}`}
            onClick={() => setMobileOpen(false)}
          >
            {link}
          </a>
        ))}
        <Button variant="donate" className="navbar__mobile-cta">
          Adományozok <span className="btn__chevron"><ChevronRightIcon /></span>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;

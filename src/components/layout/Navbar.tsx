import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "../ui/Button";
import "./Navbar.css";
import { ChevronRightIcon } from "../ui/icons";

type NavLink = {
  label: string;
  to: string | null;
};

const NAV_LINKS: NavLink[] = [
  { label: "Bemutatkozás", to: null },
  { label: "Hírek", to: null },
  { label: "Projektek", to: "/projektek" },
  { label: "Önkéntesség", to: null },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (to: string | null) =>
    to !== null && location.pathname === to;

  return (
    <header className={`navbar${scrolled || mobileOpen ? " navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__brand"
          aria-label="TámaszTÉK Egyesület – Főoldal"
        >
          <img src={logo} alt="" className="navbar__logo" />
          <div className="navbar__brand-text">
            <span className="navbar__brand-name">TámaszTÉK</span>
            <span className="navbar__brand-sub">Egyesület</span>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Főnavigáció">
          {NAV_LINKS.map(({ label, to }) =>
            to ? (
              <Link
                key={label}
                to={to}
                className={`navbar__link${isActive(to) ? " navbar__link--active" : ""}`}
                aria-current={isActive(to) ? "page" : undefined}
              >
                {label}
              </Link>
            ) : (
              <a key={label} href="#" className="navbar__link">
                {label}
              </a>
            )
          )}
        </nav>

        <Button variant="donate" className="navbar__cta">
          Adományozok{" "}
          <span className="btn__chevron">
            <ChevronRightIcon />
          </span>
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
        {NAV_LINKS.map(({ label, to }) =>
          to ? (
            <Link
              key={label}
              to={to}
              className={`navbar__mobile-link${isActive(to) ? " navbar__mobile-link--active" : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ) : (
            <a
              key={label}
              href="#"
              className="navbar__mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </a>
          )
        )}
        <Button variant="donate" className="navbar__mobile-cta">
          Adományozok{" "}
          <span className="btn__chevron">
            <ChevronRightIcon />
          </span>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;

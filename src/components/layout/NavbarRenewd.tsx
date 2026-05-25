import { useState } from "react";
import logo from "../../assets/renewd/logo.png";
import arrowIcon from "../../assets/renewd/arrow-icon.svg";
import "./NavbarRenewd.css";

const menuItems = [
  { label: "Kik vagyunk mi?", href: "#about" },
  { label: "Hírek", href: "#news" },
  { label: "Projektek", href: "/projektek" },
  { label: "Galéria", href: "/galeria" },
];

function NavbarRenewd() {
  const [open, setOpen] = useState(false);

  return (
    <header className={`navbar-renewd${open ? " navbar-renewd--open" : ""}`}>
      <div className="navbar-renewd__inner">
        <a href="/" className="navbar-renewd__logo" aria-label="Támaszték">
          <img src={logo} alt="Támaszték logo" />
        </a>
        <nav className="navbar-renewd__menu">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="navbar-renewd__link"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="navbar-renewd__actions">
          <a href="#donate" className="navbar-renewd__cta">
            <span>Adományozok</span>
            <img src={arrowIcon} alt="" className="navbar-renewd__cta-arrow" />
          </a>
          <button
            type="button"
            className="navbar-renewd__toggle"
            aria-label="Menü megnyitása"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

export default NavbarRenewd;

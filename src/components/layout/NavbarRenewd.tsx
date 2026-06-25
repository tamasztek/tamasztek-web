import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/renewd/logo.png";
import arrowIcon from "../../assets/renewd/arrow-icon.svg";
import facebookLogo from "../../assets/renewd/facebook_logo.png";
import { useDonationModal } from "../ui/donationModalContext";
import "./NavbarRenewd.css";

const menuItems = [
  { label: "Kik vagyunk mi?", href: "#about" },
  { label: "Hírek", href: "#news" },
  { label: "Kapcsolat", href: "#kapcsolat" },
  { label: "Projektek", href: "/projektek" },
  { label: "Galéria", href: "/galeria" },
];

function NavbarRenewd() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { openDonationModal } = useDonationModal();

  const handleHashClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    event.preventDefault();
    setOpen(false);
    const id = hash.slice(1);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header className={`navbar-renewd${open ? " navbar-renewd--open" : ""}`}>
      <div className="navbar-renewd__inner">
        <a href="/" className="navbar-renewd__logo" aria-label="Támaszték">
          <img src={logo} alt="Támaszték logo" />
        </a>
        <nav className="navbar-renewd__menu">
          {menuItems.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="navbar-renewd__link"
                onClick={(event) => handleHashClick(event, item.href)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="navbar-renewd__link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="navbar-renewd__actions">
          <a
            href="https://www.facebook.com/profile.php?id=61590037333398"
            className="navbar-renewd__social"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img src={facebookLogo} alt="" />
          </a>
          <button
            type="button"
            className="navbar-renewd__cta"
            onClick={() => {
              setOpen(false);
              openDonationModal();
            }}
          >
            <span>Adományozok</span>
            <img src={arrowIcon} alt="" className="navbar-renewd__cta-arrow" />
          </button>
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

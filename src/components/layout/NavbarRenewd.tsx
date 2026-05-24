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
  return (
    <header className="navbar-renewd">
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
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#donate" className="navbar-renewd__cta">
          <span>Adományozok</span>
          <img src={arrowIcon} alt="" className="navbar-renewd__cta-arrow" />
        </a>
      </div>
    </header>
  );
}

export default NavbarRenewd;

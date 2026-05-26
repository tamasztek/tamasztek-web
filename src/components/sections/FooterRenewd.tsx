import { Link, useNavigate, useLocation } from "react-router-dom";
import footerRect from "../../assets/renewd/footer-rect.svg";
import footerRectMobile from "../../assets/renewd/footer_rect_mobile.svg";
import facebookFooter from "../../assets/renewd/facebook_footer.svg";
import "./FooterRenewd.css";

const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61590037333398";
const EMAIL = "tamasztekegyesulet@gmail.com";

const menuItems = [
  { label: "Kik vagyunk mi?", href: "#about" },
  { label: "Hírek", href: "#news" },
  { label: "Projektek", href: "/projektek" },
  { label: "Galéria", href: "/galeria" },
];

function FooterRenewd() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleHashClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    event.preventDefault();
    const id = hash.slice(1);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <footer className="home-renewd__footer">
      <img
        src={footerRect}
        alt=""
        aria-hidden="true"
        className="home-renewd__footer-bg home-renewd__footer-bg--desktop"
      />
      <img
        src={footerRectMobile}
        alt=""
        aria-hidden="true"
        className="home-renewd__footer-bg home-renewd__footer-bg--mobile"
      />
      <div className="home-renewd__footer-inner">
        <div className="home-renewd__footer-contact">
          <a href={`mailto:${EMAIL}`} className="home-renewd__footer-email">
            Email: <span className="home-renewd__footer-email-address">{EMAIL}</span>
          </a>
          <p className="home-renewd__footer-address">
            Adószám: 19290285105
          </p>
          <p className="home-renewd__footer-address">
            Bankszámlaszám: 11734169-25862212
          </p>
        </div>

        <nav className="home-renewd__footer-menu">
          {menuItems.map((item) =>
            item.href.startsWith("#") ? (
              <a
                key={item.label}
                href={item.href}
                className="home-renewd__footer-link"
                onClick={(event) => handleHashClick(event, item.href)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.label}
                to={item.href}
                className="home-renewd__footer-link"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="home-renewd__footer-social"
          aria-label="Facebook"
        >
          <img src={facebookFooter} alt="" />
        </a>
      </div>

      <p className="home-renewd__footer-copyright">
        © {year} Támaszték Egyesület. Minden jog fenntartva.
      </p>
    </footer>
  );
}

export default FooterRenewd;

import NavbarRenewd from "../components/layout/NavbarRenewd";
import HeroRenewd from "../components/sections/HeroRenewd";
import AboutRenewd from "../components/sections/AboutRenewd";
import MissionRenewd from "../components/sections/MissionRenewd";
import NewsRenewd from "../components/sections/NewsRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import "../styles/renewd-tokens.css";
import "./HomePageRenewd.css";

function HomePageRenewd() {
  return (
    <div className="home-renewd">
      <NavbarRenewd />
      <HeroRenewd />
      <AboutRenewd />
      <MissionRenewd />
      <NewsRenewd />
      <FooterRenewd />
    </div>
  );
}

export default HomePageRenewd;

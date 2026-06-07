import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import HeroRenewd from "../components/sections/HeroRenewd";
import AboutRenewd from "../components/sections/AboutRenewd";
import MissionRenewd from "../components/sections/MissionRenewd";
import AchievedGoalsRenewd from "../components/sections/AchievedGoalsRenewd";
import NewsRenewd from "../components/sections/NewsRenewd";
import ContactRenewd from "../components/sections/ContactRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import Seo from "../components/Seo";
import { fetchFeaturedNews } from "../services/newsService";
import type { NewsItem } from "../types/news";
import "../styles/renewd-tokens.css";
import "./HomePageRenewd.css";

function HomePageRenewd() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    fetchFeaturedNews()
      .then(setNews)
      .catch(() => setError("Jelenleg nincsenek kiemelt híreink."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const scrollTo = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!scrollTo) return;
    requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    });
    window.history.replaceState({}, "");
  }, [location.state]);

  return (
    <div className="home-renewd">
      <Seo path="/" />
      <NavbarRenewd />
      <main>
        <HeroRenewd />
        <AboutRenewd />
        <MissionRenewd />
        <AchievedGoalsRenewd />
        <NewsRenewd news={news} loading={loading} error={error} />
        <ContactRenewd />
      </main>
      <FooterRenewd />
    </div>
  );
}

export default HomePageRenewd;

import { useEffect, useState } from "react";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import HeroRenewd from "../components/sections/HeroRenewd";
import AboutRenewd from "../components/sections/AboutRenewd";
import MissionRenewd from "../components/sections/MissionRenewd";
import AchievedGoalsRenewd from "../components/sections/AchievedGoalsRenewd";
import NewsRenewd from "../components/sections/NewsRenewd";
import FooterRenewd from "../components/sections/FooterRenewd";
import { fetchFeaturedNews } from "../services/newsService";
import type { NewsItem } from "../types/news";
import "../styles/renewd-tokens.css";
import "./HomePageRenewd.css";

function HomePageRenewd() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFeaturedNews()
      .then(setNews)
      .catch(() => setError("Jelenleg nincsenek kiemelt híreink."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="home-renewd">
      <NavbarRenewd />
      <HeroRenewd />
      <AboutRenewd />
      <MissionRenewd />
      <AchievedGoalsRenewd />
      <NewsRenewd news={news} loading={loading} error={error} />
      <FooterRenewd />
    </div>
  );
}

export default HomePageRenewd;

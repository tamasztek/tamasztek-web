import { useState, useEffect } from "react";
import { fetchNews } from "../services/newsService";
import type { NewsItem } from "../types/news";
import NewsArticleItem from "../components/sections/NewsArticleItem";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import Seo from "../components/Seo";
import "../styles/renewd-tokens.css";
import "../components/sections/NewsRenewd.css";
import "./NewsListPage.css";

const NewsListPage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchNews(0)
      .then((data) => {
        if (!active) return;
        setNews(data.items);
        setHasMore(data.page < data.totalPages - 1);
      })
      .catch(() => {
        if (active) setError("Nem sikerült betölteni a híreket.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchNews(nextPage)
      .then((data) => {
        setNews((prev) => [...prev, ...data.items]);
        setHasMore(data.page < data.totalPages - 1);
        setPage(nextPage);
      })
      .catch(() => setError("Nem sikerült betölteni a további híreket."))
      .finally(() => setLoadingMore(false));
  };

  return (
    <div className="news-renewd">
      <Seo
        title="Híreink"
        description="A Támaszték Egyesület hírei és aktualitásai időrendben – események, beszámolók és közlemények."
        path="/hirek"
      />
      <NavbarRenewd />
      <main className="news-page">
        <div className="news-page__container">
          <h1 className="news-page__title">Híreink</h1>

          {loading && <p className="news-page__status">Betöltés...</p>}

          {error && (
            <p className="news-page__status news-page__status--error">
              {error}
            </p>
          )}

          {!loading && !error && news.length === 0 && (
            <p className="news-page__status">Jelenleg nincsenek híreink.</p>
          )}

          {news.length > 0 && (
            <ul className="news-page__list" role="list">
              {news.map((item, index) => (
                <li key={item.id} className="news-page__row">
                  {index > 0 && (
                    <div
                      className="home-renewd__news-divider"
                      aria-hidden="true"
                    />
                  )}
                  <NewsArticleItem item={item} />
                </li>
              ))}
            </ul>
          )}

          {hasMore && (
            <div className="news-page__load-more">
              <button
                type="button"
                className="news-page__load-more-btn"
                onClick={loadMore}
              >
                {loadingMore ? "Betöltés..." : "Megnézem a további híreket"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewsListPage;

import type { NewsItem } from "../../types/news";
import "./NewsRenewd.css";

interface NewsRenewdProps {
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

function NewsRenewd({ news, loading, error }: NewsRenewdProps) {
  const showMessage = error ?? (!loading && news.length === 0 ? "Jelenleg nincsenek kiemelt híreink." : null);

  return (
    <section className="home-renewd__news" id="news">
      <div className="home-renewd__section-inner">
        <h2 className="home-renewd__news-title">Kiemelt híreink</h2>

        {showMessage ? (
          <p className="home-renewd__news-empty">{showMessage}</p>
        ) : (
          <ul className="home-renewd__news-list" role="list">
            {news.map((item, idx) => (
              <li key={item.id} className="home-renewd__news-row">
                {idx > 0 && (
                  <div
                    className="home-renewd__news-divider"
                    aria-hidden="true"
                  />
                )}
                <article className="home-renewd__news-item">
                  {item.image && (
                    <div className="home-renewd__news-image-slot">
                      <img
                        src={item.image.url}
                        alt={item.image.altText ?? ""}
                        className="home-renewd__news-image"
                      />
                    </div>
                  )}
                  <div className="home-renewd__news-body">
                    <div className="home-renewd__news-heading-row">
                      <h3 className="home-renewd__news-heading">{item.title}</h3>
                      {item.date && (
                        <p className="home-renewd__news-date">{item.date}</p>
                      )}
                    </div>
                    <p className="home-renewd__news-text">{item.content}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default NewsRenewd;

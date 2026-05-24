import news1 from "../../assets/renewd/news-1.jpg";
import news2 from "../../assets/renewd/news-2.jpg";
import news3 from "../../assets/renewd/news-3.jpg";
import type { NewsItem } from "../../types/news";
import "./NewsRenewd.css";

const loremShort =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const NEWS_MOCK: NewsItem[] = [
  {
    id: "news-1",
    title: "XYZ előadást tartott nálunk",
    content: loremShort,
    date: null,
    image: { url: news1, altText: null },
  },
  {
    id: "news-2",
    title: "XYZ előadást tartott nálunk",
    content: `${loremShort}\n\n${loremShort}\n\n${loremShort}`,
    date: "2026.05.22.",
    image: { url: news2, altText: null },
  },
  {
    id: "news-3",
    title: "XYZ előadást tartott nálunk",
    content: loremShort,
    date: null,
    image: { url: news3, altText: null },
  },
];

function NewsRenewd() {
  return (
    <section className="home-renewd__news" id="news">
      <div className="home-renewd__section-inner">
        <h2 className="home-renewd__news-title">Kiemelt híreink</h2>

        <ul className="home-renewd__news-list" role="list">
          {NEWS_MOCK.map((item, idx) => (
            <li key={item.id} className="home-renewd__news-row">
              {idx > 0 && (
                <div
                  className="home-renewd__news-divider"
                  aria-hidden="true"
                />
              )}
              <article className="home-renewd__news-item">
                <div className="home-renewd__news-image-slot">
                  <img
                    src={item.image.url}
                    alt={item.image.altText ?? ""}
                    className="home-renewd__news-image"
                  />
                </div>
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
      </div>
    </section>
  );
}

export default NewsRenewd;

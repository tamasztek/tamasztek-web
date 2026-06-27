import type { NewsItem } from "../../types/news";

interface NewsArticleItemProps {
  item: NewsItem;
}

// A hír-kártya megjelenítése – közös a főoldali "Kiemelt híreink" szekció és a
// dedikált hírek oldal (/hirek) között. A stílusok a NewsRenewd.css-ben élnek.
function NewsArticleItem({ item }: NewsArticleItemProps) {
  return (
    <article className="home-renewd__news-item">
      {item.image && (
        <div className="home-renewd__news-image-slot">
          <img
            src={item.image.url}
            alt={item.image.altText ?? item.title}
            className="home-renewd__news-image"
          />
        </div>
      )}
      <div className="home-renewd__news-body">
        <div className="home-renewd__news-heading-row">
          <h3 className="home-renewd__news-heading">{item.title}</h3>
          {item.date && <p className="home-renewd__news-date">{item.date}</p>}
        </div>
        <p className="home-renewd__news-text">{item.content}</p>
      </div>
    </article>
  );
}

export default NewsArticleItem;

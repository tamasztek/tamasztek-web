import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchAlbums } from "../services/albumService";
import type { AlbumSummary } from "../types/album";
import { getCoverUrl } from "../utils/cloudinaryUrl";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import blobTeal from "../assets/renewd/projects/project_blob_1.svg";
import blobOrange from "../assets/renewd/projects/project_blob_2.svg";
import "../styles/renewd-tokens.css";
import "./GalleryPage.css";

const GalleryPage: React.FC = () => {
  const [albums, setAlbums] = useState<AlbumSummary[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAlbums(0)
      .then((data) => {
        setAlbums(data.items);
        setHasMore(data.page < data.totalPages - 1);
      })
      .catch(() => setError("Nem sikerült betölteni az albumokat."))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchAlbums(nextPage)
      .then((data) => {
        setAlbums((prev) => [...prev, ...data.items]);
        setHasMore(data.page < data.totalPages - 1);
        setPage(nextPage);
      })
      .catch(() => setError("Nem sikerült betölteni a további albumokat."))
      .finally(() => setLoadingMore(false));
  };

  return (
    <div className="gallery-renewd">
      <NavbarRenewd />
      <main className="gallery-page">
        <div className="gallery-page__blobs" aria-hidden="true">
          <img
            src={blobOrange}
            alt=""
            className="gallery-page__blob gallery-page__blob--orange"
          />
          <img
            src={blobTeal}
            alt=""
            className="gallery-page__blob gallery-page__blob--teal"
          />
        </div>
        <div className="gallery-page__container">
          <h1 className="gallery-page__title">Galéria</h1>

        {error && (
          <p className="gallery-page__status gallery-page__status--error">
            {error}
          </p>
        )}

        {!loading && !error && albums.length === 0 && (
          <p className="gallery-page__status">Még nincsenek albumok.</p>
        )}

        <div className="gallery-page__grid">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="album-card-skeleton" aria-hidden="true" />
              ))
            : albums.map((album) => (
                <article key={album.publicId} className="album-card">
                  <Link
                    to={`/galeria/${album.publicId}`}
                    className="album-card__link"
                  >
                    {album.coverImage ? (
                      <figure className="album-card__figure">
                        <img
                          src={getCoverUrl(album.coverImage.url)}
                          alt={album.coverImage.altText ?? album.name}
                          className="album-card__image"
                          loading="lazy"
                        />
                      </figure>
                    ) : (
                      <div
                        className="album-card__placeholder"
                        aria-hidden="true"
                      />
                    )}
                    <div className="album-card__overlay">
                      <span className="album-card__badge">
                        {album.imageCount} KÉP
                      </span>
                      <h2 className="album-card__name">{album.name}</h2>
                      <div className="album-card__underline" />
                    </div>
                  </Link>
                </article>
              ))}
        </div>

        {hasMore && (
          <div className="gallery-page__load-more">
            <button
              type="button"
              className="gallery-page__load-more-btn"
              onClick={loadMore}
            >
              {loadingMore ? "Betöltés..." : "Megnézem a további albumokat"}
            </button>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default GalleryPage;

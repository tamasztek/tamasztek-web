import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAlbum } from "../services/albumService";
import type { AlbumDetail } from "../types/album";
import { getGridUrl } from "../utils/cloudinaryUrl";
import ImageSlider from "../components/ui/ImageSlider";
import "./AlbumDetailPage.css";

const AlbumDetailPage: React.FC = () => {
  const { publicId } = useParams<{ publicId: string }>();
  const [album, setAlbum] = useState<AlbumDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!publicId) return;
    fetchAlbum(publicId)
      .then((data) => setAlbum(data))
      .catch(() => setError("Nem sikerült betölteni az albumot."))
      .finally(() => setLoading(false));
  }, [publicId]);

  return (
    <main className="album-detail-page">
      <div className="album-detail-page__container">
        <Link to="/galeria" className="album-detail-page__back">
          ← Vissza a galériához
        </Link>

        {loading && (
          <p className="album-detail-page__status">Betöltés...</p>
        )}

        {error && (
          <p className="album-detail-page__status album-detail-page__status--error">
            {error}
          </p>
        )}

        {album && (
          <>
            <h1 className="album-detail-page__title">{album.name}</h1>

            {album.images.length === 0 ? (
              <p className="album-detail-page__status">
                Ez az album még nem tartalmaz képeket.
              </p>
            ) : (
              <div className="album-detail-page__grid">
                {album.images.map((image, index) => (
                  <button
                    key={image.url}
                    className="album-detail-page__thumb-btn"
                    onClick={() => setSliderIndex(index)}
                    aria-label={
                      image.altText ?? `Kép megnyitása (${index + 1}. kép)`
                    }
                  >
                    <img
                      src={getGridUrl(image.url)}
                      alt={image.altText ?? ""}
                      className="album-detail-page__thumb"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {sliderIndex !== null && album && (
        <ImageSlider
          images={album.images}
          initialIndex={sliderIndex}
          onClose={() => setSliderIndex(null)}
        />
      )}
    </main>
  );
};

export default AlbumDetailPage;

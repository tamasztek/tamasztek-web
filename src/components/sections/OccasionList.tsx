import { useEffect, useState } from "react";
import { fetchProjectOccasions } from "../../services/occasionService";
import type { Occasion } from "../../types/occasion";
import { getOccasionThumbUrl } from "../../utils/cloudinaryUrl";
import "./OccasionList.css";

interface OccasionListProps {
  projectId: string;
}

const formatEventDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

// Egy projekt alkalmainak vázlatos listája – csak akkor mountolódik, ha az
// accordion nyitva van, így a betöltés lusta (lazy).
function OccasionList({ projectId }: OccasionListProps) {
  const [occasions, setOccasions] = useState<Occasion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // A projectId a komponens élettartama alatt nem változik (egy nyitott accordionhoz
  // egy projekt tartozik), így a kezdő loading/error állapot elég – nincs szükség
  // szinkron resetre az effekt törzsében.
  useEffect(() => {
    let active = true;
    fetchProjectOccasions(projectId)
      .then((data) => {
        if (active) setOccasions(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [projectId]);

  if (loading) {
    return <p className="occasion-list__status">Alkalmak betöltése…</p>;
  }
  if (error) {
    return (
      <p className="occasion-list__status">
        Nem sikerült betölteni az alkalmakat.
      </p>
    );
  }
  if (occasions.length === 0) {
    return <p className="occasion-list__status">Nincsenek alkalmak.</p>;
  }

  return (
    <ul className="occasion-list" role="list">
      {occasions.map((occasion) => (
        <li key={occasion.id} className="occasion-item">
          {occasion.coverImage && (
            <img
              src={getOccasionThumbUrl(occasion.coverImage.url)}
              alt={occasion.coverImage.altText ?? ""}
              className="occasion-item__image"
              loading="lazy"
            />
          )}
          <div className="occasion-item__body">
            <span className="occasion-item__date">
              {formatEventDate(occasion.eventDate)}
            </span>
            {occasion.description && (
              <p className="occasion-item__description">
                {occasion.description}
              </p>
            )}
            <div className="occasion-item__meta">
              {occasion.participantCount != null && (
                <span className="occasion-item__meta-item">
                  {occasion.participantCount} résztvevő
                </span>
              )}
              {occasion.volunteerCount != null && (
                <span className="occasion-item__meta-item">
                  {occasion.volunteerCount} önkéntes
                </span>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default OccasionList;

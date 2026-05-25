import { useState, useEffect } from "react";
import { fetchProjects } from "../services/projectService";
import type { Project } from "../types/project";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import blobTeal from "../assets/renewd/projects/project_blob_1.svg";
import blobOrange from "../assets/renewd/projects/project_blob_2.svg";
import "../styles/renewd-tokens.css";
import "./ProjectsPage.css";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("ProjectsPage mounted");
    fetchProjects(0)
      .then((data) => {
        setProjects(data.items);
        setHasMore(data.page < data.totalPages - 1);
      })
      .catch(() => setError("Nem sikerült betölteni a projekteket."))
      .finally(() => setLoading(false));
  }, []);

  const loadMore = () => {
    console.log("In loadmore");
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchProjects(nextPage)
      .then((data) => {
        setProjects((prev) => [...prev, ...data.items]);
        setHasMore(data.page < data.totalPages - 1);
        setPage(nextPage);
      })
      .catch(() => setError("Nem sikerült betölteni a további projekteket."))
      .finally(() => setLoadingMore(false));
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
    });

  return (
    <div className="projects-renewd">
      <NavbarRenewd />
      <main className="projects-page">
        <div className="projects-page__blobs" aria-hidden="true">
          <img
            src={blobOrange}
            alt=""
            className="projects-page__blob projects-page__blob--orange"
          />
          <img
            src={blobTeal}
            alt=""
            className="projects-page__blob projects-page__blob--teal"
          />
        </div>
        <div className="projects-page__container">
          <h1 className="projects-page__title">Projektjeink</h1>

        {loading && <p className="projects-page__status">Betöltés...</p>}

        {error && (
          <p className="projects-page__status projects-page__status--error">
            {error}
          </p>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="projects-page__status">Még nincsenek projektek.</p>
        )}

        <ul className="projects-list" role="list">
          {projects.map((project, index) => (
            <li key={project.id} className="project-item">
              {index > 0 && (
                <hr className="project-divider" aria-hidden="true" />
              )}
              <article
                className={`project-card${index % 2 !== 0 ? " project-card--reversed" : ""}`}
              >
                {project.coverImage ? (
                  <figure className="project-card__figure">
                    <img
                      src={project.coverImage.url}
                      alt={project.coverImage.altText ?? project.title}
                      className="project-card__image"
                      loading="lazy"
                    />
                  </figure>
                ) : (
                  <div
                    className="project-card__image-placeholder"
                    aria-hidden="true"
                  />
                )}

                <div className="project-card__body">
                  <h2 className="project-card__title">{project.title}</h2>
                  {project.subtitle && (
                    <p className="project-card__subtitle">{project.subtitle}</p>
                  )}
                  {project.description && (
                    <p className="project-card__description">
                      {project.description}
                    </p>
                  )}
                  <div className="project-card__meta">
                    {project.location && (
                      <span className="project-card__meta-item">
                        {project.location}
                      </span>
                    )}
                    {project.startDate && (
                      <span className="project-card__meta-item">
                        {formatDate(project.startDate)}
                        {project.endDate && ` – ${formatDate(project.endDate)}`}
                      </span>
                    )}
                    {project.participantCount != null && (
                      <span className="project-card__meta-item">
                        {project.participantCount} résztvevő
                      </span>
                    )}
                    {project.volunteerCount != null && (
                      <span className="project-card__meta-item">
                        {project.volunteerCount} önkéntes
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="projects-page__load-more">
            <button
              type="button"
              className="projects-page__load-more-btn"
              onClick={loadMore}
            >
              {loadingMore ? "Betöltés..." : "Megnézem a további projekteket"}
            </button>
          </div>
        )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;

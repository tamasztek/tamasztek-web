import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProjects, type ProjectFilter } from "../services/projectService";
import type { Project } from "../types/project";
import { useDonationModal } from "../components/ui/donationModalContext";
import OccasionList from "../components/sections/OccasionList";
import NavbarRenewd from "../components/layout/NavbarRenewd";
import Seo from "../components/Seo";
import blobTeal from "../assets/renewd/projects/project_blob_1.svg";
import blobOrange from "../assets/renewd/projects/project_blob_2.svg";
import "../styles/renewd-tokens.css";
import "./ProjectsPage.css";

const TABS: { key: ProjectFilter; label: string }[] = [
  { key: "current", label: "Aktuális projektjeink" },
  { key: "completed", label: "Megvalósult projektjeink" },
];

const ProjectsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ProjectFilter>("current");
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  // Amelyik accordiont már legalább egyszer kinyitottuk: a tartalom mountolva marad,
  // így a lazy fetch csak egyszer fut, a be/kinyitás viszont animálható.
  const [opened, setOpened] = useState<Record<string, boolean>>({});
  const { openDonationModal } = useDonationModal();

  // Az aktív tab első oldalának betöltése (induláskor és tab-váltáskor). A
  // reset a selectTab eseménykezelőben történik, így az effekt csak az async
  // fetchet végzi.
  useEffect(() => {
    let active = true;
    fetchProjects(0, activeTab)
      .then((data) => {
        if (!active) return;
        setProjects(data.items);
        setHasMore(data.page < data.totalPages - 1);
      })
      .catch(() => {
        if (active) setError("Nem sikerült betölteni a projekteket.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [activeTab]);

  const selectTab = (tab: ProjectFilter) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setLoading(true);
    setError(null);
    setProjects([]);
    setPage(0);
    setExpanded({});
    setOpened({});
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setLoadingMore(true);
    fetchProjects(nextPage, activeTab)
      .then((data) => {
        setProjects((prev) => [...prev, ...data.items]);
        setHasMore(data.page < data.totalPages - 1);
        setPage(nextPage);
      })
      .catch(() => setError("Nem sikerült betölteni a további projekteket."))
      .finally(() => setLoadingMore(false));
  };

  const toggleOccasions = (id: string) => {
    setOpened((prev) => ({ ...prev, [id]: true }));
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("hu-HU", {
      year: "numeric",
      month: "long",
    });

  return (
    <div className="projects-renewd">
      <Seo
        title="Projektjeink"
        description="Ismerje meg a Támaszték Egyesület projektjeit: közösségi programok, táborok és önkéntes kezdeményezések az emberekért és a teremtett világért."
        path="/projektek"
      />
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

          <div className="projects-tabs" role="tablist" aria-label="Projektek szűrése">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`projects-tab${
                  activeTab === tab.key ? " projects-tab--active" : ""
                }`}
                onClick={() => selectTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {loading && <p className="projects-page__status">Betöltés...</p>}

          {error && (
            <p className="projects-page__status projects-page__status--error">
              {error}
            </p>
          )}

          {!loading && !error && projects.length === 0 && (
            <p className="projects-page__status">
              {activeTab === "current"
                ? "Jelenleg nincsenek aktuális projektek."
                : "Még nincsenek megvalósult projektek."}
            </p>
          )}

          {projects.length > 0 && (
          <ul key={activeTab} className="projects-list" role="list">
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
                      <p className="project-card__subtitle">
                        {project.subtitle}
                      </p>
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
                          {project.endDate &&
                            ` – ${formatDate(project.endDate)}`}
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

                    {activeTab === "current" && (
                      <div className="project-card__support">
                        <p className="project-card__support-text">
                          Támogassa projektünket!
                        </p>
                        <button
                          type="button"
                          className="project-card__support-btn"
                          onClick={() =>
                            openDonationModal({
                              projectPublicId: project.id,
                              projectTitle: project.title,
                            })
                          }
                        >
                          Adományozok
                        </button>
                      </div>
                    )}

                    {project.albumPublicId && (
                      <div className="project-card__album">
                        <Link
                          to={`/galeria/${project.albumPublicId}`}
                          className="project-card__album-btn"
                        >
                          Fotóalbum
                        </Link>
                      </div>
                    )}

                    {project.occasionCount > 0 && (
                      <div className="project-card__occasions">
                        <button
                          type="button"
                          className="project-card__occasions-toggle"
                          aria-expanded={!!expanded[project.id]}
                          onClick={() => toggleOccasions(project.id)}
                        >
                          Tekintse meg alkalmainkat!
                          <span
                            className={`project-card__occasions-caret${
                              expanded[project.id]
                                ? " project-card__occasions-caret--open"
                                : ""
                            }`}
                            aria-hidden="true"
                          >
                            ▼
                          </span>
                        </button>
                        <div
                          className={`project-card__occasions-panel${
                            expanded[project.id]
                              ? " project-card__occasions-panel--open"
                              : ""
                          }`}
                        >
                          <div className="project-card__occasions-panel-inner">
                            {opened[project.id] && (
                              <OccasionList projectId={project.id} />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          )}

          {hasMore && (
            <div className="projects-page__load-more">
              <button
                type="button"
                className="projects-page__load-more-btn"
                onClick={loadMore}
              >
                {loadingMore
                  ? "Betöltés..."
                  : "Megnézem a további projekteket"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;

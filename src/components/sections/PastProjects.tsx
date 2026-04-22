import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../ui/icons";
import "./PastProjects.css";

type Stat = {
  id: string;
  value: number;
  label: string;
  gradient: string;
  wave: string;
};

const STATS: Stat[] = [
  {
    id: "trees",
    value: 320,
    label: "Elültetett fa",
    gradient: "linear-gradient(135deg, #0891b2 0%, #00619c 100%)",
    wave: "M0,15 C100,30 200,0 300,15 C400,30 450,5 500,15 L500,30 L0,30 Z",
  },
  {
    id: "participants",
    value: 480,
    label: "Résztvevő",
    gradient: "linear-gradient(135deg, #fbb03b 0%, #e8991e 100%)",
    wave: "M0,20 C80,5 160,28 240,14 C320,2 410,26 500,18 L500,30 L0,30 Z",
  },
  {
    id: "programs",
    value: 12,
    label: "Program",
    gradient: "linear-gradient(135deg, #1a7abf 0%, #083667 100%)",
    wave: "M0,10 C60,26 140,4 220,18 C300,30 380,8 500,20 L500,30 L0,30 Z",
  },
  {
    id: "volunteers",
    value: 25,
    label: "Önkéntes",
    gradient: "linear-gradient(135deg, #0aa0ca 0%, #0670a0 100%)",
    wave: "M0,18 C120,8 200,28 280,12 C360,0 440,22 500,14 L500,30 L0,30 Z",
  },
];

const MIN_CARD_WIDTH = 260;
const GAP_PX = 24;

const PastProjects: React.FC = () => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [isSlider, setIsSlider] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const check = () => {
      const available = track.clientWidth;
      const needed =
        STATS.length * MIN_CARD_WIDTH + (STATS.length - 1) * GAP_PX;
      setIsSlider(needed > available);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  const scrollByCard = useCallback((dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>(".past-projects__card");
    if (!firstCard) return;
    const gap = parseFloat(getComputedStyle(track).columnGap || "0");
    const step = firstCard.offsetWidth + gap;
    track.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!isSlider) return;
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(
      track.querySelectorAll<HTMLElement>(".past-projects__card")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.6) {
            const idx = cards.indexOf(e.target as HTMLElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: track, threshold: [0.6] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [isSlider]);

  return (
    <section
      className={
        "past-projects" + (isSlider ? " past-projects--slider" : "")
      }
      aria-label="Megvalósult dolgok"
    >
      <div className="past-projects__container">
        <header className="past-projects__header">
          <h2 className="past-projects__title">Megvalósult Dolgok</h2>
          {isSlider && (
            <div
              className="past-projects__nav"
              role="group"
              aria-label="Csúszka navigáció"
            >
              <button
                type="button"
                className="past-projects__nav-btn"
                onClick={() => scrollByCard(-1)}
                aria-label="Előző"
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className="past-projects__nav-btn"
                onClick={() => scrollByCard(1)}
                aria-label="Következő"
              >
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </header>

        <ul ref={trackRef} className="past-projects__track" role="list">
          {STATS.map((s) => (
            <li key={s.id} className="past-projects__card">
              <div
                className="past-projects__media"
                style={{ background: s.gradient }}
                aria-hidden="true"
              >
                <div className="past-projects__wave">
                  <svg viewBox="0 0 500 30" preserveAspectRatio="none" aria-hidden="true">
                    <path d={s.wave} fill="#fff" />
                  </svg>
                </div>
              </div>
              <div className="past-projects__body">
                <span className="past-projects__value">{s.value}</span>
                <span className="past-projects__label">{s.label}</span>
              </div>
            </li>
          ))}
        </ul>

        {isSlider && (
          <ol className="past-projects__dots" role="list" aria-hidden="true">
            {STATS.map((s, i) => (
              <li
                key={s.id}
                className={
                  "past-projects__dot" +
                  (i === activeIndex ? " past-projects__dot--active" : "")
                }
              />
            ))}
          </ol>
        )}
      </div>
    </section>
  );
};

export default PastProjects;

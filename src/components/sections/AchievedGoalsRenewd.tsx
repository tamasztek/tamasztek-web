import { useRef, useState } from "react";
import goalOnkentes from "../../assets/renewd/goal-onkentesek.png";
import goalTabortuz from "../../assets/renewd/goal-tabortuz.png";
import goalGyalog from "../../assets/renewd/goal-gyalog.png";
import goalReaches from "../../assets/renewd/goal-reaches.png";
import goalWave from "../../assets/renewd/goal-card-wave.svg";
import "./AchievedGoalsRenewd.css";

type Goal = {
  variant: string;
  number: string;
  label: string;
  body: string;
  image: string;
};

const GOALS: Goal[] = [
  {
    variant: "resztvevo",
    number: "1000+",
    label: "Résztvevő",
    body: "Programjaink rengeteg embert megszólítottak már és reméljük, hogy a jövőben ennek többszörösére emelkedik majd a programjaink iránt érdeklődök száma!",
    image: goalGyalog,
  },
  {
    variant: "onkentes",
    number: "150",
    label: "Önkéntes",
    body: "Ennyien segítették programjainkat, ennyien hittek abban, hogy együtt valóban könnyebb! Köszönjük önkénteseink eddigi segítségét és számítunk rájuk a jövőben is!",
    image: goalOnkentes,
  },
  {
    variant: "program",
    number: "50+",
    label: "Program",
    body: "Az évek során önkénteseink segítségével egyre nagyobb számban tudunk értékteremtő alkalmakat szervezni és célunk ezen a területen még jobban kibontakozni.",
    image: goalTabortuz,
  },
  {
    variant: "reaches",
    number: "3000+",
    label: "Közvetett elérés",
    body: "A digitális világ nyújtotta lehetőségekkel már ezrekhez sikerült eljutnunk! Reméljük, valós találkozások jönnek létre majd ezekből az elérésekből!",
    image: goalReaches,
  },
];

function AchievedGoalsRenewd() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className="home-renewd__goals" id="goals">
      <div className="home-renewd__section-inner">
        <h2 className="home-renewd__goals-title">Megvalósult célok</h2>

        <div
          className="home-renewd__goals-track"
          ref={trackRef}
          onScroll={handleScroll}
        >
          {GOALS.map((goal) => (
            <article
              key={goal.variant}
              className={`home-renewd__goal-card home-renewd__goal-card--${goal.variant}`}
            >
              <img
                src={goal.image}
                alt=""
                className="home-renewd__goal-photo"
              />
              <img
                src={goalWave}
                alt=""
                aria-hidden="true"
                className="home-renewd__goal-wave"
              />
              <div className="home-renewd__goal-text">
                <div className="home-renewd__goal-heading">
                  <span className="home-renewd__goal-number">{goal.number}</span>
                  <span className="home-renewd__goal-label">{goal.label}</span>
                </div>
                <p className="home-renewd__goal-body">{goal.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="home-renewd__goals-dots">
          {GOALS.map((goal, idx) => (
            <button
              key={goal.variant}
              type="button"
              className={`home-renewd__goals-dot${
                idx === active ? " is-active" : ""
              }`}
              aria-label={`${idx + 1}. kártya megjelenítése`}
              onClick={() => goTo(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AchievedGoalsRenewd;

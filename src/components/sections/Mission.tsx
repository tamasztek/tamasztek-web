import IllustratedTag from "../ui/IllustratedTag";
import Button from "../ui/Button";
import { ChevronRightIcon } from "../ui/icons";
import church from "../../assets/mission/church.png";
import community from "../../assets/mission/community.png";
import tree from "../../assets/mission/tree.png";
import family from "../../assets/mission/family.png";
import doboz from "../../assets/mission/doboz_atlatszo.png";
import "./Mission.css";

type MissionItem = {
  id: string;
  image: string;
  label: string;
};

const ITEMS: MissionItem[] = [
  { id: "faith", image: church, label: "Hit" },
  { id: "community", image: community, label: "Közösség" },
  { id: "creation-care", image: tree, label: "Teremtésvédelem" },
  { id: "family", image: family, label: "Család" },
];

const Mission: React.FC = () => {
  return (
    <section className="mission" aria-label="Küldetésünk">
      <div className="mission__container">
        <div className="mission__left">
          <header className="mission__header">
            <h2 className="mission__title">Küldetésünk</h2>
          </header>
          <ul className="mission__list" role="list">
            {ITEMS.map((item) => (
              <li key={item.id} className="mission__item">
                <IllustratedTag image={item.image} label={item.label} />
              </li>
            ))}
          </ul>
        </div>

        <div className="mission__right">
          <div className="mission__card">
            <div className="mission__card-content">
              <h3 className="mission__card-title">
                Adományozás <span className="mission__card-accent">+1%</span>
              </h3>
              <p className="mission__card-text">
                Segíts, hogy még több közösség szülessen!
              </p>
              <Button variant="donate">
                Adományozok{" "}
                <span className="btn__chevron">
                  <ChevronRightIcon />
                </span>
              </Button>
            </div>
            <img
              src={doboz}
              alt="Adományozás doboz"
              className="mission__card-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

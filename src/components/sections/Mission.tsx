import IllustratedTag from "../ui/IllustratedTag";
import church from "../../assets/mission/church.png";
import community from "../../assets/mission/community.png";
import tree from "../../assets/mission/tree.png";
import family from "../../assets/mission/family.png";
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
    </section>
  );
};

export default Mission;

import { Link } from "react-router-dom";
import missionCircle from "../../assets/renewd/mission-circle.png";
import missionArrowText from "../../assets/renewd/mission-arrow-text.svg";
import missionChurch from "../../assets/renewd/mission-church.png";
import missionFamily from "../../assets/renewd/mission-family.png";
import missionTree from "../../assets/renewd/mission-tree.png";
import missionCommunity from "../../assets/renewd/mission-community.png";
import donateBox from "../../assets/renewd/donate-box.png";
import arrowIcon from "../../assets/renewd/arrow-icon.svg";
import arrowStartMobile from "../../assets/renewd/arrow_start_mobile.svg";
import arrowFinishMobile from "../../assets/renewd/arrow_finish_mobile.svg";
import "./MissionRenewd.css";

function DonateButton({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <Link to="/adomanyozas" className={`hr-btn hr-btn--donate hr-btn--${size}`}>
      <span>Adományozok</span>
      <img src={arrowIcon} alt="" className="hr-btn__arrow" />
    </Link>
  );
}

function MissionRenewd() {
  return (
    <section className="home-renewd__mission" id="mission">
      <div className="home-renewd__section-inner">
        <div className="home-renewd__mission-wheel">
          <img
            src={missionCircle}
            alt=""
            className="home-renewd__mission-circle"
          />

          <p className="home-renewd__mission-title">Küldetésünk</p>

          <div className="home-renewd__mission-pillar home-renewd__mission-pillar--top">
            <img src={missionChurch} alt="" />
            <p>Hit</p>
          </div>
          <div className="home-renewd__mission-pillar home-renewd__mission-pillar--left">
            <img src={missionFamily} alt="" />
            <p>Család</p>
          </div>
          <div className="home-renewd__mission-pillar home-renewd__mission-pillar--bottom">
            <img src={missionTree} alt="" />
            <p>Teremtésvédelem</p>
          </div>
          <div className="home-renewd__mission-pillar home-renewd__mission-pillar--right">
            <img src={missionCommunity} alt="" />
            <p>Civil</p>
            <p>közösség</p>
          </div>
        </div>

        <img
          src={missionArrowText}
          alt="Ha neked is fontosak ezek az értékek"
          className="home-renewd__mission-arrow-text"
        />

        <div className="home-renewd__mission-arrow-group">
          <img
            src={arrowStartMobile}
            alt=""
            aria-hidden="true"
            className="home-renewd__mission-arrow-mobile home-renewd__mission-arrow-mobile--start"
          />

          <p className="home-renewd__mission-intro-mobile">
            Ha neked is fontosak ezek az értékek
          </p>

          <img
            src={arrowFinishMobile}
            alt=""
            aria-hidden="true"
            className="home-renewd__mission-arrow-mobile home-renewd__mission-arrow-mobile--finish"
          />
        </div>

        <p className="home-renewd__mission-handwrite">
          vegyél részt programjainkon
          <br />
          vagy
          <br />
          támogass, hogy még több közösség születhessen!
        </p>

        <div className="home-renewd__donate-card">
          <div className="home-renewd__donate-card-text">
            <p className="home-renewd__donate-card-title">Adományozás</p>
            <p className="home-renewd__donate-card-amount">+1%</p>
            <DonateButton size="sm" />
          </div>
          <img
            src={donateBox}
            alt=""
            className="home-renewd__donate-card-box"
          />
        </div>
      </div>
    </section>
  );
}

export default MissionRenewd;

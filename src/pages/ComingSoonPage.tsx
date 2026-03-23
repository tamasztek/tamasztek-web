import './ComingSoonPage.css';

const WaveDecoration: React.FC = () => (
  <div className="coming-soon-wave" aria-hidden="true">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
    >
      <path
        d="M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z"
        fill="var(--color-surface-container-low)"
      />
      <path
        d="M0,80 C360,130 720,30 1080,80 C1260,105 1380,70 1440,80 L1440,120 L0,120 Z"
        fill="var(--color-surface-container-lowest)"
        opacity="0.7"
      />
    </svg>
  </div>
);

const ComingSoonPage: React.FC = () => {
  return (
    <div className="coming-soon-page">
      <nav className="coming-soon-nav" aria-label="Főnavigáció">
        <p className="coming-soon-nav__brand">TámaszTÉK Egyesület</p>
      </nav>

      <main className="coming-soon-main">
        <div className="coming-soon-content">
          <span className="coming-soon-eyebrow">Hamarosan</span>

          <h1 className="coming-soon-title">Hamarosan jövünk!</h1>

          <p className="coming-soon-subtitle">
            Az oldalunk épül – tartsatok velünk.
            Valami szép és hasznos készül a TámaszTÉK közösségnek.
          </p>

          <a
            href="mailto:info@tamasztek.hu"
            className="coming-soon-cta"
            aria-label="Értesítés kérése e-mailben, ha az oldal elkészül"
          >
            Értesíts, ha kész
          </a>

          <div className="coming-soon-card" role="note">
            Köszönjük a türelmeteket! A TámaszTÉK Egyesület hamarosan
            megnyitja kapuit – addig is írjatok nekünk bátran.
          </div>
        </div>
      </main>

      <WaveDecoration />
    </div>
  );
};

export default ComingSoonPage;

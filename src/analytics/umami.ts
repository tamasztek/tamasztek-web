// Umami analitika – feltételes tracking script injektálás.
//
// A tracking CSAK akkor fut, ha:
//   1. production build (import.meta.env.PROD) – a `pnpm dev` szerveren sosem, és
//   2. be van állítva VITE_UMAMI_WEBSITE_ID + VITE_UMAMI_SRC.
//
// Mivel a website ID-t csak a .env.prod tartalmazza (a .env.uat NEM), így kizárólag
// a prod build trackel – az UAT build PROD ugyan, de nincs website ID -> kihagyja.
//
// Az Umami tracker maga követi az SPA route-váltásokat (history.pushState patch),
// ezért nincs szükség react-router integrációra.

export function initUmami(): void {
  const websiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID;
  const src = import.meta.env.VITE_UMAMI_SRC; // pl. https://umami.tamasztek.hu/script.js

  if (!import.meta.env.PROD || !websiteId || !src) return;

  const script = document.createElement("script");
  script.async = true;
  script.defer = true;
  script.src = src;
  script.setAttribute("data-website-id", websiteId);
  document.head.appendChild(script);
}

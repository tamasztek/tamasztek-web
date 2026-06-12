// Barion Pixel – feltételes, hozzájáruláshoz kötött betöltés.
//
// A Barion kereskedői szerződése elvárja a Base Pixel elhelyezését (csalásszűrés +
// SCA-mentesség). A Pixel viselkedési adatot gyűjt és sütit/eszköz-ujjlenyomatot tesz le,
// ezért NEM "feltétlenül szükséges" süti – csak a felhasználó "marketing" hozzájárulása
// után tölthető be (ePrivacy + GDPR + Eht.).
//
// A betöltést a cookie consent réteg (lásd src/consent/) vezérli: elfogadáskor
// loadBarionPixel(), visszavonáskor unloadBarionPixel() hívódik.
//
// Mint az Umaminál: a Pixel CSAK production buildben fut, és csak ha be van állítva a
// VITE_BARION_PIXEL_ID (a Barion fiókból, NEM a POSKey). Üres ID esetén kimarad.

const PIXEL_SCRIPT_ID = "barion-pixel-script";
const PIXEL_SRC = "https://pixel.barion.com/bp.js";

type BarionPixelFn = ((...args: unknown[]) => void) & {
  q?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    bp?: BarionPixelFn;
    barion_pixel_id?: string;
  }
}

function pixelId(): string | undefined {
  const id = import.meta.env.VITE_BARION_PIXEL_ID;
  if (!import.meta.env.PROD || !id) return undefined;
  return id;
}

/**
 * Betölti a Barion Base Pixelt, ha még nincs betöltve. Idempotens.
 * Csak prod buildben és beállított Pixel ID esetén csinál bármit.
 */
export function loadBarionPixel(): void {
  const id = pixelId();
  if (!id) return;
  if (document.getElementById(PIXEL_SCRIPT_ID)) return; // már betöltve

  // Barion Pixel command queue inicializálása (a hivatalos base snippet mintájára).
  const bp: BarionPixelFn =
    window.bp ||
    function (...args: unknown[]) {
      (bp.q = bp.q || []).push(args);
    };
  bp.l = bp.l || Date.now();
  window.bp = bp;
  window.barion_pixel_id = id;

  const script = document.createElement("script");
  script.id = PIXEL_SCRIPT_ID;
  script.async = true;
  script.src = PIXEL_SRC;
  document.head.appendChild(script);

  bp("init", "addBarionPixelId", id);
}

/**
 * Eltávolítja a Barion Pixel scriptet és törli a Pixel által ismerten lerakott sütiket.
 * A hozzájárulás visszavonásakor hívódik. A teljes tisztulás reload után garantált.
 */
export function unloadBarionPixel(): void {
  document.getElementById(PIXEL_SCRIPT_ID)?.remove();
  delete window.bp;
  delete window.barion_pixel_id;

  // Best-effort cookie-törlés az aktuális domainen (a Barion Pixel "bp_" prefixet használ).
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (name && name.startsWith("bp_")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

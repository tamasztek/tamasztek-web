// Cookie consent réteg indítása. A main.tsx hívja egyszer, app-indításkor.
//
// A vanilla-cookieconsent kliensoldali könyvtár: nincs szerver-folyamat, a választás
// egy `cc_cookie` nevű sütiben perzisztál. A nem-szükséges scriptek (Barion Pixel) csak
// hozzájárulás után töltődnek be – lásd cookieConsentConfig.ts.

import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./cookieConsent.css";
import { cookieConsentConfig } from "./cookieConsentConfig";

export function initConsent(): void {
  void CookieConsent.run(cookieConsentConfig);
}

// A footer "Süti beállítások" linkje hívja, hogy újra elő lehessen hozni a modalt.
export function openCookiePreferences(): void {
  CookieConsent.showPreferences();
}

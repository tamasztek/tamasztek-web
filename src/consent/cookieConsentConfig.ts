// vanilla-cookieconsent konfiguráció (magyar nyelvű, kategória-alapú opt-in).
//
// Kategóriák:
//   - necessary: feltétlenül szükséges (readOnly). Ide tartozik az anonim, cookieless
//     Umami analitika is – ez nem gyűjt személyes adatot, ezért hozzájárulás nélkül fut.
//   - marketing: Barion Pixel (fizetésvédelem / SCA-mentesség). Profilozó süti, alapból KI,
//     csak aktív elfogadás után töltődik be a barionPixel.ts segítségével.

import type { CookieConsentConfig } from "vanilla-cookieconsent";
import { loadBarionPixel, unloadBarionPixel } from "../analytics/barionPixel";

const POLICY_PATH = "/sutitajekoztato";

// A "marketing" kategória állapotát szinkronizálja a Barion Pixellel.
function syncBarionPixel(acceptedCategory: (name: string) => boolean): void {
  if (acceptedCategory("marketing")) {
    loadBarionPixel();
  } else {
    unloadBarionPixel();
  }
}

export const cookieConsentConfig: CookieConsentConfig = {
  guiOptions: {
    consentModal: {
      layout: "box",
      position: "bottom left",
    },
    preferencesModal: {
      layout: "box",
    },
  },

  categories: {
    necessary: {
      enabled: true,
      readOnly: true,
    },
    marketing: {
      enabled: false,
    },
  },

  onConsent: ({ cookie }) => {
    syncBarionPixel((name) => (cookie?.categories ?? []).includes(name));
  },

  onChange: ({ cookie }) => {
    syncBarionPixel((name) => (cookie?.categories ?? []).includes(name));
  },

  language: {
    default: "hu",
    translations: {
      hu: {
        consentModal: {
          title: "Sütiket használunk",
          description:
            "Az oldal anonim, személyes adatot nem gyűjtő látogatottság-mérést használ. " +
            "A Barion fizetésvédelmi (Pixel) süti csak a hozzájárulásoddal töltődik be. " +
            "A részletekért lásd a sütitájékoztatót.",
          acceptAllBtn: "Mindet elfogadom",
          acceptNecessaryBtn: "Elutasítom",
          showPreferencesBtn: "Beállítások",
          footer: `<a href="${POLICY_PATH}">Sütitájékoztató</a>`,
        },
        preferencesModal: {
          title: "Süti beállítások",
          acceptAllBtn: "Mindet elfogadom",
          acceptNecessaryBtn: "Elutasítom",
          savePreferencesBtn: "Beállítások mentése",
          closeIconLabel: "Bezárás",
          sections: [
            {
              title: "A sütik használata",
              description:
                "Az alábbiakban kategóriánként engedélyezheted vagy letilthatod a sütiket. " +
                "A feltétlenül szükséges sütik mindig aktívak.",
            },
            {
              title: "Feltétlenül szükséges",
              description:
                "Az oldal működéséhez nélkülözhetetlen sütik, valamint az anonim, " +
                "cookieless látogatottság-mérés (Umami), amely nem gyűjt személyes adatot. " +
                "Ezek nem kapcsolhatók ki.",
              linkedCategory: "necessary",
            },
            {
              title: "Fizetésvédelem (Barion Pixel)",
              description:
                "A Barion Pixel a biztonságos kártyás fizetést, a csalásszűrést és az " +
                "erős ügyfél-hitelesítés alóli mentességet (gördülékenyebb fizetés) szolgálja. " +
                "Kikapcsolva is tudsz adományozni, de a fizetés során több hitelesítési lépés fordulhat elő.",
              linkedCategory: "marketing",
            },
            {
              title: "További információ",
              description: `Kérdés esetén keress minket, vagy olvasd el a <a href="${POLICY_PATH}">sütitájékoztatót</a>.`,
            },
          ],
        },
      },
    },
  },
};

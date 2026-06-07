const API_BASE = import.meta.env.VITE_API_BASE_URL;

export interface ContactMessage {
  senderName: string;
  senderEmail: string;
  subject: string;
  body: string;
}

export async function sendContactMessage(msg: ContactMessage): Promise<void> {
  const res = await fetch(`${API_BASE}/web/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(msg),
  });

  if (!res.ok) {
    // A backend 400 esetén { error: "<mező> is required" } formában válaszol
    let message = "Nem sikerült elküldeni az üzenetet. Kérjük, próbáld újra.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      /* nem JSON válasz – marad az általános üzenet */
    }
    throw new Error(message);
  }
}

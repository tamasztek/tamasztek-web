const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function extractError(res: Response, fallback: string): Promise<string> {
  try {
    const data = await res.json();
    if (data?.error) return data.error as string;
  } catch {
    /* nem JSON válasz – marad az általános üzenet */
  }
  return fallback;
}

export async function subscribeToNewsletter(email: string, name?: string): Promise<void> {
  const res = await fetch(`${API_BASE}/web/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, name: name?.trim() || null }),
  });
  if (!res.ok) {
    throw new Error(
      await extractError(res, "Nem sikerült a feliratkozás. Kérjük, próbáld újra."),
    );
  }
}

export async function confirmNewsletter(token: string): Promise<void> {
  const res = await fetch(
    `${API_BASE}/web/newsletter/confirm?token=${encodeURIComponent(token)}`,
  );
  if (!res.ok) {
    throw new Error(
      await extractError(res, "A megerősítő link érvénytelen vagy lejárt."),
    );
  }
}

export async function unsubscribeFromNewsletter(token: string): Promise<void> {
  const res = await fetch(`${API_BASE}/web/newsletter/unsubscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!res.ok) {
    throw new Error(await extractError(res, "A leiratkozó link érvénytelen."));
  }
}

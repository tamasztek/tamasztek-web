function injectTransformation(url: string, transformation: string): string {
  const marker = "/image/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  return (
    url.slice(0, idx + marker.length) +
    transformation +
    "/" +
    url.slice(idx + marker.length)
  );
}

export function getCoverUrl(url: string): string {
  return injectTransformation(url, "w_400,h_400,c_fill");
}

export function getGridUrl(url: string): string {
  return injectTransformation(url, "w_300,h_300,c_fill");
}

export function getSliderUrl(url: string): string {
  return injectTransformation(url, "w_1200,c_limit");
}

const allowedImageExtensions = /\.(jpg|jpeg|png|webp|gif|svg)(?:$|[?#])/i;
const trustedImageHosts = [
  "unsplash.com",
  "images.unsplash.com",
  "plus.unsplash.com",
  "pexels.com",
  "images.pexels.com",
  "pixabay.com",
  "cdn.pixabay.com",
  "imgur.com",
  "i.imgur.com",
  "cloudinary.com",
  "res.cloudinary.com",
];

function isImageUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol.toLowerCase();

    if (protocol !== "https:" && protocol !== "http:") {
      return false;
    }

    const pathName = parsedUrl.pathname.toLowerCase();
    const hostname = parsedUrl.hostname.toLowerCase();

    const hasImageExtension = allowedImageExtensions.test(pathName);
    const isTrustedImageHost = trustedImageHosts.some((host) => hostname.includes(host));

    return hasImageExtension || isTrustedImageHost;
  } catch {
    return false;
  }
}

export function normalizeProductImageUrl(rawUrl?: string | null) {
  if (!rawUrl) {
    return null;
  }

  const value = rawUrl.trim();

  if (!value) {
    return null;
  }

  if (!isImageUrl(value)) {
    return null;
  }

  const url = new URL(value);

  const isUnsplash = ["unsplash.com", "images.unsplash.com", "plus.unsplash.com"].some(
    (host) => url.hostname.includes(host)
  );

  if (isUnsplash) {
    const params = new URLSearchParams(url.search);
    params.set("auto", "format");
    params.set("fit", "crop");
    params.set("w", "800");
    params.set("q", "80");
    url.search = params.toString();
  }

  return url.toString();
}

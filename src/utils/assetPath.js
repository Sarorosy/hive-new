import { workspaces } from "../data/workspaceData";

const stripLeadingSlash = (path = "") => path.replace(/^\/+/, "");

export const assetPath = (path) => {
  const normalizedBase = import.meta.env.BASE_URL?.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL || ""}/`;

  return `${normalizedBase}${stripLeadingSlash(path)}`;
};

/**
 * Return the image path for a workspace by matching its `name`, `slug`, or `id`.
 * Returns a normalized URL using `assetPath` or an empty string when not found.
 */
export const getWorkspaceImageByName = (name = "") => {
  if (!name) return "";
  const key = String(name).trim().toLowerCase();

  const ws = workspaces.find((w) => {
    return (
      (w.name && w.name.toLowerCase() === key) ||
      (w.slug && w.slug.toLowerCase() === key) ||
      (w.id && w.id.toLowerCase() === key)
    );
  });

  if (!ws) return "";

  const imgPath = ws.image || "";

  // If image path is empty, return empty string
  if (!imgPath) return "";

  // Try to resolve images stored in `src/assets` using Vite's URL handling.
  // Many images in the repo live under `src/assets` but the data file uses
  // leading-slash paths (e.g. `/managedoffices.jpg`). We'll attempt to
  // resolve `../assets${imgPath}` relative to this file. If that fails,
  // fall back to `assetPath` which points to `public/` paths.
  try {

    const candidate = new URL(`../assets${imgPath}`, import.meta.url);

    console.log("Resolved workspace image:", candidate.href);
    return candidate.href;
  } catch (e) {
    return assetPath(imgPath);
  }
};


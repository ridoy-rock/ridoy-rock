/** Prefix for files in public/ when the site is served from a sub-path (e.g. GitHub Pages); empty otherwise. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Origin for app routes such as /login; empty when this page runs inside the app itself. */
const APP_ORIGIN = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
export const appLink = (path: string) => `${APP_ORIGIN}${path}`;

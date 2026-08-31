import createApp from "../server/src/app.js";

/**
 * The Vercel entry point.
 *
 * Vercel's Node runtime hands a request and a response straight to the default
 * export, and an Express app is already a function with that signature, so the
 * app itself is the handler. vercel.json routes every /api/* path here.
 *
 * The app is built at module scope on purpose. Vercel keeps a warm instance
 * alive between requests, so this runs once per instance rather than once per
 * request, and the cached Mongo connection in server/src/db/mongo.js is what
 * that warmth is actually worth.
 */

const app = createApp();

export default app;

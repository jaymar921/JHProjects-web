/**
 * The analytics surface the pages import from. Keeping the individual modules
 * behind one entry point means a page never has to know whether the visitor id
 * lives in localStorage or how an event is posted.
 */

export {
  trackClick,
  trackView,
  trackedRedirect,
  withTracking,
} from "./track.js";
export { usePageView } from "./usePageView.js";
export { forgetVisitor, getSessionId, getVisitorId } from "./visitor.js";
export {
  CLICK_ACTIONS,
  PROJECTS,
  PROJECT_LABELS,
  PROJECT_SLUGS,
  labelFor,
} from "../../../shared/projects.js";

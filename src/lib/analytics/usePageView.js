import { useEffect, useRef } from "react";
import { trackView } from "./track.js";

/**
 * Records one view when a page mounts.
 *
 * React 18 and up mount effects twice in development StrictMode, which would
 * post two views for every page load and quietly double the number. The ref
 * below is what stops that, and it also covers a re-render that changes the
 * slug back and forth.
 */
export function usePageView(project) {
  const sent = useRef(null);

  useEffect(() => {
    if (!project || sent.current === project) return;

    sent.current = project;
    trackView(project);
  }, [project]);
}

export default usePageView;

import { useEffect, useState } from "react";
import { Note, PixelButton } from "../../page_components/PixelUIKit";
import { ChartPanel, formatDate, formatRelative } from "./AdminCharts";
import { fetchEvents, isSignedOut } from "../../../lib/api/admin";

/**
 * The raw rows behind one project.
 *
 * The counters answer "how many". This answers "what actually came in", which
 * is the question you have when a number looks wrong. It is fetched only when
 * a project is opened, because it is the one read here that scans a
 * collection rather than reading a single counter document.
 *
 * The server does not send the hashed address in this response, so there is
 * nothing here that points at a person.
 */

const LIMIT = 25;

/** Bot rows are kept but greyed, so a link preview fetch is visible as one. */
function rowTone(event) {
  if (event.isBot) return "text-slate-600";
  if (event.type === "click") return "text-slate-300";
  return "text-slate-400";
}

function AdminEvents({ project, label, onClose, onSignedOut }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    fetchEvents(project, { limit: LIMIT, signal: controller.signal })
      .then((payload) => {
        if (!active) return;
        setEvents(payload.events ?? []);
      })
      .catch((failure) => {
        if (!active || failure.code === "timeout") return;
        if (isSignedOut(failure)) {
          onSignedOut?.();
          return;
        }
        setError(failure.message ?? "Could not load the events.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [project, onSignedOut]);

  return (
    <ChartPanel
      title={`RECENT EVENTS · ${(label ?? project).toUpperCase()}`}
      subtitle={`The last ${LIMIT}, newest first`}
      accent="slate"
      actions={
        <PixelButton accent="slate" icon="fa-solid fa-xmark" onClick={onClose}>
          CLOSE
        </PixelButton>
      }
    >
      {error && (
        <Note accent="rose" icon="fa-solid fa-circle-exclamation">
          {error}
        </Note>
      )}

      {loading ? (
        <p className="py-6 text-center text-[11px] text-slate-500">
          <i className="fa-solid fa-circle-notch fa-spin pr-2" />
          Reading the events…
        </p>
      ) : events.length === 0 ? (
        <p className="py-6 text-center text-[11px] text-slate-600">
          Nothing recorded for this project yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700/70">
                {["When", "Type", "What", "Device", "Browser", "From", "Path"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-2 py-2 text-[9px] tracking-widest text-slate-500 uppercase"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr
                  key={`${event.createdAt}-${index}`}
                  className="border-b border-slate-800/70"
                >
                  <td
                    className="px-2 py-2 text-[10px] whitespace-nowrap text-slate-500"
                    title={formatDate(event.createdAt)}
                  >
                    {formatRelative(event.createdAt)}
                  </td>
                  <td className={`px-2 py-2 text-[10px] ${rowTone(event)}`}>
                    {event.isBot ? "bot" : event.type}
                  </td>
                  <td className={`px-2 py-2 text-[11px] ${rowTone(event)}`}>
                    {event.type === "click"
                      ? [event.action, event.label].filter(Boolean).join(" · ")
                      : "page view"}
                  </td>
                  <td className="px-2 py-2 text-[10px] text-slate-500">
                    {event.device?.type ?? "unknown"}
                  </td>
                  <td className="px-2 py-2 text-[10px] text-slate-500">
                    {event.device?.browser ?? "unknown"}
                  </td>
                  <td className="px-2 py-2 text-[10px] text-slate-500">
                    {event.referrerHost ?? "direct"}
                  </td>
                  <td className="px-2 py-2 text-[10px] text-slate-500">
                    {event.path ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </ChartPanel>
  );
}

export default AdminEvents;

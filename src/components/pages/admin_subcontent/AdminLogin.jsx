import { useState } from "react";
import {
  Field,
  FormStatus,
  Panel,
  PixelButton,
  TextInput,
} from "../../page_components/PixelUIKit";
import { login } from "../../../lib/api/admin";

/**
 * The gate.
 *
 * It says as little as possible. One message covers a wrong username and a
 * wrong password, because telling them apart is how someone finds out which
 * usernames are real, and the server answers both the same way for the same
 * reason.
 */
function AdminLogin({ onSignedIn, configured = true }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setError(null);

    try {
      const result = await login({ username, password });
      // The password is dropped from state on the way out rather than left
      // sitting in a React tree for as long as the tab is open.
      setPassword("");
      onSignedIn?.(result);
    } catch (failure) {
      setError(failure.message ?? "That did not work. Try again.");
      setPassword("");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen w-full place-items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="pb-6 text-center">
          <span className="inline-flex h-12 w-12 place-items-center justify-center border-2 border-sky-400/40 bg-sky-400/10 text-sky-300">
            <i className="fa-solid fa-lock" />
          </span>
          <h1 className="pixel-font pt-4 text-[12px] tracking-widest text-slate-200">
            ADMIN GATEWAY
          </h1>
          <p className="pt-2 text-[11px] text-slate-500">
            JHProjects analytics. Nothing here is public.
          </p>
        </div>

        <Panel accent="sky" className="p-5">
          {!configured ? (
            <FormStatus tone="error" title="NOT CONFIGURED">
              This deployment has no database connection, so there is nothing to
              sign in to. Set MONGODB_URI and restart.
            </FormStatus>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              <Field label="Username" htmlFor="admin-username" required>
                <TextInput
                  id="admin-username"
                  name="username"
                  accent="sky"
                  autoComplete="username"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck="false"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  disabled={busy}
                  required
                />
              </Field>

              <Field label="Password" htmlFor="admin-password" required>
                <TextInput
                  id="admin-password"
                  name="password"
                  type="password"
                  accent="sky"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  disabled={busy}
                  required
                />
              </Field>

              {error && (
                <FormStatus tone="error" title="NOT SIGNED IN">
                  {error}
                </FormStatus>
              )}

              <PixelButton
                accent="sky"
                type="submit"
                icon={busy ? "fa-solid fa-circle-notch fa-spin" : "fa-solid fa-right-to-bracket"}
                className="w-full"
                disabled={busy || username.trim() === "" || password === ""}
              >
                {busy ? "CHECKING" : "SIGN IN"}
              </PixelButton>
            </form>
          )}
        </Panel>

        <p className="pt-5 text-center text-[10px] leading-relaxed text-slate-600">
          Accounts are created from a terminal with{" "}
          <span className="text-slate-500">npm run admin -- create</span>. There is no
          sign up and no password reset by email.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

import { useState } from "react";
import {
  Body,
  ChoiceGroup,
  Field,
  FormStatus,
  Panel,
  PixelButton,
  SubHeading,
  TextArea,
  TextInput,
} from "./PixelUIKit";
import { SEVERITIES, submitBugReport } from "../../lib/api/bugReports";
import { ApiError } from "../../lib/api/client";

/**
 * The bug report form.
 *
 * It replaces "copy this template into an email and hope you filled it in",
 * which is the step where most reports quietly stop being written. The fields
 * are the same ones the old template asked for, so nothing is lost, but the
 * two that actually decide whether a report is usable, a summary and a real
 * description, are the only ones that are required.
 *
 * The mailto link and the GitHub issue button stay on the page next to this.
 * Some people would rather use them, and a form that only works when a server
 * is up should not be the only route to the developer.
 */

const SERVER_SOFTWARE = ["Paper", "Spigot", "Purpur", "Folia", "Bukkit", "Other"];

/** Mirrors the server's minimums so a mistake is caught before the round trip. */
const RULES = {
  summary: { min: 5, max: 140 },
  description: { min: 20, max: 4000 },
};

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * The placeholder text, per project. A plugin's own vocabulary in the example
 * boxes is what tells a reporter the level of detail wanted, so each page
 * passes its own; these are only the fallbacks for a page that does not.
 */
const DEFAULT_EXAMPLES = Object.freeze({
  summary: "A short line that tells this report apart from every other one",
  expectedBehavior: "What should have happened instead.",
  steps: `1. The first thing you did
2. Then this
3. And this is what happened`,
  pluginVersion: "1.0.0",
  minecraftVersion: "1.21.4",
});

const DEFAULT_CONTEXT_HINT =
  "Other plugins, unusual config, when it started happening.";

function validate(values) {
  const errors = {};

  if (values.summary.trim().length < RULES.summary.min) {
    errors.summary = `Give it at least ${RULES.summary.min} characters, enough to tell two reports apart.`;
  }

  if (values.description.trim().length < RULES.description.min) {
    errors.description = `Please describe what happened in at least ${RULES.description.min} characters.`;
  }

  const email = values.reporterEmail.trim();
  if (email !== "" && !EMAIL_SHAPE.test(email)) {
    errors.reporterEmail = "That address does not look right.";
  }

  return errors;
}

const EMPTY = {
  summary: "",
  severity: "medium",
  description: "",
  expectedBehavior: "",
  stepsToReproduce: "",
  logs: "",
  additionalContext: "",
  pluginVersion: "",
  minecraftVersion: "",
  serverSoftware: "",
  reporterName: "",
  reporterEmail: "",
  // The honeypot. Hidden from people, irresistible to a form filling bot.
  website: "",
};

function BugReportForm({
  project,
  accent = "lime",
  defaultPluginVersion = "",
  examples,
  contextHint = DEFAULT_CONTEXT_HINT,
}) {
  const placeholders = { ...DEFAULT_EXAMPLES, ...examples };
  const [values, setValues] = useState({
    ...EMPTY,
    pluginVersion: defaultPluginVersion,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle" });

  const set = (field) => (event) => {
    const value = event?.target ? event.target.value : event;
    setValues((current) => ({ ...current, [field]: value }));

    // Clear the message the moment the visitor starts fixing the field, rather
    // than leaving a red line under something they have already corrected.
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const submitting = status.state === "submitting";

  const onSubmit = async (event) => {
    event.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ state: "idle" });
      // Put the visitor on the first thing that needs fixing instead of making
      // them hunt for it in a long form.
      const first = document.getElementById(`bug-${Object.keys(found)[0]}`);
      first?.focus();
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus({ state: "submitting" });

    try {
      const result = await submitBugReport({ project, ...values });

      setStatus({
        state: "sent",
        emailed: result.emailed,
        note: result.emailNote ?? null,
      });
      setValues({ ...EMPTY, pluginVersion: defaultPluginVersion });
    } catch (error) {
      if (error instanceof ApiError && error.field) {
        setErrors({ [error.field]: error.message });
      }

      setStatus({
        state: "error",
        message:
          error instanceof ApiError
            ? error.message
            : "Something went wrong sending the report.",
      });
    }
  };

  if (status.state === "sent") {
    return (
      <Panel accent={accent} className="p-5">
        <FormStatus
          tone={status.emailed ? "success" : "warning"}
          title={status.emailed ? "Report sent" : "Report saved"}
        >
          {status.emailed
            ? "Thanks. It is in the developer's inbox now. If you left an email address you will hear back on it."
            : (status.note ??
              "It is stored safely and will be picked up. The email step did not go through this time.")}
        </FormStatus>
        <div className="pt-5">
          <PixelButton
            accent={accent}
            icon="fa-solid fa-rotate-left"
            onClick={() => setStatus({ state: "idle" })}
          >
            REPORT ANOTHER
          </PixelButton>
        </div>
      </Panel>
    );
  }

  return (
    <Panel accent={accent} className="p-5">
      <SubHeading accent={accent}>SEND A REPORT FROM HERE</SubHeading>
      <Body className="pt-3">
        Fill this in and it goes straight to the developer. Only the first two
        boxes are required, but every extra line is one less round of questions.
      </Body>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 pt-5">
        <Field
          label="One line summary"
          htmlFor="bug-summary"
          required
          error={errors.summary}
          hint="The subject line of the report. What broke, in a few words."
        >
          <TextInput
            id="bug-summary"
            name="summary"
            accent={accent}
            value={values.summary}
            onChange={set("summary")}
            invalid={Boolean(errors.summary)}
            maxLength={RULES.summary.max}
            placeholder={placeholders.summary}
            autoComplete="off"
          />
        </Field>

        <ChoiceGroup
          legend="How bad is it?"
          name="severity"
          value={values.severity}
          onChange={set("severity")}
          options={SEVERITIES}
        />

        <Field
          label="What went wrong"
          htmlFor="bug-description"
          required
          error={errors.description}
          hint={`${values.description.trim().length} of ${RULES.description.min} characters minimum.`}
        >
          <TextArea
            id="bug-description"
            name="description"
            accent={accent}
            value={values.description}
            onChange={set("description")}
            invalid={Boolean(errors.description)}
            maxLength={RULES.description.max}
            placeholder="Describe what you did, and what the plugin did back."
          />
        </Field>

        <Field
          label="What you expected instead"
          htmlFor="bug-expectedBehavior"
          hint="Sometimes the bug is that the plugin works as designed and the design is wrong."
        >
          <TextArea
            id="bug-expectedBehavior"
            name="expectedBehavior"
            accent={accent}
            value={values.expectedBehavior}
            onChange={set("expectedBehavior")}
            maxLength={2000}
            className="min-h-[80px]"
            placeholder={placeholders.expectedBehavior}
          />
        </Field>

        <Field
          label="Steps to reproduce"
          htmlFor="bug-stepsToReproduce"
          hint="A bug that can be reproduced is usually fixed the same day."
        >
          <TextArea
            id="bug-stepsToReproduce"
            name="stepsToReproduce"
            accent={accent}
            value={values.stepsToReproduce}
            onChange={set("stepsToReproduce")}
            maxLength={2000}
            className="min-h-[80px]"
            placeholder={placeholders.steps}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Plugin version" htmlFor="bug-pluginVersion">
            <TextInput
              id="bug-pluginVersion"
              name="pluginVersion"
              accent={accent}
              value={values.pluginVersion}
              onChange={set("pluginVersion")}
              maxLength={40}
              placeholder={placeholders.pluginVersion}
              autoComplete="off"
            />
          </Field>

          <Field label="Minecraft version" htmlFor="bug-minecraftVersion">
            <TextInput
              id="bug-minecraftVersion"
              name="minecraftVersion"
              accent={accent}
              value={values.minecraftVersion}
              onChange={set("minecraftVersion")}
              maxLength={40}
              placeholder={placeholders.minecraftVersion}
              autoComplete="off"
            />
          </Field>

          <Field label="Server software" htmlFor="bug-serverSoftware">
            <TextInput
              id="bug-serverSoftware"
              name="serverSoftware"
              accent={accent}
              value={values.serverSoftware}
              onChange={set("serverSoftware")}
              maxLength={60}
              list="bug-server-software"
              placeholder="Paper"
              autoComplete="off"
            />
            <datalist id="bug-server-software">
              {SERVER_SOFTWARE.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </Field>
        </div>

        <Field
          label="Logs or stack trace"
          htmlFor="bug-logs"
          hint="Paste the whole thing. The first few lines are rarely the useful part."
        >
          <TextArea
            id="bug-logs"
            name="logs"
            accent={accent}
            value={values.logs}
            onChange={set("logs")}
            maxLength={12000}
            className="min-h-[120px] font-mono text-[11px]"
            spellCheck={false}
            placeholder="[12:04:51 ERROR]: Could not pass event ..."
          />
        </Field>

        <Field
          label="Anything else"
          htmlFor="bug-additionalContext"
          hint={contextHint}
        >
          <TextArea
            id="bug-additionalContext"
            name="additionalContext"
            accent={accent}
            value={values.additionalContext}
            onChange={set("additionalContext")}
            maxLength={2000}
            className="min-h-[80px]"
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name or username" htmlFor="bug-reporterName">
            <TextInput
              id="bug-reporterName"
              name="reporterName"
              accent={accent}
              value={values.reporterName}
              onChange={set("reporterName")}
              maxLength={80}
              placeholder="Optional"
              autoComplete="nickname"
            />
          </Field>

          <Field
            label="Your email"
            htmlFor="bug-reporterEmail"
            error={errors.reporterEmail}
            hint="Only used to reply about this report."
          >
            <TextInput
              id="bug-reporterEmail"
              name="reporterEmail"
              type="email"
              accent={accent}
              value={values.reporterEmail}
              onChange={set("reporterEmail")}
              invalid={Boolean(errors.reporterEmail)}
              maxLength={254}
              placeholder="Optional, but it is how you get an answer"
              autoComplete="email"
            />
          </Field>
        </div>

        {/*
          The honeypot. Hidden from the page and from screen readers, and left
          out of the tab order, so the only thing that ever fills it is a bot
          walking the DOM.
        */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="bug-website">Leave this empty</label>
          <input
            id="bug-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={set("website")}
          />
        </div>

        {status.state === "error" && (
          <FormStatus tone="error" title="Could not send">
            {status.message}
          </FormStatus>
        )}

        <div className="flex flex-wrap place-items-center gap-3">
          <PixelButton
            accent={accent}
            type="submit"
            disabled={submitting}
            icon={
              submitting
                ? "fa-solid fa-spinner fa-spin"
                : "fa-solid fa-paper-plane"
            }
          >
            {submitting ? "SENDING..." : "SEND REPORT"}
          </PixelButton>
          <p className="text-[10px] text-slate-500 md:text-[11px]">
            Goes to the developer by email. Nothing is published anywhere.
          </p>
        </div>
      </form>
    </Panel>
  );
}

export default BugReportForm;

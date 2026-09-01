#!/usr/bin/env node
import env from "../server/src/config/env.js";
import { closeClient } from "../server/src/db/mongo.js";
import {
  countAdmins,
  deleteAdmin,
  issueTemporaryPassword,
  listAdmins,
  revokeAllSessions,
} from "../server/src/services/adminAuth.js";

/**
 * The only way an admin account comes into existence.
 *
 *   npm run admin -- create [username]   make the account, print a temporary password
 *   npm run admin -- reset  <username>   issue a fresh temporary password
 *   npm run admin -- list                who exists, and the state of each
 *   npm run admin -- revoke <username>   sign every browser out of that account
 *   npm run admin -- delete <username>   remove the account entirely
 *
 * There is deliberately no sign up form and no "forgot password" email. An
 * account is created by someone who already holds the database credentials,
 * standing at a terminal. That is the whole trust model, and it is why the
 * password below is printed once and never stored in a readable form.
 */

const USAGE = `
JHProjects admin accounts

  npm run admin -- create [username]   create the account and print a temporary password
  npm run admin -- reset  <username>   issue a fresh temporary password
  npm run admin -- list                list the accounts and their state
  npm run admin -- revoke <username>   sign every browser out of that account
  npm run admin -- delete <username>   delete the account

The default username is "admin". A temporary password expires after
${env.admin.tempPasswordHours} hours and has to be changed at the first sign in.
`;

const GREY = "\u001b[90m";
const BOLD = "\u001b[1m";
const RESET = "\u001b[0m";

function line(char = "-") {
  return char.repeat(58);
}

/** Formats a date the way someone reading a terminal wants to see it. */
function when(date) {
  if (!(date instanceof Date)) return "never";
  return date.toISOString().replace("T", " ").slice(0, 16) + " UTC";
}

function printCredentials({ username, password, expiresAt, created }) {
  console.log("");
  console.log(`${BOLD}${line("=")}${RESET}`);
  console.log(`${BOLD}  ${created ? "Account created" : "Temporary password reissued"}${RESET}`);
  console.log(`${BOLD}${line("=")}${RESET}`);
  console.log("");
  console.log(`  Sign in at   /admin`);
  console.log(`  Username     ${BOLD}${username}${RESET}`);
  console.log(`  Password     ${BOLD}${password}${RESET}`);
  console.log(`  Expires      ${when(expiresAt)}`);
  console.log("");
  console.log(`${GREY}  This password is shown once and is not stored anywhere it can be`);
  console.log(`  read back. It only gets you as far as the change password screen;`);
  console.log(`  the dashboard opens once you have set a real one.`);
  console.log("");
  console.log(`  If it expires before it is used, run: npm run admin -- reset ${username}${RESET}`);
  console.log("");
}

async function main() {
  const [command = "help", ...rest] = process.argv.slice(2);

  if (command === "help" || command === "--help" || command === "-h") {
    console.log(USAGE);
    return 0;
  }

  if (!env.mongo.configured) {
    console.error("MONGODB_URI is not set. Fill it in in .env and try again.");
    return 1;
  }

  switch (command) {
    case "create":
    case "reset": {
      const username = rest[0] ?? "admin";
      const result = await issueTemporaryPassword(username);

      if (command === "create" && !result.created) {
        console.log(`${GREY}That account already existed, so its password was reset.${RESET}`);
      }

      printCredentials(result);
      return 0;
    }

    case "list": {
      const accounts = await listAdmins();

      if (accounts.length === 0) {
        console.log("No admin accounts yet. Create one with: npm run admin -- create");
        return 0;
      }

      console.log("");
      for (const account of accounts) {
        const locked =
          account.lockedUntil instanceof Date && account.lockedUntil > new Date();

        console.log(`  ${BOLD}${account.username}${RESET}`);
        console.log(`    password    ${account.passwordIsTemporary ? "temporary" : "set"}`);
        if (account.passwordIsTemporary) {
          console.log(`    expires     ${when(account.passwordExpiresAt)}`);
        }
        console.log(`    last login  ${when(account.lastLoginAt)}`);
        console.log(`    status      ${locked ? `locked until ${when(account.lockedUntil)}` : "active"}`);
        console.log("");
      }

      return 0;
    }

    case "revoke": {
      const username = rest[0];
      if (!username) {
        console.error("Which account? npm run admin -- revoke <username>");
        return 1;
      }

      const count = await revokeAllSessions(username.toLowerCase());
      console.log(`Signed out ${count} session${count === 1 ? "" : "s"} for ${username}.`);
      return 0;
    }

    case "delete": {
      const username = rest[0];
      if (!username) {
        console.error("Which account? npm run admin -- delete <username>");
        return 1;
      }

      // Deleting the only account leaves nobody able to get in, and the fix is
      // to run create again, so this is a warning rather than a refusal.
      const before = await countAdmins();
      const removed = await deleteAdmin(username);

      if (!removed) {
        console.error(`No account called ${username}.`);
        return 1;
      }

      console.log(`Deleted ${username}.`);
      if (before === 1) {
        console.log(`${GREY}That was the last admin account. /admin is now unreachable`);
        console.log(`until you run: npm run admin -- create${RESET}`);
      }
      return 0;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.log(USAGE);
      return 1;
  }
}

main()
  .then(async (code) => {
    await closeClient();
    process.exit(code);
  })
  .catch(async (error) => {
    console.error(`\nFailed: ${error.message}`);
    await closeClient();
    process.exit(1);
  });

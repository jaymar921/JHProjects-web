import { MongoClient } from "mongodb";
import env from "../config/env.js";

/**
 * One MongoClient, reused across invocations.
 *
 * On a serverless deploy the module is kept alive between requests, so caching
 * the connect() promise on the module is what stops every request opening a
 * new connection pool and exhausting the Atlas connection limit. The promise
 * is cached rather than the client so that concurrent first requests share a
 * single connect instead of racing.
 */

let clientPromise = null;

function createClient() {
  const client = new MongoClient(env.mongo.uri, {
    // A serverless invocation is short lived, so fail fast rather than hang
    // the request for the default 30 seconds when Atlas is unreachable.
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    maxPoolSize: 10,
    retryWrites: true,
  });

  return client.connect();
}

export function isConfigured() {
  return env.mongo.configured;
}

/** Resolves to a connected client, or throws if MONGODB_URI is not set. */
export function getClient() {
  if (!env.mongo.configured) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!clientPromise) {
    clientPromise = createClient().catch((error) => {
      // Drop the failed promise so the next request retries instead of
      // resolving the same rejection forever.
      clientPromise = null;
      throw error;
    });
  }

  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(env.mongo.dbName);
}

/** Closes the pool. Used by the standalone server on shutdown and by tests. */
export async function closeClient() {
  if (!clientPromise) return;

  const pending = clientPromise;
  clientPromise = null;

  try {
    const client = await pending;
    await client.close();
  } catch {
    // Already closed, or never opened. Nothing to clean up.
  }
}

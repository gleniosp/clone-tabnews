import crypto from "node:crypto";
import database from "infra/database.js";
import { UnauthorizedError } from "infra/errors.js";

const EXPIRATION_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000; // 30 days in milliseconds

const getNewExpirationDate = () =>
  new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

async function findOneValidByToken(sessionToken) {
  const sessionFound = await runSelectQuery(sessionToken);

  return sessionFound;

  async function runSelectQuery(sessionToken) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          sessions
        WHERE
          token = $1
          AND expires_at > NOW()
        LIMIT 1
      ;`,
      values: [sessionToken],
    });

    if (results.rowCount === 0) {
      throw new UnauthorizedError({
        message: "User doesn't have an active session.",
        action: "Verify if this user is logged in and try again.",
      });
    }

    return results.rows[0];
  }
}

async function create(userId) {
  // 48 bytes = 96 characters in HEX format
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = getNewExpirationDate();

  const newSession = await runInsertQuery(token, userId, expiresAt);
  return newSession;

  async function runInsertQuery(token, userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          sessions (token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
      `,
      values: [token, userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function renew(sessionId) {
  const expiresAt = getNewExpirationDate();

  const renewedSessionObject = runUpdateQuery(sessionId, expiresAt);
  return renewedSessionObject;

  async function runUpdateQuery(sessionId, expiresAt) {
    const results = await database.query({
      text: `
        UPDATE
          sessions
        SET
          expires_at = $2,
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
      ;`,
      values: [sessionId, expiresAt],
    });

    return results.rows[0];
  }
}

async function expireById(sessionId) {
  const expiredSessionObject = await runUpdateQuery(sessionId);
  return expiredSessionObject;

  async function runUpdateQuery(sessionId) {
    const results = await database.query({
      text: `
        UPDATE
          sessions
        SET
          expires_at = expires_at - interval '1 year',
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
      ;`,
      values: [sessionId],
    });

    return results.rows[0];
  }
}

const session = {
  create,
  findOneValidByToken,
  renew,
  expireById,
  EXPIRATION_IN_MILLISECONDS,
};

export default session;

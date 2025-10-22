import database from "infra/database";
import email from "infra/email.js";
import { NotFoundError } from "infra/errors.js";
import webserver from "infra/webserver";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutes

async function findOneValidById(activationTokenId) {
  const tokenFound = await runSelectQuery(activationTokenId);

  return tokenFound;

  async function runSelectQuery(activationTokenId) {
    const results = await database.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          id = $1
          AND expires_at > NOW()
          AND used_at IS NULL
        LIMIT 
          1
      ;`,
      values: [activationTokenId],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message:
          "The activation token wasn't found on the system or the token is expired.",
        action: "Please try to register again.",
      });
    }

    return results.rows[0];
  }
}

async function create(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          user_activation_tokens (user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
      ;`,
      values: [userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "CloneTabNews <contact@clonetabnewsxyz.com>",
    to: user.email,
    subject: "Activate your registration at CloneTabNews!",
    text: `${user.username}, click at the below link to activate your registration at CloneTabNews:
    
${webserver.origin}/registration/activate/${activationToken.id}

Sincerely,
CloneTabNews team`,
  });
}

const activation = {
  findOneValidById,
  create,
  sendEmailToUser,
};

export default activation;

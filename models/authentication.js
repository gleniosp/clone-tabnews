import user from "models/user.js";
import password from "models/password.js";
import { NotFoundError, UnauthorizedError } from "infra/errors.js";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassword, storedUser.password);
    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Authentication data doesn't match.",
        action: "Verify if the provided data is correct.",
      });
    }

    throw error;
  }

  async function findUserByEmail(providedEmail) {
    let storedUser;

    try {
      storedUser = await user.findOneByEmail(providedEmail);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "Email doesn't match.",
          action: "Verify if the provided data is correct.",
        });
      }

      throw error;
    }

    return storedUser;
  }

  async function validatePassword(providedPassword, storedPassword) {
    const correctPasswordMatch = await password.compare(
      providedPassword,
      storedPassword,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Password doesn't match.",
        action: "Verify if the provided data is correct.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;

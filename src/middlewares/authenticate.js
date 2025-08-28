
import createHttpError from "http-errors";
import { UsersCollection } from "../db/models/user.js";
import { SessionCollection } from "../db/models/session.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return next(createHttpError(401, "Not authorized"));
    }

    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session) {
      return next(createHttpError(401, "Not authorized"));
    }

    if (session.accessTokenValidUntil < new Date()) {
      return next(createHttpError(401, "Access token expired"));
    }

    const user = await UsersCollection.findById(session.userId);
    if (!user) {
      return next(createHttpError(401, "Not authorized"));
    }

    req.user = user;
    req.session = session;

    next();
  } catch (error) {
    error;
    next(createHttpError(401, "Not authorized"));
  }
};
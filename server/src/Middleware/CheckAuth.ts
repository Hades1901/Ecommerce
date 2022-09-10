import { AuthenticationError } from "apollo-server-core";
import { MiddlewareFn } from "type-graphql";
import { Context } from "../Type/Contain";

export const checkAuth: MiddlewareFn<Context> = (
  { context: { req } },
  next
) => {
  if (!req.session.userId)
    throw new AuthenticationError(
      "Not authenticated to perfrom Graphql operations"
    );
  return next();
};

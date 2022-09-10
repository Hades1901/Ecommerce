import argon2 from "argon2";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../Entities/User";
import { Context } from "../Type/Contain";
import { UserMutationResponse } from "../Type/ErrorValidate/UserMutation";
import { LoginInput } from "../Type/Input/LoginInput";
import { RegisterInput } from "../Type/Input/RegisterInput";
import { COOKIE_NAME } from "../Utils/Contain";
import { validateRegisterInput } from "../Utils/ValidateRegisterInput";

@Resolver()
export class UserResolver {
  @Mutation((_return) => UserMutationResponse, { nullable: true })
  async register(
    @Arg("registerInput") registerInput: RegisterInput
  ): Promise<UserMutationResponse> {
    try {
      const { username, email, password } = registerInput;

      const existingUser = await User.findOneBy({ username, email });

      const validateRegisterInputError = validateRegisterInput(registerInput);

      if (validateRegisterInputError)
        return {
          code: 400,
          success: false,
          ...validateRegisterInputError,
        };

      if (existingUser)
        return {
          code: 400,
          success: false,
          message: "Your account already exist",
          error: [
            {
              field: "Email",
              message: "User or email already taken",
            },
          ],
        };

      const hashPassword = await argon2.hash(password);

      const newUser = User.create({
        username,
        email,
        password: hashPassword,
      });

      const createdUser = await User.save(newUser);

      return {
        code: 200,
        success: true,
        message: "You have created an Account",
        user: createdUser,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: err.message,
      };
    }
  }

  @Mutation((_return) => UserMutationResponse, { nullable: true })
  async login(
    @Arg("loginInput") loginInput: LoginInput,
    @Ctx() { req }: Context
  ): Promise<UserMutationResponse> {
    try {
      const { email, password } = loginInput;

      const exitingUser = await User.findOneBy({ email });

      if (!exitingUser)
        return {
          code: 400,
          success: false,
          message: "User not found ",
          error: [
            {
              field: "Email",
              message: "User not found",
            },
          ],
        };

      const passwordValid = await argon2.verify(exitingUser.password, password);

      if (!passwordValid)
        return {
          code: 400,
          success: false,
          message: "User not found",
          error: [
            {
              field: "Password",
              message: "User not found",
            },
          ],
        };

      req.session.userId = exitingUser.id;

      return {
        code: 200,
        success: true,
        message: "Logged is successfully",
        user: exitingUser,
      };
    } catch (err) {
      return {
        code: 500,
        success: false,
        message: err.message,
      };
    }
  }

  @Mutation((_return) => Boolean)
  logout(@Ctx() { req, res }: Context): Promise<boolean> {
    return new Promise((resolver, _rejected) => {
      res.clearCookie(COOKIE_NAME);
      req.session.destroy((err) => {
        if (err) {
          console.log("Destroy session error", err);
          resolver(false);
        }
        resolver(true);
      });
    });
  }
}

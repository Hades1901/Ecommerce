import { RegisterInput } from "../Type/Input/RegisterInput";
export const validateRegisterInput = (registerInput: RegisterInput) => {
  if (!registerInput.email.includes("@"))
    return {
      message: "Invalid Email",
      error: [
        {
          field: "Email",
          message: "Email must include @ symbol",
        },
      ],
    };
  if (registerInput.password.length < 6)
    return {
      message: "You have to enter at least 6 digit",
      error: [
        {
          field: "password",
          message: "Lenght must be greater than 6",
        },
      ],
    };
  if (registerInput.username.length <= 2) {
    return {
      message: "You have to enter at least 2 digit",
      error: [
        {
          field: "username",
          message: "Lenght must be greater than 2",
        },
      ],
    };
  }
  return null;
};

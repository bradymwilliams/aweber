import { useState } from "react";
import {
  validatePasswordLength,
  validatePasswordUppercase,
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialChar,
  doPasswordsMatch,
  PASSWORD_MIN_LENGTH,
} from "./password";

export const VALIDATION_MESSAGES = {
  LENGTH: (minLength = PASSWORD_MIN_LENGTH) =>
    `Password must be at least ${minLength} characters long.`,
  UPPERCASE: "Password must contain at least one uppercase letter.",
  LOWERCASE: "Password must contain at least one lowercase letter.",
  NUMBER: "Password must contain at least one number.",
  SPECIAL_CHAR:
    "Password must contain at least one special character. (!@#$%^&*()_-+={[}]|:;\"'<,>.)",
  MATCH: "Passwords do not match.",
};

const usePasswordValidation = (props: { minLength?: number } = {}) => {
  const [errors, setErrors] = useState<string[]>([]);

  const validatePassword = (password: string, confirmPassword: string) => {
    const validationErrors: string[] = [];

    if (!validatePasswordLength(password, props.minLength))
      validationErrors.push(VALIDATION_MESSAGES.LENGTH(props.minLength));
    if (!validatePasswordUppercase(password))
      validationErrors.push(VALIDATION_MESSAGES.UPPERCASE);
    if (!validatePasswordLowercase(password))
      validationErrors.push(VALIDATION_MESSAGES.LOWERCASE);
    if (!validatePasswordNumber(password))
      validationErrors.push(VALIDATION_MESSAGES.NUMBER);
    if (!validatePasswordSpecialChar(password))
      validationErrors.push(VALIDATION_MESSAGES.SPECIAL_CHAR);
    if (!doPasswordsMatch(password, confirmPassword))
      validationErrors.push(VALIDATION_MESSAGES.MATCH);

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  return { validatePassword, errors };
};

export default usePasswordValidation;

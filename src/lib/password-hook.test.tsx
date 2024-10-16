/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";

import usePasswordValidation from "./use-password-validation";
import { describe, expect, it } from "vitest";
import { VALIDATION_MESSAGES } from "./use-password-validation";
import { PASSWORD_MIN_LENGTH } from "./password";

const passwordTests = [
  {
    password: "Password123!",
    confirmPassword: "Password123!",
    errors: [],
  },
  {
    password: "password123",
    confirmPassword: "password123",
    errors: [VALIDATION_MESSAGES.UPPERCASE, VALIDATION_MESSAGES.SPECIAL_CHAR],
  },
  {
    password: "password123",
    confirmPassword: "password1234",
    errors: [VALIDATION_MESSAGES.MATCH],
  },
  {
    password: "",
    confirmPassword: "password1234",
    errors: [
      VALIDATION_MESSAGES.LENGTH(PASSWORD_MIN_LENGTH),
      VALIDATION_MESSAGES.UPPERCASE,
      VALIDATION_MESSAGES.LOWERCASE,
      VALIDATION_MESSAGES.NUMBER,
      VALIDATION_MESSAGES.SPECIAL_CHAR,
      VALIDATION_MESSAGES.MATCH,
    ],
  },
];

describe("usePasswordValidation Hook", () => {
  it("should validate password and confirm password", () => {
    const { result } = renderHook(() => usePasswordValidation());

    passwordTests.forEach((test) => {
      act(() => {
        result.current.validatePassword(test.password, test.confirmPassword);
      });

      test.errors.forEach((error) => {
        expect(result.current.errors).toContain(error);
      });
    });
  });
});

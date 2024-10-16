import { expect, test } from "vitest";
import {
  validatePasswordLength,
  validatePasswordUppercase,
  validatePasswordLowercase,
  validatePasswordNumber,
  validatePasswordSpecialChar,
  doPasswordsMatch,
} from "../src/lib/password";
import { describe } from "node:test";

describe("Password validation", () => {
  test("validatePasswordLength should return true for passwords with length >= 6", () => {
    expect(validatePasswordLength("123456")).toBe(true);
    expect(validatePasswordLength("1234567890123456")).toBe(true);
    expect(validatePasswordLength("12345")).toBe(false);
  });

  test("validatePasswordUppercase should return true for passwords with uppercase letters", () => {
    expect(validatePasswordUppercase("Abc123")).toBe(true);
    expect(validatePasswordUppercase("abc123")).toBe(false);
  });

  test("validatePasswordLowercase should return true for passwords with lowercase letters", () => {
    expect(validatePasswordLowercase("Abc123")).toBe(true);
    expect(validatePasswordLowercase("ABC123")).toBe(false);
  });

  test("validatePasswordNumber should return true for passwords with numbers", () => {
    expect(validatePasswordNumber("Abc123")).toBe(true);
    expect(validatePasswordNumber("Abc")).toBe(false);
  });

  test("validatePasswordSpecialChar should return true for passwords with special characters", () => {
    const chars = `!@#$%^&*()_-+=[]{}|:;"'<,>.?`;
    for (const char of chars) {
      expect(validatePasswordSpecialChar(`Abc123${char}`)).toBe(true);
    }
  });

  test("doPasswordsMatch should return true for matching passwords", () => {
    expect(doPasswordsMatch("password123", "password123")).toBe(true);
    expect(doPasswordsMatch("password123", "Password123")).toBe(false);
  });
});

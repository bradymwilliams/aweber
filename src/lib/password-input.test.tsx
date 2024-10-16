/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import PasswordInput from "./password-input";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { VALIDATION_MESSAGES } from "./use-password-validation";

// Test suite for the PasswordInput component
describe("PasswordInput Component", () => {
  beforeEach(() => {
    render(<PasswordInput />);
  });

  afterEach(() => {
    cleanup();
  });

  //   render(<PasswordInput />);

  test("renders the form fields correctly", () => {
    // Check if the input fields and button are rendered
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("Shows success message on success", () => {
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ValidPass1!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "ValidPass1!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(
      screen.getByText("Password is valid and matches!")
    ).toBeInTheDocument();
  });

  test("shows an error on error", () => {
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "short1!adfasdf" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "short1!ddddddd" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(screen.getByText(VALIDATION_MESSAGES.MATCH)).toBeInTheDocument();
  });

  test("Shows reset button on success and resets the form", () => {
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ValidPass1!" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "ValidPass1!" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Reset/i }));

    expect(screen.getByLabelText("Password")).toHaveValue("");
    expect(screen.getByLabelText("Confirm Password")).toHaveValue("");
  });
});

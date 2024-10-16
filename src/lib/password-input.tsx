import { useState } from "react";
import usePasswordValidation from "./use-password-validation";

const PasswordInput = () => {
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { validatePassword, errors } = usePasswordValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValid(validatePassword(password, confirmPassword));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full mx-auto"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="border border-gray-300 rounded-md p-2 bg-gray-800 text-white"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          id="confirm-password"
          className="border border-gray-300 rounded-md p-2 bg-gray-800 text-white"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      {valid ? (
        <>
          <div className="text-green-500">Password is valid and matches!</div>
          <button
            className="bg-blue-500 text-white p-2 rounded-md"
            type="reset"
            onClick={() => {
              setPassword("");
              setConfirmPassword("");
              setValid(false);
            }}
          >
            Reset
          </button>
        </>
      ) : (
        <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
          Submit
        </button>
      )}
      {errors.length > 0 && (
        <div>
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: "red" }}>
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default PasswordInput;

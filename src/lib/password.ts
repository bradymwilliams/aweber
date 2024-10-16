export const PASSWORD_MIN_LENGTH = 6;

export const validatePasswordLength = (
  password: string,
  minLength = PASSWORD_MIN_LENGTH
) => {
  return password.length >= minLength;
};

export const validatePasswordUppercase = (password: string) => {
  return /[A-Z]/.test(password);
};

export const validatePasswordLowercase = (password: string) => {
  return /[a-z]/.test(password);
};

export const validatePasswordNumber = (password: string) => {
  return /\d/.test(password);
};

export const validatePasswordSpecialChar = (password: string) => {
  return /[!@#$%^&*()_\-+=[\]{}|:;"'<,>.]/.test(password);
};

export const doPasswordsMatch = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

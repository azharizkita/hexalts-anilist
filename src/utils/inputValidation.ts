interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

export const validateInput = (input: string): ValidationResult => {
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  if (input.length === 0) {
    return { isValid: false, errorMessage: "Cannot be empty." };
  }

  if (input.length > 25) {
    return {
      isValid: false,
      errorMessage: "Maximum character is 25.",
    };
  }

  if (specialCharRegex.test(input)) {
    return {
      isValid: false,
      errorMessage: "Contains special characters.",
    };
  }

  return { isValid: true, errorMessage: null };
};

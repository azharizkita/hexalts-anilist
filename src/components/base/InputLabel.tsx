import { validateInput } from "@/utils/inputValidation";
import { FormErrorMessage, FormHelperText } from "@chakra-ui/react";
import { useMemo } from "react";

interface InputLabelProps {
  isChecking: boolean;
  isError: boolean;
  value?: string;
  isInputValid: boolean;
  inputError: string | null;
}

export const InputLabel = ({
  isChecking,
  isError,
  isInputValid,
  inputError,
}: InputLabelProps) => {
  if (isChecking) {
    return (
      <FormHelperText>Checking collection name validity...</FormHelperText>
    );
  }

  if (isError) {
    return (
      <FormErrorMessage>Collection name is already exist.</FormErrorMessage>
    );
  }

  if (!isInputValid) {
    return <FormErrorMessage>{inputError}</FormErrorMessage>;
  }

  return (
    <FormHelperText>Enter the collection name as your likings.</FormHelperText>
  );
};

import { FormErrorMessage, FormHelperText } from "@chakra-ui/react";

interface InputLabelProps {
  isChecking: boolean;
  isError: boolean;
}

export const InputLabel = ({ isChecking, isError }: InputLabelProps) => {
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

  return (
    <FormHelperText>Enter the collection name as your likings.</FormHelperText>
  );
};

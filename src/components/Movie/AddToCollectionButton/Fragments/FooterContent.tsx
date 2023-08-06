import { InputLabel } from "@/components/base/InputLabel";
import { useAnimeContext } from "@/context/anime";
import { useCollectionContext } from "@/context/collection";
import { validateInput } from "@/utils/inputValidation";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useMemo } from "react";

export const FooterContent = () => {
  const { collections } = useCollectionContext();
  const {
    onToggleCollectionModal,
    isCreateMode,
    collectionTitle,
    isAddButtonDisabled: _isAddButtonDisabled,
    isChecking,
    isError,
    selectedAnime,
    selectedCollection,
    handleInputChange,
    handleChangeMode,
    handleCreateCollectionItem,
  } = useAnimeContext();

  const isCollectionExist = collections.length !== 0;

  const { errorMessage: inputErrorMessage, isValid: isInputValid } =
    useMemo(() => {
      return validateInput(collectionTitle ?? "");
    }, [collectionTitle]);

  const footerMessage = <>Adding {selectedAnime.length} animes</>;

  const isAddButtonDisabled = isCreateMode
    ? _isAddButtonDisabled || !isInputValid
    : _isAddButtonDisabled || !selectedCollection;

  return (
    <Flex direction="column" w="100%" gap="1em">
      {isCreateMode && (
        <FormControl isInvalid={isError || !isInputValid}>
          <FormLabel>Name</FormLabel>
          <Input
            size="sm"
            value={collectionTitle}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <InputLabel
            isChecking={isChecking}
            isError={isError}
            value={collectionTitle}
            isInputValid={isInputValid}
            inputError={inputErrorMessage}
          />
        </FormControl>
      )}
      {!isCreateMode && isCollectionExist && (
        <Text fontSize="sm" color="gray.500">
          {footerMessage}
        </Text>
      )}
      <Flex gap="0.5em">
        <Button variant="ghost" mr={3} onClick={onToggleCollectionModal}>
          Close
        </Button>
        <Spacer />
        <Button onClick={handleChangeMode}>
          {!isCreateMode ? "New" : "Existing"} collection
        </Button>
        <Button
          colorScheme="blue"
          isDisabled={isAddButtonDisabled}
          onClick={handleCreateCollectionItem}
        >
          Add
        </Button>
      </Flex>
    </Flex>
  );
};

import { InputLabel } from "@/components/base/InputLabel";
import { useAnimeDetailsContext } from "@/context/animeDetails";
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
  const {
    animeData,
    isCreateMode,
    onToggleCollectionModal,
    handleInputChange,
    availableCollection,
    selectedCollection,
    collectionTitle,
    isAddButtonDisabled: _isAddButtonDisabled,
    isChecking,
    isError,
    handleChangeMode,
    handleCreateCollectionItem,
  } = useAnimeDetailsContext();
  const { collections } = useCollectionContext();

  const isCollectionExist = collections.length !== 0;

  const { errorMessage: inputErrorMessage, isValid: isInputValid } =
    useMemo(() => {
      return validateInput(collectionTitle ?? "");
    }, [collectionTitle]);

  const footerMessage =
    !isCreateMode && isCollectionExist && availableCollection.length !== 0 ? (
      <>
        Adding &quot;{animeData?.title?.romaji}&quot; into{" "}
        {selectedCollection.length} collections
      </>
    ) : (
      <>
        Seems like &quot;{animeData?.title?.romaji}&quot; has been added into
        every available collection. Consider making a new collection first.
      </>
    );

  const isAddButtonDisabled = isCreateMode
    ? _isAddButtonDisabled || !isInputValid
    : _isAddButtonDisabled;

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

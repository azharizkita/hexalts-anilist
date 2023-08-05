import { InputLabel } from "@/components/base/InputLabel";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";

export const FooterContent = () => {
  const {
    animeData,
    isCreateMode,
    onToggleCollectionModal,
    handleInputChange,
    selectedCollection,
    collectionTitle,
    isAddButtonDisabled,
    isChecking,
    isError,
    handleChangeMode,
    handleCreateCollectionItem,
  } = useAnimeDetailsContext();

  return (
    <Flex direction="column" w="100%" gap="1em">
      {isCreateMode ? (
        <FormControl isInvalid={isError}>
          <FormLabel>Name</FormLabel>
          <Input
            size="sm"
            value={collectionTitle}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <InputLabel isChecking={isChecking} isError={isError} />
        </FormControl>
      ) : (
        <Text fontSize="sm" color="gray.500">
          Adding &quot;{animeData.title?.romaji}&quot; into{" "}
          {selectedCollection.length} collections
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

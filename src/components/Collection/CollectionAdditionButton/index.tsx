import {
  Button,
  IconButton,
  Input,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { Modal } from "@/components/base/Modal";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useCollectionContext } from "@/context/collection";
import debounce from "lodash/debounce";
import { InputLabel } from "../../base/InputLabel";

export const CollectionAdditionButton = () => {
  const { collections, addCollectionEntry } = useCollectionContext();
  const { isOpen, onToggle } = useDisclosure();
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const _handleSearchChange = useCallback(
    debounce((text: string) => {
      const result = collections.find(({ title }) => title === text);
      if (result) {
        setIsValid(false);
        return;
      }
      setIsValid(true);
    }, 1000),
    [collections, setIsValid]
  );

  const handleInputChange = (text: string) => {
    setIsValid(null);
    setInput(text);
    _handleSearchChange(text);
  };

  const handleCloseModal = () => {
    onToggle();
    setInput("");
    setIsValid(null);
  };

  const handleCreateCollectionItem = () => {
    addCollectionEntry(input);
    handleCloseModal();
  };

  const isChecking = input !== "" && isValid === null;
  const isError = isValid !== null && !isValid;
  const isSubmitable = input !== "" && isValid;

  return (
    <>
      <IconButton
        onClick={onToggle}
        icon={<MdAdd />}
        shadow="md"
        colorScheme="blue"
        borderRadius="full"
        aria-label="Remove"
      />
      <Modal
        isOpen={isOpen}
        onToggle={handleCloseModal}
        title="New Collection"
        footerContent={
          <>
            <Button variant="ghost" mr={3} onClick={handleCloseModal}>
              Close
            </Button>
            <Spacer />
            <Button
              colorScheme="blue"
              isDisabled={!isSubmitable}
              onClick={handleCreateCollectionItem}
            >
              Create
            </Button>
          </>
        }
      >
        <FormControl isInvalid={isError}>
          <FormLabel>Name</FormLabel>
          <Input
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <InputLabel isChecking={isChecking} isError={isError} />
        </FormControl>
      </Modal>
    </>
  );
};

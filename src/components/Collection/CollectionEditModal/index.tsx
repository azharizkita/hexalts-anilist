import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { useCollectionContext } from "@/context/collection";
import { CollectionItem } from "../CollectionItem";
import { Modal } from "@/components/base/Modal";
import { InputLabel } from "../../base/InputLabel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { MdArrowForward } from "react-icons/md";
import { validateInput } from "@/utils/inputValidation";
import { WatchlistItem } from "@/types";

export const CollectionEditModal = () => {
  const {
    collections,
    collectionToBeEdited,
    setCollectionToBeEdited,
    editCollectionEntry,
  } = useCollectionContext();

  const [editedEntry, setEditedEntry] = useState<WatchlistItem | null>(null);

  useEffect(() => {
    setEditedEntry(collectionToBeEdited);
  }, [collectionToBeEdited]);

  const handleToggleModal = () => {
    setCollectionToBeEdited(null);
  };

  const handleEditCollectionEntry = () => {
    if (!collectionToBeEdited || !editedEntry) {
      return;
    }
    editCollectionEntry(collectionToBeEdited.id, { ...editedEntry });
    handleToggleModal();
  };

  const [isValid, setIsValid] = useState<null | boolean>(null);

  const _handleSearchChange = useCallback(
    debounce((text: string) => {
      if (text === collectionToBeEdited?.title) {
        setIsValid(null);
        return;
      }
      const result = collections.find(({ title }) => title === text);
      if (result) {
        setIsValid(false);
        return;
      }
      setIsValid(true);
    }, 1000),
    [collections, collectionToBeEdited, setIsValid]
  );

  const handleInputChange = (text: string) => {
    setIsValid(null);
    setEditedEntry((state) => {
      if (!state) {
        return state;
      }
      return { ...state, title: text };
    });
    _handleSearchChange(text);
  };

  const { errorMessage: inputErrorMessage, isValid: isInputValid } =
    useMemo(() => {
      return validateInput(editedEntry?.title ?? "");
    }, [editedEntry]);

  const isChecking =
    editedEntry?.title !== collectionToBeEdited?.title && isValid === null;
  const isError = isValid !== null && !isValid;
  const isSubmitable =
    editedEntry?.title !== collectionToBeEdited?.title && isValid;

  return (
    <Modal
      modalProps={{
        size: "xl",
      }}
      isOpen={Boolean(collectionToBeEdited)}
      onToggle={handleToggleModal}
      title="Edit Collection"
      footerContent={
        <>
          <Button variant="ghost" mr={3} onClick={handleToggleModal}>
            Cancel
          </Button>
          <Spacer />
          <Button
            colorScheme="yellow"
            isDisabled={!isSubmitable || !isInputValid}
            onClick={handleEditCollectionEntry}
          >
            Confirm
          </Button>
        </>
      }
    >
      <Flex direction="column" gap="1em" align="center">
        <Flex gap="0.75em" align="center">
          <CollectionItem {...collectionToBeEdited} previewMode />
          <Icon color="gray.500" fontSize="xl" as={MdArrowForward} />
          <CollectionItem {...editedEntry} previewMode />
        </Flex>
        <FormControl isInvalid={isError || !isInputValid}>
          <FormLabel>Name</FormLabel>
          <Input
            value={editedEntry?.title}
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <InputLabel
            isChecking={isChecking}
            isError={isError}
            value={editedEntry?.title}
            isInputValid={isInputValid}
            inputError={inputErrorMessage}
          />
        </FormControl>
      </Flex>
    </Modal>
  );
};

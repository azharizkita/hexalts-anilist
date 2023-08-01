import { Button, Flex, Spacer, Text } from "@chakra-ui/react";
import { useCollectionContext } from "@/context/collection";
import { CollectionItem } from "../CollectionItem";
import { Modal } from "@/components/base/Modal";

export const CollectionDeleteModal = () => {
  const {
    collectionToBeDeleted,
    setCollectionToBeDeleted,
    removeCollectionEntry,
  } = useCollectionContext();

  const handleToggleModal = () => {
    setCollectionToBeDeleted(null);
  };

  const handleRemoveCollectionEntry = () => {
    if (!collectionToBeDeleted) {
      return;
    }
    removeCollectionEntry(collectionToBeDeleted.id);
    handleToggleModal();
  };

  return (
    <Modal
      isOpen={Boolean(collectionToBeDeleted)}
      onToggle={handleToggleModal}
      title="Remove Collection"
      footerContent={
        <>
          <Button variant="ghost" mr={3} onClick={handleToggleModal}>
            Cancel
          </Button>
          <Spacer />
          <Button colorScheme="red" onClick={handleRemoveCollectionEntry}>
            Remove
          </Button>
        </>
      }
    >
      <Flex direction="column" gap="1em" align="center">
        <CollectionItem {...collectionToBeDeleted} previewMode />
        <Text textAlign="center">
          Are you sure want to remove <b>{collectionToBeDeleted?.title}</b> from
          your collection?
        </Text>
      </Flex>
    </Modal>
  );
};

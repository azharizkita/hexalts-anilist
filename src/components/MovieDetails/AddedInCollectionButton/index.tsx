import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Modal } from "@/components/base/Modal";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { ModalContent } from "./Fragments/ModalContent";

export const AddedInCollectionButton = () => {
  const { animeInCollection } = useAnimeDetailsContext();

  const { isOpen, onToggle } = useDisclosure();

  const isExistInCollections = animeInCollection.length !== 0;

  return (
    <>
      <Button
        variant="link"
        isDisabled={!isExistInCollections}
        fontSize="xs"
        onClick={onToggle}
      >
        This anime is in {animeInCollection.length} collections
      </Button>
      <Modal
        as={Flex}
        footerContent={
          <Button variant="ghost" mr={3} onClick={onToggle}>
            Close
          </Button>
        }
        isOpen={isOpen}
        onToggle={onToggle}
        title="Add to collection"
        justifyContent={!isExistInCollections ? "initial" : "center"}
      >
        <Flex
          direction="column"
          py="1em"
          h="100%"
          w="100%"
          alignSelf={isExistInCollections ? "initial" : "center"}
        >
          <ModalContent />
        </Flex>
      </Modal>
    </>
  );
};

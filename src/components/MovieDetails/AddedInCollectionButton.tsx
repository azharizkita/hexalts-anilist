import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import { Modal } from "@/components/base/Modal";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { FooterContent } from "./Fragments/FooterContent";
import { ModalContent } from "./Fragments/ModalContent";

export const AddedInCollectionButton = () => {
  const { animeInCollection } = useAnimeDetailsContext();

  const { isOpen, onToggle } = useDisclosure();

  const isNotExistInCollections = animeInCollection.length === 0;

  return (
    <>
      <Button
        variant="link"
        isDisabled={isNotExistInCollections}
        fontSize="xs"
        onClick={onToggle}
      >
        This anime is in {animeInCollection.length} collections
      </Button>
      <Modal
        as={Flex}
        isOpen={isOpen}
        onToggle={onToggle}
        title="Add to collection"
        footerContent={<FooterContent />}
      >
        <Flex direction="column" py="1em" h="100%" w="100%">
          <ModalContent />
        </Flex>
      </Modal>
    </>
  );
};

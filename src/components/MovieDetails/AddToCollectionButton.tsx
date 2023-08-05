import { Button, Flex, Icon } from "@chakra-ui/react";
import { MdPlaylistPlay } from "react-icons/md";
import { Modal } from "@/components/base/Modal";
import { SearchInput } from "../base/SearchInput";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { FooterContent } from "./Fragments/FooterContent";
import { ModalContent } from "./Fragments/ModalContent";

export const AddToCollectionButton = () => {
  const {
    isCreateMode,
    onToggleCollectionModal,
    setSearchValue,
    filteredCollection,
    isOpenCollectionModal,
  } = useAnimeDetailsContext();

  return (
    <>
      <Button
        onClick={onToggleCollectionModal}
        leftIcon={<Icon boxSize="1.5em" as={MdPlaylistPlay} />}
      >
        Add to collection
      </Button>
      <Modal
        headerContent={
          !isCreateMode && (
            <SearchInput
              onSearch={setSearchValue}
              color="black"
              placeholder="Search collection..."
            />
          )
        }
        as={Flex}
        alignItems={filteredCollection.length === 0 ? "center" : "initial"}
        isOpen={isOpenCollectionModal}
        onToggle={onToggleCollectionModal}
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

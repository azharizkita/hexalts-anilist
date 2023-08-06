import { Button, Flex, Icon } from "@chakra-ui/react";
import { MdPlaylistAdd } from "react-icons/md";
import { Modal } from "@/components/base/Modal";
import { SearchInput } from "../../base/SearchInput";
import { useAnimeDetailsContext } from "@/context/animeDetails";
import { FooterContent } from "./Fragments/FooterContent";
import { ModalContent } from "./Fragments/ModalContent";

export const AddToCollectionButton = () => {
  const {
    availableCollection,
    filteredCollection,
    isCreateMode,
    onToggleCollectionModal,
    setSearchValue,
    isOpenCollectionModal,
  } = useAnimeDetailsContext();

  const isCollectionExist = filteredCollection.length !== 0;
  const isAvailableCollectionExist = availableCollection.length !== 0;

  return (
    <>
      <Button
        onClick={onToggleCollectionModal}
        leftIcon={<Icon boxSize="1.5em" as={MdPlaylistAdd} />}
      >
        Add to collection
      </Button>
      <Modal
        headerContent={
          !isCreateMode &&
          isAvailableCollectionExist && (
            <SearchInput
              onSearch={setSearchValue}
              color="black"
              placeholder="Search collection..."
            />
          )
        }
        as={Flex}
        isOpen={isOpenCollectionModal}
        onToggle={onToggleCollectionModal}
        title="Add to collection"
        justifyContent={!isCollectionExist ? "initial" : "center"}
        footerContent={<FooterContent />}
      >
        <Flex
          direction="column"
          py="1em"
          h="100%"
          w="100%"
          alignSelf={isCollectionExist ? "initial" : "center"}
        >
          <ModalContent />
        </Flex>
      </Modal>
    </>
  );
};

import { Flex, IconButton } from "@chakra-ui/react";
import { MdCheck, MdClose, MdPlaylistAdd } from "react-icons/md";
import { Modal } from "@/components/base/Modal";
import { SearchInput } from "../../base/SearchInput";
import { ModalContent } from "./Fragments/ModalContent";
import { useCollectionContext } from "@/context/collection";
import { useAnimeContext } from "@/context/anime";
import { FooterContent } from "./Fragments/FooterContent";

export const AddToCollectionButton = () => {
  const { collections } = useCollectionContext();
  const {
    isCreateMode,
    onClickAddMode,
    isAddMode,
    isAdditionModalOpen,
    setSearchValue,
    onToggleCollectionModal,
    selectedAnime,
  } = useAnimeContext();

  const isCollectionExist = collections.length !== 0;

  return (
    <>
      <Flex gap="0.5em">
        {isAddMode && (
          <IconButton
            isDisabled={selectedAnime.length === 0}
            onClick={onToggleCollectionModal}
            icon={<MdCheck />}
            shadow="md"
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            aria-label="Remove"
          />
        )}
        <IconButton
          onClick={onClickAddMode}
          icon={isAddMode ? <MdClose /> : <MdPlaylistAdd />}
          shadow="md"
          size="sm"
          colorScheme="blue"
          borderRadius="full"
          aria-label="Remove"
          variant={isAddMode ? "outline" : "solid"}
        />
      </Flex>
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
        isOpen={isAdditionModalOpen}
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

import { useCollectionContext } from "@/context/collection";
import { AnimeItem } from "@/queries/getAnimeList";
import { Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { MdEdit, MdPlaylistPlay, MdRemove } from "react-icons/md";

interface PlaylistItemProps {
  title?: string;
  id?: string;
  watchlist?: Partial<AnimeItem>[];
  previewMode?: boolean;
  isSelected?: boolean;
}

export const CollectionItem = ({
  title,
  id,
  watchlist = [],
  previewMode = false,
  isSelected = false,
}: PlaylistItemProps) => {
  const { setCollectionToBeDeleted, setCollectionToBeEdited } =
    useCollectionContext();
  return (
    <Flex direction="column" w="145px" gap="0.15em" position="relative" py="0.25em">
      {!previewMode && (
        <Flex position="absolute" top="-0.5em" right="-0.5em" gap="0.25em">
          <IconButton
            icon={<MdEdit />}
            onClick={() => {
              if (id && title) {
                setCollectionToBeEdited({ id, title, watchlist });
              }
            }}
            borderColor="gray.200"
            borderWidth="thin"
            size="xs"
            shadow="md"
            borderRadius="full"
            aria-label="Edit"
          />
          <IconButton
            icon={<MdRemove />}
            onClick={() => {
              if (id && title) {
                setCollectionToBeDeleted({ id, title, watchlist });
              }
            }}
            borderColor="gray.200"
            borderWidth="thin"
            size="xs"
            shadow="md"
            colorScheme="red"
            borderRadius="full"
            aria-label="Remove"
          />
        </Flex>
      )}

      <Flex
        w="fit-content"
        overflow="hidden"
        h="100%"
        borderRadius="2xl"
        bg="gray.100"
        shadow={isSelected ? "xl" : "md"}
        outline="4px solid"
        outlineColor={isSelected ? "blue.400" : "transparent"}
      >
        {watchlist.length ? (
          <Image alt="anime" src={watchlist[0].coverImage?.extraLarge} />
        ) : (
          <Flex
            bg="gray.200"
            w="145px"
            h="205px"
            align="center"
            justify="center"
          >
            <Icon fontSize="3xl" color="gray.400" as={MdPlaylistPlay} />
          </Flex>
        )}
      </Flex>
      <Text fontSize="xs" noOfLines={1} align="center" color="gray.600">
        {watchlist.length ? `${watchlist.length} anime` : "No watchlist yet"}
      </Text>
      <Text fontSize="md" fontWeight="semibold" noOfLines={1} align="center">
        {title}
      </Text>
    </Flex>
  );
};

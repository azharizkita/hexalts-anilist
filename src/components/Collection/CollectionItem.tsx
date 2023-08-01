import { useCollectionContext } from "@/context/collection";
import { AnimeItem } from "@/queries/getAnimeList";
import { Flex, Icon, IconButton, Image, Text } from "@chakra-ui/react";
import { MdEdit, MdPlaylistPlay, MdRemove } from "react-icons/md";

interface PlaylistItemProps {
  imageUrl?: string | null;
  title?: string;
  id?: string;
  watchlist?: AnimeItem[];
  previewMode?: boolean;
}

export const CollectionItem = ({
  imageUrl,
  title,
  id,
  watchlist = [],
  previewMode = false,
}: PlaylistItemProps) => {
  const { setCollectionToBeDeleted, setCollectionToBeEdited } =
    useCollectionContext();
  return (
    <Flex direction="column" w="145px" gap="0.15em" position="relative">
      {!previewMode && (
        <Flex position="absolute" top="-0.5em" right="-0.5em" gap="0.25em">
          <IconButton
            icon={<MdEdit />}
            onClick={() => {
              if (id && title && typeof imageUrl !== "undefined") {
                setCollectionToBeEdited({ id, title, imageUrl, watchlist });
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
              if (id && title && typeof imageUrl !== "undefined") {
                setCollectionToBeDeleted({ id, title, imageUrl, watchlist });
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
        shadow="md"
        borderColor="gray.300"
        borderWidth="thin"
      >
        {imageUrl ? (
          <Image alt="anime" src={imageUrl} />
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

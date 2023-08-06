import { AnimeItem } from "@/types";
import {
  Flex,
  Icon,
  IconButton,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdEdit, MdPlaylistPlay, MdRemove } from "react-icons/md";

interface PlaylistItemProps {
  title?: string;
  id?: string;
  watchlist?: Partial<AnimeItem>[];
  previewMode?: boolean;
  isSelected?: boolean;
  onClickDelete?: () => void;
  onClickEdit?: () => void;
}

export const CollectionItem = ({
  title,
  id,
  watchlist = [],
  previewMode = false,
  isSelected = false,
  onClickDelete,
  onClickEdit,
}: PlaylistItemProps) => {
  const { push } = useRouter();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <Flex
      as={LinkBox}
      onClick={(e) => {
        if (previewMode) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        push(`/collection/${id}`);
      }}
      direction="column"
      w="145px"
      gap="0.15em"
      position="relative"
      py="0.25em"
    >
      <Flex
        position="absolute"
        zIndex="1"
        top="-0.5em"
        right="-0.5em"
        gap="0.25em"
      >
        {onClickEdit && (
          <IconButton
            icon={<MdEdit />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickEdit();
            }}
            borderColor="gray.200"
            borderWidth="thin"
            size="xs"
            shadow="md"
            borderRadius="full"
            aria-label="Edit"
          />
        )}

        {onClickDelete && (
          <IconButton
            icon={<MdRemove />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickDelete();
            }}
            borderColor="gray.200"
            borderWidth="thin"
            size="xs"
            shadow="md"
            colorScheme="red"
            borderRadius="full"
            aria-label="Remove"
          />
        )}
      </Flex>
      <Flex
        {...(!previewMode && { as: LinkOverlay, href: `/collection/${id}` })}
        h="205px"
        w="145px"
        direction="column"
        align="center"
        justify="end"
      >
        <Flex
          overflow="hidden"
          borderRadius="2xl"
          shadow="md"
          outline="4px solid"
          outlineColor={isSelected ? "blue.400" : "transparent"}
        >
          <Skeleton
            isLoaded={isImageLoaded || watchlist.length === 0}
            h={!isImageLoaded ? "205px" : "full"}
            w={!isImageLoaded ? "145px" : "full"}
          >
            {watchlist.length ? (
              <Image
                alt="anime"
                src={watchlist[0].coverImage?.extraLarge}
                onLoad={() => setIsImageLoaded(true)}
              />
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
          </Skeleton>
        </Flex>
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

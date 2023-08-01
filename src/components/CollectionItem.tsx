import { Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { MdEdit, MdRemove } from "react-icons/md";

interface PlaylistItemProps {
  imageUrl: string;
  title: string;
  id: string;
  totalItem: number;
}

export const CollectionItem = ({
  imageUrl,
  title,
  id,
  totalItem,
}: PlaylistItemProps) => {
  return (
    <Flex direction="column" w="145px" gap="0.15em">
      <Flex
        w="fit-content"
        overflow="hidden"
        h="100%"
        borderRadius="2xl"
        bg="gray.100"
        shadow="md"
        borderColor="gray.400"
        borderWidth="thin"
        position="relative"
      >
        <Image alt="anime" src={imageUrl} />
        <Flex position="absolute" top="0.25em" right="0.25em" gap="0.25em">
          <IconButton
            icon={<MdEdit />}
            size="xs"
            shadow="md"
            borderRadius="full"
            aria-label="Edit"
          />
          <IconButton
            icon={<MdRemove />}
            size="xs"
            shadow="md"
            colorScheme="red"
            borderRadius="full"
            aria-label="Remove"
          />
        </Flex>
      </Flex>
      <Text fontSize="xs" noOfLines={1} align="center" color="gray.600">
        {totalItem ? `${totalItem} anime` : "No watchlist yet"}
      </Text>
      <Text fontSize="md" fontWeight="semibold" noOfLines={1} align="center">
        {title}
      </Text>
    </Flex>
  );
};

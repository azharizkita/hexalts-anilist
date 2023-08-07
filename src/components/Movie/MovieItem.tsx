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
import { MdMovie, MdRemove } from "react-icons/md";

interface MovieListItemProps {
  previewMode?: boolean;
  isSelected?: boolean;
  imageUrl?: string | null;
  backgroundColor?: string;
  title?: string;
  subtitle?: string;
  id?: string;
  isLoading?: boolean;
  onClickDelete?: (id: string) => void;
}

export const MovieItem = ({
  previewMode,
  isSelected,
  imageUrl,
  title,
  subtitle,
  isLoading = false,
  id,
  onClickDelete,
}: MovieListItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { push } = useRouter();
  return (
    <Flex
      as={LinkBox}
      onClick={(e) => {
        if (previewMode) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        push(`/anime/${id}`);
      }}
      direction="column"
      w="145px"
      gap="0.5em"
      position="relative"
      align="center"
      justify="center"
    >
      <Flex
        position="absolute"
        zIndex="1"
        top="-0.5em"
        right="-0.5em"
        gap="0.25em"
      >
        {onClickDelete && (
          <IconButton
            icon={<MdRemove />}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClickDelete(id as string);
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
        as={LinkOverlay}
        {...(!previewMode && { href: `/anime/${id}` })}
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
            isLoaded={!isLoading && isImageLoaded}
            h={isLoading || !isImageLoaded ? "205px" : "full"}
            w={isLoading || !isImageLoaded ? "145px" : "full"}
          >
            {imageUrl ? (
              <Image
                objectFit="contain"
                alt="anime"
                src={imageUrl}
                onLoad={() => setIsImageLoaded(true)}
              />
            ) : (
              <Flex
                bg="gray.200"
                h="205px"
                w="145px"
                align="center"
                justify="center"
              >
                <Icon fontSize="3xl" color="gray.400" as={MdMovie} />
              </Flex>
            )}
          </Skeleton>
        </Flex>
      </Flex>

      <Skeleton w="80%" isLoaded={!isLoading}>
        <Text fontSize="xs" noOfLines={1} align="center" color="gray.600">
          {subtitle ?? "-"}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Text fontSize="md" fontWeight="semibold" noOfLines={1} align="center">
          {title}
        </Text>
      </Skeleton>
    </Flex>
  );
};

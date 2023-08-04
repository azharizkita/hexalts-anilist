import {
  Flex,
  Icon,
  Image,
  LinkBox,
  LinkOverlay,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdMovie } from "react-icons/md";

interface MovieListItemProps {
  imageUrl?: string | null;
  backgroundColor: string;
  title?: string;
  subtitle?: string;
  id?: string;
  isLoading?: boolean;
}

export const MovieItem = ({
  imageUrl,
  title,
  subtitle,
  isLoading = false,
  id,
}: MovieListItemProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { push } = useRouter();
  return (
    <Flex
      as={LinkBox}
      onClick={(e) => {
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
        as={LinkOverlay}
        href={!isLoading ? `/anime/${id}` : undefined}
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
          borderColor="gray.300"
          borderWidth="thin"
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

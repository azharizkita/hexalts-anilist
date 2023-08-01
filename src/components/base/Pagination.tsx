import { Flex, IconButton, Input, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

interface PaginationProps {
  lastPage: number | null;
  page: number;
  onClickNext: (newPage: number) => void;
  onClickPrev: (newPage: number) => void;
}

export const Pagination = ({
  lastPage: _lastPage = null,
  page = 1,
  onClickNext = () => {},
  onClickPrev = () => {},
}: Partial<PaginationProps>) => {
  const [lastPage, setLastPage] = useState<number | null>(null);
  const isLoading = lastPage !== null;

  useEffect(() => {
    setLastPage(_lastPage);
  }, [_lastPage]);

  return (
    <Flex gap="1em" align="center" justify="center">
      <IconButton
        isDisabled={page === 1}
        onClick={() => onClickPrev(page - 1)}
        aria-label="previous-page"
        icon={<MdArrowBack />}
        borderColor="gray.200"
        borderWidth="thin"
        size="xs"
        shadow="md"
        colorScheme="blue"
        borderRadius="full"
      />
      <Input
        value={page}
        type="number"
        width="fit-content"
        size="xs"
        min={1}
        max={lastPage ?? 100}
      />
      <Text>/</Text>
      <Skeleton isLoaded={isLoading}>
        <Text>{isLoading ? lastPage : 100}</Text>
      </Skeleton>
      <IconButton
        isDisabled={!isLoading || page === lastPage}
        onClick={() => onClickNext(page + 1)}
        aria-label="next-page"
        icon={<MdArrowForward />}
        borderColor="gray.200"
        borderWidth="thin"
        size="xs"
        shadow="md"
        colorScheme="blue"
        borderRadius="full"
      />
    </Flex>
  );
};

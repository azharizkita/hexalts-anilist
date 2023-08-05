import { Flex, IconButton, Input, Skeleton, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import debounce from "lodash/debounce";
import { css } from "@emotion/css";

const iconButtonStyles = css`
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border-radius: 9999px;
`;

interface PaginationProps {
  lastPage: number | null;
  page: number;
  onClickNext: (newPage: number) => void;
  onClickPrev: (newPage: number) => void;
  onManualPageChange: (newPage: number) => void;
}

export const Pagination = ({
  lastPage: _lastPage = null,
  page: _page = 1,
  onClickNext = () => {},
  onClickPrev = () => {},
  onManualPageChange = () => {},
}: Partial<PaginationProps>) => {
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [page, setPage] = useState<number>(_page);
  const isLoading = lastPage !== null;

  const _handleSearchChange = useCallback(
    debounce(onManualPageChange, 500),
    []
  );

  const handleSearchChange = (page: number) => {
    setPage(page);
    _handleSearchChange(page);
  };

  useEffect(() => {
    if (!_lastPage) {
      return;
    }
    setLastPage(_lastPage);
  }, [_lastPage]);

  useEffect(() => {
    setPage(_page);
  }, [_page]);

  return (
    <Flex gap="1em" align="center" justify="center">
      <IconButton
        className={iconButtonStyles}
        isDisabled={page === 1}
        onClick={() => {
          onClickPrev(page - 1);
          setPage(page - 1);
        }}
        aria-label="previous-page"
        icon={<MdArrowBack />}
        size="xs"
        colorScheme="blue"
      />
      <Input
        value={page}
        onChange={(e) => handleSearchChange(Number(e.target.value))}
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
        className={iconButtonStyles}
        isDisabled={!isLoading || page === lastPage}
        onClick={() => {
          onClickNext(page + 1);
          setPage(page + 1);
        }}
        aria-label="next-page"
        icon={<MdArrowForward />}
        size="xs"
        colorScheme="blue"
      />
    </Flex>
  );
};

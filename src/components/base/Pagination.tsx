import { Flex, IconButton, Input, Skeleton, Text } from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
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
  const [page, setPage] = useState<number | undefined>(_page);
  const isLoading = lastPage !== null;

  const _handleSearchChange = useCallback(
    debounce(onManualPageChange, 500),
    []
  );

  const handleSearchChange = (page: number) => {
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

  const isPreviousPageDisabled =
    typeof page === "undefined" ? _page === 1 : page === 1;

  const isNextPageDisabled =
    typeof page === "undefined" ? _page === lastPage : page === lastPage;

  const handleClickPreviousPage = () => {
    if (typeof page === "undefined") {
      const previousPage = _page - 1;
      onClickPrev(previousPage);
      setPage(previousPage);
      return;
    }
    const previousPage = page - 1;
    onClickPrev(previousPage);
    setPage(previousPage);
  };

  const handleClickNextPage = () => {
    if (typeof page === "undefined") {
      const nextPage = _page + 1;
      onClickPrev(nextPage);
      setPage(nextPage);
      return;
    }
    const nextPage = page + 1;
    onClickPrev(nextPage);
    setPage(nextPage);
  };

  const hangleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPage(undefined);
      return;
    }
    const currentPage = Number(value);
    setPage(currentPage);
    handleSearchChange(currentPage);
  };
  return (
    <Flex gap="1em" align="center" justify="center">
      <IconButton
        className={iconButtonStyles}
        isDisabled={isPreviousPageDisabled}
        onClick={handleClickPreviousPage}
        aria-label="previous-page"
        icon={<MdArrowBack />}
        size="xs"
        colorScheme="blue"
      />
      <Input
        value={page}
        onChange={hangleInputChange}
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
        isDisabled={!isLoading || isNextPageDisabled}
        onClick={handleClickNextPage}
        aria-label="next-page"
        icon={<MdArrowForward />}
        size="xs"
        colorScheme="blue"
      />
    </Flex>
  );
};

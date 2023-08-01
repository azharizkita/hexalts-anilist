import { useCallback, useState, forwardRef, useEffect } from "react";
import {
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useMediaQuery,
} from "@chakra-ui/react";
import { MdClose, MdSearch } from "react-icons/md";
import debounce from "lodash/debounce";

interface SearchInputProps extends InputProps {
  onSearch?: (text: string) => void;
  initialValue: string;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ onSearch = () => {}, initialValue = "", ...rest }, ref) => {
    const [isLarge] = useMediaQuery("(min-width: 625px)");
    const [searchText, setSearchText] = useState<string | undefined>();

    useEffect(() => {
      if (typeof searchText === "undefined" && initialValue !== "") {
        setSearchText(initialValue);
      }
    }, [initialValue, searchText]);

    const _handleSearchChange = useCallback(debounce(onSearch, 1000), []);

    const handleSearchChange = (text: string) => {
      setSearchText(text);
      _handleSearchChange(text);
    };

    const handleClearSearch = () => {
      setSearchText("");
      onSearch("");
    };

    return (
      <InputGroup
        size={isLarge ? "sm" : "md"}
        maxWidth={isLarge ? "400px" : "initial"}
        color="white"
      >
        <InputLeftElement
          pointerEvents="none"
          color="gray.300"
          fontSize="1.2em"
        >
          <Icon as={MdSearch} />
        </InputLeftElement>
        <Input
          ref={ref}
          borderRadius="full"
          placeholder="Search anime..."
          onChange={(e) => handleSearchChange(e.target.value)}
          value={searchText}
          {...rest}
        />
        {searchText && (
          <InputRightElement>
            <IconButton
              color="gray.700"
              size="xs"
              variant="solid"
              borderRadius="full"
              aria-label="clear-search-field"
              icon={<MdClose />}
              onClick={handleClearSearch}
            />
          </InputRightElement>
        )}
      </InputGroup>
    );
  }
);

SearchInput.displayName = "SearchInput";

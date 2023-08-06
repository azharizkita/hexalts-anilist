import { AnimeItem, WatchlistItem } from "@/types";
import React, {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useCollectionContext } from "./collection";
import { useDisclosure } from "@chakra-ui/react";
import { debounce } from "lodash";

interface AnimeContextType {
  filteredCollection: WatchlistItem[];
  selectedCollection: WatchlistItem | null;
  isCreateMode: boolean;
  isAddMode: boolean;
  isAdditionModalOpen: boolean;
  collectionTitle: string;
  isAddButtonDisabled: boolean;
  isChecking: boolean;
  isError: boolean;
  selectedAnime: AnimeItem[];
  handleCreateCollectionItem: () => void;
  handleChangeMode: () => void;
  setSelectedAnime: React.Dispatch<React.SetStateAction<AnimeItem[]>>;
  handleInputChange: (text: string) => void;
  onToggleCollectionModal: () => void;
  onClickAddMode: () => void;
  resetValues: () => void;
  setIsCreateMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCollection: React.Dispatch<
    React.SetStateAction<WatchlistItem | null>
  >;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

interface AnimeContextProviderProps {
  children: ReactNode;
}

const useAnime = () => {
  const { collections, addCollectionEntry, addToCollectionWatchlist } =
    useCollectionContext();

  const [collectionTitle, setCollectionTitle] = useState("");
  const { isOpen: isAdditionModalOpen, onToggle } = useDisclosure();
  const [selectedAnime, setSelectedAnime] = useState<AnimeItem[]>([]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<WatchlistItem | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const filteredCollection = useMemo(() => {
    return collections.filter((collection) => {
      const parsedCollectionTitile = collection.title.toLowerCase();
      return parsedCollectionTitile.includes(searchValue);
    });
  }, [searchValue, collections]);

  const onToggleCollectionModal = () => {
    onToggle();
  };

  const onClickAddMode = () => {
    resetValues();
    if (isAddMode) {
      setSelectedAnime([]);
    }
    setIsAddMode((state) => !state);
  };

  const _handleInputChange = useCallback(
    debounce((text: string) => {
      const result = collections.find(({ title }) => title === text);
      if (result) {
        setIsValid(false);
        return;
      }
      setIsValid(true);
    }, 1000),
    [collections, setIsValid]
  );

  const handleInputChange = (text: string) => {
    setIsValid(null);
    setCollectionTitle(text);
    _handleInputChange(text);
  };

  const handleChangeMode = () => {
    setSelectedCollection(null);
    setSearchValue("");
    setIsCreateMode((state) => !state);
    setIsValid(true);
  };

  const handleCreateCollectionItem = () => {
    onToggleCollectionModal();
    if (isCreateMode) {
      addCollectionEntry(collectionTitle, {
        watchlist: selectedAnime,
      });
    } else {
      addToCollectionWatchlist([selectedCollection?.id ?? ""], selectedAnime);
    }
    setSelectedAnime([]);
    setIsAddMode(false);
  };

  const resetValues = () => {
    setIsCreateMode(false);
    setSelectedCollection(null);
    setSearchValue("");
  };

  useEffect(() => {
    setCollectionTitle(`Collection ${collections.length}`);
  }, [collections, isCreateMode]);

  const isChecking = collectionTitle !== "" && isValid === null;
  const isError = isValid !== null && !isValid;
  const isSubmitable = collectionTitle !== "" && isValid;

  const isAddButtonDisabled = isCreateMode
    ? !isSubmitable
    : !selectedAnime.length;

  return {
    isAdditionModalOpen,
    filteredCollection,
    selectedCollection,
    isCreateMode,
    isAddMode,
    collectionTitle,
    isAddButtonDisabled,
    isChecking,
    isError,
    selectedAnime,
    handleCreateCollectionItem,
    handleChangeMode,
    setSelectedAnime,
    handleInputChange,
    onToggleCollectionModal,
    onClickAddMode,
    resetValues,
    setIsCreateMode,
    setSelectedCollection,
    setSearchValue,
  };
};

const AnimeContext = createContext<AnimeContextType>({
  filteredCollection: [],
  selectedCollection: null,
  isCreateMode: false,
  isAddMode: false,
  isAdditionModalOpen: true,
  collectionTitle: "",
  isAddButtonDisabled: false,
  isChecking: false,
  isError: false,
  selectedAnime: [],
  handleCreateCollectionItem: () => {},
  handleChangeMode: () => {},
  setSelectedAnime: () => {},
  handleInputChange: () => {},
  onToggleCollectionModal: () => {},
  onClickAddMode: () => {},
  resetValues: () => {},
  setIsCreateMode: () => {},
  setSelectedCollection: () => {},
  setSearchValue: () => {},
});

const AnimeContextProvider = ({ children }: AnimeContextProviderProps) => {
  const values = useAnime();
  return (
    <AnimeContext.Provider value={values}>{children}</AnimeContext.Provider>
  );
};

const useAnimeContext = () => {
  return React.useContext(AnimeContext);
};

export { AnimeContextProvider, useAnimeContext };

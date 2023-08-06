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
import debounce from "lodash/debounce";
import type { AnimeDetails, AnimeItem, WatchlistItem } from "@/types";

interface AnimeDetailsContextType {
  availableCollection: WatchlistItem[];
  animeInCollection: WatchlistItem[];
  currentAnimeItemData: Partial<AnimeItem>;
  animeData: Partial<AnimeDetails>;
  isChecking: boolean;
  isError: boolean;
  isAddButtonDisabled: boolean;
  isOpenCollectionModal: boolean;
  isCreateMode: boolean;
  filteredCollection: WatchlistItem[];
  selectedCollection: string[];
  collectionTitle: string;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  onToggleCollectionModal: () => void;
  handleCreateCollectionItem: () => void;
  handleChangeMode: () => void;
  handleSelectCollectionItem: ({
    isSelected,
    id,
  }: {
    isSelected: boolean;
    id: string;
  }) => void;
  handleInputChange: (text: string) => void;
}

interface AnimeDetailsContextProviderProps {
  children: ReactNode;
  animeData: AnimeDetails;
}

const useCollection = (animeData: AnimeDetails) => {
  const { bannerImage, coverImage, id, title } = animeData;

  const [isCreateMode, setIsCreateMode] = useState(false);
  const [selectedCollection, setSelectionCollection] = useState<string[]>([]);
  const { collections, addCollectionEntry, addToCollectionWatchlist } =
    useCollectionContext();
  const { isOpen: isOpenCollectionModal, onToggle } = useDisclosure();
  const [collectionTitle, setCollectionTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const resetModalState = () => {
    setIsValid(null);
    setSearchValue("");
    setCollectionTitle("");
    setSelectionCollection([]);
  };

  const onToggleCollectionModal = () => {
    // only reset modal states if we are opening the modal
    // to avoid animation issue
    if (!isOpenCollectionModal) {
      setIsCreateMode(false);
      resetModalState();
    }
    onToggle();
  };

  const currentAnimeItemData: AnimeItem = {
    bannerImage,
    coverImage,
    id,
    title,
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

  const handleCreateCollectionItem = () => {
    onToggleCollectionModal();
    if (isCreateMode) {
      addCollectionEntry(collectionTitle, {
        watchlist: [currentAnimeItemData],
      });
    } else {
      addToCollectionWatchlist(selectedCollection, currentAnimeItemData);
    }
  };

  const handleChangeMode = () => {
    setIsCreateMode((state) => !state);
    resetModalState();
    setIsValid(true);
  };

  const handleSelectCollectionItem = ({
    isSelected,
    id,
  }: {
    isSelected: boolean;
    id: string;
  }) => {
    setSelectionCollection((state) => {
      if (isSelected) {
        return state.filter((currenttId) => currenttId !== id);
      }
      return [...state, id];
    });
  };

  const isChecking = collectionTitle !== "" && isValid === null;
  const isError = isValid !== null && !isValid;
  const isSubmitable = collectionTitle !== "" && isValid;

  const isAddButtonDisabled = isCreateMode
    ? !isSubmitable
    : !selectedCollection.length;

  const availableCollection = useMemo(() => {
    return collections.filter((collection) =>
      collection.watchlist.every((watchitem) => watchitem.id !== animeData.id)
    );
  }, [collections, animeData]);

  const animeInCollection = useMemo(() => {
    return collections.filter((collection) =>
      collection.watchlist.some((watchitem) => watchitem.id === animeData.id)
    );
  }, [collections, animeData]);

  const filteredCollection = useMemo(() => {
    return availableCollection.filter((collection) => {
      const parsedCollectionTitile = collection.title.toLowerCase();
      return parsedCollectionTitile.includes(searchValue);
    });
  }, [searchValue, animeData, availableCollection, collections]);

  useEffect(() => {
    setCollectionTitle(`Collection ${collections.length}`);
  }, [collections, isCreateMode]);

  return {
    availableCollection,
    animeInCollection,
    currentAnimeItemData,
    animeData,
    isChecking,
    isError,
    isAddButtonDisabled,
    filteredCollection,
    isCreateMode,
    selectedCollection,
    isOpenCollectionModal,
    collectionTitle,
    searchValue,
    setSearchValue,
    handleCreateCollectionItem,
    handleChangeMode,
    handleSelectCollectionItem,
    handleInputChange,
    onToggleCollectionModal,
  };
};

const AnimeDetailsContext = createContext<AnimeDetailsContextType>({
  availableCollection: [],
  animeInCollection: [],
  currentAnimeItemData: {},
  animeData: {},
  isChecking: false,
  isError: false,
  isAddButtonDisabled: true,
  isOpenCollectionModal: false,
  isCreateMode: false,
  filteredCollection: [],
  selectedCollection: [],
  collectionTitle: "",
  searchValue: "",
  setSearchValue: () => {},
  onToggleCollectionModal: () => {},
  handleCreateCollectionItem: () => {},
  handleChangeMode: () => {},
  handleSelectCollectionItem: () => {},
  handleInputChange: () => {},
});

const AnimeDetailsContextProvider = ({
  children,
  animeData,
}: AnimeDetailsContextProviderProps) => {
  const values = useCollection({ ...animeData });
  return (
    <AnimeDetailsContext.Provider value={values}>
      {children}
    </AnimeDetailsContext.Provider>
  );
};

const useAnimeDetailsContext = () => {
  return React.useContext(AnimeDetailsContext);
};

export { AnimeDetailsContextProvider, useAnimeDetailsContext };

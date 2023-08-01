import { WatchlistItem } from "@/pages/collection";
import { getLocalStorageData, setLocalStorageData } from "@/utils/localStorage";
import React, { ReactNode, createContext, useEffect, useState } from "react";

interface CollectionContextType {
  collections: WatchlistItem[];
  collectionToBeDeleted: WatchlistItem | null;
  collectionToBeEdited: WatchlistItem | null;
  setCollectionToBeDeleted: (collection: WatchlistItem | null) => void;
  setCollectionToBeEdited: (collection: WatchlistItem | null) => void;
  addCollectionEntry: (name: string) => void;
  removeCollectionEntry: (id: string) => void;
  editCollectionEntry: (
    id: string,
    updatedItem: Partial<WatchlistItem>
  ) => void;
}

interface CollectionContextProviderProps {
  children: ReactNode;
}

const useCollection = () => {
  const [collections, setCollections] = useState<WatchlistItem[]>([]);
  const [collectionToBeDeleted, setCollectionToBeDeleted] =
    useState<WatchlistItem | null>(null);
  const [collectionToBeEdited, setCollectionToBeEdited] =
    useState<WatchlistItem | null>(null);

  useEffect(() => {
    _setCollectionData();
  }, []);

  const _setCollectionData = () => {
    const existingData = getLocalStorageData<WatchlistItem[] | null>(
      "collections"
    );
    if (!existingData) {
      return;
    }

    setCollections(existingData);
  };

  const addCollectionEntry = (name: string) => {
    const data: WatchlistItem = {
      id: Date.now().toString(),
      imageUrl: null,
      title: name,
      watchlist: [],
    };
    const existingData = getLocalStorageData<WatchlistItem[] | null>(
      "collections"
    );
    if (!existingData) {
      setLocalStorageData<WatchlistItem[]>("collections", [data]);
    } else {
      setLocalStorageData<WatchlistItem[]>("collections", [
        data,
        ...existingData,
      ]);
    }

    _setCollectionData();
  };

  const editCollectionEntry = (
    id: string,
    updatedItem: Partial<WatchlistItem>
  ) => {
    const existingData = getLocalStorageData<WatchlistItem[] | null>(
      "collections"
    );
    if (!existingData) {
      return;
    }

    const updatedData = existingData.map((item) => {
      if (item.id === id) {
        return { ...item, ...updatedItem };
      }
      return item;
    });

    setLocalStorageData<WatchlistItem[]>("collections", updatedData);

    _setCollectionData();
  };

  const removeCollectionEntry = (id: string) => {
    const existingData = getLocalStorageData<WatchlistItem[] | null>(
      "collections"
    );
    if (!existingData) {
      return;
    }

    const updatedData = existingData.filter((item) => item.id !== id);
    setLocalStorageData<WatchlistItem[]>("collections", updatedData);

    _setCollectionData();
  };

  return {
    collections,
    collectionToBeDeleted,
    collectionToBeEdited,
    editCollectionEntry,
    setCollectionToBeEdited,
    setCollectionToBeDeleted,
    addCollectionEntry,
    removeCollectionEntry,
  };
};

const CollectionContext = createContext<CollectionContextType>({
  collections: [],
  collectionToBeDeleted: null,
  collectionToBeEdited: null,
  setCollectionToBeDeleted: () => {},
  setCollectionToBeEdited: () => {},
  addCollectionEntry: () => {},
  removeCollectionEntry: () => {},
  editCollectionEntry: () => {},
});

const CollectionContextProvider = ({
  children,
}: CollectionContextProviderProps) => {
  const values = useCollection();
  return (
    <CollectionContext.Provider value={values}>
      {children}
    </CollectionContext.Provider>
  );
};

const useCollectionContext = () => {
  return React.useContext(CollectionContext);
};

export { CollectionContextProvider, useCollectionContext };

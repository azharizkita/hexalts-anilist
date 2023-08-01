// Function to get data from local storage
export const getLocalStorageData = <T>(key: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Function to set data in local storage
export const setLocalStorageData = <T>(key: string, value: T): void => {
  if (typeof window === "undefined") {
    return;
  }

  if (typeof value === "object") {
    const _value = JSON.stringify(value);
    window.localStorage.setItem(key, _value);
    return;
  }

  window.localStorage.setItem(key, value as any);
};

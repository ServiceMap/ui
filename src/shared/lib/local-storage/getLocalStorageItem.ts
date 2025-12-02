export const getLocalStorageItem = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (!item) return null;

    return JSON.parse(item) as T;
  } catch (e) {
    console.error("getLocalStorageItem error", e);
    return null;
  }
};

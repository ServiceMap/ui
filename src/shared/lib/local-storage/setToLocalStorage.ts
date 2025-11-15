export const setLocalStorageItem = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("setLocalStorageItem error", e);
  }
};

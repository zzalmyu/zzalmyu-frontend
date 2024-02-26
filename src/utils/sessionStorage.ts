export const getSessionStorage = (key: string) => {
  try {
    const value = sessionStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(value);
  } catch (error) {
    console.error(`Error parsing sessionStorage item with key "${key}":`, error);
  }
};

export const setSessionStorage = <T>(key: string, value: T) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error serializing value for sessionStorage item with key "${key}":`, error);
  }
};

export const removeSessionStorage = (key: string) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item from sessionStorage with key "${key}". Error: ${error}`);
  }
};

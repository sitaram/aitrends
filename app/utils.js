// utils.js
export const clearCache = () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('openai:')) {
      localStorage.removeItem(key);
    }
  });
};

export const splitChat = (str) => {
  return str.split('\n').filter((line) => line.trim() !== '');
};


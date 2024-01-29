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

export const calculateTTL = (timeframe) => {
  const oneDayInSeconds = 24 * 60 * 60;
  const oneWeekInSeconds = 7 * oneDayInSeconds;
  const oneMonthInSeconds = 30 * oneDayInSeconds; // Approximation
  const oneYearInSeconds = 365 * oneDayInSeconds;
  const oneDecadeInSeconds = 10 * oneYearInSeconds;

  switch(timeframe) {
    case "last two weeks":
      return 2 * oneWeekInSeconds;
    case "last 3 months":
      return 3 * oneMonthInSeconds;
    case "last year":
      return oneYearInSeconds;
    case "last decade":
      return oneDecadeInSeconds;
    default:
      console.log("Unsupported timeframe");
      return 0; // Default or error case
  }
}

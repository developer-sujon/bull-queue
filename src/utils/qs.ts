const generateQueryString = (query: Record<string, any>): string => {
  if (!query) return '';

  const sortedKeys = Object.keys(query).sort();

  return sortedKeys
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(query[key]),
    )
    .join('&');
};

export { generateQueryString };

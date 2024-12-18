import { generateQueryString } from './qs';

interface PaginationParams {
  page?: number;
  limit?: number;
  totalItems?: number;
}

interface HATEOASLinksParams {
  query?: Record<string, any>;
  path: string;
  prevPage?: number | null;
  nextPage?: number | null;
}

interface TransformedItemsParams {
  items?: Record<string, any>[];
  selection?: string[];
  path?: string;
}

const defaults = require('../config/defaults');

const paginationGenerator = ({
  page = defaults.page,
  limit = defaults.limit,
  totalItems = defaults.totalItems,
}: PaginationParams): Record<string, any> => {
  if (totalItems < 1) {
    // throw new Error("Total page less than one");
  }

  const totalPage = Math.ceil(totalItems / limit);

  const calculateNextPage = (currentPage: number): number | null =>
    currentPage < totalPage ? currentPage + 1 : null;
  const calculatePrevPage = (currentPage: number): number | null =>
    currentPage > 1 ? currentPage - 1 : null;

  const pagination: Record<string, any> = {
    page,
    limit,
    totalItems,
    totalPage,
    nextPage: calculateNextPage(page),
    prevPage: calculatePrevPage(page),
  };

  if (!pagination.prevPage) delete pagination.prevPage;
  if (!pagination.nextPage) delete pagination.nextPage;

  return pagination;
};

const generateHATEOASLinks = ({
  query = {},
  path,
  prevPage,
  nextPage,
}: HATEOASLinksParams): Record<string, string> => {
  const generateLink = (page: number | undefined): string =>
    `${path}?${generateQueryString({ ...query, page })}`;

  const links: Record<string, string> = {
    self: generateLink(query.page || 1),
  };

  if (prevPage !== null && prevPage !== undefined) {
    links.prev = generateLink(prevPage);
  }

  if (nextPage !== null && nextPage !== undefined) {
    links.next = generateLink(nextPage);
  }

  return links;
};

const getTransformedItems = ({
  items = [],
  selection = [],
  path = '/',
}: TransformedItemsParams): Record<string, any>[] => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error('Invalid selection');
  }

  if (selection.length === 0) {
    return items.map((item) => ({ ...item, link: `${path}/${item.id}` }));
  }

  return items.map((item) => {
    const result: Record<string, any> = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id}`;
    return result;
  });
};

export { generateHATEOASLinks, getTransformedItems, paginationGenerator };

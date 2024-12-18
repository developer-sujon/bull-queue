import PaginationDTO from '@app/common/dto/pagination,dto';
import { generateHATEOASLinks, paginationGenerator } from './query';

export const generatePaginationAndLinks = (
  paginationDTO: PaginationDTO,
  path: string,
  totalItems: number,
) => {
  // Generate pagination
  const pagination = paginationGenerator({
    totalItems,
    limit: paginationDTO.limit,
    page: paginationDTO.page,
  });

  // Generate HATEOAS Links
  const links = generateHATEOASLinks({
    query: paginationDTO,
    path,
    prevPage: pagination.prevPage,
    nextPage: pagination.nextPage,
  });

  return { pagination, links };
};

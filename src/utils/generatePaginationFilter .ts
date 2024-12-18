import PaginationDTO, { SortType } from '@app/common/dto/pagination,dto';
import { getTableDateRange, getTodayDateRange } from './date';

const generatePaginationFilter = ({
  sortType,
  sortBy,
  startDate,
  endDate,
}: PaginationDTO) => {
  const dateRange = getTableDateRange({ startDate, endDate });

  return {
    sortStr: `${sortType === SortType.DSC ? '-' : ''}${sortBy}`,
    dateRange,
  };
};

export const generateTodayPaginationFilter = ({
  sortType,
  sortBy,
  startDate,
  endDate,
}: PaginationDTO) => {
  const dateRange = getTodayDateRange();

  return {
    sortStr: `${sortType === SortType.DSC ? '-' : ''}${sortBy}`,
    dateRange,
  };
};

export default generatePaginationFilter;

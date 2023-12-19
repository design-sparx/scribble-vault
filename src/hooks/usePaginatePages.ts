import useSWRInfinite from 'swr/infinite';
import { BASEURL } from '@/constants';
import { fetcher } from '@/utils';
import { IPage } from '@/types';

export const usePaginatePages = (limit?: number) => {
  const url = BASEURL + '/pages';
  const PAGE_LIMIT = limit || 5;

  if (!url) {
    throw new Error('Url is required');
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${url}?_page=${index + 1}&_limit=${PAGE_LIMIT}`,
    fetcher
  );

  const pages: IPage[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return { pages, error, isLoadingMore, size, setSize, isReachingEnd };
};

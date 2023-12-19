import { fetcher } from '../utils';
import useSWR from 'swr';
import { IPage } from '@/types';

export const usePages = () => {
  const { data, isLoading, error } = useSWR<IPage[]>(
    '/mocks/pages.json',
    fetcher
  );

  return {
    pagesData: data,
    pagesLoading: isLoading,
    pagesError: error,
  };
};

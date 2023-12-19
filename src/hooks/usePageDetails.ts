import useSWR from 'swr';
import { BASEURL } from '@/constants';
import { fetcher } from '@/utils';
import { IPage } from '@/types';

export const usePageDetails = (id: string) => {
  const url = BASEURL + `/pages`;

  if (!url) {
    throw new Error('Url is required');
  }

  if (!id) {
    throw new Error('Id is required');
  }

  const { data, error, isLoading } = useSWR<IPage[]>(
    `${url}?id=${id}`,
    fetcher
  );

  let page: IPage | undefined;
  if (data) {
    page = data[0];
  }

  return {
    pageData: page,
    pageLoading: isLoading,
    pageError: error,
  };
};

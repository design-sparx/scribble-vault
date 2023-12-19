import { fetcher } from '../utils';
import useSWR from 'swr';
import { IUser, IWorkspace } from '@/types';

export const useUser = () => {
  const { data, isLoading, error } = useSWR<IUser>('/mocks/user.json', fetcher);

  return {
    userData: data,
    userLoading: isLoading,
    userError: error,
  };
};

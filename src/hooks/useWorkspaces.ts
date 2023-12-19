import { fetcher } from '@/utils';
import useSWR from 'swr';
import { IWorkspace } from '@/types';

export const useWorkspaces = () => {
  const { data, isLoading, error } = useSWR<IWorkspace[]>(
    '/mocks/workspaces.json',
    fetcher
  );

  return {
    workspacesData: data,
    workspacesLoading: isLoading,
    workspacesError: error,
  };
};

import useSWR from 'swr';
import { BASEURL } from '@/constants';
import { fetcher } from '@/utils';
import { IPage, IWorkspace } from '@/types';

export const useWorkspaceDetails = (id: string) => {
  const url = BASEURL + `/workspaces`;

  if (!url) {
    throw new Error('Url is required');
  }

  if (!id) {
    throw new Error('Id is required');
  }

  const { data, error, isLoading } = useSWR<IWorkspace[]>(
    `${url}?id=${id}`,
    fetcher
  );

  let workspace: IWorkspace | undefined;

  if (data) {
    workspace = data[0];
  }

  return {
    workspaceData: workspace,
    workspaceLoading: isLoading,
    workspaceError: error,
  };
};

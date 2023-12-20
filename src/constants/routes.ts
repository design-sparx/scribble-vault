function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOT_PAGE = '/page';
const ROOT_WORKSPACE = '/workspace';

export const PATH_PAGE = {
  root: ROOT_PAGE,
  details: (id: string) => path(ROOT_PAGE, `/${id}`),
  new: path(ROOT_PAGE, '/new'),
};

export const PATH_WORKSPACE = {
  root: ROOT_WORKSPACE,
  details: (id: string) => path(ROOT_WORKSPACE, `/${id}`),
};

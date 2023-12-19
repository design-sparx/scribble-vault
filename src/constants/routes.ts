function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOT_APPS = '/apps';
const ROOTS_PAGES = '/pages';
const ROOTS_PROJECTS = '/projects';
const ROOTS_ORDERS = '/orders';
const ROOTS_INVOICES = '/invoices';
const ROOTS_TASKS = '/tasks';
const ROOTS_CALENDAR = '/calendar';
const ROOTS_AUTH = '/authentication';
const ROOTS_ERRORS = '/error';
const ROOTS_CHANGELOG = '/changelog';
const ROOTS_AUTH_PROVIDERS = '/authProviders';

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  default: path(ROOTS_DASHBOARD, '/default'),
  analytics: path(ROOTS_DASHBOARD, '/analytics'),
  saas: path(ROOTS_DASHBOARD, '/saas'),
};

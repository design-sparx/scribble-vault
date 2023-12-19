export type PageStatus =
  | 'high'
  | 'medium'
  | 'low '
  | 'urgent'
  | 'normal'
  | string;

export type Page = {
  id: string;
  name: string;
  description: string;
  content: string;
  workspace_id: string;
  priority: PageStatus;
  created_date: string;
  modified_date: string;
  users: string;
  due_date?: string;
  color: string;
  country: string;
  location: string;
  links: string;
  icon: string;
};

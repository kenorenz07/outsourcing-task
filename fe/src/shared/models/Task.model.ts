import { UserType } from './User.model';

export interface TaskType {
  id?: number | null;
  name: string;
  description: string;
  users: UserType[];
  assigned_users: string;
}

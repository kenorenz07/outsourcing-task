export interface UserType {
  id?: number | null;
  name: string;
  username: string;
  password?: string;
}

export interface AuthenticatedUserType extends UserType {
  permission_slugs: string[];
}

export interface UserDataType extends AuthenticatedUserType {
  token: string;
}

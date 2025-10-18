export enum USER_ROLES {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

export type UserRole = USER_ROLES.ADMIN | USER_ROLES.MANAGER | USER_ROLES.USER
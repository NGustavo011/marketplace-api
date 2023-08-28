export type RoleModel = 'admin' | 'user'

export interface UserUsed {
    userId: string
}

export interface UserModel {
    id: string
    name: string
    email: string
    password: string
    role: RoleModel
}
  
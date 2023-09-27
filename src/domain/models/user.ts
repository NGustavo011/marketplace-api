export type RoleModel = 'admin' | 'user'

export interface UserUsed {
    userId: string
}

export interface UserModel {
    id: string
    name: string
    email: string
    password: string
    cpf: string
    role: RoleModel
    pixKey?: string | null
}
  
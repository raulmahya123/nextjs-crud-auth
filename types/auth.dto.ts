export interface RegisterUserDTO {
  name: string
  email: string
  password: string
}

export interface LoginUserDTO {
  email: string
  password: string
}

export interface UpdateUserDTO {
  name?: string
  password?: string
}

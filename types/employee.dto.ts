export interface CreateEmployeeDTO {
  name: string
  email: string
  position: string
  photoUrl?: string
}

export interface UpdateEmployeeDTO {
  name?: string
  email?: string
  position?: string
  photoUrl?: string
}

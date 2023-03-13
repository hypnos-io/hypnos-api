export interface User {
  _id?: string
  employeeId: string
  firstName: string
  lastName: string
  password: string
  admissionDate: Date
  createdAt?: Date
  updatedAt?: Date
}

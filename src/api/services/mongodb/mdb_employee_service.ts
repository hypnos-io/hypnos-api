import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Employee} from '../../../domain/entities/employee'
import {
  EmployeeFilter,
  IEmployeeService,
  OptionalEmployee,
} from '../../../domain/ports/iemployee_service'
import {RolesEnum} from '../../../domain/use_cases/authorization/roles'
import {Connection} from '../connection'
import cloudinary from 'cloudinary'

const EmployeeSchema = new Schema<Employee>(
  {
    admissionDate: Date,
    fullName: String,
    password: String,
    registration: String,
    role: {
      enum: RolesEnum,
      type: Number,
      default: RolesEnum.EMPLOYEE,
    },
    profileImage: String,
  },
  {timestamps: true}
)

const EmployeeModel = mongoose.model('Employees', EmployeeSchema)

export class MongoDBEmployeeService implements IEmployeeService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async create(newEmployee: Employee): Promise<OptionalEmployee> {
    await this.connect()
    const createdEmployee = await EmployeeModel.create({
      ...newEmployee,
    })
    return createdEmployee
  }

  async fetchAll(filters: EmployeeFilter): Promise<Employee[]> {
    await this.connect()
    return EmployeeModel.find({...filters})
  }

  async findById(id: string): Promise<OptionalEmployee> {
    await this.connect()
    return EmployeeModel.findOne({_id: id})
  }

  async update(
    id: string,
    newEmployee: Partial<Employee>
  ): Promise<OptionalEmployee> {
    await this.connect()
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      {_id: id},
      newEmployee
    )
    return updatedEmployee
  }

  async deleteById(id: string): Promise<void> {
    await this.connect()
    await EmployeeModel.findOneAndDelete({_id: id})
  }
}

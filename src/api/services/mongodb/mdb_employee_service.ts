import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {Employee} from '../../../domain/entities/employee'
import {
  EmployeeFilter,
  IEmployeeService,
  OptionalEmployee,
} from '../../../domain/ports/iemployee_service'
import {Connection} from '../connection'

const EmployeeSchema = new Schema<Employee>(
  {
    admissionDate: Date,
    firstName: String,
    lastName: String,
    password: String,
    registration: String,
    workstation: Number,
    supervisor: {type: Schema.Types.ObjectId, ref: 'Supervisors'},
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

  async create(
    newEmployee: Employee,
    supervisorId: string
  ): Promise<OptionalEmployee> {
    await this.connect()
    const createdEmployee = await EmployeeModel.create({
      ...newEmployee,
      supervisor: supervisorId,
    })
    return createdEmployee
  }

  async fetchAll(
    supervisorId: string,
    filters: EmployeeFilter
  ): Promise<Employee[]> {
    await this.connect()
    return EmployeeModel.find({supervisor: supervisorId, ...filters}).populate(
      'supervisor'
    )
  }

  async findById(supervisorId: string, id: string): Promise<OptionalEmployee> {
    await this.connect()
    return EmployeeModel.findOne({supervisor: supervisorId, _id: id}).populate(
      'supervisor'
    )
  }

  async update(
    supervisorId: string,
    id: string,
    newEmployee: Partial<Employee>
  ): Promise<OptionalEmployee> {
    await this.connect()
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      {supervisor: supervisorId, _id: id},
      newEmployee
    ).populate('supervisor')
    return updatedEmployee
  }

  async deleteById(supervisorId: string, id: string): Promise<void> {
    await this.connect()
    await EmployeeModel.findOneAndDelete({supervisor: supervisorId, _id: id})
  }
}

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
import { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from '../../../constants'

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
    imageURL: String,
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
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME_CLOUDINARY,
      api_key: API_KEY_CLOUDINARY,
      api_secret: API_SECRET_CLOUDINARY
    });
    await this.connect()
    const item = EmployeeModel.findById({ _id: id }).lean().exec();
    let imageId: any = (await item).imageURL;
    imageId = imageId.split("/").pop().split(".")[0];
    console.log(imageId);
    if (imageId !== 'unknown_person_g3aj62')
      await cloudinary.v2.uploader.destroy(imageId);
    await EmployeeModel.findOneAndDelete({_id: id})
  }

}

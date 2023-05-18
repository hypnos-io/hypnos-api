import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Supervisor} from '../../../domain/entities/supervisor'
import {
  ISupervisorService,
  OptionalSupervisor,
  SupervisorFilter,
} from '../../../domain/ports/isupervisor_service'
import {RolesEnum} from '../../../domain/use_cases/authorization/roles'
import {Connection} from '../connection'
import cloudinary from 'cloudinary'
import { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from '../../../constants'

const SupervisorSchema = new Schema<Supervisor>(
  {
    registration: String,
    name: String,
    imageURL: String,
    password: String,
    role: {
      enum: RolesEnum,
      type: Number,
      default: RolesEnum.SUPERVISOR,
    },
  },
  {timestamps: true}
)

const SupervisorModel = mongoose.model<Supervisor>(
  'Supervisors',
  SupervisorSchema
)

export class MongoDBSupervisorService implements ISupervisorService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async fetchAll(filter: SupervisorFilter): Promise<Supervisor[]> {
    await this.connect()
    return SupervisorModel.find(filter)
  }

  async findById(id: ID): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.findOne({_id: id})
  }

  async update(
    id: ID,
    newSupervisor: Partial<Supervisor>
  ): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.findOneAndUpdate({_id: id}, newSupervisor)
  }

  async deleteById(id: string): Promise<void> {
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME_CLOUDINARY,
      api_key: API_KEY_CLOUDINARY,
      api_secret: API_SECRET_CLOUDINARY
    });
    await this.connect()
    const supervisor = SupervisorModel.findById({ _id: id }).lean().exec();
    let imageId: any = (await supervisor).imageURL;
    imageId = imageId.split("/").pop().split(".")[0];
    console.log(imageId);
    if (imageId !== 'unknown_person_g3aj62')
      await cloudinary.v2.uploader.destroy(imageId);
    await SupervisorModel.findOneAndDelete({_id: id})
  }

  async create(newSupervisor: Supervisor): Promise<OptionalSupervisor> {
    await this.connect()
    return SupervisorModel.create(newSupervisor)
  }
}

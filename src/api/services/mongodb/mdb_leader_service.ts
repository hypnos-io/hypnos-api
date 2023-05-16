import mongoose, {Schema} from 'mongoose'
import {DB_URL} from '../../../constants'
import {ID} from '../../../domain/entities/common'
import {Leader} from '../../../domain/entities/leader'
import {
  ILeaderService,
  LeaderFilter,
  OptionalLeader,
} from '../../../domain/ports/ileader_service'
import {RolesEnum} from '../../../domain/use_cases/authorization/roles'
import {Connection} from '../connection'
import cloudinary from 'cloudinary'
import { CLOUD_NAME_CLOUDINARY, API_KEY_CLOUDINARY, API_SECRET_CLOUDINARY } from '../../../constants'

const LeaderSchema = new Schema<Leader>(
  {
    registration: String,
    admissionDate: Date,
    fullName: String,
    password: String,
    role: {
      enum: RolesEnum,
      type: Number,
      default: RolesEnum.EMPLOYEE,
    },
    imageURL: String
  },
  {timestamps: true}
)

const LeaderModel = mongoose.model<Leader>('Leaders', LeaderSchema)

export class MongoDBLeaderService implements ILeaderService {
  constructor(private readonly connection: Connection) {}

  async connect(): Promise<void> {
    if (!DB_URL) throw new Error('DB URL not found.')
    const isConnected = await this.connection.connect(DB_URL)
    if (!isConnected) throw new Error('DB not connected')
  }

  async fetchAll(filter: LeaderFilter): Promise<Leader[]> {
    await this.connect()
    return LeaderModel.find(filter)
  }

  async findById(id: ID): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.findOne({_id: id})
  }

  async update(id: ID, newLeader: Partial<Leader>): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.findOneAndUpdate({_id: id}, newLeader)
  }

  async deleteById(id: string): Promise<void> {
    cloudinary.v2.config({
      cloud_name: CLOUD_NAME_CLOUDINARY,
      api_key: API_KEY_CLOUDINARY,
      api_secret: API_SECRET_CLOUDINARY
    });
    await this.connect()
    const leader = LeaderModel.findById({ _id: id }).lean().exec();
    let imageId: any = (await leader).imageURL;
    imageId = imageId.split("/").pop().split(".")[0];
    console.log(imageId);
    if (imageId !== 'unknown_person_g3aj62')
      await cloudinary.v2.uploader.destroy(imageId);
    await LeaderModel.findOneAndDelete({_id: id})
  }


  async create(newLeader: Leader): Promise<OptionalLeader> {
    await this.connect()
    return LeaderModel.create(newLeader)
  }
}

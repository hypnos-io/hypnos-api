import mongoose from 'mongoose'
import {Connection} from '../connection'

export class MongoDBConnection implements Connection {
  async connect(dbURL: string): Promise<boolean> {
    await mongoose.connect(dbURL)
    return true
  }
}

import {Connection} from '../connection'

export class MongoDBConnection implements Connection {
  async connect(dbURL: string): Promise<boolean> {
    // TODO
    return false
  }
}

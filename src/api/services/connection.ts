export interface Connection {
  connect(dbURL: string): Promise<boolean>
}

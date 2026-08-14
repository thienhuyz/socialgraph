import dns from 'node:dns'
import { config } from 'dotenv'
import { Db, MongoClient, Collection } from 'mongodb'
import User from '~/models/schemas/User.schema'

dns.setServers(['1.1.1.1', '8.8.8.8'])
config()
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@socialgraph.asitkbu.mongodb.net/?appName=socialgraph`

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Connected to MongoDB!')
    } catch (error) {
      console.error('MongoDB connection failed:', error)
    }
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

const databaseService = new DatabaseService()
export default databaseService

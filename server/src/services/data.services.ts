import dns from 'node:dns'
dns.setServers(['8.8.8.8', '8.8.4.4'])

import { MongoClient } from 'mongodb'
import { config } from 'dotenv'
config()

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@socialgraph.asitkbu.mongodb.net/?appName=socialgraph`

class DatabaseService {
  private client: MongoClient

  constructor() {
    this.client = new MongoClient(uri)
  }

  async connect() {
    try {
      await this.client.db('admin').command({ ping: 1 })
      console.log('Connected to MongoDB!')
    } catch (error) {
      console.error('MongoDB connection failed:', error)
    }
  }
}

const databaseService = new DatabaseService()
export default databaseService

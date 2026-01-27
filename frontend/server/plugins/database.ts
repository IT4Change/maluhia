import { initDatabase } from '../utils/database'

export default defineNitroPlugin(async () => {
  await initDatabase()
  console.log('Database connection established')
})

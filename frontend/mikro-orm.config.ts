import { defineConfig } from '@mikro-orm/mariadb'
import { Migrator } from '@mikro-orm/migrations'

export default defineConfig({
  host: process.env.DB_HOST || 'database',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'maluhia',
  password: process.env.DB_PASSWORD || 'maluhia',
  dbName: process.env.DB_NAME || 'maluhia',
  entities: ['./server/database/entities/*.ts'],
  entitiesTs: ['./server/database/entities/*.ts'],
  extensions: [Migrator],
  migrations: {
    path: './server/database/migrations',
    pathTs: './server/database/migrations',
  },
})

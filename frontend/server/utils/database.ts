import { MikroORM, type EntityManager } from '@mikro-orm/mariadb'
import { SubscriptionSchema } from '../database/entities/Subscription'

export const orm = {
  instance: null as MikroORM | null,
  em: null as EntityManager | null,
}

export async function initDatabase(): Promise<MikroORM> {
  if (orm.instance) {
    return orm.instance
  }

  const config = useRuntimeConfig()

  orm.instance = await MikroORM.init({
    host: config.DB_HOST as string,
    port: config.DB_PORT as number,
    user: config.DB_USER as string,
    password: config.DB_PASSWORD as string,
    dbName: config.DB_NAME as string,
    entities: [SubscriptionSchema],
  })
  orm.em = orm.instance.em

  return orm.instance
}

export function getEntityManager(): EntityManager {
  if (!orm.em) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return orm.em.fork()
}

import { MikroORM, type EntityManager } from '@mikro-orm/mariadb'
import config from '../../mikro-orm.config'

export const orm = {
  instance: null as MikroORM | null,
  em: null as EntityManager | null,
}

export async function initDatabase(): Promise<MikroORM> {
  if (orm.instance) {
    return orm.instance
  }

  orm.instance = await MikroORM.init(config)
  orm.em = orm.instance.em

  return orm.instance
}

export function getEntityManager(): EntityManager {
  if (!orm.em) {
    throw new Error('Database not initialized. Call initDatabase() first.')
  }
  return orm.em.fork()
}

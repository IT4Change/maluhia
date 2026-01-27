import { Entity, PrimaryKey, Property } from '@mikro-orm/core'
import { v4 as uuid } from 'uuid'

@Entity({ tableName: 'subscriptions' })
export class Subscription {
  @PrimaryKey({ type: 'int' })
  id!: number

  @Property({ type: 'string', length: 255, unique: true })
  email!: string

  @Property({ type: 'uuid' })
  confirmationCode: string = uuid()

  @Property({ type: 'boolean' })
  confirmed: boolean = false

  @Property({ type: 'datetime', onCreate: () => new Date() })
  createdAt: Date = new Date()

  @Property({ type: 'datetime', onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt: Date = new Date()
}

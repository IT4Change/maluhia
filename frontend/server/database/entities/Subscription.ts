import { EntitySchema } from '@mikro-orm/core'
import { v4 as uuid } from 'uuid'

export class Subscription {
  id!: number
  email!: string
  confirmationCode: string = uuid()
  confirmed: boolean = false
  createdAt: Date = new Date()
  updatedAt: Date = new Date()
}

export const SubscriptionSchema = new EntitySchema<Subscription>({
  class: Subscription,
  tableName: 'subscriptions',
  properties: {
    id: { type: 'int', primary: true },
    email: { type: 'string', length: 255, unique: true },
    confirmationCode: { type: 'uuid', onCreate: () => uuid() },
    confirmed: { type: 'boolean', default: false },
    createdAt: { type: 'datetime', onCreate: () => new Date() },
    updatedAt: { type: 'datetime', onCreate: () => new Date(), onUpdate: () => new Date() },
  },
})

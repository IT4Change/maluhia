import { EntitySchema } from '@mikro-orm/core'

export class Subscription {
  id!: number
  email!: string
  confirmationCode!: string
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
    confirmationCode: { type: 'uuid' },
    confirmed: { type: 'boolean', default: false },
    createdAt: { type: 'datetime', onCreate: () => new Date() },
    updatedAt: { type: 'datetime', onCreate: () => new Date(), onUpdate: () => new Date() },
  },
})

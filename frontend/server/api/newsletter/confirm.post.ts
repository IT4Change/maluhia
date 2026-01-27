import { z } from 'zod'
import { getEntityManager } from '~~/server/utils/database'
import { Subscription } from '~~/server/database/entities/Subscription'

const bodySchema = z.object({
  confirmationCode: z.string().toLowerCase(),
})

const confirmEmail = async (confirmationCode: string): Promise<boolean> => {
  const em = getEntityManager()
  const subscription = await em.findOne(Subscription, { confirmationCode })

  if (!subscription) {
    return false
  }

  subscription.confirmed = true
  await em.flush()
  return true
}

export default defineEventHandler(async (event) => {
  const { confirmationCode } = await readValidatedBody(event, bodySchema.parse)

  return confirmEmail(confirmationCode)
})
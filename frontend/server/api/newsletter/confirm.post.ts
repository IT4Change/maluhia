import { z } from 'zod'

const bodySchema = z.object({
  confirmationCode: z.string(),
})

const confirmEmail = async (_confirmationCode: string) => {
  // TODO: database
  // find and update in database - retrun true if updated
  return true
}

export default defineEventHandler(async (event) => {
  const { confirmationCode } = await readValidatedBody(event, bodySchema.parse)

  return confirmEmail(confirmationCode)
})
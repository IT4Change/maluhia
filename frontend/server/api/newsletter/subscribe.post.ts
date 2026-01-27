import type Mail from 'nodemailer/lib/mailer'
import path from 'path'
import { z } from 'zod'
import { defaultParams, emailRenderer } from '~~/server/emails/emails'
import { getEntityManager } from '~~/server/utils/database'
import { Subscription } from '~~/server/database/entities/Subscription'

const bodySchema = z.object({
  email: z.email().toLowerCase(),
})

const findEmail = async (email: string): Promise<Subscription | null> => {
  const em = getEntityManager()
  return em.findOne(Subscription, { email })
}

const saveConfirmationCode = async (email: string, confirmationCode: string) => {
  const em = getEntityManager()
  let subscription = await em.findOne(Subscription, { email })

  if (subscription) {
    subscription.confirmationCode = confirmationCode
  } else {
    subscription = em.create(Subscription, { email, confirmationCode })
    em.persist(subscription)
  }

  await em.flush()
}

type MAIL_TO = string | Mail.Address | (string | Mail.Address)[]

const sendEmailSubscribe = async (to: MAIL_TO, confirmationURL: URL) => {
  try {
    await emailRenderer.send({
      template: path.join(process.cwd(), 'server/emails/subscribe'),
      message: {
        to,
      },
      locals: {
        ...defaultParams,
        locale: 'de',
        confirmationURL,
      },
    })
  } catch (error) {
    throw new Error(error as string)
  }
}

const sendEmailResubscribe = async (to: MAIL_TO) => {
  try {
      await emailRenderer.send({
        template: path.join(process.cwd(), 'server/emails/resubscribe'),
        message: {
          to,
        },
        locals: {
          ...defaultParams,
          locale: 'de',
        },
      })
    } catch (error) {
      throw new Error(error as string)
    }
}

export default defineEventHandler(async (event) => {
  const { email } = await readValidatedBody(event, bodySchema.parse)

  const config = useRuntimeConfig()

  const query = await findEmail(email)

  const to = { address: email, name: '' }

  if(!query || !query.confirmed){
    const confirmationCode = crypto.randomUUID()
    await saveConfirmationCode(email, confirmationCode)

    const confirmationURL = new URL(`/subscribe/${confirmationCode}`, config.CLIENT_URI)
    await sendEmailSubscribe(to, confirmationURL)

    return true
  }

  await sendEmailResubscribe(to)
  return true
})
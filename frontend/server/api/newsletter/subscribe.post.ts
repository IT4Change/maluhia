import type Mail from 'nodemailer/lib/mailer'
import path from 'path'
import { z } from 'zod'
import { defaultParams, emailRenderer } from '~~/server/emails/emails'

const bodySchema = z.object({
  email: z.email().toLowerCase(),
})

const findEmail = async (email: string) => {
  // TODO: database
  // email (in lower case, primary), confirmed(boolean), confirmationCode(uuid), createdAt, updatedAt, 
  if(email === 'test@it4c.dev') {
    return {email: 'test@it4c.dev', confirmed: false, confirmationCode: 'some-uuid', createdAt: new Date(), updateAt: null}
  }
  if( email === 'confirmed@it4c.dev') {
    return {email: 'confirmed@it4c.dev', confirmed: true, confirmationCode: 'some-other-uuid', createdAt: new Date(), updateAt: new Date()}
  }
  return null
}

const saveConfirmationCode = async (_email:string, _confirmationCode:string) => {
  // TODO: database
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
        name,
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
          name,
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

  if(!query){
    const confirmationCode = crypto.randomUUID()
    await saveConfirmationCode(email, confirmationCode)

    const confirmationURL = new URL(`/subscribe/${confirmationCode}`, config.CLIENT_URI)
    await sendEmailSubscribe(to, confirmationURL)

    return true
  }

  if(query.confirmed){
    return true
  }

  await sendEmailResubscribe(to)
  return true
})
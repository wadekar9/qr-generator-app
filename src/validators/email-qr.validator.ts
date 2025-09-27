import { z } from "zod"

const emailQrValidator = z.object({
    email: z.string().trim().email({ message: 'Please enter a valid email.' }).nonempty({ message: 'Please enter the email.' }),
    subject: z.string().trim().nonempty({ message: 'Please enter the subject.' }),
    message: z.string().trim().nonempty({ message: 'Please enter the message.' })
});

type EmailQrValidatorSchema = z.infer<typeof emailQrValidator>

export { emailQrValidator, type EmailQrValidatorSchema };

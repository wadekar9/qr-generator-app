import { z } from "zod"

const smsQrValidator = z.object({
    phone: z.string().trim().nonempty({ message: 'Please enter the phone number.' }),
    message: z.string().trim().nonempty({ message: 'Please enter the message.' }),
});

type SMSQrValidatorSchema = z.infer<typeof smsQrValidator>

export { smsQrValidator, type SMSQrValidatorSchema };

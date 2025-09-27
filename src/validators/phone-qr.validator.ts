import { z } from "zod"

const phoneQrValidator = z.object({
    phone: z.string().trim().nonempty({ message: 'Please enter the phone number.' }),
});

type PhoneQrValidatorSchema = z.infer<typeof phoneQrValidator>

export { phoneQrValidator, type PhoneQrValidatorSchema };

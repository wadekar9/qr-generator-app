import { z } from "zod"

const webQrValidator = z.object({
    url: z.url({ message: 'Please enter a valid URL.' }).trim().nonempty({ message: 'Please enter the URL.' })
});

type WebQrValidatorSchema = z.infer<typeof webQrValidator>

export { webQrValidator, type WebQrValidatorSchema };

import { z } from "zod"

const wifiQrValidator = z.object({
    network: z.string().trim().nonempty({ message: 'Please enter the network name.' }),
    password: z.string().trim().nonempty({ message: 'Please enter the password.' }),
    hidden: z.boolean(),
    encryption: z.enum(['NONE', 'WEP', 'WPA', 'WPA2'], { message: 'Please select the encryption type.' })
});

type WifiQrValidatorSchema = z.infer<typeof wifiQrValidator>

export { wifiQrValidator, type WifiQrValidatorSchema };

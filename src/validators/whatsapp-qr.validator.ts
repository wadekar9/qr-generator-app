import { z } from "zod";
import { isValidWhatsAppNumber } from "../utils/helpers";

const whatsappQrValidator = z.object({
    mobile: z.string().trim().nonempty({ message: "Please enter the phone number." })
        .refine((val) => isValidWhatsAppNumber(val), { message: "Please enter a valid WhatsApp-compatible number." }),
    message: z.string().trim(),
});

type WhatsappQrValidatorSchema = z.infer<typeof whatsappQrValidator>;

export { whatsappQrValidator, type WhatsappQrValidatorSchema };

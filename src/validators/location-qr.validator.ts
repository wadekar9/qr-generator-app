import { z } from "zod";

const locationQrValidator = z.object({
    latitude: z
        .string()
        .trim()
        .nonempty({ message: "Please enter the latitude." })
        .refine((val) => !isNaN(Number(val)), { message: "Please enter the valid latitude." })
        .refine((val) => {
            const num = Number(val);
            return num >= -90 && num <= 90;
        }, { message: "Please enter the valid latitude." }),

    longitude: z
        .string()
        .trim()
        .nonempty({ message: "Please enter the longitude." })
        .refine((val) => !isNaN(Number(val)), { message: "Please enter the valid longitude." })
        .refine((val) => {
            const num = Number(val);
            return num >= -180 && num <= 180;
        }, { message: "Please enter the valid longitude." }),

    query: z.string().trim().optional(), // optional search query
});

type LocationQrValidatorSchema = z.infer<typeof locationQrValidator>;

export { locationQrValidator, type LocationQrValidatorSchema };

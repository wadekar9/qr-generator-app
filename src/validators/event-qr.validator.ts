import { z } from "zod";

const eventQrValidator = z.object({
    title: z.string().trim().nonempty({ message: "Please enter the event title." }),
    organizor: z.string().trim().nonempty({ message: "Please enter the organizor." }),
    startDateTime: z.date(),
    endDateTime: z.date().optional(),
})
    .refine(
        (data) => {
            if (!data.endDateTime) return true; // end is optional
            return new Date(data.endDateTime) > new Date(data.startDateTime);
        },
        { message: "End date & time must be after start date & time.", path: ["endDateTime"] }
    );

type EventQrValidatorSchema = z.infer<typeof eventQrValidator>;

export { eventQrValidator, type EventQrValidatorSchema };

import { z } from "zod"

const contactQrValidator = z.object({
    firstName: z.string().trim().nonempty({ message: 'Please enter the first name.' }),
    lastName: z.string().trim().nonempty({ message: 'Please enter the last name.' }),
    prefix: z.string().trim().nonempty({ message: 'Please enter the prefix.' }),
    organization: z.string().trim().nonempty({ message: 'Please enter the organization.' }),
    phone: z.string().trim().nonempty({ message: 'Please enter the phone number.' }),
    mobile: z.string().trim().nonempty({ message: 'Please enter the mobile number.' }),
    email: z.string().trim().nonempty({ message: 'Please enter the email.' }).email({ message: 'Please enter a valid email.' }),
    website: z.string().trim().nonempty({ message: 'Please enter the website.' }).url({ message: 'Please enter a valid website/url.' }),
    fax: z.string().trim().nonempty({ message: 'Please enter the fax.' }),
    street: z.string().trim().nonempty({ message: 'Please enter the street.' }),
    city: z.string().trim().nonempty({ message: 'Please enter the city.' }),
    region: z.string().trim().nonempty({ message: 'Please enter the region.' }),
    postcode: z.string().trim().nonempty({ message: 'Please enter the postcode.' }),
    country: z.string().trim().nonempty({ message: 'Please select the country.' })
});

type ContactQrValidatorSchema = z.infer<typeof contactQrValidator>

export { contactQrValidator, type ContactQrValidatorSchema };

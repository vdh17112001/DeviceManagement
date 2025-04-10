import { object, string, date } from 'yup'
import { phoneRegExp, requiredText } from '../../../contants/Validation'

export const customerSchema = object({
   name: string().required(requiredText),
   phone: string()
      .required(requiredText)
      .matches(phoneRegExp, 'Phone number is not valid')
      .min(8),
   email: string().email('Enter a valid email address').required(requiredText),
   address: string().required(requiredText),
   birth: date().required(requiredText),
}).required()

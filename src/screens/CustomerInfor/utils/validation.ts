import {object, string, date} from 'yup'
import {phoneRegExp, requiredText} from '../../../contants/Validation'

export const customerSchema = object({
   name: string().required(requiredText),
   phone: string()
      .min(8)
      .matches(phoneRegExp, 'Phone number is not valid')
      .required(requiredText),
   email: string().email('Enter a valid email address').required(requiredText),
   address: string().required(requiredText),
   birth: date()
      .default(() => new Date())
      .required(requiredText),
}).required()

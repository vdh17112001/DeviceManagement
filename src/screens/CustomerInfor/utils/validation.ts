import {object, string, date} from 'yup'
import {phoneRegExp, requiredText} from '../../../contants/Validation'

export const customerSchema = object({
   name: string().required(requiredText),
   phone: string()
      .required(requiredText)
      .min(8)
      .matches(phoneRegExp, 'Phone number is not valid'),
   email: string().email('Enter a valid email address').required(requiredText),
   address: string().required(requiredText),
   birth: date().required(requiredText),
}).required()

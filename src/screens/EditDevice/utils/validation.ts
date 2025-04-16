import { array, bool, number, object, string } from 'yup'

import { requiredText } from '../../../constants/Validation'

export const editDeviceSchema = object({
   name: string().required(requiredText),
   description: string().required(requiredText),
   quantity: number()
      .integer('Value must be integer')
      .required(requiredText)
      .typeError('Quantity must be a number'),
   status: bool().required(requiredText),
   note: string().required(requiredText),
   fee: number().required(requiredText).typeError('Fee must be a number'),
   image: array().optional(),
}).required()

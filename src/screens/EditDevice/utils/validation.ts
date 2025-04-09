import {object, string, number, bool} from 'yup'
import {positiveNumberText, requiredText} from '../../../contants/Validation'

export const editDeviceSchema = object({
   name: string().required(requiredText),
   description: string().required(requiredText),
   quantity: number()
      .moreThan(0, positiveNumberText)
      .integer('Value must be integer')
      .required(requiredText),
   status: bool().required(requiredText),
   note: string().required(requiredText),
   fee: number().moreThan(0, positiveNumberText).required(requiredText),
}).required()

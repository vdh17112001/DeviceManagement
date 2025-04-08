import {object, string, date} from 'yup'

export const customerSchema = object({
  name: string().required('This is required.'),
  phone: string().required('This is required.'),
  email: string()
    .email('Enter a valid email address')
    .required('This is required.'),
  address: string().required('This is required.'),
  birth: date()
    .default(() => new Date())
    .required('This is required.'),
}).required()

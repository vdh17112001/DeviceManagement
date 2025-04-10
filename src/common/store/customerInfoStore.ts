import { makeAutoObservable } from 'mobx'
import { FormCustomerData } from '../../screens/CustomerInfo/utils/type'

class CustomerInfoStore {
   customerInfo: FormCustomerData = {
      name: '',
      phone: '',
      email: '',
      address: '',
      birth: undefined,
   }

   constructor() {
      makeAutoObservable(this)
   }

   setCustomerInfoForm = (data: FormCustomerData) => {
      this.customerInfo = data
   }
}

const customerStore = new CustomerInfoStore()

export default customerStore

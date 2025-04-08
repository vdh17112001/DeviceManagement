import {makeAutoObservable} from 'mobx'
import {FormCustomerData} from '../../screens/CustomerInfor/utils/type'

class CustomerInforStore {
  customerInfor: FormCustomerData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    birth: undefined,
  }

  constructor() {
    makeAutoObservable(this)
  }

  setCustomerInforForm = (data: FormCustomerData) => {
    this.customerInfor = data
  }
}

const customerStore = new CustomerInforStore()
console.log(`Hoang: create new store`)

export default customerStore

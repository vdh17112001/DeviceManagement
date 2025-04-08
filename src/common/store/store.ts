import {makeObservable, action} from 'mobx'
import {FormCustomerData} from '../../screens/CustomerInfor/utils/type'
import {getPersistedStore, makePersistable} from 'mobx-persist-store'
import {mmkvAdapter} from './configStorage'

class CustomerInforStore {
  customerInfor: FormCustomerData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    birth: undefined,
  }

  constructor() {
    makeObservable(this)
    makePersistable(this, {
      name: 'UserStore',
      properties: ['customerInfor'],
      storage: mmkvAdapter,
    }).then(
      action(async persistStore => {
        console.log(persistStore.isHydrated)
        const d = await this.getStoredData()
        console.log(`Hoang: ${JSON.stringify(d)}`)
      }),
    )
  }

  async setCustomerInforForm(data: FormCustomerData) {
    this.customerInfor = data
    console.log(`Hoang: data ${data}`)
  }

  async getStoredData() {
    const data = await getPersistedStore(this)
    console.log(`Hoang: getStoredData ${data}`)
    return data
  }
}

const customerStore = new CustomerInforStore()
console.log(`Hoang: create new store`)

export default customerStore

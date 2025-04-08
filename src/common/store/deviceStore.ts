import {makeAutoObservable} from 'mobx'
import {DeviceItemType} from '../../screens/DeviceList/utils/type'

class DeviceStore {
   deviceList: DeviceItemType[] = []

   constructor() {
      makeAutoObservable(this)
   }

   setDeviceItem = (data: DeviceItemType[]) => {
      this.deviceList = [...data]
   }

   selectDeviceById = (id: string) => {
      this.deviceList = this.deviceList.filter(item => {
         if (item.id === id) {
            item.selected = !item.selected
         }
         return item
      })
   }

   removeItem = (id: string) => {
      this.deviceList = this.deviceList.filter(item => item.id !== id)
   }
}

const deviceStore = new DeviceStore()
console.log('Hoang: create new device store')

export default deviceStore
